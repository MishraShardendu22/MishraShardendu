import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';

dotenv.config({path: '.env'});

if(!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in .env file');
}

async function runMigration() {
    try{
        const sql = neon(process.env.DATABASE_URL as string);
        const db = drizzle(sql);
        await migrate(db, {migrationsFolder: './drizzle'});

    }catch(error){
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

runMigration()