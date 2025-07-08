# Final Deployment Fix - Port and SSL Configuration

## Issues Identified
1. **Port Configuration**: Server hardcoded to port 5000, but Render expects PORT environment variable
2. **SSL Configuration**: Session store also needs SSL configuration for PostgreSQL connection

## Changes Needed on GitHub

### 1. Update `server/index.ts` (Line 116-117)
Replace:
```typescript
  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
```

With:
```typescript
  // Use the PORT environment variable provided by Render, fallback to 5000 for local development
  const port = process.env.PORT || 5000;
```

### 2. Update Session Store SSL Configuration (around line 28-31)
Replace:
```typescript
  store: new PgSession({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
  }),
```

With:
```typescript
  store: new PgSession({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  }),
```

## How to Apply These Changes

1. **Go to GitHub**: https://github.com/Rcruzn33/babyConsultationSite
2. **Edit `server/index.ts`**:
   - Click on the file
   - Click pencil icon to edit
   - Make both changes above
   - Commit with message: "Fix port configuration and session store SSL for production"

## After Making Changes

1. Go to Render
2. Click "Manual Deploy"
3. Your website should deploy successfully!

## What These Changes Fix

- **Port Issue**: Render assigns a dynamic port via PORT environment variable
- **SSL Issue**: Both database connection AND session store need SSL configuration
- **Production Compatibility**: Server will now work on any cloud hosting platform

Your build is working perfectly - these are just the final configuration tweaks!