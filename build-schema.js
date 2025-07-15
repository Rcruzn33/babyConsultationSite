#!/usr/bin/env node
/**
 * Build script to create the shared schema file for production
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create dist directory structure
const distDir = path.resolve(__dirname, 'dist');
const distSharedDir = path.resolve(__dirname, 'dist/shared');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}
if (!fs.existsSync(distSharedDir)) {
  fs.mkdirSync(distSharedDir, { recursive: true });
}

try {
  console.log('Building shared schema...');
  execSync('npx esbuild shared/schema.ts --bundle --platform=node --format=cjs --outfile=dist/shared/schema.js', {
    stdio: 'inherit',
    cwd: __dirname
  });
  console.log('✅ Shared schema built successfully');
} catch (error) {
  console.error('❌ Failed to build shared schema:', error.message);
  process.exit(1);
}