#!/bin/bash

# VPS Complete Cleanup Script
# This script removes all Baby Sleep Whisperer deployment files and processes

set -e

echo "🧹 Starting VPS cleanup to clean slate..."

# Stop and remove all PM2 processes
echo "🛑 Stopping and removing PM2 processes..."
pm2 stop happy-baby-sleeping 2>/dev/null || true
pm2 delete happy-baby-sleeping 2>/dev/null || true
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true
pm2 kill 2>/dev/null || true

# Remove all deployment files
echo "🗑️ Removing deployment files..."
rm -rf /var/www/server.js
rm -rf /var/www/attached_assets/
rm -rf /var/www/*.js
rm -rf /var/www/*.html
rm -rf /var/www/*.tar.gz

# Remove any backup or temporary files
echo "🧽 Cleaning temporary files..."
rm -rf /tmp/baby-*
rm -rf /tmp/server*
rm -rf /tmp/exact-*
rm -rf /tmp/complete-*
rm -rf /tmp/vps-*

# Clean up any remaining processes using port 3000
echo "🔌 Cleaning up port 3000..."
fuser -k 3000/tcp 2>/dev/null || true
pkill -f "node.*server" 2>/dev/null || true
pkill -f "node.*3000" 2>/dev/null || true

# Remove PM2 logs and configurations
echo "📝 Cleaning PM2 logs..."
pm2 flush 2>/dev/null || true
rm -rf ~/.pm2/logs/* 2>/dev/null || true

# Clean up any downloaded packages
echo "📦 Cleaning downloaded packages..."
rm -rf /root/*.tar.gz 2>/dev/null || true
rm -rf /root/*-deploy* 2>/dev/null || true
rm -rf /root/*-server* 2>/dev/null || true

# Reset PM2 ecosystem
echo "🔄 Resetting PM2 ecosystem..."
pm2 resurrect 2>/dev/null || true
pm2 save --force 2>/dev/null || true

# Show final status
echo "📊 Final system status:"
echo "PM2 Processes:"
pm2 list 2>/dev/null || echo "No PM2 processes running"
echo ""
echo "Port 3000 status:"
netstat -tlnp | grep :3000 || echo "Port 3000 is free"
echo ""
echo "Directory contents:"
ls -la /var/www/ 2>/dev/null || echo "/var/www/ is empty"

echo ""
echo "✅ VPS cleanup completed successfully!"
echo "🎯 System is now at clean slate:"
echo "   - All PM2 processes stopped and removed"
echo "   - All deployment files deleted"
echo "   - Port 3000 freed up"
echo "   - Temporary files cleaned"
echo "   - Ready for fresh deployment"
echo ""
echo "🚀 You can now upload and deploy the new package!"