#!/bin/bash

# Simple VPS deployment commands for Happy Baby Sleeping
# Run these commands one by one on your VPS

echo "=== Happy Baby Sleeping VPS Deployment ==="
echo "Follow these steps to deploy your complete website:"
echo ""

echo "1. First, navigate to the directory where you uploaded the files:"
echo "   cd /var/www"
echo ""

echo "2. Stop any existing processes:"
echo "   sudo pkill -f 'node.*complete-vps-server.js'"
echo "   pm2 stop all 2>/dev/null || true"
echo "   pm2 delete all 2>/dev/null || true"
echo ""

echo "3. Make the server file executable:"
echo "   chmod +x complete-vps-server.js"
echo ""

echo "4. Start the application with PM2:"
echo "   pm2 start complete-vps-server.js --name 'happy-baby-sleeping'"
echo "   pm2 save"
echo ""

echo "5. Check if the application is running:"
echo "   pm2 list"
echo ""

echo "6. Test the website:"
echo "   curl -s http://localhost:3000 | head -20"
echo ""

echo "7. View logs if needed:"
echo "   pm2 logs happy-baby-sleeping"
echo ""

echo "Your website should be accessible at: http://31.97.99.104"
echo ""
echo "=== Manual Commands to Run ==="
echo "Copy and paste these commands one by one:"
echo ""
echo "cd /var/www"
echo "sudo pkill -f 'node.*complete-vps-server.js'"
echo "pm2 stop all 2>/dev/null || true"
echo "pm2 delete all 2>/dev/null || true"
echo "chmod +x complete-vps-server.js"
echo "pm2 start complete-vps-server.js --name 'happy-baby-sleeping'"
echo "pm2 save"
echo "pm2 list"
echo "curl -s http://localhost:3000 | head -20"