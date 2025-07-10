#!/bin/bash

# A2 Hosting Deployment Package Creator
# Creates a complete standalone package for A2 Hosting deployment

echo "Creating A2 Hosting deployment package..."

# Create package directory
mkdir -p a2-hosting-package

# Copy all necessary files
echo "Copying application files..."

# Copy server files
cp -r server a2-hosting-package/
cp -r shared a2-hosting-package/
cp -r client a2-hosting-package/

# Copy configuration files
cp package.json a2-hosting-package/
cp package-lock.json a2-hosting-package/
cp tsconfig.json a2-hosting-package/
cp vite.config.ts a2-hosting-package/
cp tailwind.config.ts a2-hosting-package/
cp postcss.config.js a2-hosting-package/
cp components.json a2-hosting-package/

# Copy database files
cp drizzle.config.ts a2-hosting-package/
cp create-admin.js a2-hosting-package/
cp db-admin.js a2-hosting-package/

# Copy assets and uploads
cp -r attached_assets a2-hosting-package/ 2>/dev/null || echo "No attached_assets folder found"
mkdir -p a2-hosting-package/client/public/uploads

# Copy deployment files
cp A2_HOSTING_DEPLOYMENT_GUIDE.md a2-hosting-package/

# Create A2 Hosting specific configuration files
echo "Creating A2 Hosting specific configurations..."

# Create .htaccess for shared hosting
cat > a2-hosting-package/.htaccess << 'EOF'
# A2 Hosting Node.js Configuration
RewriteEngine On

# Handle Node.js app routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} ^/api/
RewriteRule ^(.*)$ /nodejs/baby-sleep-app/$1 [L,QSA]

# Handle static files
RewriteCond %{REQUEST_URI} ^/(uploads|attached_assets)/
RewriteRule ^(.*)$ /$1 [L]

# Handle React routing for frontend
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/api/
RewriteCond %{REQUEST_URI} !^/nodejs/
RewriteRule ^(.*)$ /index.html [L,QSA]

# Security headers
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/x-javascript "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
    ExpiresByType application/x-shockwave-flash "access plus 1 month"
    ExpiresByType image/x-icon "access plus 1 year"
    ExpiresDefault "access plus 2 days"
</IfModule>
EOF

# Create shared hosting startup script
cat > a2-hosting-package/app.js << 'EOF'
#!/usr/bin/env node

/**
 * A2 Hosting Shared Hosting Entry Point
 * Baby Sleep Consulting Website
 */

const path = require('path');
const { spawn } = require('child_process');

// Set NODE_ENV if not already set
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
}

// Set the correct path for the application
const appPath = path.join(__dirname, 'dist', 'index.js');

// Start the application
const app = spawn('node', [appPath], {
    stdio: 'inherit',
    env: process.env
});

app.on('error', (error) => {
    console.error('Failed to start application:', error);
    process.exit(1);
});

app.on('exit', (code) => {
    console.log(`Application exited with code ${code}`);
    process.exit(code);
});

// Handle process termination
process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down gracefully...');
    app.kill('SIGINT');
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully...');
    app.kill('SIGTERM');
});
EOF

# Create cPanel configuration helper
cat > a2-hosting-package/cpanel-config.json << 'EOF'
{
    "name": "baby-sleep-app",
    "version": "1.0.0",
    "description": "Baby Sleep Consulting Website",
    "main": "app.js",
    "scripts": {
        "start": "node app.js",
        "build": "npm run build:client && npm run build:server",
        "build:client": "vite build",
        "build:server": "esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist"
    },
    "engines": {
        "node": ">=18.0.0"
    },
    "a2hosting": {
        "nodeVersion": "18",
        "startupFile": "app.js",
        "appRoot": "baby-sleep-app",
        "environment": "production",
        "environmentVariables": {
            "NODE_ENV": "production",
            "PORT": "3000"
        }
    }
}
EOF

# Create database setup script for shared hosting
cat > a2-hosting-package/setup-shared-hosting.js << 'EOF'
#!/usr/bin/env node

/**
 * A2 Hosting Shared Hosting Setup Script
 * This script helps configure the application for A2 Hosting shared hosting
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
    console.log('=== A2 Hosting Shared Hosting Setup ===');
    console.log('This script will help you configure your application for A2 Hosting shared hosting.');
    console.log('');

    // Get user information
    const username = await question('Enter your A2 Hosting username: ');
    const domain = await question('Enter your domain name (e.g., example.com): ');
    const dbPassword = await question('Enter your PostgreSQL database password: ');
    const sessionSecret = await question('Enter a session secret (or press Enter for random): ');
    const sendgridKey = await question('Enter your SendGrid API key (optional): ');

    // Generate random session secret if not provided
    const actualSessionSecret = sessionSecret || require('crypto').randomBytes(32).toString('hex');

    // Create environment configuration
    const envConfig = `NODE_ENV=production
DATABASE_URL=postgresql://${username}_dbuser:${dbPassword}@localhost:5432/${username}_baby_sleep_db
SESSION_SECRET=${actualSessionSecret}
PORT=3000
SENDGRID_API_KEY=${sendgridKey}
`;

    // Write .env file
    fs.writeFileSync('.env', envConfig);

    // Update package.json with correct startup file
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    packageJson.main = 'app.js';
    packageJson.scripts.start = 'node app.js';
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

    console.log('');
    console.log('✅ Configuration complete!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Upload all files to your A2 Hosting account');
    console.log('2. Access cPanel and go to "Node.js App"');
    console.log('3. Create a new Node.js application with these settings:');
    console.log(`   - App Name: baby-sleep-app`);
    console.log(`   - Node.js Version: 18.x`);
    console.log(`   - App URL: ${domain}`);
    console.log(`   - App Root: baby-sleep-app`);
    console.log(`   - Environment: production`);
    console.log(`   - Startup File: app.js`);
    console.log('4. Install dependencies: npm install');
    console.log('5. Build the application: npm run build');
    console.log('6. Set up the database schema: npm run db:push');
    console.log('7. Create admin user: node create-admin.js');
    console.log('8. Start the application from cPanel');
    console.log('');
    console.log('Database setup:');
    console.log(`   - Database Name: ${username}_baby_sleep_db`);
    console.log(`   - Database User: ${username}_dbuser`);
    console.log(`   - Database Password: ${dbPassword}`);
    console.log('');

    rl.close();
}

main().catch(console.error);
EOF

# Create VPS setup script
cat > a2-hosting-package/setup-vps.sh << 'EOF'
#!/bin/bash

# A2 Hosting VPS Setup Script
# Automated setup for A2 Hosting VPS

echo "=== A2 Hosting VPS Setup ==="
echo "This script will set up your baby sleep consulting website on A2 Hosting VPS"
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
DB_PASSWORD=$(openssl rand -base64 32)
SESSION_SECRET=$(openssl rand -base64 32)

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

echo "Step 8: Setting up Nginx..."
cat > baby-sleep-app.nginx << 'NGINX_EOF'
server {
    listen 80;
    server_name _;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

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

    # Serve static files
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf|eot|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri @proxy;
    }

    location @proxy {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX_EOF

cp baby-sleep-app.nginx /etc/nginx/sites-available/baby-sleep-app
ln -s /etc/nginx/sites-available/baby-sleep-app /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

echo "Step 9: Setting up firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "Step 10: Setting file permissions..."
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
echo "Next steps:"
echo "1. Upload your application files to /var/www/baby-sleep-app"
echo "2. Run 'npm install' to install dependencies"
echo "3. Run 'npm run build' to build the application"
echo "4. Run 'npm run db:push' to create database schema"
echo "5. Run 'node create-admin.js' to create admin user"
echo "6. Start the application: 'pm2 start npm --name baby-sleep-app -- start'"
echo "7. Save PM2 config: 'pm2 save && pm2 startup'"
echo "8. Test Nginx: 'nginx -t && systemctl reload nginx'"
echo ""
echo "Your website will be available at: http://YOUR_SERVER_IP"
echo ""
echo "For SSL setup:"
echo "  apt install certbot python3-certbot-nginx"
echo "  certbot --nginx -d YOUR_DOMAIN"
echo ""
EOF

chmod +x a2-hosting-package/setup-vps.sh
chmod +x a2-hosting-package/setup-shared-hosting.js

# Create README for A2 Hosting
cat > a2-hosting-package/README.md << 'EOF'
# Baby Sleep Consulting Website - A2 Hosting Package

This package contains everything needed to deploy your baby sleep consulting website on A2 Hosting.

## A2 Hosting Options

### Option 1: Shared Hosting ($5.99-$8.99/month)
- Cost-effective and beginner-friendly
- Managed environment with cPanel
- Node.js support via cPanel selector
- PostgreSQL database included

### Option 2: VPS Hosting ($25-$35.99/month or $4.99 unmanaged)
- Full control and better performance
- Root access and custom configurations
- Scalable resources
- Professional hosting solution

## Quick Start

### For Shared Hosting:
1. Upload all files to your A2 Hosting account
2. Run the setup script: `node setup-shared-hosting.js`
3. Follow the cPanel Node.js App setup instructions
4. Configure your PostgreSQL database
5. Start your application

### For VPS Hosting:
1. Upload all files to your VPS
2. Run the setup script: `sudo bash setup-vps.sh`
3. Follow the automated setup process
4. Configure your domain and SSL

## Files Included

- **Complete Application Code**: React frontend, Express backend, shared components
- **Database Schema**: PostgreSQL with Drizzle ORM
- **Configuration Files**: Environment setup, Nginx config, security settings
- **Setup Scripts**: Automated configuration for both shared and VPS hosting
- **Documentation**: Complete deployment guide and troubleshooting

## Features

Your website includes all the functionality from your current Render deployment:
- **Admin Dashboard**: Complete content management system
- **Contact Management**: Handle client inquiries
- **Consultation Booking**: Schedule client consultations
- **Blog Management**: Create and publish articles
- **Testimonial System**: Manage client reviews
- **User Authentication**: Secure admin access
- **File Upload**: Handle images and documents
- **Email Notifications**: SendGrid integration
- **Responsive Design**: Mobile-friendly interface

## A2 Hosting Advantages

- **Affordable**: Starting at $5.99/month for shared hosting
- **Node.js Support**: One of the few shared hosts supporting Node.js
- **PostgreSQL**: Full database support
- **24/7 Support**: Expert help when you need it
- **Free SSL**: Let's Encrypt certificates included
- **Turbo Servers**: Up to 20x faster performance
- **cPanel**: Easy-to-use control panel
- **99.9% Uptime**: Reliable hosting infrastructure

## Support

- **Complete Deployment Guide**: Step-by-step instructions
- **Setup Scripts**: Automated configuration
- **Troubleshooting**: Common issues and solutions
- **A2 Hosting Support**: 24/7 technical assistance

## Migration Benefits

Moving from Render to A2 Hosting provides:
- **Cost Savings**: Significantly lower monthly costs
- **Traditional Hosting**: Familiar cPanel interface
- **Full Control**: Especially with VPS options
- **Scalability**: Easy upgrades as your business grows
- **No Vendor Lock-in**: Standard hosting environment

Your baby sleep consulting business will have a reliable, cost-effective hosting solution that can grow with your needs!
EOF

echo "Creating A2 Hosting package archive..."
tar -czf baby-sleep-a2hosting-package.tar.gz a2-hosting-package/

echo ""
echo "✅ A2 Hosting deployment package created successfully!"
echo ""
echo "📦 Package contents:"
echo "  - Complete application code (React + Express + PostgreSQL)"
echo "  - Shared hosting configuration with cPanel setup"
echo "  - VPS hosting configuration with automated setup"
echo "  - Database schema and admin creation tools"
echo "  - Security configurations and SSL setup"
echo "  - Performance optimizations and caching"
echo "  - Complete deployment documentation"
echo ""
echo "📁 Files created:"
echo "  - a2-hosting-package/ (complete deployment folder)"
echo "  - baby-sleep-a2hosting-package.tar.gz (compressed package)"
echo ""
echo "🏗️ A2 Hosting Options:"
echo "  - Shared Hosting: $5.99-$8.99/month (recommended to start)"
echo "  - VPS Hosting: $25-$35.99/month (for growth)"
echo "  - Both options fully support Node.js and PostgreSQL"
echo ""
echo "🚀 Ready for A2 Hosting deployment!"
echo ""
echo "Next steps:"
echo "1. Download the package: baby-sleep-a2hosting-package.tar.gz"
echo "2. Sign up for A2 Hosting account"
echo "3. Upload and extract the package"
echo "4. Follow the deployment guide"
echo "5. Run the appropriate setup script"
echo ""
echo "Your baby sleep consulting website will be running on A2 Hosting!"
echo ""