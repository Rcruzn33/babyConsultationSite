#!/bin/bash

# Complete Render build script
# This replaces the npm run build command in package.json

echo "🚀 Starting complete Render build process..."

# Step 1: Build client using the fixed vite config
echo "📦 Building client..."
npx vite build --config render.vite.config.js
if [ $? -ne 0 ]; then
    echo "❌ Client build failed"
    exit 1
fi

# Step 2: Build server components
echo "🏗️ Building server components..."
node build-server.js
if [ $? -ne 0 ]; then
    echo "❌ Server build failed"
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Built files:"
ls -la dist/
echo "📁 Shared files:"
ls -la dist/shared/