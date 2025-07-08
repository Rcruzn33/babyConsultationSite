import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

const databaseUrl = process.env.DATABASE_URL;
const connectionString = process.env.NODE_ENV === 'production' 
  ? `${databaseUrl}${databaseUrl?.includes('?') ? '&' : '?'}sslmode=require`
  : databaseUrl;

export const pool = new Pool({ 
  connectionString: connectionString
});
export const db = drizzle({ client: pool, schema });
