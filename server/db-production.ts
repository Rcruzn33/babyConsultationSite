import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import ws from "ws";
import * as schema from "../shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

// Check if using Neon or regular PostgreSQL
const isNeonDatabase = process.env.DATABASE_URL.includes('neon.tech');

let db: any;

if (isNeonDatabase) {
  // Neon serverless setup
  neonConfig.webSocketConstructor = ws;
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema });
} else {
  // Regular PostgreSQL setup for Render
  const client = postgres(process.env.DATABASE_URL, {
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  });
  db = drizzlePostgres(client, { schema });
}

<<<<<<< HEAD
export { db };
=======
export { db };
>>>>>>> ad29639edf06ed1e1f0122bdd64fcdc129ec33e5
