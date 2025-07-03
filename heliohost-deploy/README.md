# Baby Sleep Consulting Website - HelioHost Deployment Package

## What's Included
This package contains everything you need to deploy your baby sleep consulting website to HelioHost.

### Files in This Package
- `server.js` - HelioHost-compatible Node.js server
- `.htaccess` - Apache configuration for Node.js
- `package.json` - Production dependencies
- `.env.template` - Environment variables template
- `attached_assets/` - Your custom images and assets
- `client-src/` - React frontend source code
- `server/` - Express backend source code
- `shared/` - Database schemas and types

## Quick Setup Steps

### 1. HelioHost Account
- Sign up at https://heliohost.org/
- Choose server (Tommy recommended for Node.js)
- Wait for account activation (24-48 hours)

### 2. Database Setup (Recommended: External PostgreSQL)
**Option A: Neon (Free)**
- Go to https://neon.tech/
- Create free account and database
- Copy connection string

**Option B: Supabase (Free)**
- Go to https://supabase.com/
- Create project and database
- Copy connection string

### 3. File Upload
- Log into HelioHost cPanel
- Open File Manager
- Upload all files to `public_html` directory
- Or use FTP client like FileZilla

### 4. Environment Configuration
- Copy `.env.template` to `.env`
- Update with your actual values:
  - DATABASE_URL (from step 2)
  - SENDGRID_API_KEY (for emails)
  - SESSION_SECRET (random string)

### 5. Dependencies
In cPanel Terminal:
```bash
cd public_html
npm install --production
```

### 6. Database Setup
```bash
# If using PostgreSQL schema
npm run db:push

# Create admin user
node create-admin.js
```

## Important Environment Variables

```env
# Required
DATABASE_URL=postgresql://user:pass@host:5432/dbname
SESSION_SECRET=your-very-long-random-secret-key
SENDGRID_API_KEY=SG.your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com

# Optional
NODE_ENV=production
PORT=3000
```

## Features Included
✅ Professional homepage with custom hero image
✅ About, Services, Contact pages
✅ Admin dashboard for content management
✅ Blog system with "under construction" public page
✅ Testimonials management
✅ Contact form with email notifications
✅ Mobile-responsive design
✅ SSL-ready configuration

## Testing Your Deployment
1. Visit your HelioHost domain
2. Check homepage loads correctly
3. Test contact forms
4. Access admin at `/admin`
5. Verify email notifications work

## Support
- HelioHost Community: https://heliohost.org/community/
- Documentation: Check HelioHost wiki
- This website: All functionality tested and working

## Backup & Maintenance
- Regular database backups recommended
- Keep local copy of files
- Monitor HelioHost announcements for server maintenance

Your baby sleep consulting website is ready to go live! 🚀