import { authOptions } from '../auth/[...nextauth]/options';
import { sendResponse } from '@/util/Response';
import { getServerSession } from 'next-auth';
import { projectsTable } from '@/db/schema';
import { NextRequest } from 'next/server';
import { db } from '@/db';
import { eq } from 'drizzle-orm';

export async function GET() {
 try {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  if (!userId) {
    return sendResponse(401, 'Unauthorized');
  }
  const projects = await db.select().from(projectsTable).where(eq(projectsTable.userId, userId));
  return sendResponse(200, 'Successfully Fetched Data', projects);
 } catch (error) {
  console.error(error);
  return sendResponse(500, 'Internal Server Error');
 }
}

export async function POST(req: NextRequest) {
 try {
  const session = await getServerSession(authOptions);
  const user_Id = Number(session?.user?.id);
  console.log(session);

  const { name, description, dueDate, categoryId } = await req.json();
  const project = {
   name: name,
   description: description,
   dueDate: dueDate,
   userId: user_Id,
   categoryId: categoryId,
  };

  console.log(project);
  if (!user_Id || !name || !description || !dueDate) {
   return sendResponse(400, 'Bad Request');
  }

  await db.insert(projectsTable).values(project);
  return sendResponse(200, 'Successfully Created Project', project);
 } catch (error) {
  console.error(error);
  return sendResponse(500, 'Internal Server Error');
 }
}

// const projectsTable = pgTable("projects", {
//     dueDate: date("dueDate"),
//     userId: integer().notNull(),
//     description: varchar({ length: 255 }),
//     name: varchar({ length: 255 }).notNull(),
//     id: integer().primaryKey().generatedAlwaysAsIdentity(),
//     createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
//     updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
// });

// const usersTable = pgTable("users", {
//     username: varchar({ length: 255 }).notNull(),
//     passwordHash: varchar({ length: 255 }).notNull(),
//     email: varchar({ length: 255 }).notNull().unique(),
//     id: integer().primaryKey().generatedAlwaysAsIdentity(),
//     verifyCode: varchar('verify_code', { length: 6 }).notNull(),
//     verifyCodeExpiry: timestamp('verify_code_expiry').notNull(),
//     isVerified: boolean('is_verified').default(false).notNull(),
//     createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
//     updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
// });
