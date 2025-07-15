import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      external: [],
    },
  },
  server: {
    fs: {
      strict: false,
    },
  },
  plugins: [
    {
      name: 'build-schema-after-client',
      closeBundle: {
        sequential: true,
        async handler() {
          // Import required modules using dynamic import
          const { execSync } = await import('child_process');
          const fs = await import('fs');
          const path = await import('path');
          
          // Create dist/shared directory
          const distSharedDir = path.resolve(__dirname, 'dist/shared');
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
            throw error;
          }
        }
      }
    }
  ]
});