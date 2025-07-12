#!/bin/bash

echo "🔄 Restarting Happy Baby Sleeping server..."

# Stop and delete existing processes
pm2 stop happy-baby-sleeping 2>/dev/null || true
pm2 delete happy-baby-sleeping 2>/dev/null || true

# Start the server
cd /var/www
pm2 start server.js --name "happy-baby-sleeping"
pm2 save

# Show status
pm2 status
pm2 logs happy-baby-sleeping --lines 10

echo "✅ Server restarted!"
echo "🌐 Visit: http://31.97.99.104"