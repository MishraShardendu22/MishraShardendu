import { sendResponse } from '@/util/Response';
import { NextRequest } from 'next/server';
import { tasksTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db';

export async function PUT(req: NextRequest) {
 try {
  console.log('CP: 1');
  let taskId = req.nextUrl.searchParams.get('taskId');

  if (!taskId) {
   const urlParts = req.nextUrl.pathname.split('/');
   const extractedTaskId = urlParts[urlParts.length - 1];
   console.log('Extracted Task ID:', extractedTaskId);
   taskId = extractedTaskId;
  }

  console.log('CP: 1.5');
  const { title, description, dueDate } = await req.json();
  if (!title || !description || !dueDate) {
   return sendResponse(400, 'Bad Request: Missing fields');
  }

  console.log('CP: 2');
  const updatedProject = await db
   .update(tasksTable)
   .set({ title, description, dueDate })
   .where(eq(tasksTable.id, Number(taskId)))
   .returning();

  console.log('CP: 3');
  return sendResponse(200, 'Successfully Updated Task', updatedProject);
 } catch (error) {
  console.error(error);
  return sendResponse(500, 'Internal Server Error');
 }
}

export async function DELETE(req: NextRequest) {
 try {
  console.log('CP: 1');
  console.log('Next URL:', req.nextUrl);
  console.log('Search Params:', req.nextUrl?.searchParams.toString());

  let taskId = req.nextUrl.searchParams.get('taskId');

  if (!taskId) {
   const urlParts = req.nextUrl.pathname.split('/');
   const extractedTaskId = urlParts[urlParts.length - 1];
   console.log('Extracted Task ID:', extractedTaskId);
   taskId = extractedTaskId;
  }

  if (!taskId) {
   return sendResponse(400, 'Bad Request: Missing taskId');
  }

  console.log('CP: 2');
  await db.delete(tasksTable).where(eq(tasksTable.id, Number(taskId)));
  return sendResponse(200, 'Successfully Deleted Task');
 } catch (error) {
  console.error(error);
  return sendResponse(500, 'Internal Server Error');
 }
}
