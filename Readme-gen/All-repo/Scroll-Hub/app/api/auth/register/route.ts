import { ConnectToDatabase } from '@/Database/connect.database';
import User from '@/Model/user.model';
import { sendResponse } from '@/util/apiResponse';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return sendResponse(400, 'Email and password are required');
    }

    if (password.length < 6 || password.length > 20) {
      return sendResponse(
        400,
        'Password must be at least 6 and at most 20 characters',
      );
    }

    await ConnectToDatabase();

    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return sendResponse(400, 'User already exists');
    }

    const user = new User({
      email,
      password,
    });
    await user.save();

    return sendResponse(200, 'User registered successfully', user);
  } catch (error) {
    console.log(error);
    return sendResponse(500, 'Internal Server Error');
  }
}
