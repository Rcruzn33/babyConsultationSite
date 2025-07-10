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
