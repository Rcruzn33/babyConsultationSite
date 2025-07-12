#!/bin/bash

echo "🔧 Deploying Debug Version..."

# Stop existing processes
pm2 stop happy-baby-sleeping 2>/dev/null || true
pm2 delete happy-baby-sleeping 2>/dev/null || true

# Copy debug server
cd /var/www
cp debug-vps-server.js debug-server-backup.js
chmod +x debug-vps-server.js

# Start debug version
pm2 start debug-vps-server.js --name "happy-baby-sleeping"
pm2 save

echo "✅ Debug version deployed!"
echo "🌐 Visit: http://31.97.99.104"
echo "📊 Check status: pm2 logs happy-baby-sleeping"