**DRIZZLE_SETUP**

````markdown
# Drizzle ORM + Neon Setup Guide

This document outlines the full setup process for using Drizzle ORM with a Neon Postgres database. It also addresses known issues and warnings related to Neon’s WebSocket limitations.

---

## 1. Install Dependencies

```bash
npm install drizzle-orm drizzle-kit pg @neondatabase/serverless dotenv
````

---

## 2. Create Neon Database

* Go to [https://neon.tech](https://neon.tech) and create a new Postgres database.
* Copy the connection string (example: `postgresql://user:password@ep-xxxxx.ap-southeast-1.aws.neon.tech/dbname`).
* Add this to your `.env` file:

```env
DATABASE_URL=your_neon_database_url
```

---

## 3. Create Schema (`lib/db/schema.ts` or `src/db/schema.ts`)

```ts
import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const files = pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    path: text("path").notNull(),
    type: text("type").notNull(),
    size: integer("size").notNull(),
    fileUrl: text("file_url").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    userId: text("user_id").notNull(),
    parentId: text("parent_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),
    isFolder: boolean("is_folder").default(false).notNull(),
    isStarred: boolean("is_starred").default(false).notNull(),
});

export const fileRelations = relations(files, ({ one, many }) => ({
    parent: one(files, {
        fields: [files.parentId],
        references: [files.id],
    }),
    children: many(files),
}));

export type File = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;
```

### Notes

* `inferSelect`: infers the result type when reading from the DB.
* `inferInsert`: infers the expected type when inserting into the DB.

---

## 4. Setup DB Entry File (`lib/db/index.ts`)

```ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL as string);
const db = drizzle(sql, { schema });

export {
    db,  // for ORM usage
    sql, // for raw SQL if needed
}
```

---

## 5. Create Migration Script (`scripts/migrate.ts`)

```ts
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';

dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in .env file');
}

async function runMigration() {
    try {
        const sql = neon(process.env.DATABASE_URL as string);
        const db = drizzle(sql);
        await migrate(db, { migrationsFolder: './drizzle' });
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

runMigration();
```

---

## 6. Add Scripts in `package.json`

```json
"scripts": {
    "generate": "drizzle-kit generate",
    "migrate": "drizzle-kit migrate",
    "push": "drizzle-kit push",
    "dev:migrate": "ts-node scripts/migrate.ts"
}
```

---

## 7. Run Migrations

You can use either of:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

OR (recommended for CI/CD):

```bash
npm run dev:migrate
```

---

## 8. Known Errors & Warnings

### Warning

```
'@neondatabase/serverless' can only connect to remote Neon/Vercel Postgres/Supabase instances through a websocket
```

This is **expected** and **not critical**. It only means:

* Neon’s serverless driver uses WebSockets (`wss://...`) for communication.
* If you're behind a network that blocks WebSockets or has unstable internet, you may face timeouts.

### Error

```
AggregateError [ETIMEDOUT]
```

This happens when:

* Drizzle tries to "push" the schema using WebSockets.
* The network doesn't respond in time (WebSocket connection to Neon fails).

**Workarounds:**

* Prefer using `generate` and `migrate` instead of `push`.
* If running in local or CI that blocks WebSocket, `push` will fail — stick to migration script.

---

## Conclusion

Use `generate` -> `migrate` or your own `dev:migrate` script with `ts-node`. Avoid `push` in unstable networks. All ORM features still work.

```

