/**
 * Fix production admin user approval status
 */
const { Pool } = require('pg');
const crypto = require('crypto');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

async function fixProductionAdmin() {
  try {
    console.log('🔧 Fixing production admin user...');
    
    // Create password hash in production format
    const hashedPassword = hashPassword('password123');
    
    // Delete existing admin user if exists
    await pool.query('DELETE FROM users WHERE username = $1', ['admin']);
    
    // Create new admin user with proper approval status
    await pool.query(
      'INSERT INTO users (username, email, password_hash, approved, can_manage_blog, can_manage_testimonials, can_manage_contacts, can_manage_consultations, can_manage_users) VALUES ($1, $2, $3, true, true, true, true, true, true)',
      ['admin', 'admin@babysleep.com', hashedPassword]
    );
    
    console.log('✅ Production admin user fixed!');
    console.log('Admin login: admin/password123');
    console.log('Status: Approved and ready to use');
  } catch (error) {
    console.error('❌ Error fixing production admin:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

fixProductionAdmin().catch(console.error);