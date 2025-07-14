import { sendResponse } from '@/util/Response';
import { categoriesTable } from '@/db/schema';
import { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';

export async function PUT(
 req: NextRequest) {
 try {
  let categorId = req.nextUrl.searchParams.get('categorId');

  if (!categorId) {
   const urlParts = req.nextUrl.pathname.split('/');
   const extractedTaskId = urlParts[urlParts.length - 1];
   console.log('Extracted Task ID:', extractedTaskId);
   categorId = extractedTaskId;
  }

  const { name } = await req.json();
  if (!categorId || !name) {
   return sendResponse(400, 'Invalid request');
  }
  const [updatedCategory] = await db
   .update(categoriesTable)
   .set({ name })
   .where(eq(categoriesTable.id, Number(categorId)))
   .returning();
  return sendResponse(200, 'Category updated successfully', updatedCategory);
 } catch (error) {
  console.error(error);
  return sendResponse(500, 'Internal Server Error');
 }
}

export async function DELETE(req: NextRequest) {
 try {
  let categorId = req.nextUrl.searchParams.get('categorId');

  if (!categorId) {
   const urlParts = req.nextUrl.pathname.split('/');
   const extractedTaskId = urlParts[urlParts.length - 1];
   console.log('Extracted Task ID:', extractedTaskId);
   categorId = extractedTaskId;
  }

  if (!categorId) {
   return sendResponse(400, 'Invalid request');
  }

  await db
   .delete(categoriesTable)
   .where(eq(categoriesTable.id, Number(categorId)));
  return sendResponse(200, 'Category deleted successfully');
 } catch (error) {
  console.error(error);
  return sendResponse(500, 'Internal Server Error');
 }
}