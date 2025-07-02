# Baby Sleep Consulting Website - Deployment Guide

## Overview
This is a complete full-stack web application for "Happy Baby Sleeping" - a baby sleep consulting business. The application includes both a public website and an admin dashboard.

## Technology Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL + Drizzle ORM
- **Authentication**: Session-based with PostgreSQL store
- **Email**: SendGrid integration

## Prerequisites for New Host
1. Node.js 18+ 
2. PostgreSQL 14+
3. npm or yarn package manager

## Environment Variables Required
Create a `.env` file in the root directory with:

```
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# Session Security
SESSION_SECRET=your-long-random-secret-key-here

# Email Service (SendGrid)
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=your-verified-sender-email@domain.com

# Admin Email (for notifications)
ADMIN_EMAIL=admin@yourdomain.com

# Environment
NODE_ENV=production
PORT=5000
```

## Installation Steps

### 1. Database Setup
```bash
# Install PostgreSQL and create database
createdb baby_sleep_consulting

# Update DATABASE_URL in .env file
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Migration
```bash
# Push schema to database
npm run db:push
```

### 4. Create Admin User
```bash
# Run the admin creation script
node create-admin.js
```

### 5. Build for Production
```bash
# Build frontend and backend
npm run build
```

### 6. Start Production Server
```bash
# Start the application
npm start
```

## File Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and configurations
├── server/                 # Express backend
│   ├── auth.ts            # Authentication logic
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── index.ts           # Server entry point
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema and types
├── attached_assets/       # Static assets and images
└── dist/                  # Built application (after npm run build)
```

## Features Included
- **Public Website**: Home, About, Services, Blog, Contact
- **Admin Dashboard**: Contact management, consultation booking, blog CMS, testimonials
- **Authentication**: Secure admin login with approval workflow
- **Email Integration**: Contact notifications and automated responses
- **Responsive Design**: Mobile-friendly throughout
- **SEO Optimized**: Meta tags and semantic HTML

## Domain Configuration
1. Point your domain's DNS A record to your server's IP address
2. Update any hardcoded domain references if needed
3. Configure SSL certificate (recommended: Let's Encrypt)

## Maintenance
- Regular database backups recommended
- Monitor server logs for any issues
- Keep dependencies updated periodically
- SendGrid account needed for email functionality

## Support Files Included
- `create-admin.js` - Bootstrap first admin user
- `db-admin.js` - Database administration tools
- `package.json` - All dependencies and scripts
- `drizzle.config.ts` - Database configuration

## Port Configuration
- Default port: 5000
- Change PORT environment variable if needed
- Ensure firewall allows traffic on chosen port

## Security Notes
- Change SESSION_SECRET to a long, random string
- Use strong passwords for admin accounts
- Keep environment variables secure
- Regular security updates recommended

## Troubleshooting
1. **Database connection issues**: Verify DATABASE_URL format
2. **Email not working**: Check SENDGRID_API_KEY and FROM_EMAIL
3. **Assets not loading**: Ensure attached_assets directory is accessible
4. **Build failures**: Check Node.js version compatibility

For additional support, refer to the logs in your hosting environment.