# Complete Hostinger VPS Deployment Guide for Baby Sleep Whisperer

## Your VPS Details
- **IP Address:** 31.97.99.104
- **SSH Username:** root
- **Hostname:** srv902919.hstgr.cloud
- **OS:** Ubuntu 24.04 LTS
- **GitHub Repository:** https://github.com/Rcruzn33/babyConsultationSite

## Step 1: SSH into Your VPS
Open terminal and connect to your VPS:

```bash
ssh root@31.97.99.104
```

## Step 2: Install Node.js, NPM, and PostgreSQL
Update system and install required packages:

```bash
sudo apt update
sudo apt install nodejs npm git -y
sudo apt install postgresql postgresql-contrib -y
```

Verify installations:
```bash
node -v
npm -v
psql --version
```

## Step 3: Create PostgreSQL Database
Switch to postgres user and create database:

```bash
sudo -u postgres psql
```

In the PostgreSQL shell, run:
```sql
CREATE DATABASE baby_sleep_db;
CREATE USER baby_sleep_user WITH PASSWORD 'SecureBabyPass2025!';
GRANT ALL PRIVILEGES ON DATABASE baby_sleep_db TO baby_sleep_user;
\q
```

## Step 4: Clone Your GitHub Repository
Clone your Baby Sleep Whisperer repository:

```bash
cd /var/www
git clone https://github.com/Rcruzn33/babyConsultationSite.git baby-sleep-app
cd baby-sleep-app
```

## Step 5: Install Dependencies and Configure Environment
Install all project dependencies:

```bash
npm install
```

Create environment variables file:
```bash
cat > .env << 'EOF'
DATABASE_URL=postgresql://baby_sleep_user:SecureBabyPass2025!@localhost:5432/baby_sleep_db
PORT=3000
NODE_ENV=production
SESSION_SECRET=your-secret-session-key-here
EOF
```

## Step 6: Build the Application
Build the frontend and backend:

```bash
npm run build
```

## Step 7: Set Up Database Schema
Initialize the database with Drizzle:

```bash
npm run db:push
```

## Step 8: Run Application with PM2
Install PM2 for process management:

```bash
npm install -g pm2
```

Start your Baby Sleep Whisperer application:
```bash
pm2 start dist/index.js --name "baby-sleep-whisperer"
```

Save PM2 configuration and enable auto-start:
```bash
pm2 save
pm2 startup
```

## Step 9: Configure Nginx Reverse Proxy
Install Nginx:

```bash
sudo apt install nginx -y
```

Create Nginx configuration for Baby Sleep Whisperer:
```bash
sudo cat > /etc/nginx/sites-available/baby-sleep-whisperer << 'EOF'
server {
    listen 80;
    server_name 31.97.99.104 srv902919.hstgr.cloud;

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
EOF
```

Enable the site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/baby-sleep-whisperer /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 10: Configure Firewall
Allow necessary ports:

```bash
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

## Step 11: Verify Deployment
Check PM2 status:
```bash
pm2 status
pm2 logs baby-sleep-whisperer
```

Check Nginx status:
```bash
sudo systemctl status nginx
```

## Step 12: Access Your Website
Your Baby Sleep Whisperer website will be accessible at:
- **Primary URL:** http://31.97.99.104
- **Alternative:** http://srv902919.hstgr.cloud

## Troubleshooting Commands

### View Application Logs
```bash
pm2 logs baby-sleep-whisperer
```

### Restart Application
```bash
pm2 restart baby-sleep-whisperer
```

### Check Database Connection
```bash
sudo -u postgres psql -d baby_sleep_db -c "SELECT version();"
```

### Update Application from GitHub
```bash
cd /var/www/baby-sleep-app
git pull origin main
npm install
npm run build
pm2 restart baby-sleep-whisperer
```

## Important Notes

1. **Database Credentials:** Keep your database password secure
2. **Environment Variables:** Never commit .env files to GitHub
3. **Regular Updates:** Use `git pull` to update your application
4. **Backups:** Consider setting up automated database backups
5. **SSL Certificate:** For production, consider adding SSL with Let's Encrypt

## Quick Commands Reference

```bash
# Check application status
pm2 status

# View logs
pm2 logs baby-sleep-whisperer

# Restart application
pm2 restart baby-sleep-whisperer

# Update from GitHub
cd /var/www/baby-sleep-app && git pull && npm install && npm run build && pm2 restart baby-sleep-whisperer
```

Your Baby Sleep Whisperer website will be fully deployed and accessible at http://31.97.99.104 with professional hosting on your Hostinger VPS!