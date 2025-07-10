# Hostinger VPS Deployment Guide
## Baby Sleep Consulting Website - Standalone Deployment

This guide will help you deploy your baby sleep consulting website to Hostinger VPS as a completely standalone application without any GitHub dependencies.

## Prerequisites

### Hostinger VPS Requirements
- **Minimum Plan**: VPS1 (1GB RAM, 20GB SSD)
- **Recommended**: VPS2 (2GB RAM, 40GB SSD)
- **Operating System**: Ubuntu 20.04 or 22.04 LTS

### What You'll Need
- Hostinger VPS account and server access
- SSH client (PuTTY for Windows, Terminal for Mac/Linux)
- Your domain name (optional, can use IP address initially)

## Step 1: Initial Server Setup

### Connect to Your VPS
```bash
ssh root@YOUR_VPS_IP
```

### Update System
```bash
apt update && apt upgrade -y
```

### Install Required Software
```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install PM2 (Process Manager)
npm install -g pm2

# Install Nginx (Web Server)
apt install -y nginx

# Install other utilities
apt install -y unzip wget curl git
```

### Verify Installations
```bash
node --version    # Should show v18.x.x
npm --version     # Should show 9.x.x
psql --version    # Should show PostgreSQL 12+
```

## Step 2: Database Setup

### Configure PostgreSQL
```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE baby_sleep_db;
CREATE USER baby_sleep_user WITH PASSWORD 'your_secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE baby_sleep_db TO baby_sleep_user;
\q
```

### Test Database Connection
```bash
psql -h localhost -U baby_sleep_user -d baby_sleep_db
# Enter password when prompted
# Type \q to exit
```

## Step 3: Application Deployment

### Create Application Directory
```bash
mkdir -p /var/www/baby-sleep-app
cd /var/www/baby-sleep-app
```

### Upload Application Files
You have two options:

#### Option A: Direct Upload (Recommended)
1. Download the complete application package from Replit
2. Use FileZilla or WinSCP to upload to `/var/www/baby-sleep-app/`
3. Extract if compressed

#### Option B: Manual File Creation
Create the directory structure and copy files manually through SSH/FTP.

### Set File Permissions
```bash
chown -R www-data:www-data /var/www/baby-sleep-app
chmod -R 755 /var/www/baby-sleep-app
```

### Install Dependencies
```bash
cd /var/www/baby-sleep-app
npm install
```

## Step 4: Environment Configuration

### Create Environment File
```bash
nano .env
```

Add the following configuration:
```env
NODE_ENV=production
DATABASE_URL=postgresql://baby_sleep_user:your_secure_password_here@localhost:5432/baby_sleep_db
SESSION_SECRET=your_very_secure_session_secret_here_minimum_32_characters
PORT=3000
SENDGRID_API_KEY=your_sendgrid_api_key_here
```

### Create Production Database Schema
```bash
npm run db:push
```

## Step 5: Build and Test Application

### Build the Application
```bash
npm run build
```

### Test the Application
```bash
npm start
```

Visit `http://YOUR_VPS_IP:3000` to verify it's working.

## Step 6: Configure Nginx Reverse Proxy

### Create Nginx Configuration
```bash
nano /etc/nginx/sites-available/baby-sleep-app
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Enable the Site
```bash
ln -s /etc/nginx/sites-available/baby-sleep-app /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

## Step 7: Configure SSL (Optional but Recommended)

### Install Certbot
```bash
apt install -y certbot python3-certbot-nginx
```

### Get SSL Certificate
```bash
certbot --nginx -d YOUR_DOMAIN
```

## Step 8: Set Up Process Management

### Configure PM2
```bash
cd /var/www/baby-sleep-app
pm2 start npm --name "baby-sleep-app" -- start
pm2 save
pm2 startup
```

### Configure Auto-restart
```bash
pm2 startup systemd
# Follow the instructions shown
```

## Step 9: Create Admin User

### Run Admin Creation Script
```bash
cd /var/www/baby-sleep-app
node create-admin.js
```

Follow the prompts to create your admin user.

## Step 10: Final Configuration

### Configure Firewall
```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

### Set Up Log Rotation
```bash
nano /etc/logrotate.d/baby-sleep-app
```

Add:
```
/var/www/baby-sleep-app/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 0644 www-data www-data
}
```

## Step 11: Monitoring and Maintenance

### Check Application Status
```bash
pm2 status
pm2 logs baby-sleep-app
```

### Monitor System Resources
```bash
htop
df -h
free -h
```

### Database Backup Script
Create `/var/www/baby-sleep-app/backup-db.sh`:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -h localhost -U baby_sleep_user baby_sleep_db > /var/www/baby-sleep-app/backups/db_backup_$DATE.sql
```

### Set Up Automated Backups
```bash
crontab -e
# Add: 0 2 * * * /var/www/baby-sleep-app/backup-db.sh
```

## Troubleshooting

### Common Issues

1. **Application Won't Start**
   ```bash
   pm2 logs baby-sleep-app
   # Check for errors in logs
   ```

2. **Database Connection Issues**
   ```bash
   psql -h localhost -U baby_sleep_user -d baby_sleep_db
   # Test connection manually
   ```

3. **Permission Problems**
   ```bash
   chown -R www-data:www-data /var/www/baby-sleep-app
   chmod -R 755 /var/www/baby-sleep-app
   ```

4. **Nginx Issues**
   ```bash
   nginx -t
   systemctl status nginx
   tail -f /var/log/nginx/error.log
   ```

### Performance Optimization

1. **Enable Gzip Compression**
   Add to Nginx config:
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   ```

2. **Configure Node.js Clustering**
   Update your start script to use PM2 cluster mode:
   ```bash
   pm2 start npm --name "baby-sleep-app" -i max -- start
   ```

## Security Checklist

- [ ] Regular system updates (`apt update && apt upgrade`)
- [ ] Strong database passwords
- [ ] SSL certificates installed
- [ ] Firewall configured
- [ ] Regular database backups
- [ ] Monitor PM2 logs
- [ ] Keep Node.js updated

## Support and Maintenance

### Regular Maintenance Tasks
- Weekly: Check PM2 status and logs
- Monthly: Update system packages
- Monthly: Review database backups
- Quarterly: Update Node.js version if needed

### Emergency Procedures
1. If application crashes: `pm2 restart baby-sleep-app`
2. If database issues: Check `/var/log/postgresql/` logs
3. If SSL expires: Run `certbot renew`

## Cost Estimation

**Monthly Costs:**
- Hostinger VPS: $3-7/month
- Domain (if purchased): $10-15/year
- SSL Certificate: Free with Let's Encrypt
- **Total**: ~$3-7/month

This is significantly cheaper than most cloud hosting solutions while providing full control over your application.

## Conclusion

Your baby sleep consulting website is now fully deployed on Hostinger VPS as a standalone application. The setup includes:

- Complete Node.js application with Express backend
- PostgreSQL database for data persistence
- Nginx reverse proxy for web serving
- SSL encryption for security
- PM2 process management for reliability
- Automated backups and monitoring

Your website is ready to serve your sleep consulting clients with full admin dashboard functionality for managing contacts, consultations, blog posts, and testimonials.