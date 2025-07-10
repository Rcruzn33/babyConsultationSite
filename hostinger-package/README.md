# Baby Sleep Consulting Website - Hostinger VPS Package

This package contains everything needed to deploy your baby sleep consulting website on Hostinger VPS.

## Quick Start

1. **Upload this entire folder** to your Hostinger VPS server at `/var/www/baby-sleep-app`
2. **Run the setup script** as root: `sudo bash hostinger-deploy.sh`
3. **Install dependencies**: `npm install`
4. **Build the application**: `npm run build`
5. **Set up database**: `npm run db:push`
6. **Create admin user**: `node create-admin.js`
7. **Start the application**: `pm2 start npm --name baby-sleep-app -- start`

## Files Included

- `server/` - Express.js backend application
- `client/` - React frontend application
- `shared/` - Shared types and database schema
- `attached_assets/` - Images and media files
- `package.json` - Node.js dependencies
- `drizzle.config.ts` - Database configuration
- `create-admin.js` - Admin user creation script
- `hostinger-deploy.sh` - Automated server setup script
- `HOSTINGER_VPS_DEPLOYMENT_GUIDE.md` - Complete deployment guide

## Requirements

- Hostinger VPS with Ubuntu 20.04/22.04
- Minimum 1GB RAM (2GB recommended)
- Node.js 18+
- PostgreSQL 12+

## Support

Refer to the complete deployment guide in `HOSTINGER_VPS_DEPLOYMENT_GUIDE.md` for detailed instructions.

## Environment Variables

The deployment script will automatically generate:
- Database credentials
- Session secret
- Environment configuration

You will need to add your own:
- `SENDGRID_API_KEY` for email notifications (optional)

## Security

- Database password is automatically generated
- Session secret is randomly generated
- Firewall is configured automatically
- SSL setup instructions included

Your website includes:
- Admin dashboard for content management
- Contact form and consultation booking
- Blog post management
- Testimonial management
- User authentication system
- File upload capabilities

All features are fully functional and ready for your sleep consulting business!
