import Video from '@/Model/video.model';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { sendResponse } from '@/util/apiResponse';
import { NextRequest, NextResponse } from 'next/server';
import { ConnectToDatabase } from '@/Database/connect.database';
import User from '@/Model/user.model';

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return sendResponse(401, 'Unauthorized');
    }
    await ConnectToDatabase();

    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return sendResponse(400, "Video id is required");
    }

    const video = await Video.findById(id);
    if (!video) {
      return sendResponse(404, "Video not found");
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return sendResponse(404, "User not found");
    }

    user.reportedVideos = [...(user.reportedVideos || []), video._id];
    await user.save();

    video.report = (video.report || 0) + 1;
    await video.save();
    
    if(video.report >= 5) {
      await Video.findByIdAndDelete(video._id);
      return sendResponse(200, "Video deleted successfully");
    }

    return NextResponse.json(video);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to report video' },
      { status: 500 }
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
