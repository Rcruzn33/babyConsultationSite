const databaseUrl = process.env.DATABASE_URL;
const connectionString = process.env.NODE_ENV === 'production' 
  ? `${databaseUrl}${databaseUrl?.includes('?') ? '&' : '?'}sslmode=require`
  : databaseUrl;

export const pool = new Pool({ 
  connectionString: connectionString
});
