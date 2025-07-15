#!/usr/bin/env node
/**
 * Complete Render deployment script
 * Handles both client and server builds properly
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Render deployment build...');

try {
  // Step 1: Build client
  console.log('📦 Building client...');
  execSync('npx vite build --config render.vite.config.js', {
    stdio: 'inherit',
    cwd: __dirname
  });

  // Step 2: Build server components 
  console.log('🏗️  Building server components...');
  execSync('node build-server.js', {
    stdio: 'inherit',
    cwd: __dirname
  });

  // Step 3: Initialize database
  console.log('🗄️  Initializing database...');
  execSync('node init-db.js', {
    stdio: 'inherit',
    cwd: __dirname
  });

  console.log('✅ Render deployment build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('❌ Deployment build failed:', error.message);
  process.exit(1);
}