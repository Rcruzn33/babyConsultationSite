# HelioHost Deployment Guide - Baby Sleep Consulting Website

## Status: Ready for Deployment ✅
Your baby sleep consulting website is fully prepared and ready for HelioHost deployment. All features are active including:
- Dynamic blog functionality connected to database
- Custom professional images integrated
- Admin dashboard for content management
- Contact forms and consultation booking
- Email notifications configured

## About HelioHost
HelioHost offers free web hosting with Node.js support, making it perfect for your baby sleep consulting website. They provide cPanel access and support for full-stack applications.

## Step 1: HelioHost Account Setup

### Create Account
1. Go to https://heliohost.org/
2. Click "Sign Up" 
3. Choose a server (Tommy recommended for Node.js)
4. Create your account with username and domain
5. Wait for account activation (usually 24-48 hours)

### Domain Options
- **Free subdomain**: yourusername.heliohost.org
- **Custom domain**: Connect your own domain via DNS

## Step 2: Prepare Your Website Files

### Required Files Structure
```
your-website/
├── package.json
├── package-lock.json
├── server.js (renamed from server/index.ts)
├── client/ (built frontend)
├── shared/
├── attached_assets/
├── create-admin.js
├── .env
└── node_modules/ (after npm install)
```

### Build Process
1. **Build frontend**: `npm run build`
2. **Compile TypeScript**: Convert server TypeScript to JavaScript
3. **Prepare environment**: Create .env file
4. **Test locally**: Ensure everything works

## Step 3: Database Setup

### Option A: HelioHost MySQL (Free)
HelioHost provides MySQL databases. You'll need to:
1. Create MySQL database in cPanel
2. Convert PostgreSQL schema to MySQL
3. Update database connection strings

### Option B: External PostgreSQL (Recommended)
Use free PostgreSQL hosting:
- **Neon**: Free tier with 0.5GB storage
- **Supabase**: Free tier with 500MB storage
- **ElephantSQL**: Free tier with 20MB storage

## Step 4: File Upload Methods

### Method 1: cPanel File Manager
1. Log into cPanel
2. Open File Manager
3. Navigate to public_html
4. Upload and extract your files
5. Set proper permissions (755 for folders, 644 for files)

### Method 2: FTP Upload
1. Use FileZilla or similar FTP client
2. Connect with your HelioHost FTP credentials
3. Upload all files to public_html directory

## Step 5: Node.js Configuration

### Create .htaccess file
```apache
RewriteEngine On
RewriteRule ^(.*)$ server.js [L]
```

### Environment Variables
Create `.env` file:
```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
# or mysql://user:pass@host:3306/dbname
SESSION_SECRET=your-long-random-secret-key
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
NODE_ENV=production
PORT=3000
```

## Step 6: Dependencies Installation

### Via cPanel Terminal (if available)
```bash
cd public_html
npm install --production
```

### Via SSH (if SSH access enabled)
```bash
npm install --production
node create-admin.js
```

## Step 7: Database Setup

### If using external PostgreSQL
```bash
# Install database schema
npm run db:push

# Create admin user
node create-admin.js
```

### If using MySQL
You'll need to convert the schema and run setup scripts.

## Step 8: Testing and Launch

### Test Points
1. **Homepage**: Check if main page loads
2. **Admin login**: Verify admin access works
3. **Contact forms**: Test form submissions
4. **Email notifications**: Verify SendGrid integration
5. **Mobile responsiveness**: Test on mobile devices

## Step 9: Domain Configuration

### For Custom Domain
1. Update DNS A record to point to HelioHost server IP
2. Configure domain in cPanel
3. Enable SSL certificate (Let's Encrypt available)

## Important HelioHost Considerations

### File Limits
- Account storage: Usually 1GB free
- File upload limits: Check current limits
- Database size: MySQL limits apply

### Performance
- Shared hosting environment
- CPU/memory limits apply
- Consider optimization for better performance

### Support
- Community forum available
- Help documentation extensive
- Free support for technical issues

## Backup Strategy
1. **Database backups**: Weekly exports
2. **File backups**: Monthly full backups
3. **Local development**: Keep local copy updated

## Alternative: Simplified Deployment

If full Node.js deployment is complex, I can help you create:
1. **Static version**: Convert to static HTML/CSS/JS
2. **PHP backend**: Convert admin functionality to PHP
3. **Hybrid approach**: Static frontend with minimal backend

## Files Ready for Transfer
Your website includes:
- ✅ Complete frontend with your custom hero image
- ✅ Full admin dashboard
- ✅ Database schema and setup scripts
- ✅ Email integration
- ✅ Mobile-responsive design
- ✅ All content and functionality

## Next Steps
1. **Create HelioHost account** (if not done)
2. **Choose database option** (external PostgreSQL recommended)
3. **Prepare files for upload**
4. **Configure environment variables**
5. **Upload and test**

Would you like me to help you prepare the files specifically for HelioHost, or do you need assistance with any particular step in this process?