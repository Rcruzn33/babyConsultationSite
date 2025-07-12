#!/bin/bash

# Complete VPS Cleanup Script - Removes ALL baby-related files
echo "🧹 Starting complete VPS cleanup..."

# Stop all PM2 processes
echo "Stopping all PM2 processes..."
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# Find and remove all baby-related files system-wide
echo "Searching for all baby-related files..."
find / -name "*baby*" -type f 2>/dev/null | head -20
find / -name "*sleep*" -type f 2>/dev/null | head -20

# Remove specific directories and files
echo "Removing known baby application directories..."
rm -rf /var/www/html/*
rm -rf /var/www/baby-*
rm -rf /var/www/server*
rm -rf /var/www/complete-server.js
rm -rf /var/www/final-*
rm -rf /tmp/baby-*
rm -rf /tmp/server*
rm -rf /root/baby-*
rm -rf /root/server*
rm -rf /root/complete-*
rm -rf /root/final-*

# Remove any Node.js applications that might be running
echo "Cleaning up Node.js applications..."
pkill -f "node.*baby"
pkill -f "node.*server"
pkill -f "node.*sleep"

# Clean up any remaining baby files found
echo "Removing all baby-related files..."
find /var/www -name "*baby*" -exec rm -rf {} + 2>/dev/null || true
find /var/www -name "*sleep*" -exec rm -rf {} + 2>/dev/null || true
find /tmp -name "*baby*" -exec rm -rf {} + 2>/dev/null || true
find /root -name "*baby*" -exec rm -rf {} + 2>/dev/null || true

# Clean up any tar.gz files
echo "Removing deployment archives..."
find /root -name "*.tar.gz" -exec rm -f {} + 2>/dev/null || true
find /var/www -name "*.tar.gz" -exec rm -f {} + 2>/dev/null || true

# Clean up any package.json files related to baby apps
echo "Removing baby app package files..."
find /var/www -name "package.json" -exec grep -l "baby\|sleep" {} \; | xargs rm -f 2>/dev/null || true

# Clean nginx cache if it exists
echo "Clearing nginx cache..."
rm -rf /var/cache/nginx/* 2>/dev/null || true

# Restart nginx to clear any cached content
echo "Restarting nginx..."
systemctl restart nginx

# Show what's left in key directories
echo "Checking remaining files..."
echo "Files in /var/www:"
ls -la /var/www/ 2>/dev/null || true
echo "Files in /var/www/html:"
ls -la /var/www/html/ 2>/dev/null || true
echo "PM2 processes:"
pm2 list 2>/dev/null || true

echo "✅ Complete cleanup finished!"
echo "Your VPS is now completely clean and ready for fresh deployment."