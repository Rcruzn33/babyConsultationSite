# RENDER DEPLOYMENT QUICK FIX

## The Problem
Your Render build failed because of the vite command and database initialization issues.

## IMMEDIATE SOLUTION - Try This First

### 1. Update your GitHub repository with these exact changes:

#### A. Update `server/db.ts`:
```typescript
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import ws from "ws";
import * as schema from "../shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

// Detect database type
const isNeonDatabase = process.env.DATABASE_URL.includes('neon.tech');

let db: any;

if (isNeonDatabase) {
  neonConfig.webSocketConstructor = ws;
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema });
} else {
  const client = postgres(process.env.DATABASE_URL, {
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });
  db = drizzlePostgres(client, { schema });
}

export { db };
```

#### B. Update `server/storage.ts` - Replace the first few lines:
```typescript
import { eq } from "drizzle-orm";
import { db } from "./db";
import { 
  User, InsertUser, Contact, InsertContact, Consultation, InsertConsultation,
  BlogPost, InsertBlogPost, Testimonial, InsertTestimonial,
  users, contacts, consultations, blogPosts, testimonials
} from "../shared/schema";
```

#### C. Add to `package.json` dependencies:
```json
"postgres": "^3.4.3"
```

### 2. Update Render Settings:

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

### 3. Add Environment Variables in Render:
- `DATABASE_URL`: postgresql://baby_sleep_db_user:ufSDjNMYRlKwv9EEUOs6BplJfR5ge2NX@dpg-d1liomje5dus73foiq80-a/baby_sleep_db
- `SESSION_SECRET`: any-random-string-here
- `NODE_ENV`: production

### 4. Create Admin User Manually (If Needed):

If login still fails after deployment, connect to your Render database and run:

```sql
INSERT INTO users (username, email, password, "firstName", "lastName", "isApproved", "approvedBy", "approvedAt")
VALUES (
  'admin',
  'admin@babysleep.com',
  '2d7e3474f48f35c765ff57ec4afd6fa3c8f77362e97051f0b1d95694760cc000ee10d3031384fe9a83b21df6e70e0811f0f1f450515e2aef701032ec3fcf87d3.b87302cfeb9918193bef00c80b05345f',
  'Admin',
  'User',
  true,
  1,
  NOW()
);
```

This creates the admin user with password: `password123`

### 5. Test:
- Deploy from GitHub
- Go to your Render URL
- Navigate to `/admin`
- Login with `admin` / `password123`

This simpler approach should work without the complex initialization script that was causing the build to fail.