/**
 * FINAL RENDER DEPLOYMENT FIX
 * Builds complete production package with fixed admin dashboard
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const esbuild = require('esbuild');

console.log('🚀 Building final production deployment...');

try {
  // 1. Build client with production config
  console.log('📦 Building client...');
  execSync('npm run build:client', { stdio: 'inherit' });
  
  // 2. Build server components
  console.log('⚙️  Building server...');
  execSync('npm run build:server', { stdio: 'inherit' });
  
  // 3. Initialize production database
  console.log('🗄️  Initializing database...');
  execSync('node render-complete-init-db.js', { stdio: 'inherit' });
  
  console.log('✅ Production build complete!');
  console.log('🌐 Ready for Render deployment');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}