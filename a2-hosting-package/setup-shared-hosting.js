#!/usr/bin/env node

/**
 * A2 Hosting Shared Hosting Setup Script
 * This script helps configure the application for A2 Hosting shared hosting
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
    console.log('=== A2 Hosting Shared Hosting Setup ===');
    console.log('This script will help you configure your application for A2 Hosting shared hosting.');
    console.log('');

    // Get user information
    const username = await question('Enter your A2 Hosting username: ');
    const domain = await question('Enter your domain name (e.g., example.com): ');
    const dbPassword = await question('Enter your PostgreSQL database password: ');
    const sessionSecret = await question('Enter a session secret (or press Enter for random): ');
    const sendgridKey = await question('Enter your SendGrid API key (optional): ');

    // Generate random session secret if not provided
    const actualSessionSecret = sessionSecret || require('crypto').randomBytes(32).toString('hex');

    // Create environment configuration
    const envConfig = `NODE_ENV=production
DATABASE_URL=postgresql://${username}_dbuser:${dbPassword}@localhost:5432/${username}_baby_sleep_db
SESSION_SECRET=${actualSessionSecret}
PORT=3000
SENDGRID_API_KEY=${sendgridKey}
`;

    // Write .env file
    fs.writeFileSync('.env', envConfig);

    // Update package.json with correct startup file
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    packageJson.main = 'app.js';
    packageJson.scripts.start = 'node app.js';
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

    console.log('');
    console.log('✅ Configuration complete!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Upload all files to your A2 Hosting account');
    console.log('2. Access cPanel and go to "Node.js App"');
    console.log('3. Create a new Node.js application with these settings:');
    console.log(`   - App Name: baby-sleep-app`);
    console.log(`   - Node.js Version: 18.x`);
    console.log(`   - App URL: ${domain}`);
    console.log(`   - App Root: baby-sleep-app`);
    console.log(`   - Environment: production`);
    console.log(`   - Startup File: app.js`);
    console.log('4. Install dependencies: npm install');
    console.log('5. Build the application: npm run build');
    console.log('6. Set up the database schema: npm run db:push');
    console.log('7. Create admin user: node create-admin.js');
    console.log('8. Start the application from cPanel');
    console.log('');
    console.log('Database setup:');
    console.log(`   - Database Name: ${username}_baby_sleep_db`);
    console.log(`   - Database User: ${username}_dbuser`);
    console.log(`   - Database Password: ${dbPassword}`);
    console.log('');

    rl.close();
}

main().catch(console.error);
