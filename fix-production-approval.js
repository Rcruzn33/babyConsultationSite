/**
 * Fix production admin approval status
 * Direct database update for production Render environment
 */

const { Pool } = require('pg');

// Production database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function fixProductionApproval() {
  try {
    console.log('🔧 Fixing production admin approval status...');
    
    // Check current admin user status
    const currentUser = await pool.query('SELECT id, username, approved FROM users WHERE username = $1', ['admin']);
    console.log('Current admin user:', currentUser.rows[0]);
    
    // Update admin user to ensure approved = true
    await pool.query(
      'UPDATE users SET approved = true WHERE username = $1',
      ['admin']
    );
    
    // Verify the update
    const updatedUser = await pool.query('SELECT id, username, approved FROM users WHERE username = $1', ['admin']);
    console.log('Updated admin user:', updatedUser.rows[0]);
    
    console.log('✅ Production admin approval status fixed!');
    
  } catch (error) {
    console.error('❌ Error fixing production approval:', error);
  } finally {
    await pool.end();
  }
}

// For production use - will be called via DATABASE_URL
if (process.env.DATABASE_URL) {
  fixProductionApproval();
} else {
  console.log('❌ DATABASE_URL not found - this script is for production use only');
}