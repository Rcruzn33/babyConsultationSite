#!/bin/bash

# Complete deployment script for Happy Baby Sleeping website
# This script deploys the complete React application to VPS

echo "🚀 Starting Complete Application Deployment..."

# Stop existing processes
echo "Stopping existing processes..."
sudo pkill -f "node.*complete-vps-server.js"
sudo pkill -f "node.*happy-baby-sleeping"
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# Clean up old directories
echo "Cleaning up old directories..."
sudo rm -rf /tmp/baby-server
sudo rm -rf /var/www/baby-sleep-app

# Create new deployment directory
echo "Creating deployment directory..."
sudo mkdir -p /var/www/baby-sleep-app
sudo chown -R $(whoami):$(whoami) /var/www/baby-sleep-app

# Copy server file to deployment directory
echo "Copying server file..."
sudo cp complete-vps-server.js /var/www/baby-sleep-app/
sudo chmod +x /var/www/baby-sleep-app/complete-vps-server.js

# Ensure attached_assets directory exists with proper permissions
echo "Setting up assets directory..."
sudo mkdir -p /var/www/attached_assets
sudo chown -R www-data:www-data /var/www/attached_assets
sudo chmod -R 755 /var/www/attached_assets

# Copy assets if they exist
if [ -d "attached_assets" ]; then
    echo "Copying attached assets..."
    sudo cp -r attached_assets/* /var/www/attached_assets/
    sudo chown -R www-data:www-data /var/www/attached_assets
    sudo chmod -R 755 /var/www/attached_assets
fi

# Start the application using PM2
echo "Starting application with PM2..."
cd /var/www/baby-sleep-app
pm2 start complete-vps-server.js --name "happy-baby-sleeping"
pm2 save

# Wait for application to start
echo "Waiting for application to start..."
sleep 5

# Check if application is running
if pm2 list | grep -q "happy-baby-sleeping"; then
    echo "✅ Application started successfully!"
    echo "🌐 Website accessible at: http://31.97.99.104"
    echo "📊 PM2 Status:"
    pm2 list
    echo ""
    echo "🔧 To view logs: pm2 logs happy-baby-sleeping"
    echo "🔄 To restart: pm2 restart happy-baby-sleeping"
    echo "🛑 To stop: pm2 stop happy-baby-sleeping"
else
    echo "❌ Failed to start application"
    echo "Checking logs..."
    pm2 logs --lines 20
    exit 1
fi

# Test the application
echo "Testing application response..."
if curl -s http://localhost:3000 | grep -q "Happy Baby Sleeping"; then
    echo "✅ Application is responding correctly!"
    echo "🎉 Complete deployment successful!"
    echo ""
    echo "📱 Access your website at: http://31.97.99.104"
    echo "🏠 Homepage: Complete with hero section, services, and testimonials"
    echo "👤 About page: Full professional content with photo"
    echo "🛏️ Services page: All 3 service tiers with booking form"
    echo "📝 Blog page: Featured articles and blog grid"
    echo "📞 Contact page: Professional contact form and information"
    echo "🔧 Admin dashboard: Complete management interface"
else
    echo "❌ Application is not responding properly"
    echo "Debugging information:"
    pm2 logs happy-baby-sleeping --lines 10
    exit 1
fi

echo "🎯 Deployment complete! Your complete Happy Baby Sleeping website is now live."