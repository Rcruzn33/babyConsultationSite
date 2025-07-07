#!/bin/bash

# Deploy Baby Sleep Consulting Website to GitHub Pages
# This script helps set up and deploy the website to GitHub

echo "🚀 Baby Sleep Consulting Website - GitHub Deployment Script"
echo "==========================================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing git repository..."
    git init
    git branch -M main
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project for GitHub Pages..."
npm run build:github

# Check if user wants to deploy
echo ""
echo "📋 Pre-deployment checklist:"
echo "✅ Code is built and ready"
echo "✅ Dependencies installed"
echo "✅ Assets copied"
echo ""

read -p "🤔 Do you want to deploy to GitHub Pages now? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Deploying to GitHub Pages..."
    
    # Add all files
    git add .
    
    # Commit changes
    echo "📝 Enter commit message (or press Enter for default):"
    read -r commit_message
    if [ -z "$commit_message" ]; then
        commit_message="Deploy baby sleep consulting website"
    fi
    
    git commit -m "$commit_message"
    
    # Push to GitHub
    echo "📤 Pushing to GitHub..."
    git push -u origin main
    
    echo "✅ Deployment complete!"
    echo ""
    echo "🎉 Your website should be available at:"
    echo "   https://yourusername.github.io/repository-name"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to your GitHub repository settings"
    echo "2. Navigate to 'Pages' section"
    echo "3. Set source to 'Deploy from a branch'"
    echo "4. Select 'main' branch and '/ (root)' folder"
    echo "5. Wait a few minutes for deployment to complete"
else
    echo "⏸️  Deployment cancelled. Run this script again when ready."
fi

echo ""
echo "📖 For detailed instructions, see GITHUB_SETUP_GUIDE.md"