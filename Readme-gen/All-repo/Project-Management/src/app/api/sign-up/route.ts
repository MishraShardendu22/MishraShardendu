import { sendResponse } from '@/util/Response';
import { SendEmail } from '@/mail/SendEmail';
import { NextRequest } from 'next/server';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { db } from '@/db';

async function hashPassword(password: string) {
 return await bcrypt.hash(password, 10);
}

function generateVerifyCode() {
 return Math.floor(100000 + Math.random() * 900000);
}

function calculateExpiry(hours: number) {
 const expiryDate = new Date();
 expiryDate.setHours(expiryDate.getHours() + hours);
 return expiryDate;
}

export async function POST(req: NextRequest) {
 try {
  const { username, email, password } = await req.json();

  const existingVerifiedUser = await db
   .select()
   .from(usersTable)
   .where(eq(usersTable.username, username));

  if (existingVerifiedUser.length > 0) {
   return sendResponse(400, 'User already exists');
  }

  const existingUserEmail = await db
   .select()
   .from(usersTable)
   .where(eq(usersTable.email, email));

  if (existingUserEmail.length > 0) {
   return sendResponse(400, 'Email already exists');
  }

  const verifyCode = generateVerifyCode();
  const expiryDate = calculateExpiry(1);

  const user = {
   username: username,
   email: email,
   passwordHash: await hashPassword(password),
   createdAt: new Date(),
   updatedAt: new Date(),
   isVerified: false,
   verifyCode: verifyCode.toString(),
   verifyCodeExpiry: expiryDate,
  };

  await db.insert(usersTable).values(user);

  try {
   await SendEmail({ to_email: email, to_name: username, otp: verifyCode });
   console.log('Email successfully sent!');
   return sendResponse(200, 'Email sent successfully');
  } catch (error) {
   console.error('Error sending email:', error);
   return sendResponse(500, 'Error sending email');
  }
 } catch (error) {
  console.error(
   'Error:',
   error instanceof Error ? error.message : String(error)
  );
  return sendResponse(500, 'Internal Server Error');
 }
}
