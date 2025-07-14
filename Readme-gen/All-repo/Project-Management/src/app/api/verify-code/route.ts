import { sendResponse } from '@/util/Response';
import { NextRequest } from 'next/server';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db';

export async function POST(req: NextRequest) {
 try {
  const { username, code } = await req.json();

  // Find the user by username
  const user = await db
   .select()
   .from(usersTable)
   .where(eq(usersTable.username, username))
   .limit(1);

  if (user.length === 0) {
   return sendResponse(404, 'User not found');
  }

  const foundUser = user[0];

  // Check if the verification code is expired or invalid
  if (
   new Date(foundUser.verifyCodeExpiry) < new Date() ||
   foundUser.verifyCode !== code
  ) {
   return sendResponse(403, 'Invalid or expired code');
  }

  // Update the user as verified
  await db
   .update(usersTable)
   .set({ isVerified: true })
   .where(eq(usersTable.username, username));

  return sendResponse(200, 'User verified successfully');
 } catch (error) {
  console.error(
   'Error:',
   error instanceof Error ? error.message : String(error)
  );
  return sendResponse(500, 'Internal server error');
 }
}
