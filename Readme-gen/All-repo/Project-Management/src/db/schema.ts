import {
 integer,
 pgTable,
 varchar,
 boolean,
 timestamp,
 date,
} from 'drizzle-orm/pg-core';

const usersTable = pgTable('users', {
 username: varchar({ length: 255 }).notNull(),
 passwordHash: varchar({ length: 255 }).notNull(),
 email: varchar({ length: 255 }).notNull().unique(),
 id: integer().primaryKey().generatedAlwaysAsIdentity(),
 verifyCode: varchar('verify_code', { length: 6 }).notNull(),
 verifyCodeExpiry: timestamp('verify_code_expiry').notNull(),
 isVerified: boolean('is_verified').default(false).notNull(),
 createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
 updatedAt: timestamp('updatedAt', { withTimezone: true }).defaultNow(),
});

const projectsTable = pgTable('projects', {
 dueDate: date('dueDate'),
 categoryId: integer(),
 userId: integer().notNull(),
 description: varchar({ length: 255 }),
 name: varchar({ length: 255 }).notNull(),
 id: integer().primaryKey().generatedAlwaysAsIdentity(),
 createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
 updatedAt: timestamp('updatedAt', { withTimezone: true }).defaultNow(),
});

const tasksTable = pgTable('tasks', {
 dueDate: date('dueDate'),
 priority: integer().notNull(),
 projectId: integer().notNull(),
 description: varchar({ length: 255 }),
 isCompleted: boolean().default(false),
 title: varchar({ length: 255 }).notNull(),
 id: integer().primaryKey().generatedAlwaysAsIdentity(),
 createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
 updatedAt: timestamp('updatedAt', { withTimezone: true }).defaultNow(),
});

const categoriesTable = pgTable('categories', {
 userId: integer().notNull(),
 name: varchar({ length: 255 }).notNull(),
 id: integer().primaryKey().generatedAlwaysAsIdentity(),
});

export { tasksTable, usersTable, projectsTable, categoriesTable };
