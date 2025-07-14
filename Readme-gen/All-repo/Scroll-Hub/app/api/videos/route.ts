import mongoose from 'mongoose';
import { ConnectToDatabase } from '@/Database/connect.database';
import { authOptions } from '@/lib/auth';
import Video, { IVideo } from '@/Model/video.model';
import { sendResponse } from '@/util/apiResponse';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await ConnectToDatabase();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    if (!videos || videos.length === 0) {
      return sendResponse(404, 'No videos found');
    }
    return sendResponse(200, 'Videos found', videos);
  } catch (error) {
    console.error(error);
    return sendResponse(500, 'Internal Server Error');
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return sendResponse(401, 'Unauthorized');
    }

    await ConnectToDatabase();
    const body: IVideo = await request.json();
    body.userId = new mongoose.Types.ObjectId(session.user.id);

    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return sendResponse(400, 'Bad Request');
    }

    const videoData = {
      ...body,
      controls: body.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transforamtion?.quality ?? 100,
      },
    };

    console.log("The Video Data is:",videoData);
    const video = new Video(videoData);
    await video.save();

    return NextResponse.json(video);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return sendResponse(401, "Unauthorized");
    }
    console.log(session)

    await ConnectToDatabase();

    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return sendResponse(400, "Video id is required");
    }

    await Video.findByIdAndDelete(id);
    return sendResponse(200, "Video deleted successfully");
  } catch (error) {
    console.error(error);
    return sendResponse(500, "Internal Server Error");
  }
}
