# 🔧 MANUAL PACKAGE.JSON CONFLICT FIX

## The Issue:
Your package.json still has Git conflict markers that prevent Render from parsing it properly.

## Manual Resolution Steps:

### Step 1: Open package.json and remove ALL these lines:
```
<<<<<<< HEAD
=======
>>>>>>> ad29639edf06ed1e1f0122bdd64fcdc129ec33e5
```

### Step 2: Replace the ENTIRE package.json content with this clean version:

```json
{
  "name": "baby-sleep-app",
  "version": "1.0.0",
  "type": "module",
  "engines": {
    "node": "20.x"
  },
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "npm run build:client && npm run build:server",
    "build:client": "vite build",
    "build:server": "esbuild server/index.ts --bundle --platform=node --outfile=dist/index.js --external:@neondatabase/serverless --external:ws --external:postgres --external:@sendgrid/mail",
    "start": "NODE_ENV=production node dist/index.js",
    "db:push": "drizzle-kit push"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@neondatabase/serverless": "^0.10.4",
    "@radix-ui/react-accordion": "^1.2.4",
    "@radix-ui/react-alert-dialog": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.4",
    "@radix-ui/react-checkbox": "^1.1.5",
    "@radix-ui/react-dialog": "^1.1.7",
    "@radix-ui/react-dropdown-menu": "^2.1.7",
    "@radix-ui/react-label": "^2.1.3",
    "@radix-ui/react-popover": "^1.1.7",
    "@radix-ui/react-select": "^2.1.7",
    "@radix-ui/react-separator": "^1.1.3",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-switch": "^1.1.4",
    "@radix-ui/react-tabs": "^1.1.4",
    "@radix-ui/react-toast": "^1.2.7",
    "@radix-ui/react-tooltip": "^1.2.0",
    "@sendgrid/mail": "^8.1.5",
    "@tanstack/react-query": "^5.60.5",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "connect-pg-simple": "^10.0.0",
    "date-fns": "^3.6.0",
    "drizzle-orm": "^0.39.1",
    "drizzle-zod": "^0.7.0",
    "express": "^4.21.2",
    "express-session": "^1.18.1",
    "lucide-react": "^0.453.0",
    "postgres": "^3.4.7",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.55.0",
    "tailwind-merge": "^2.6.0",
    "wouter": "^3.3.5",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@babel/preset-env": "^7.25.8",
    "@babel/preset-react": "^7.25.7",
    "@babel/preset-typescript": "^7.26.0",
    "@types/express": "4.17.21",
    "@types/express-session": "^1.18.2",
    "@types/node": "20.16.11",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.2",
    "drizzle-kit": "^0.30.4",
    "esbuild": "^0.25.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.17",
    "tsx": "^4.19.1",
    "typescript": "5.6.3",
    "vite": "^5.4.14"
  }
}
```

### Step 3: Create init-db.js file:
```javascript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users } from './dist/shared/schema.js';

const client = postgres(process.env.DATABASE_URL, {
  ssl: { rejectUnauthorized: false },
});

const db = drizzle(client);

async function initDB() {
  try {
    console.log('Initializing database...');
    
    await db.insert(users).values({
      username: 'admin',
      email: 'admin@babysleep.com',
      password: '2d7e3474f48f35c765ff57ec4afd6fa3c8f77362e97051f0b1d95694760cc000ee10d3031384fe9a83b21df6e70e0811f0f1f450515e2aef701032ec3fcf87d3.b87302cfeb9918193bef00c80b05345f',
      firstName: 'Admin',
      lastName: 'User',
      isApproved: true,
      approvedBy: 1,
      approvedAt: new Date()
    }).onConflictDoNothing();
    
    console.log('Database initialization complete');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
}

initDB();
```

### Step 4: Commit and Push:
```bash
git add .
git commit -m "Fix package.json merge conflict - remove conflict markers"
git push origin main
```

### Step 5: Render Configuration:
- **Build Command**: `npm run build && node init-db.js`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `DATABASE_URL`: Your PostgreSQL connection string
  - `SESSION_SECRET`: secure-random-string
  - `NODE_ENV`: production

## Key Changes Made:
1. ✅ Removed ALL Git conflict markers
2. ✅ Clean, minimal dependencies
3. ✅ Includes Babel presets for TypeScript
4. ✅ No autoprefixer (prevents Lightningcss errors)
5. ✅ Database initialization script

This should resolve the "Merge conflict detected" error and allow your Baby Sleep Consulting website to deploy successfully on Render!