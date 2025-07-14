import { ConnectToDatabase } from '@/Database/connect.database';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import User from '@/Model/user.model';

export async function GET() {
  try {
    // console.log('Checkpoint-1');
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" });
    }
    // console.log(session)

    await ConnectToDatabase();
    const id = session.user.id;
    // console.log("ID: ",id)

    const existUser = await User.findById(id)

    const video = existUser.reportedVideos
    
    return NextResponse.json(video);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      {
        status: 500,
      },
    );
  }
}
