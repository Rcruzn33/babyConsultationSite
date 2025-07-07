# Render Deployment Guide - Baby Sleep Consulting Website

## Issue: DATABASE_URL is required

The error you're seeing occurs because Render needs environment variables to be configured before the app can start.

## Quick Fix Steps

### 1. Set Up Database First
Before deploying your app, you need a PostgreSQL database:

**Option A: Render PostgreSQL (Recommended)**
1. In your Render dashboard, click "New" > "PostgreSQL"
2. Give it a name like "baby-sleep-db"
3. Choose the free plan
4. Click "Create Database"
5. Copy the "External Database URL" from the database info page

**Option B: External Database Services**
- **Neon** (free): https://neon.tech
- **Supabase** (free): https://supabase.com
- **Railway** (free tier): https://railway.app

### 2. Configure Environment Variables in Render
1. Go to your web service settings in Render
2. Click "Environment" tab
3. Add these environment variables:

```
DATABASE_URL = your_postgres_connection_string
SENDGRID_API_KEY = your_sendgrid_api_key
SESSION_SECRET = any_random_string_here
NODE_ENV = production
PORT = 10000
```

### 3. Add Build and Start Commands
In your Render service settings:

**Build Command:**
```bash
npm install
```

**Start Command:**
```bash
npm start
```

### 4. Set Up Database Schema
After successful deployment, you need to initialize your database:

1. Go to your Render service dashboard
2. Click "Shell" to open terminal
3. Run: `npm run db:push`
4. Run: `node create-admin.js` to create your first admin user

## Alternative: Deploy Frontend Only to Render

If you want to deploy just the frontend (static site) to Render:

### Build Command:
```bash
npm install && npm run build
```

### Start Command:
```bash
npx serve -s dist/public -p $PORT
```

### Add to package.json:
```json
{
  "scripts": {
    "serve": "npx serve -s dist/public"
  }
}
```

## Environment Variables You Need

### Required:
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Random string for sessions
- `NODE_ENV` - Set to "production"

### Optional:
- `SENDGRID_API_KEY` - For email notifications
- `SENDGRID_FROM_EMAIL` - Your email address

## Troubleshooting

### If you get "Module not found" errors:
- Make sure all dependencies are in `package.json`
- Check that build command includes `npm install`

### If database connection fails:
- Verify `DATABASE_URL` is correct
- Check if database allows external connections
- Ensure database is running and accessible

### If build fails:
- Check if all file paths are correct
- Verify TypeScript compilation works locally
- Check for missing dependencies

## Next Steps After Fixing

1. **Test the deployment** - Visit your Render URL
2. **Create admin user** - Use the shell to run `node create-admin.js`
3. **Test admin features** - Login and verify all functionality works
4. **Set up custom domain** (optional) - In Render settings

Your baby sleep consulting website should work perfectly on Render once the database is configured!