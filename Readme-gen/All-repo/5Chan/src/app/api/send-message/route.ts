import UserModel from '@/model/user.model';
import dbConnect from '@/database/database.connect';
import { Message } from '@/model/user.model';

export async function POST(request: Request) {
  await dbConnect();
  const { username, content } = await request.json();
  console.log("username", username);
  console.log("content", content);

  // Check if content is provided in the request
  if (!content || content.trim() === "") {
    return Response.json(
      { message: 'Content is required', success: false },
      { status: 400 }
    );
  }

  try {
    const user = await UserModel.findOne({ username }).exec();

    if (!user) {
      return Response.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessages) {
      return Response.json(
        { message: 'User is not accepting messages', success: false },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };

    user.messages.push(newMessage as Message);
    await user.save();

    return Response.json(
      { message: 'Message sent successfully', success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding message:', error);
    return Response.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}
