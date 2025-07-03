# Complete Baby Sleep Consulting Website Setup Guide

## What You Have
A fully functional baby sleep consulting website with:
- Professional homepage with your custom hero image
- About, Services, and Contact pages
- Admin dashboard for managing content
- Database-driven blog system
- Email integration
- Mobile-responsive design

## Quick Transfer Instructions

### Step 1: Download All Files
Download these key files and folders from your Replit project:
- `client/` folder (entire React frontend)
- `server/` folder (entire Express backend)
- `shared/` folder (database schemas)
- `attached_assets/` folder (your custom images)
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `vite.config.ts`
- `tailwind.config.ts`
- `postcss.config.js`
- `drizzle.config.ts`
- `create-admin.js`
- `db-admin.js`

### Step 2: Choose Your New Host
**Recommended hosting options:**
- **Vercel** (easy deployment, good for beginners)
- **Netlify** (simple setup)
- **DigitalOcean App Platform** (more control)
- **Railway** (developer-friendly)
- **Render** (straightforward)

### Step 3: Database Setup
You'll need a PostgreSQL database. Options:
- **Neon** (free tier, easy setup)
- **Supabase** (free tier, includes auth)
- **PlanetScale** (MySQL alternative)
- **Railway** (includes database)

### Step 4: Environment Variables
Create a `.env` file with these variables:
```
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_long_random_secret_key
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=your_verified_email
ADMIN_EMAIL=your_admin_email
NODE_ENV=production
PORT=3000
```

### Step 5: Installation Commands
```bash
# Install dependencies
npm install

# Setup database
npm run db:push

# Create admin user
node create-admin.js

# Build for production
npm run build

# Start server
npm start
```

## Alternative: Use Platform-Specific Deployment

### Option A: Vercel
1. Upload files to GitHub repository
2. Connect GitHub to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Option B: Railway
1. Connect GitHub repository
2. Add PostgreSQL database service
3. Set environment variables
4. Deploy with one click

### Option C: Render
1. Connect GitHub repository
2. Add PostgreSQL database
3. Configure environment variables
4. Deploy web service

## If You Need Help with Transfer

I can help you:
1. Package all files for download
2. Create deployment scripts for specific platforms
3. Set up the database schema
4. Configure environment variables
5. Test the deployment

## Current Admin Credentials
Username: admin
Password: [the password you set when creating the admin user]

## What Works Right Now
- Complete website with all pages
- Your custom hero image
- Three service tiers
- Contact forms
- Blog system (with "under construction" public page)
- Full admin dashboard
- Email notifications
- Mobile responsiveness

Would you like me to help you with any specific hosting platform or create a complete deployment package for download?