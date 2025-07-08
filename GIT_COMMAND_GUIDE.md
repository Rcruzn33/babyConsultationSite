# Git Command Guide - SSL Certificate Fix

## Current Issue
- SSL certificate error persists in production
- Git conflicts preventing push to GitHub
- Need to resolve conflicts and deploy SSL fix

## Step-by-Step Git Fix

### Step 1: Navigate to the github-deploy directory
```bash
cd github-deploy
```

### Step 2: Check current status
```bash
git status
```

### Step 3: Pull latest changes first
```bash
git pull origin main --rebase
```

### Step 4: If conflicts occur, resolve them manually
- Edit any files that show conflicts
- Look for `<<<<<<<`, `=======`, and `>>>>>>>` markers
- Choose the correct version and remove the conflict markers

### Step 5: Add and commit changes
```bash
git add .
git commit -m "Fix SSL certificate validation for production database"
```

### Step 6: Push to GitHub
```bash
git push origin main
```

## Files That Need SSL Fix

The following files need to be updated with SSL configuration:

### server/db.ts
```typescript
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});
```

### server/index.ts (session store section)
```typescript
  store: new PgSession({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  }),
```

## Alternative: Force Push (if conflicts persist)
If you're comfortable overwriting remote changes:
```bash
git push origin main --force
```

## After Successful Push
1. GitHub should automatically trigger Render deployment
2. Check Render logs for successful deployment
3. SSL certificate error should be resolved

## Manual Deployment Alternative
If git issues persist, you can manually edit files directly in your GitHub repository through the web interface, then trigger a manual deployment in Render.