import { sendResponse } from '@/util/Response';
import { categoriesTable } from '@/db/schema';
import { NextRequest } from 'next/server';
import { db } from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { eq } from 'drizzle-orm';

export async function GET() {
 try {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  if (!userId) {
    return sendResponse(401, 'Unauthorized');
  }
  const categories = await db.select().from(categoriesTable).where(eq(categoriesTable.userId, userId));
  return sendResponse(200, 'Categories fetched successfully', categories);
 } catch (error) {
  console.error(error);
  return sendResponse(500, 'Internal Server Error');
 }
}

export async function POST(req: NextRequest) {
 try {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  const { name } = await req.json();
  if (!userId || !name) {
   return sendResponse(400, 'Invalid request');
  }

  const [category] = await db
   .insert(categoriesTable)
   .values([{ userId, name }])
   .returning();
  return sendResponse(201, 'Category created successfully', category);
 } catch (error) {
  console.error(error);
  return sendResponse(500, 'Internal Server Error');
 }
}
