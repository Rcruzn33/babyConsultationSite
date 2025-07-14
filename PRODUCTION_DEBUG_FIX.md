# RENDER DEPLOYMENT - PRESERVE ORIGINAL WEBSITE

## The Problem
You replaced your full React website with a basic server, losing all the beautiful design and functionality from your Replit version. Let's fix this while keeping your original website intact.

## SOLUTION - Update Your GitHub to Build the React App Properly

### 1. Restore your original package.json but fix the build issues:

```json
{
  "name": "baby-sleep-app",
  "version": "1.0.0",
  "type": "module",
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "npm run build:client && npm run build:server",
    "build:client": "vite build --outDir=dist/public",
    "build:server": "esbuild server/index.ts --bundle --platform=node --outfile=dist/index.js --external:@neondatabase/serverless --external:ws --external:pg --external:postgres",
    "start": "NODE_ENV=production node dist/index.js",
    "db:push": "drizzle-kit push"
  },
  "dependencies": {
    "@neondatabase/serverless": "^0.10.4",
    "@sendgrid/mail": "^8.1.3",
    "@radix-ui/react-accordion": "^1.2.4",
    "@radix-ui/react-alert-dialog": "^1.1.7",
    "@radix-ui/react-aspect-ratio": "^1.1.3",
    "@radix-ui/react-avatar": "^1.1.4",
    "@radix-ui/react-checkbox": "^1.1.5",
    "@radix-ui/react-collapsible": "^1.1.4",
    "@radix-ui/react-context-menu": "^2.2.7",
    "@radix-ui/react-dialog": "^1.1.7",
    "@radix-ui/react-dropdown-menu": "^2.1.7",
    "@radix-ui/react-hover-card": "^1.1.7",
    "@radix-ui/react-label": "^2.1.3",
    "@radix-ui/react-menubar": "^1.1.7",
    "@radix-ui/react-navigation-menu": "^1.2.6",
    "@radix-ui/react-popover": "^1.1.7",
    "@radix-ui/react-progress": "^1.1.3",
    "@radix-ui/react-radio-group": "^1.2.4",
    "@radix-ui/react-scroll-area": "^1.2.4",
    "@radix-ui/react-select": "^2.1.7",
    "@radix-ui/react-separator": "^1.1.3",
    "@radix-ui/react-slider": "^1.2.4",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-switch": "^1.1.4",
    "@radix-ui/react-tabs": "^1.1.4",
    "@radix-ui/react-toast": "^1.2.7",
    "@radix-ui/react-toggle": "^1.1.3",
    "@radix-ui/react-tooltip": "^1.1.5",
    "@tailwindcss/typography": "^0.5.15",
    "@tailwindcss/vite": "^4.1.3",
    "@tanstack/react-query": "^5.56.2",
    "@types/connect-pg-simple": "^7.0.3",
    "@types/express": "^4.17.21",
    "@types/express-session": "^1.18.2",
    "@types/node": "^20.16.11",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.0",
    "connect-pg-simple": "^9.0.1",
    "date-fns": "^3.6.0",
    "drizzle-kit": "^0.30.4",
    "drizzle-orm": "^0.39.1",
    "drizzle-zod": "^0.7.0",
    "esbuild": "^0.25.0",
    "express": "^4.21.2",
    "express-session": "^1.18.1",
    "framer-motion": "^11.13.1",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.453.0",
    "memorystore": "^1.6.7",
    "multer": "^2.0.1",
    "next-themes": "^0.4.6",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0",
    "postcss": "^8.4.47",
    "postgres": "^3.4.7",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.55.0",
    "react-icons": "^5.4.0",
    "react-resizable-panels": "^2.1.7",
    "recharts": "^2.15.2",
    "tailwind-merge": "^2.6.0",
    "tailwindcss": "^3.4.17",
    "tailwindcss-animate": "^1.0.7",
    "tsx": "^4.19.1",
    "tw-animate-css": "^1.2.5",
    "typescript": "^5.6.3",
    "vaul": "^1.1.2",
    "vite": "^5.4.14",
    "wouter": "^3.3.5",
    "ws": "^8.18.0",
    "zod": "^3.24.2",
    "zod-validation-error": "^3.4.0"
  },
  "devDependencies": {
    "@types/multer": "^1.4.12",
    "@types/passport": "^1.0.16",
    "@types/passport-local": "^1.0.38",
    "@types/ws": "^8.5.13"
  }
}
```

### 2. Update server/db.ts to support both Neon and PostgreSQL:

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

export { db };
```

### 3. Update server/storage.ts imports:

```typescript
import { eq } from "drizzle-orm";
import { db } from "./db";
import { 
  User, InsertUser, Contact, InsertContact, Consultation, InsertConsultation,
  BlogPost, InsertBlogPost, Testimonial, InsertTestimonial,
  users, contacts, consultations, blogPosts, testimonials
} from "../shared/schema";
```

### 4. Create a database initialization script - init-db.js:

```javascript
import { db } from './dist/server/db.js';
import { users } from './dist/shared/schema.js';
import { eq } from 'drizzle-orm';

async function initDB() {
  try {
    // Check if admin exists
    const [existing] = await db.select().from(users).where(eq(users.username, 'admin')).limit(1);
    
    if (!existing) {
      // Create admin user with the same hash as your Replit version
      await db.insert(users).values({
        username: 'admin',
        email: 'admin@babysleep.com',
        password: '2d7e3474f48f35c765ff57ec4afd6fa3c8f77362e97051f0b1d95694760cc000ee10d3031384fe9a83b21df6e70e0811f0f1f450515e2aef701032ec3fcf87d3.b87302cfeb9918193bef00c80b05345f',
        firstName: 'Admin',
        lastName: 'User',
        isApproved: true,
        approvedBy: 1,
        approvedAt: new Date()
      });
      console.log('✅ Admin user created');
    }
  } catch (error) {
    console.error('❌ DB init error:', error);
  }
}

initDB();
```

### 5. Render Settings:

**Build Command:**
```bash
npm install && npm run build && node init-db.js
```

**Start Command:**
```bash
npm start
```

**Environment Variables:**
- `DATABASE_URL`: postgresql://baby_sleep_db_user:ufSDjNMYRlKwv9EEUOs6BplJfR5ge2NX@dpg-d1liomje5dus73foiq80-a/baby_sleep_db
- `SESSION_SECRET`: any-random-string
- `NODE_ENV`: production

## What This Does:
1. **Preserves your beautiful React website** - Full original design and functionality
2. **Fixes database connection** - Works with both Neon and regular PostgreSQL
3. **Creates admin user** - Same credentials as your Replit version
4. **Maintains authentication** - All your original login functionality

This will give you back your full website that looks exactly like your Replit version, while fixing the authentication issues on Render.