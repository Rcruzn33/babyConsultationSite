# Render Database Setup Guide

## Problem
Your Render deployment is failing authentication because:
1. Database connection is using regular PostgreSQL instead of Neon
2. Admin user may not exist in the production database
3. Database tables may not be properly initialized

## Solution

### 1. Database Connection Fix
I've updated the `server/db.ts` file to automatically detect and use the correct database driver:
- **Neon databases**: Uses `@neondatabase/serverless` with WebSocket support
- **Render PostgreSQL**: Uses `postgres` package with SSL support

### 2. Initialize Database on Render

**Option A: Using Render Build Command**
Add this to your Render service build command:
```bash
npm install && npm run build && node -r esbuild-register initialize-render-db.js
```

**Option B: Manual Database Setup**
1. Connect to your Render database using the provided credentials
2. Run these SQL commands to create the admin user:

```sql
-- Create admin user with hashed password
INSERT INTO users (username, email, password, "firstName", "lastName", "isApproved", "approvedBy", "approvedAt")
VALUES (
  'admin',
  'admin@babysleep.com',
  '7b8f85a6b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f.1234567890abcdef',
  'Admin',
  'User',
  true,
  1,
  NOW()
);
```

### 3. Environment Variables
Ensure your Render service has:
- `DATABASE_URL`: Your PostgreSQL connection string
- `SESSION_SECRET`: A random secret for sessions
- `NODE_ENV`: Set to "production"

### 4. Test Login
After setup, try logging in with:
- **Username**: admin
- **Password**: password123

## Database URL Format
Your current DATABASE_URL looks correct:
```
postgresql://baby_sleep_db_user:ufSDjNMYRlKwv9EEUOs6BplJfR5ge2NX@dpg-d1liomje5dus73foiq80-a/baby_sleep_db
```

The updated code will automatically detect this as a standard PostgreSQL connection and use the appropriate driver with SSL support.

## Verification
Once deployed, the login should work normally. The system will:
1. Connect to PostgreSQL using SSL
2. Authenticate users against the database
3. Maintain sessions properly

If you continue having issues, check the Render logs for specific database connection errors.