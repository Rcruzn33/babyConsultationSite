#!/bin/bash

# Simple A2 Hosting Package Creator
echo "Creating A2 Hosting deployment package..."

# Create package directory
mkdir -p a2-hosting-package

# Copy application files
cp -r server a2-hosting-package/
cp -r shared a2-hosting-package/
cp -r client a2-hosting-package/
cp -r attached_assets a2-hosting-package/ 2>/dev/null || mkdir -p a2-hosting-package/attached_assets

# Copy configuration files
cp package.json a2-hosting-package/
cp package-lock.json a2-hosting-package/
cp tsconfig.json a2-hosting-package/
cp vite.config.ts a2-hosting-package/
cp tailwind.config.ts a2-hosting-package/
cp postcss.config.js a2-hosting-package/
cp components.json a2-hosting-package/
cp drizzle.config.ts a2-hosting-package/
cp create-admin.js a2-hosting-package/
cp db-admin.js a2-hosting-package/

# Copy documentation
cp A2_HOSTING_DEPLOYMENT_GUIDE.md a2-hosting-package/

# Create uploads directory
mkdir -p a2-hosting-package/client/public/uploads

echo "Package created successfully!"
echo "Files in a2-hosting-package/ are ready for A2 Hosting deployment."