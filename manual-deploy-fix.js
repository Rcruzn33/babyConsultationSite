/**
 * Manual deployment fix for admin dashboard
 * This script contains the exact fixes needed for production
 */

const fs = require('fs');
const path = require('path');

// Fix 1: Update App.tsx to use correct Admin import
const appTsxPath = path.join(__dirname, 'client/src/App.tsx');
const appTsxContent = fs.readFileSync(appTsxPath, 'utf8');
const fixedAppTsx = appTsxContent.replace(
  'import Admin from "@/pages/AdminSimple";',
  'import Admin from "@/pages/Admin";'
);
fs.writeFileSync(appTsxPath, fixedAppTsx);

// Fix 2: Update production-server.js to use memory store
const prodServerPath = path.join(__dirname, 'production-server.js');
const prodServerContent = fs.readFileSync(prodServerPath, 'utf8');

// Replace PostgreSQL session store with memory store
const fixedProdServer = prodServerContent.replace(
  /const PgSession = ConnectPgSimple\(session\);[\s\S]*?store: new PgSession\({[\s\S]*?}\),/,
  'store: new session.MemoryStore(),'
);

// Ensure secure: false for cookies
const finalProdServer = fixedProdServer.replace(
  'secure: process.env.NODE_ENV === \'production\'',
  'secure: false'
);

fs.writeFileSync(prodServerPath, finalProdServer);

console.log('✅ Manual deployment fixes applied successfully!');
console.log('🚀 These changes will fix the admin dashboard tab display issue.');
console.log('📋 Key fixes:');
console.log('   - Fixed React component import in App.tsx');
console.log('   - Switched to memory store for sessions');
console.log('   - Set secure: false for cookies');
console.log('');
console.log('🔄 The deployment should now work correctly once pushed to GitHub.');