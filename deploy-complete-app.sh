#!/bin/bash

# Complete Baby Sleep App Deployment Script
# Run this script on your VPS after uploading the hostinger-complete.tar.gz file

echo "Starting deployment of complete Baby Sleep App..."

# Stop current simple server
echo "Stopping current server..."
pm2 stop baby-sleep-app 2>/dev/null || true
pm2 delete baby-sleep-app 2>/dev/null || true

# Clean up old installations
echo "Cleaning up old files..."
rm -rf /tmp/baby-server
rm -rf /var/www/baby-sleep-app-backup

# Backup current installation
if [ -d "/var/www/baby-sleep-app" ]; then
    echo "Backing up current installation..."
    mv /var/www/baby-sleep-app /var/www/baby-sleep-app-backup
fi

# Extract new application
echo "Extracting new application..."
cd /var/www
tar -xzf /tmp/hostinger-complete.tar.gz
mv hostinger-package baby-sleep-app
cd baby-sleep-app

# Install dependencies
echo "Installing dependencies..."
npm install --production

# Set environment variables
echo "Setting environment variables..."
export DATABASE_URL='postgresql://baby_sleep_user:8lOOMYXodlE29tSPFVTdIySBmvu83N2pIbIZWVN79RM=@localhost:5432/baby_sleep_db'
export SESSION_SECRET='UjYDobMiqG2/yjwf6HBXM03G+sQPj11MGO4JznItSdU='
export NODE_ENV='production'

# Build the application
echo "Building application..."
npm run build

# Set up database
echo "Setting up database..."
npm run db:push

# Create PM2 ecosystem file
echo "Creating PM2 configuration..."
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'baby-sleep-app',
    script: 'dist/index.js',
    env: {
      NODE_ENV: 'production',
      DATABASE_URL: 'postgresql://baby_sleep_user:8lOOMYXodlE29tSPFVTdIySBmvu83N2pIbIZWVN79RM=@localhost:5432/baby_sleep_db',
      SESSION_SECRET: 'UjYDobMiqG2/yjwf6HBXM03G+sQPj11MGO4JznItSdU='
    }
  }]
}
EOF

# Start the application
echo "Starting application..."
pm2 start ecosystem.config.js
pm2 save

# Test the application
echo "Testing application..."
sleep 5
curl -s http://localhost:3000 | head -3

echo "Deployment complete!"
echo "Your website should now be available at http://31.97.99.104"
echo "Check PM2 status with: pm2 list"
echo "Check logs with: pm2 logs baby-sleep-app"