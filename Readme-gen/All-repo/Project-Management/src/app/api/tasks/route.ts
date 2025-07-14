import { sendResponse } from '@/util/Response';
import { NextRequest } from 'next/server';
import { tasksTable } from '@/db/schema';
import { db } from '@/db';

export async function GET() {
 try {
  console.log('CP: 1');
  const tasks = await db.select().from(tasksTable);
  return sendResponse(200, 'Tasks Fetched Perfectly', tasks);
 } catch (error) {
  console.error(error);
  return sendResponse(500, 'Internal Server Error');
 }
}

export async function POST(req: NextRequest) {
 try {
  console.log('CP: 1');
  const { dueDate, priority, projectId, description, title } = await req.json();
  if (!dueDate || !priority || !projectId || !description || !title) {
   return sendResponse(400, 'Invalid Request');
  }

  console.log('CP: 2');
  const [task] = await db
   .insert(tasksTable)
   .values({ dueDate, priority, projectId, description, title })
   .returning();

  console.log('CP: 3');
  return sendResponse(200, 'Task Created Successfully', task);
 } catch (error) {
  console.error(error);
  return sendResponse(500, 'Internal Server Error');
 }
}
