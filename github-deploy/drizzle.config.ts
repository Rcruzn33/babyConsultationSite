import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

const databaseUrl = process.env.DATABASE_URL;
const connectionString = process.env.NODE_ENV === 'production' 
  ? `${databaseUrl}${databaseUrl?.includes('?') ? '&' : '?'}sslmode=require`
  : databaseUrl;

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
});
