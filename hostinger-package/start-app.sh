#!/bin/bash

# Simple script to start/restart the baby sleep consulting application

echo "Starting Baby Sleep Consulting Website..."

# Navigate to app directory
cd /var/www/baby-sleep-app

# Build the application
echo "Building application..."
npm run build

# Start with PM2
echo "Starting with PM2..."
pm2 delete baby-sleep-app 2>/dev/null || true
pm2 start npm --name baby-sleep-app -- start
pm2 save

# Reload Nginx
echo "Reloading Nginx..."
systemctl reload nginx

echo "Application started successfully!"
echo "Website available at: http://$(curl -s ifconfig.me)"
echo "Admin dashboard: http://$(curl -s ifconfig.me)/admin"

# Show status
pm2 status
