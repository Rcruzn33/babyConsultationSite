# A2 Hosting Deployment Guide
## Baby Sleep Consulting Website - Complete Setup Guide

This guide covers deploying your baby sleep consulting website to A2 Hosting using both shared hosting and VPS options.

## A2 Hosting Plan Options

### Option 1: Shared Hosting ($5.99-$8.99/month)
- **Pros**: Cost-effective, managed environment, easy setup
- **Cons**: Limited resources, shared server performance
- **Best for**: Starting out, low to medium traffic

### Option 2: VPS Hosting ($25-$35.99/month managed, $4.99/month unmanaged)
- **Pros**: Full control, better performance, scalable
- **Cons**: Higher cost, requires more technical knowledge
- **Best for**: Growing business, production applications

## Prerequisites

### What You'll Need
- A2 Hosting account (shared or VPS)
- cPanel access (shared hosting) or SSH access (VPS)
- Your application files
- Database credentials
- Optional: Domain name

## Deployment Option A: Shared Hosting Setup

### Step 1: Access cPanel
1. Log into your A2 Hosting account
2. Access cPanel from your hosting dashboard
3. Look for "Node.js" or "Node.js App" in the software section

### Step 2: Create Node.js Application
1. **Click "Node.js App"** in cPanel
2. **Create Application**:
   - App Name: `baby-sleep-app`
   - Node.js Version: `18.x` (latest available)
   - App URL: `/` (for main domain) or `/app` (for subdirectory)
   - App Root: `baby-sleep-app`
   - Environment: `production`
   - Startup File: `server/index.js`

### Step 3: Set Up PostgreSQL Database
1. **Find "PostgreSQL Databases"** in cPanel
2. **Create Database**:
   - Database Name: `baby_sleep_db`
   - Create database user with strong password
   - Grant all privileges to user
3. **Note the connection details**:
   - Host: `localhost`
   - Port: `5432`
   - Database: `yourusername_baby_sleep_db`
   - Username: `yourusername_dbuser`

### Step 4: Upload Application Files
1. **Use File Manager** in cPanel or FTP client
2. **Navigate to** `/public_html/baby-sleep-app/`
3. **Upload all files**:
   - `server/` directory
   - `client/` directory (built version)
   - `shared/` directory
   - `package.json`
   - `drizzle.config.ts`
   - `create-admin.js`
   - All configuration files

### Step 5: Configure Environment Variables
1. **In Node.js App section**, click "Edit" on your app
2. **Add Environment Variables**:
   ```
   NODE_ENV=production
   DATABASE_URL=postgresql://yourusername_dbuser:password@localhost:5432/yourusername_baby_sleep_db
   SESSION_SECRET=your-secure-session-secret-here
   PORT=3000
   SENDGRID_API_KEY=your-sendgrid-key-here
   ```

### Step 6: Install Dependencies and Build
1. **Access Terminal** in cPanel (if available) or use SSH
2. **Navigate to app directory**:
   ```bash
   cd /home/yourusername/public_html/baby-sleep-app
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Build the application**:
   ```bash
   npm run build
   ```

### Step 7: Set Up Database Schema
1. **Run database migration**:
   ```bash
   npm run db:push
   ```
2. **Create admin user**:
   ```bash
   node create-admin.js
   ```

### Step 8: Start Application
1. **Return to Node.js App** in cPanel
2. **Click "Start"** on your application
3. **Verify it's running** by checking the status

## Deployment Option B: VPS Hosting Setup

### Step 1: Connect to VPS
```bash
ssh root@your-vps-ip
```

### Step 2: Update System
```bash
apt update && apt upgrade -y
```

### Step 3: Install Required Software
```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install PM2 and other tools
npm install -g pm2
apt install -y nginx unzip wget curl
```

### Step 4: Set Up PostgreSQL Database
```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE baby_sleep_db;
CREATE USER baby_sleep_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE baby_sleep_db TO baby_sleep_user;
\q
```

### Step 5: Deploy Application
```bash
# Create application directory
mkdir -p /var/www/baby-sleep-app
cd /var/www/baby-sleep-app

# Upload your files here (via SCP, FTP, or Git)
# Then install dependencies
npm install
npm run build
npm run db:push
```

### Step 6: Configure Environment
```bash
# Create .env file
nano .env
```

Add:
```env
NODE_ENV=production
DATABASE_URL=postgresql://baby_sleep_user:your_secure_password@localhost:5432/baby_sleep_db
SESSION_SECRET=your-secure-session-secret
PORT=3000
SENDGRID_API_KEY=your-sendgrid-key
```

### Step 7: Set Up Process Manager
```bash
# Start with PM2
pm2 start npm --name "baby-sleep-app" -- start
pm2 save
pm2 startup
```

### Step 8: Configure Nginx (VPS Only)
```bash
# Create Nginx configuration
nano /etc/nginx/sites-available/baby-sleep-app
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

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

Enable site:
```bash
ln -s /etc/nginx/sites-available/baby-sleep-app /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

## A2 Hosting Specific Configuration

### Shared Hosting Considerations
1. **Node.js Version**: Use the latest available (usually 18.x)
2. **Memory Limits**: Shared hosting has memory restrictions
3. **File Permissions**: Set appropriate permissions for uploads
4. **Database Names**: Include your username prefix

### Performance Optimization
1. **Enable Turbo Servers** (if available in your plan)
2. **Use A2 Hosting's CDN** for static assets
3. **Enable compression** in your Node.js app
4. **Optimize database queries**

### Security Settings
1. **Use strong passwords** for database users
2. **Enable SSL certificate** (free with A2 Hosting)
3. **Configure security headers**
4. **Regular updates** for Node.js and dependencies

## SSL Certificate Setup

### For Shared Hosting
1. **Access cPanel SSL/TLS section**
2. **Use Let's Encrypt** (free) or upload your certificate
3. **Force HTTPS redirect**

### For VPS
```bash
# Install Certbot
apt install certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d your-domain.com
```

## File Upload Configuration

### Create Uploads Directory
```bash
mkdir -p /path/to/your/app/client/public/uploads
chmod 755 /path/to/your/app/client/public/uploads
```

### Configure Static File Serving
Your Express app should serve uploads from:
```javascript
app.use('/uploads', express.static('/path/to/uploads'));
```

## Database Management

### Access Database
- **Shared Hosting**: Use phpPgAdmin in cPanel
- **VPS**: Use psql command line or install pgAdmin

### Backup Database
```bash
# Create backup
pg_dump -h localhost -U baby_sleep_user baby_sleep_db > backup.sql

# Restore backup
psql -h localhost -U baby_sleep_user baby_sleep_db < backup.sql
```

## Monitoring and Maintenance

### Check Application Status
**Shared Hosting**: Use cPanel Node.js App section
**VPS**: Use PM2 commands:
```bash
pm2 status
pm2 logs baby-sleep-app
```

### Log Files
- **Shared Hosting**: Check in cPanel error logs
- **VPS**: Check `/var/log/nginx/` and PM2 logs

## Troubleshooting Common Issues

### Application Won't Start
1. **Check Node.js version compatibility**
2. **Verify all dependencies installed**
3. **Check environment variables**
4. **Review error logs**

### Database Connection Issues
1. **Verify database credentials**
2. **Check PostgreSQL is running**
3. **Confirm database user permissions**
4. **Test connection manually**

### Performance Issues
1. **Monitor memory usage**
2. **Check for memory leaks**
3. **Optimize database queries**
4. **Consider upgrading plan**

## Cost Comparison

### Shared Hosting
- **Monthly**: $5.99-$8.99
- **Annual**: ~$70-$100
- **Includes**: SSL, cPanel, email accounts

### VPS Hosting
- **Monthly**: $25-$35.99 (managed) or $4.99 (unmanaged)
- **Annual**: ~$300-$430 (managed) or ~$60 (unmanaged)
- **Includes**: Root access, full control, better performance

## Support Resources

### A2 Hosting Support
- **24/7 Support**: Available via chat, phone, email
- **Knowledge Base**: Comprehensive documentation
- **Community Forums**: User discussions and solutions

### Technical Documentation
- **Node.js Setup**: A2 Hosting knowledge base
- **PostgreSQL**: Official PostgreSQL documentation
- **Express.js**: Framework documentation

## Migration from Render

### Data Export
1. **Export database** from your current Render PostgreSQL
2. **Download application files** from GitHub
3. **Note environment variables**

### Data Import
1. **Import database** to A2 Hosting PostgreSQL
2. **Upload application files**
3. **Configure environment variables**
4. **Test application**

## Final Checklist

### Pre-Deployment
- [ ] A2 Hosting account ready
- [ ] Domain configured (if using custom domain)
- [ ] Database credentials noted
- [ ] Application files prepared

### Deployment
- [ ] Node.js app created (shared) or server configured (VPS)
- [ ] Database created and configured
- [ ] Application files uploaded
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Database schema created
- [ ] Admin user created

### Post-Deployment
- [ ] Application starts successfully
- [ ] Website loads correctly
- [ ] Admin dashboard accessible
- [ ] Database operations working
- [ ] SSL certificate installed
- [ ] Monitoring configured

### Testing
- [ ] Homepage loads
- [ ] Contact form works
- [ ] Admin login works
- [ ] Blog posts display
- [ ] Testimonials display
- [ ] File uploads work

## Conclusion

Your baby sleep consulting website will run perfectly on A2 Hosting with either shared hosting or VPS. The shared hosting option is more budget-friendly and easier to manage, while VPS provides better performance and full control.

**Recommended Path**:
1. **Start with shared hosting** to test and launch
2. **Upgrade to VPS** as your business grows
3. **Use A2 Hosting's migration service** for smooth transition

Your complete website functionality will be preserved:
- Admin dashboard for managing content
- Contact form and consultation booking
- Blog post management
- Testimonial system
- User authentication
- File upload capabilities

A2 Hosting's support team can assist with the migration process if needed!