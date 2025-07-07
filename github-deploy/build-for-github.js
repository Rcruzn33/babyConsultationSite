#!/usr/bin/env node

/**
 * Build script for GitHub Pages deployment
 * This script builds the React frontend for static deployment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building Baby Sleep Consulting Website for GitHub Pages...');

try {
  // Step 1: Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Step 2: Build the frontend
  console.log('🔨 Building React frontend...');
  execSync('npm run build', { stdio: 'inherit' });

  // Step 3: Create index.html for GitHub Pages
  console.log('📄 Creating GitHub Pages index.html...');
  const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Happy Baby Sleeping - Expert Sleep Consulting</title>
    <meta name="description" content="Professional baby sleep consulting services to help your family get the rest you deserve. Expert guidance for healthy sleep habits.">
    <base href="/baby-sleep-consulting/">
</head>
<body>
    <div id="root"></div>
    <script type="module" src="./assets/index.js"></script>
</body>
</html>
  `.trim();

  // Write to dist/public if it exists
  if (fs.existsSync('dist/public')) {
    fs.writeFileSync('dist/public/index.html', indexHtml);
    console.log('✅ Created dist/public/index.html');
  }

  // Step 4: Copy assets to root for GitHub Pages
  console.log('📁 Copying assets for GitHub Pages...');
  if (fs.existsSync('dist/public')) {
    // Copy built files to root
    execSync('cp -r dist/public/* ./', { stdio: 'inherit' });
    console.log('✅ Copied built files to repository root');
  }

  console.log('🎉 Build complete! Ready for GitHub Pages deployment.');
  console.log('');
  console.log('Next steps:');
  console.log('1. Commit and push to GitHub');
  console.log('2. Enable GitHub Pages in repository settings');
  console.log('3. Set source to "Deploy from a branch" and select "main"');
  console.log('4. Your site will be available at https://yourusername.github.io/repository-name');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}