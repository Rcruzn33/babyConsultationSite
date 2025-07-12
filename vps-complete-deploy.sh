#!/bin/bash

# VPS Complete Deployment Script for Baby Sleep Whisperer
# This script deploys the exact replica of the Render website to Hostinger VPS

set -e

echo "🚀 Starting VPS deployment for Baby Sleep Whisperer..."

# Stop existing processes
echo "📦 Stopping existing processes..."
pm2 stop happy-baby-sleeping 2>/dev/null || true
pm2 delete happy-baby-sleeping 2>/dev/null || true

# Create deployment directory
echo "📁 Creating deployment directory..."
mkdir -p /var/www/attached_assets

# Copy main server file
echo "📄 Deploying complete server file..."
cp vps-complete-server.js /var/www/server.js

# Copy image assets if they exist
echo "🖼️ Copying image assets..."
if [ -d "attached_assets" ]; then
    cp -r attached_assets/* /var/www/attached_assets/ 2>/dev/null || true
fi

# Set proper permissions
echo "🔐 Setting permissions..."
chmod 755 /var/www/server.js
chmod -R 755 /var/www/attached_assets/

# Start the server
echo "🌟 Starting Baby Sleep Whisperer server..."
cd /var/www
pm2 start server.js --name "happy-baby-sleeping"

# Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

# Show status
echo "📊 Server status:"
pm2 status

echo ""
echo "✅ VPS deployment completed successfully!"
echo "🌐 Website is now live at: http://31.97.99.104"
echo "🎯 Features deployed:"
echo "   - Exact replica of Render website"
echo "   - Baby Sleep Whisperer branding"
echo "   - Two-column hero layout"
echo "   - Professional baby image"
echo "   - Trust indicators (100+ Families, Proven Methods, etc.)"
echo "   - Complete responsive design"
echo "   - Professional styling and gradients"
echo ""
echo "🔧 Server management commands:"
echo "   pm2 status                    - Check server status"
echo "   pm2 logs happy-baby-sleeping  - View server logs"
echo "   pm2 restart happy-baby-sleeping - Restart server"
echo "   pm2 stop happy-baby-sleeping  - Stop server"
echo ""