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
console.log("Database initialization - NODE_ENV:", process.env.NODE_ENV);
console.log("Database initialization - DATABASE_URL exists:", !!process.env.DATABASE_URL);
console.log("Database initialization - Using SSL:", process.env.NODE_ENV === 'production');
// Configure Neon for production SSL
if (process.env.NODE_ENV === 'production') {
  neonConfig.ssl = true;
  neonConfig.sslmode = 'require';
}

export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL
});
export const db = drizzle({ client: pool, schema });
