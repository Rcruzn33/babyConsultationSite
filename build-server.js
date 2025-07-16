#!/usr/bin/env node
/**
 * Complete server build script for Render deployment
 * Builds both client and server components properly
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏗️  Building server components...');

async function build() {
  try {
    // Create dist directories
    const distDir = path.join(__dirname, 'dist');
    const distSharedDir = path.join(distDir, 'shared');
    
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    if (!fs.existsSync(distSharedDir)) {
      fs.mkdirSync(distSharedDir, { recursive: true });
    }

    // Build shared schema using esbuild
    console.log('📦 Building shared schema...');
    execSync('npx esbuild shared/schema.ts --bundle --platform=node --format=cjs --outfile=dist/shared/schema.js', {
      stdio: 'inherit',
      cwd: __dirname
    });

    console.log('✅ Server build completed successfully!');
    
    // Run database initialization for production
    console.log('🔧 Initializing production database...');
    const initDB = require('./render-complete-init-db.js');
    await initDB();
    
    console.log('✅ Production build complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Server build failed:', error.message);
    process.exit(1);
  }
}

build();