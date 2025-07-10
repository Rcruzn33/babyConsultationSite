#!/bin/bash

# Create Hostinger Deployment Package
# This script creates a complete standalone package for Hostinger VPS deployment

echo "Creating Hostinger deployment package..."

# Create package directory
mkdir -p hostinger-package

# Copy all necessary files
echo "Copying application files..."

# Copy server files
cp -r server hostinger-package/
cp -r shared hostinger-package/
cp -r client hostinger-package/

# Copy configuration files
cp package.json hostinger-package/
cp package-lock.json hostinger-package/
cp tsconfig.json hostinger-package/
cp vite.config.ts hostinger-package/
cp tailwind.config.ts hostinger-package/
cp postcss.config.js hostinger-package/
cp components.json hostinger-package/

# Copy database files
cp drizzle.config.ts hostinger-package/
cp create-admin.js hostinger-package/
cp db-admin.js hostinger-package/

# Copy assets and uploads
cp -r attached_assets hostinger-package/ 2>/dev/null || echo "No attached_assets folder found"
mkdir -p hostinger-package/client/public/uploads

# Copy deployment files
cp HOSTINGER_VPS_DEPLOYMENT_GUIDE.md hostinger-package/
cp hostinger-deploy.sh hostinger-package/

# Create README for the package
cat > hostinger-package/README.md << 'EOF'
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
EOF

# Create deployment checklist
cat > hostinger-package/DEPLOYMENT_CHECKLIST.md << 'EOF'
# Hostinger VPS Deployment Checklist

## Pre-Deployment
- [ ] Hostinger VPS account created
- [ ] Server access credentials available
- [ ] Domain name ready (optional)
- [ ] SendGrid API key (optional, for emails)

## Server Setup
- [ ] Connected to VPS via SSH
- [ ] Ran automated setup script: `sudo bash hostinger-deploy.sh`
- [ ] Noted database password and session secret
- [ ] Verified all software installed correctly

## Application Deployment
- [ ] Uploaded application files to `/var/www/baby-sleep-app`
- [ ] Set correct file permissions
- [ ] Installed Node.js dependencies: `npm install`
- [ ] Built the application: `npm run build`
- [ ] Created database schema: `npm run db:push`
- [ ] Created admin user: `node create-admin.js`

## Process Management
- [ ] Started application with PM2: `pm2 start npm --name baby-sleep-app -- start`
- [ ] Saved PM2 configuration: `pm2 save`
- [ ] Enabled auto-startup: `pm2 startup`
- [ ] Verified application is running: `pm2 status`

## Web Server Configuration
- [ ] Tested Nginx configuration: `nginx -t`
- [ ] Reloaded Nginx: `systemctl reload nginx`
- [ ] Verified website loads at server IP
- [ ] Tested admin dashboard access: `http://YOUR_IP/admin`

## Security Setup
- [ ] Configured firewall rules
- [ ] Set up SSL certificate (if using domain): `certbot --nginx -d YOUR_DOMAIN`
- [ ] Verified HTTPS redirect working
- [ ] Tested website security headers

## Final Testing
- [ ] Homepage loads correctly
- [ ] Contact form works
- [ ] Consultation booking works
- [ ] Admin login works
- [ ] Blog posts display correctly
- [ ] Testimonials display correctly
- [ ] File uploads work in admin dashboard

## Post-Deployment
- [ ] Set up monitoring and alerts
- [ ] Configured automated backups
- [ ] Documented admin credentials
- [ ] Tested email notifications (if SendGrid configured)
- [ ] Verified all website features work

## Performance Optimization
- [ ] Enabled Gzip compression
- [ ] Set up caching headers
- [ ] Configured PM2 cluster mode if needed
- [ ] Monitored resource usage

## Maintenance Setup
- [ ] Scheduled regular database backups
- [ ] Set up log rotation
- [ ] Documented update procedures
- [ ] Created monitoring dashboard

## Emergency Procedures
- [ ] Documented restart procedures
- [ ] Created backup restoration guide
- [ ] Set up monitoring alerts
- [ ] Established support contacts

## Notes
- Database Password: [SAVE FROM SETUP SCRIPT OUTPUT]
- Session Secret: [SAVE FROM SETUP SCRIPT OUTPUT]
- Admin Username: [CREATED DURING SETUP]
- Admin Password: [CREATED DURING SETUP]
- Server IP: [YOUR HOSTINGER VPS IP]
- Domain: [IF USING CUSTOM DOMAIN]

## Cost Tracking
- VPS Monthly Cost: $___
- Domain Annual Cost: $___
- SSL Certificate: Free (Let's Encrypt)
- SendGrid: Free tier available

Your baby sleep consulting website is now fully deployed and ready to serve your clients!
EOF

# Create a simple start script for easier management
cat > hostinger-package/start-app.sh << 'EOF'
#!/bin/bash

# Simple script to start/restart the baby sleep consulting application

echo "Starting Baby Sleep Consulting Website..."

# Navigate to app directory
cd /var/www/baby-sleep-app

# Build the application
echo "Building application..."
npm run build

# Start with PM2
echo "Starting with PM2..."
pm2 delete baby-sleep-app 2>/dev/null || true
pm2 start npm --name baby-sleep-app -- start
pm2 save

# Reload Nginx
echo "Reloading Nginx..."
systemctl reload nginx

echo "Application started successfully!"
echo "Website available at: http://$(curl -s ifconfig.me)"
echo "Admin dashboard: http://$(curl -s ifconfig.me)/admin"

# Show status
pm2 status
EOF

chmod +x hostinger-package/start-app.sh

echo "Creating package archive..."
tar -czf baby-sleep-hostinger-package.tar.gz hostinger-package/

echo ""
echo "✅ Hostinger deployment package created successfully!"
echo ""
echo "📦 Package contents:"
echo "  - Complete application code"
echo "  - Automated setup script"
echo "  - Comprehensive deployment guide"
echo "  - Configuration files"
echo "  - Asset files"
echo "  - Admin creation script"
echo "  - Database management tools"
echo ""
echo "📁 Files created:"
echo "  - hostinger-package/ (folder with all files)"
echo "  - baby-sleep-hostinger-package.tar.gz (compressed package)"
echo ""
echo "🚀 Ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Download baby-sleep-hostinger-package.tar.gz"
echo "2. Upload to your Hostinger VPS"
echo "3. Extract and follow the deployment guide"
echo "4. Run the automated setup script"
echo ""