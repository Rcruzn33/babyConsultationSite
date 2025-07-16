// This script redirects to the complete database initialization
// Used by Render deployment build process

console.log('🔄 Redirecting to complete database initialization...');

// Run the complete database initialization
const initDB = require('./render-complete-init-db.js');

// Handle async execution properly
(async () => {
  try {
    await initDB();
    console.log('✅ Database initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
})();