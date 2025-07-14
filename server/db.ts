import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import ws from "ws";
<<<<<<< HEAD
import * as schema from "@shared/schema";
=======
import * as schema from "../shared/schema";
>>>>>>> ad29639edf06ed1e1f0122bdd64fcdc129ec33e5

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

<<<<<<< HEAD
// Check if we're using Neon or regular PostgreSQL
const isNeonDatabase = process.env.DATABASE_URL.includes('neon.tech') || process.env.DATABASE_URL.includes('amazonaws.com');

let db: ReturnType<typeof drizzle> | ReturnType<typeof drizzlePostgres>;

if (isNeonDatabase) {
  // Use Neon serverless for Neon databases
=======
// Check if using Neon or regular PostgreSQL
const isNeonDatabase = process.env.DATABASE_URL.includes('neon.tech');

let db: any;

if (isNeonDatabase) {
  // Neon serverless setup
>>>>>>> ad29639edf06ed1e1f0122bdd64fcdc129ec33e5
  neonConfig.webSocketConstructor = ws;
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema });
} else {
<<<<<<< HEAD
  // Use regular postgres for Render and other standard PostgreSQL
=======
  // Regular PostgreSQL setup for Render
>>>>>>> ad29639edf06ed1e1f0122bdd64fcdc129ec33e5
  const client = postgres(process.env.DATABASE_URL, {
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  });
  db = drizzlePostgres(client, { schema });
}

export { db };
