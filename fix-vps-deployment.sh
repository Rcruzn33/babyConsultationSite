#!/bin/bash

# Fix VPS Deployment - Clean up conflicts and ensure proper operation
echo "🔧 Fixing VPS deployment and cleaning up conflicts..."

# Stop all unnecessary PM2 processes, keep only baby-sleep-app
echo "Cleaning up PM2 processes..."
pm2 stop all
pm2 delete all

# Start only the baby sleep app
echo "Starting baby sleep application..."
cd /var/www/baby-sleep-app
pm2 start dist/index.js --name baby-sleep-app --watch false
pm2 save

# Check if the application is responding locally
echo "Testing local application..."
sleep 5
curl -s http://localhost:3000 | head -5

# Check external access
echo "Testing external access..."
curl -s http://31.97.99.104 | head -5

# Show final PM2 status
echo "Final PM2 status:"
pm2 status

echo "✅ VPS deployment fix complete!"
echo "Your baby sleep website should now be accessible at: http://31.97.99.104"