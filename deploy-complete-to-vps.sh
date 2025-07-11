#!/bin/bash

# Complete Baby Sleep App Deployment to VPS
# This script creates a complete deployment package with all features

echo "Creating complete deployment package..."

# Create deployment directory
mkdir -p vps-complete-deploy

# Copy all necessary files
cp -r client vps-complete-deploy/
cp -r server vps-complete-deploy/
cp -r shared vps-complete-deploy/
cp -r attached_assets vps-complete-deploy/
cp package.json vps-complete-deploy/
cp package-lock.json vps-complete-deploy/
cp *.config.* vps-complete-deploy/
cp drizzle.config.ts vps-complete-deploy/

# Create a simple server.js for the VPS
cat > vps-complete-deploy/server.js << 'EOF'
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use('/attached_assets', express.static(path.join(__dirname, 'attached_assets')));
app.use(express.static(path.join(__dirname, 'dist/public')));

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Complete Baby Sleep App running on port ${PORT}`);
});
EOF

# Create deployment instructions
cat > vps-complete-deploy/DEPLOY_INSTRUCTIONS.md << 'EOF'
# Complete Baby Sleep App Deployment

## Instructions for VPS:

1. Upload this entire directory to /var/www/baby-sleep-complete/
2. Run: cd /var/www/baby-sleep-complete
3. Run: npm install
4. Run: npm run build
5. Run: pm2 stop baby-sleep-app
6. Run: pm2 start server.js --name baby-sleep-app
7. Run: pm2 save

The complete React application with hero image and all features will be live.
EOF

# Create tar archive
tar -czf vps-complete-deploy.tar.gz vps-complete-deploy/

echo "Complete deployment package created: vps-complete-deploy.tar.gz"
echo "Upload this to your VPS and extract it."