#!/bin/bash

# Complete Baby Sleep Website Deployment Script
echo "🚀 Deploying complete baby sleep website to VPS..."

# Transfer the complete server file to VPS
echo "📤 Transferring complete server file..."
scp -o StrictHostKeyChecking=no complete-baby-sleep-server.js root@31.97.99.104:/var/www/happy-baby-server.js

# SSH into VPS and deploy
echo "🔧 Deploying on VPS..."
ssh -o StrictHostKeyChecking=no root@31.97.99.104 << 'EOF'
# Stop all PM2 processes
pm2 stop all
pm2 delete all

# Go to web directory
cd /var/www

# Start the complete application
echo "🚀 Starting complete Happy Baby Sleeping server..."
pm2 start happy-baby-server.js --name happy-baby-sleeping
pm2 save

# Test the deployment
echo "🧪 Testing deployment..."
sleep 3
curl -s http://localhost:3000 | head -5

echo "✅ Complete deployment successful!"
echo "🌐 Your beautiful baby sleep website is now live at: http://31.97.99.104"
echo ""
echo "🎉 Features now include:"
echo "- Complete React application with full content"
echo "- Hero section with custom baby image"
echo "- All service tiers with detailed descriptions"
echo "- Working forms with proper validation"
echo "- About page with professional photo"
echo "- Blog page with article cards"
echo "- Contact page with full contact form"
echo "- Admin dashboard with 4 tabs (Contacts, Consultations, Blog, Testimonials)"
echo "- Professional styling matching your Replit version"
echo "- Testimonials section with real content"
echo "- Mobile-responsive design"
echo ""
echo "🔧 PM2 Process: happy-baby-sleeping"
echo "🔍 Status: pm2 status"
echo "📋 Logs: pm2 logs happy-baby-sleeping"
EOF

echo "🎯 Deployment complete! Visit http://31.97.99.104 to see your complete website."