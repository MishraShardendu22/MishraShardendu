import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import 'dotenv/config';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const sql = neon(process.env.DATABASE_URL as string);

// { logger: true } enables query logging, which helps in debugging by logging SQL queries being executed.
// If enabled, Drizzle will print all queries and operations happening on the database.
const db = drizzle(sql, { logger: true });

export { db };
