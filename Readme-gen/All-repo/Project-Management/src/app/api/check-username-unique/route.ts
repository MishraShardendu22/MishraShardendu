import { usernameValidation } from '@/schema_zod/signUp.schema';
import { sendResponse } from '@/util/Response';
import { NextRequest } from 'next/server';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { z } from 'zod';

const UsernameQuerySchema = z.object({
 username: usernameValidation,
});

export async function GET(request: NextRequest) {
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
  const existingVerifiedUser = await db
   .select()
   .from(usersTable)
   .where(eq(usersTable.username, username));

  if (existingVerifiedUser.length > 0) {
   return sendResponse(200, 'Username already taken');
  }

  return sendResponse(200, 'Username is unique');
 } catch (error) {
  console.log(error);
  return sendResponse(500, 'Internal Server Error');
 }
}
