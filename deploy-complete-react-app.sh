#!/bin/bash

# Complete React App Deployment Script for VPS
# This script creates a complete deployment package with the full React application

echo "Creating complete React application deployment package..."

# Create deployment directory
mkdir -p /tmp/complete-baby-sleep-app

# Copy the complete application
cp -r client /tmp/complete-baby-sleep-app/
cp -r server /tmp/complete-baby-sleep-app/
cp -r shared /tmp/complete-baby-sleep-app/
cp -r attached_assets /tmp/complete-baby-sleep-app/
cp package.json /tmp/complete-baby-sleep-app/
cp tsconfig.json /tmp/complete-baby-sleep-app/
cp vite.config.ts /tmp/complete-baby-sleep-app/
cp tailwind.config.ts /tmp/complete-baby-sleep-app/
cp postcss.config.js /tmp/complete-baby-sleep-app/
cp components.json /tmp/complete-baby-sleep-app/
cp drizzle.config.ts /tmp/complete-baby-sleep-app/

# Create production server
cat > /tmp/complete-baby-sleep-app/production-server.js << 'EOF'
const express = require('express');
const path = require('path');
const cors = require('cors');
const { createServer } = require('http');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files from attached_assets
app.use('/attached_assets', express.static(path.join(__dirname, 'attached_assets')));

// Serve static files from client build
app.use(express.static(path.join(__dirname, 'client/dist')));

// Mock API endpoints for development
app.get('/api/testimonials', (req, res) => {
  res.json([
    {
      id: 1,
      name: "Sarah M.",
      content: "Yanina transformed our family's sleep routine. Our 8-month-old now sleeps through the night consistently!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael R.",
      content: "The personalized approach made all the difference. Highly recommend!",
      rating: 5
    },
    {
      id: 3,
      name: "Jennifer L.",
      content: "Professional, caring, and effective. Our whole family is now well-rested.",
      rating: 5
    }
  ]);
});

app.get('/api/blog', (req, res) => {
  res.json([
    {
      id: 1,
      title: "The Importance of Sleep Schedules",
      excerpt: "Learn why consistent sleep schedules are crucial for your baby's development.",
      publishedAt: "2024-01-15",
      slug: "importance-of-sleep-schedules"
    },
    {
      id: 2,
      title: "Creating the Perfect Sleep Environment",
      excerpt: "Tips for setting up your baby's room for optimal sleep.",
      publishedAt: "2024-01-10",
      slug: "perfect-sleep-environment"
    }
  ]);
});

app.post('/api/contact', (req, res) => {
  console.log('Contact form submission:', req.body);
  res.json({ message: 'Thank you for your message! We will respond within 48 hours.' });
});

app.post('/api/consultations', (req, res) => {
  console.log('Consultation booking:', req.body);
  res.json({ message: 'Thank you for booking a consultation! We will contact you within 48 hours.' });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

const server = createServer(app);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Baby Sleep Whisperer server running on port ${PORT}`);
  console.log(`Website accessible at: http://31.97.99.104:${PORT}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});
EOF

# Create package.json for production
cat > /tmp/complete-baby-sleep-app/package-production.json << 'EOF'
{
  "name": "baby-sleep-whisperer-production",
  "version": "1.0.0",
  "description": "Baby Sleep Whisperer - Production Server",
  "main": "production-server.js",
  "scripts": {
    "start": "node production-server.js",
    "build": "cd client && npm run build"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  }
}
EOF

# Create deployment commands
cat > /tmp/complete-baby-sleep-app/deploy-commands.txt << 'EOF'
# VPS Deployment Commands

# 1. Stop current server
pm2 stop happy-baby-sleeping
pm2 delete happy-baby-sleeping

# 2. Install dependencies
cd /var/www/baby-sleep-app
npm install

# 3. Build the React application
cd client
npm install
npm run build

# 4. Start production server
cd /var/www/baby-sleep-app
pm2 start production-server.js --name "happy-baby-sleeping"
pm2 save
EOF

# Create the deployment package
cd /tmp
tar -czf complete-baby-sleep-app.tar.gz complete-baby-sleep-app/

echo "Deployment package created: /tmp/complete-baby-sleep-app.tar.gz"
echo "Transfer this file to your VPS and extract it in /var/www/"
echo "Then run the commands from deploy-commands.txt"