#!/bin/bash

# Hostinger VPS Deployment Script
# Baby Sleep Consulting Website - Automated Setup

echo "=== Baby Sleep Consulting Website - Hostinger VPS Deployment ==="
echo "This script will set up your website on Hostinger VPS"
echo ""

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root (use sudo)" 
   exit 1
fi

echo "Step 1: Updating system packages..."
apt update && apt upgrade -y

echo "Step 2: Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

echo "Step 3: Installing PostgreSQL..."
apt install -y postgresql postgresql-contrib

echo "Step 4: Installing additional software..."
npm install -g pm2
apt install -y nginx unzip wget curl

echo "Step 5: Configuring PostgreSQL..."
# Generate random password for database
DB_PASSWORD=$(openssl rand -base64 32)
SESSION_SECRET=$(openssl rand -base64 32)

# Create database and user
sudo -u postgres psql -c "CREATE DATABASE baby_sleep_db;"
sudo -u postgres psql -c "CREATE USER baby_sleep_user WITH PASSWORD '$DB_PASSWORD';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE baby_sleep_db TO baby_sleep_user;"

echo "Step 6: Setting up application directory..."
mkdir -p /var/www/baby-sleep-app
cd /var/www/baby-sleep-app

echo "Step 7: Creating environment configuration..."
cat > .env << EOF
NODE_ENV=production
DATABASE_URL=postgresql://baby_sleep_user:$DB_PASSWORD@localhost:5432/baby_sleep_db
SESSION_SECRET=$SESSION_SECRET
PORT=3000
SENDGRID_API_KEY=your_sendgrid_api_key_here
EOF

echo "Step 8: Setting up directory structure..."
mkdir -p client/public/uploads
mkdir -p logs
mkdir -p backups

echo "Step 9: Creating backup script..."
cat > backup-db.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -h localhost -U baby_sleep_user baby_sleep_db > /var/www/baby-sleep-app/backups/db_backup_$DATE.sql
EOF

chmod +x backup-db.sh

echo "Step 10: Configuring Nginx..."
cat > /etc/nginx/sites-available/baby-sleep-app << 'EOF'
server {
    listen 80;
    server_name _;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";

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

    # Handle file uploads
    location /uploads {
        alias /var/www/baby-sleep-app/client/public/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Handle attached assets
    location /attached_assets {
        alias /var/www/baby-sleep-app/attached_assets;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable the site
ln -s /etc/nginx/sites-available/baby-sleep-app /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

echo "Step 11: Setting up firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "Step 12: Setting up log rotation..."
cat > /etc/logrotate.d/baby-sleep-app << 'EOF'
/var/www/baby-sleep-app/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 0644 www-data www-data
}
EOF

echo "Step 13: Setting up automated backups..."
(crontab -l 2>/dev/null; echo "0 2 * * * /var/www/baby-sleep-app/backup-db.sh") | crontab -

echo "Step 14: Setting file permissions..."
chown -R www-data:www-data /var/www/baby-sleep-app
chmod -R 755 /var/www/baby-sleep-app

echo ""
echo "=== SETUP COMPLETE ==="
echo ""
echo "Database Configuration:"
echo "  Database Name: baby_sleep_db"
echo "  Database User: baby_sleep_user"
echo "  Database Password: $DB_PASSWORD"
echo ""
echo "Session Secret: $SESSION_SECRET"
echo ""
echo "Next Steps:"
echo "1. Upload your application files to /var/www/baby-sleep-app"
echo "2. Run 'npm install' in the application directory"
echo "3. Run 'npm run build' to build the application"
echo "4. Run 'npm run db:push' to create database schema"
echo "5. Run 'node create-admin.js' to create admin user"
echo "6. Start the application with 'pm2 start npm --name baby-sleep-app -- start'"
echo "7. Save PM2 configuration with 'pm2 save && pm2 startup'"
echo "8. Test nginx configuration with 'nginx -t' and restart with 'systemctl reload nginx'"
echo ""
echo "Your website will be available at: http://YOUR_SERVER_IP"
echo ""
echo "For SSL setup, install certbot and run:"
echo "  apt install certbot python3-certbot-nginx"
echo "  certbot --nginx -d YOUR_DOMAIN"
echo ""
echo "IMPORTANT: Save the database password and session secret shown above!"
echo ""