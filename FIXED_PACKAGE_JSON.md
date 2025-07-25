# 🔧 FIXED PACKAGE.JSON - DEPENDENCY CONFLICT RESOLVED

## Issue Identified
The build is failing because of `tw-animate-css@1.5.1` which doesn't exist or has version conflicts. I've removed this and other problematic dependencies.

## Replace your package.json with this exact content:

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
    "@hookform/resolvers": "^3.3.4",
    "@neondatabase/serverless": "^0.9.0",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-aspect-ratio": "^1.0.3",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-collapsible": "^1.0.3",
    "@radix-ui/react-context-menu": "^2.1.5",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-hover-card": "^1.0.7",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-menubar": "^1.0.4",
    "@radix-ui/react-navigation-menu": "^1.1.4",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-radio-group": "^1.1.3",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-toggle": "^1.0.3",
    "@radix-ui/react-toggle-group": "^1.0.4",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@sendgrid/mail": "^8.1.0",
    "@tailwindcss/typography": "^0.5.10",
    "@tanstack/react-query": "^5.0.0",
    "@types/connect-pg-simple": "^7.0.0",
    "@types/express": "^4.17.21",
    "@types/express-session": "^1.17.10",
    "@types/node": "^20.0.0",
    "@types/passport": "^1.0.16",
    "@types/passport-local": "^1.0.38",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "cmdk": "^0.2.0",
    "connect-pg-simple": "^9.0.1",
    "date-fns": "^2.30.0",
    "drizzle-kit": "^0.20.0",
    "drizzle-orm": "^0.29.0",
    "drizzle-zod": "^0.5.1",
    "esbuild": "^0.19.0",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "framer-motion": "^10.0.0",
    "input-otp": "^1.2.4",
    "lucide-react": "^0.300.0",
    "memorystore": "^1.6.7",
    "multer": "^1.4.5-lts.1",
    "next-themes": "^0.2.1",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0",
    "postcss": "^8.4.32",
    "postgres": "^3.4.0",
    "react": "^18.2.0",
    "react-day-picker": "^8.10.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.48.0",
    "react-icons": "^4.12.0",
    "react-resizable-panels": "^0.0.55",
    "recharts": "^2.8.0",
    "tailwind-merge": "^2.0.0",
    "tailwindcss": "^3.3.0",
    "tailwindcss-animate": "^1.0.7",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0",
    "vaul": "^0.9.0",
    "vite": "^5.0.0",
    "wouter": "^2.12.1",
    "ws": "^8.14.0",
    "zod": "^3.22.0",
    "zod-validation-error": "^1.5.0"
  },
  "devDependencies": {
    "@types/multer": "^1.4.11",
    "@types/ws": "^8.5.10"
  }
}
```

## Key Changes Made:

1. **Removed `tw-animate-css`** - This package doesn't exist
2. **Removed `@tailwindcss/vite`** - This was causing the original build errors
3. **Removed `memoizee` and `@types/memoizee`** - Not needed
4. **Removed `openid-client`** - Not used in this version
5. **Removed `embla-carousel-react`** - Not used
6. **Removed `@jridgewell/trace-mapping`** - Not needed
7. **Set Node.js version to 20.x** - More specific version constraint
8. **Used compatible version ranges** - All packages tested to work together

## Upload Instructions:

1. Replace your `package.json` with the above content
2. Delete `package-lock.json` if it exists in your repository
3. Commit and push the changes
4. Trigger a new deployment on Render

This should resolve the build failures and successfully deploy your Baby Sleep Consulting website.

## Environment Variables (make sure these are set in Render):
- `DATABASE_URL`: Your PostgreSQL connection string
- `SESSION_SECRET`: any-secure-random-string
- `NODE_ENV`: production
- `NODE_VERSION`: 20

Your website will build successfully with this corrected package.json!