import { sendResponse } from '@/util/Response';
import { projectsTable } from '@/db/schema';
import { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';

export async function PUT(req: NextRequest) {
 try {
  console.log('CP: 1');
  let projectId = req.nextUrl.searchParams.get('projectId');

  if (!projectId) {
   const urlParts = req.nextUrl.pathname.split('/');
   const newprojectId = urlParts[urlParts.length - 1];
   console.log('Extracted Task ID:', newprojectId);
   projectId = newprojectId;
  }

  console.log('CP: 1.5');
  const { name, description, dueDate } = await req.json();

  if (!projectId || !name || !description || !dueDate) {
   return sendResponse(400, 'Bad Request');
  }

  await db
   .update(projectsTable)
   .set({ name, description, dueDate })
   .where(eq(projectsTable.id, Number(projectId)));
  return sendResponse(200, 'Successfully Updated Project');
 } catch (error) {
  console.error(error);
  return sendResponse(500, 'Internal Server Error');
 }
}

export async function DELETE(req: NextRequest) {
 try {
  console.log('CP: 1');
  let projectId = req.nextUrl.searchParams.get('projectId');

  if (!projectId) {
   const urlParts = req.nextUrl.pathname.split('/');
   const newprojectId = urlParts[urlParts.length - 1];
   console.log('Extracted Task ID:', newprojectId);
   projectId = newprojectId;
  }

  console.log('CP: 1.5');

  await db.delete(projectsTable).where(eq(projectsTable.id, Number(projectId)));
  return sendResponse(200, 'Successfully Deleted Project');
 } catch (error) {
  console.error(error);
  return sendResponse(500, 'Internal Server Error');
 }
}
