#!/usr/bin/env node

/**
 * HelioHost Preparation Script
 * Prepares the baby sleep consulting website for HelioHost deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Preparing Baby Sleep Consulting Website for HelioHost...\n');

// Create deployment directory
const deployDir = 'heliohost-deploy';
if (!fs.existsSync(deployDir)) {
    fs.mkdirSync(deployDir);
    console.log('✅ Created deployment directory');
}

// Create .htaccess file for Node.js
const htaccess = `RewriteEngine On
RewriteRule ^(.*)$ server.js [L]

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>`;

fs.writeFileSync(path.join(deployDir, '.htaccess'), htaccess);
console.log('✅ Created .htaccess file');

// Create environment template
const envTemplate = `# HelioHost Environment Configuration
# Copy this file to .env and update with your actual values

# Database Configuration
DATABASE_URL=postgresql://username:password@hostname:5432/database_name
# Alternative MySQL: mysql://username:password@hostname:3306/database_name

# Security
SESSION_SECRET=your-very-long-random-secret-key-minimum-32-characters

# Email Configuration (SendGrid)
SENDGRID_API_KEY=SG.your-sendgrid-api-key-here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com

# Admin Configuration
ADMIN_EMAIL=admin@yourdomain.com

# Environment
NODE_ENV=production
PORT=3000

# Optional: Custom domain
DOMAIN=yourdomain.com
`;

fs.writeFileSync(path.join(deployDir, '.env.template'), envTemplate);
console.log('✅ Created environment template');

// Create HelioHost-specific server.js
const serverJs = `/**
 * HelioHost Server Entry Point
 * Baby Sleep Consulting Website
 */

const express = require('express');
const path = require('path');
const session = require('express-session');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Serve static assets
app.use('/attached_assets', express.static(path.join(__dirname, 'attached_assets')));

// Basic routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API routes would go here
// (You'll need to convert the TypeScript API routes to JavaScript)

// Start server
app.listen(PORT, () => {
    console.log(\`🚀 Baby Sleep Consulting Website running on port \${PORT}\`);
});

module.exports = app;
`;

fs.writeFileSync(path.join(deployDir, 'server.js'), serverJs);
console.log('✅ Created HelioHost server.js');

// Create package.json for production
const packageJson = {
    "name": "baby-sleep-consulting",
    "version": "1.0.0",
    "description": "Baby Sleep Consulting Website",
    "main": "server.js",
    "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js"
    },
    "dependencies": {
        "express": "^4.18.2",
        "express-session": "^1.17.3",
        "dotenv": "^16.3.1",
        "pg": "^8.11.3",
        "bcrypt": "^5.1.1",
        "@sendgrid/mail": "^7.7.0"
    },
    "engines": {
        "node": ">=16.0.0"
    }
};

fs.writeFileSync(path.join(deployDir, 'package.json'), JSON.stringify(packageJson, null, 2));
console.log('✅ Created production package.json');

// Create deployment instructions
const instructions = `# HelioHost Deployment Instructions

## Files Prepared
- server.js (HelioHost-compatible Node.js server)
- .htaccess (Apache configuration)
- package.json (Production dependencies)
- .env.template (Environment variables template)

## Next Steps

1. **Create HelioHost Account**
   - Sign up at https://heliohost.org/
   - Wait for account activation

2. **Prepare Database**
   - Option A: Use external PostgreSQL (Neon, Supabase)
   - Option B: Convert to HelioHost MySQL

3. **Upload Files**
   - Upload all files to public_html directory
   - Copy .env.template to .env and configure

4. **Install Dependencies**
   - Via cPanel Terminal: \`npm install --production\`
   - Or upload node_modules if pre-installed

5. **Configure Environment**
   - Update .env with your actual values
   - Set up database connection
   - Configure SendGrid API key

6. **Test Deployment**
   - Visit your HelioHost domain
   - Test admin login
   - Verify all functionality

## Important Notes
- Node.js must be enabled in cPanel
- Database schema may need MySQL conversion
- Static assets are served from /attached_assets/
- Session storage uses memory (consider database sessions for production)

## Support
- HelioHost Community Forum
- Documentation at heliohost.org
- Check server logs for debugging
`;

fs.writeFileSync(path.join(deployDir, 'DEPLOYMENT_INSTRUCTIONS.md'), instructions);
console.log('✅ Created deployment instructions');

console.log('\n🎉 HelioHost deployment files prepared!');
console.log(`📁 Files are ready in: ${deployDir}/`);
console.log('\n📋 Next steps:');
console.log('1. Create your HelioHost account');
console.log('2. Set up your database (external PostgreSQL recommended)');
console.log('3. Upload the files to your HelioHost account');
console.log('4. Configure environment variables');
console.log('5. Test your deployment');