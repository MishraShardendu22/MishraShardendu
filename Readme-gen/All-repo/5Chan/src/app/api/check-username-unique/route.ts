import dbConnect from '@/database/database.connect';
import UserModel from '@/model/user.model';
import { usernameValidation } from '@/schema_zod/signUp.schema';
import { sendResponse } from '@/util/Response';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);

    const queryParams = {
      username: searchParams.get('username'),
    };
    const result = UsernameQuerySchema.safeParse(queryParams);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return sendResponse(
        400,
        usernameErrors.length > 0
          ? usernameErrors.join(', ')
          : 'Invalid query parameters'
      );
    }

    const { username } = result.data;
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return sendResponse(200, 'Username already taken');
    }

    return sendResponse(200, 'Username is unique');
  } catch (error) {
    console.log(error);
    return sendResponse(500, 'Internal Server Error');
  }
}
