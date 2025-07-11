# Manual Application Structure Creation

Run these commands on your VPS to create the complete application:

## Step 1: Create directory structure
```bash
cd /var/www/baby-sleep-app
mkdir -p server client/src/{components,pages,lib,hooks} shared
```

## Step 2: Create essential files
```bash
# Create package.json
cat > package.json << 'EOF'
{
  "name": "baby-sleep-consulting",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "npm run build:client && npm run build:server",
    "build:client": "vite build --outDir=dist/public",
    "build:server": "esbuild server/index.ts --bundle --platform=node --target=node18 --outfile=dist/server.js --external:pg-native",
    "start": "node dist/server.js",
    "db:push": "drizzle-kit push"
  },
  "dependencies": {
    "express": "^4.18.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@neondatabase/serverless": "^0.9.0",
    "drizzle-orm": "^0.33.0",
    "express-session": "^1.18.0",
    "connect-pg-simple": "^9.0.1",
    "multer": "^1.4.5-lts.1",
    "@sendgrid/mail": "^8.1.0",
    "zod": "^3.22.4",
    "bcrypt": "^5.1.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/node": "^20.5.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.3",
    "tsx": "^4.7.1",
    "typescript": "^5.1.6",
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.27",
    "esbuild": "^0.19.0",
    "drizzle-kit": "^0.24.0"
  }
}
EOF
```

## Step 3: Install dependencies
```bash
npm install
```

## Step 4: Create basic server structure
```bash
# Create server/index.ts
cat > server/index.ts << 'EOF'
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, '../dist/public')));

// API routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'API working!' });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
EOF
```

## Step 5: Create basic React app
```bash
# Create client/index.html
cat > client/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Happy Baby Sleeping - Professional Sleep Consulting</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>
EOF

# Create client/src/main.tsx
cat > client/src/main.tsx << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF
```

## Step 6: Create essential config files
```bash
# Create vite.config.ts
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'client',
  build: {
    outDir: '../dist/public'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
EOF

# Create tailwind.config.ts
cat > tailwind.config.ts << 'EOF'
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./client/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'baby-blue': '#E6F3FF',
        'soft-pink': '#FFE6F0',
        'mint-green': '#E6FFF0'
      }
    }
  },
  plugins: []
};

export default config;
EOF
```

## Step 7: Build and start
```bash
npm run build
pm2 start npm --name baby-sleep-app -- start
pm2 save
```