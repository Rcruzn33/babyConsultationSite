#!/bin/bash

# VPS Build Fix Script
# Run this on your VPS to fix the build issues

echo "Fixing VPS build issues..."

cd /var/www/baby-sleep-app

# Create missing .env file
cat > .env << 'EOF'
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://baby_sleep_user:8lOOMYXodlE29tSPFVTdIySBmvu83N2pIbIZWVN79RM=@localhost:5432/baby_sleep_db
SESSION_SECRET=UjYDobMiqG2/yjwf6HBXM03G+sQPj11MGO4JznItSdU=
EOF

# Fix vite.config.ts to handle production build
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: 'client',
  build: {
    outDir: '../dist/public',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'client/index.html')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@assets': path.resolve(__dirname, 'attached_assets')
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
})
EOF

# Create missing client/index.html if it doesn't exist
if [ ! -f "client/index.html" ]; then
cat > client/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Happy Baby Sleeping - Professional Sleep Consulting</title>
    <meta name="description" content="Professional baby sleep consulting services to help your little one sleep better. Expert guidance for peaceful nights." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF
fi

# Ensure client/src/index.css exists
if [ ! -f "client/src/index.css" ]; then
cat > client/src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --baby-blue: #E6F3FF;
  --soft-pink: #FFE6F0;
  --mint-green: #E6FFF0;
  --warm-peach: #FFF0E6;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.hero-bg {
  background: linear-gradient(135deg, var(--baby-blue) 0%, var(--soft-pink) 100%);
}
EOF
fi

# Install dependencies with legacy peer deps flag
npm install --legacy-peer-deps

# Build the application
npm run build

# Start with PM2
pm2 delete baby-sleep-app 2>/dev/null || true
pm2 start npm --name baby-sleep-app -- start
pm2 save

echo "Build fix completed. Check http://31.97.99.104"