#!/usr/bin/env node
/**
 * Complete build script for Render deployment
 * Replaces the need for separate build:client and build:server scripts
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting complete build process for Render...');

try {
  // Step 1: Build client
  console.log('📦 Building client...');
  execSync('npx vite build --config render.vite.config.js', {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  // Step 2: Build server components (shared schema)
  console.log('🏗️  Building server components...');
  execSync('node build-server.js', {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  // Step 3: Verify build outputs
  console.log('✅ Verifying build outputs...');
  const clientBuildPath = path.join(__dirname, 'dist/public/index.html');
  const schemaBuildPath = path.join(__dirname, 'dist/shared/schema.js');
  
  if (!fs.existsSync(clientBuildPath)) {
    throw new Error('Client build failed - index.html not found');
  }
  
  if (!fs.existsSync(schemaBuildPath)) {
    throw new Error('Server build failed - schema.js not found');
  }
  
  const clientStats = fs.statSync(clientBuildPath);
  const schemaStats = fs.statSync(schemaBuildPath);
  
  console.log(`📊 Build Summary:`);
  console.log(`   Client: ${(clientStats.size / 1024).toFixed(1)}KB`);
  console.log(`   Schema: ${(schemaStats.size / 1024).toFixed(1)}KB`);
  
  console.log('✅ Complete build finished successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}