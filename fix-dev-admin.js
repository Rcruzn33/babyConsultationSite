/**
 * Fix development admin password to ensure stability
 */
const { Pool } = require('pg');
const { scrypt, randomBytes } = require('crypto');
const { promisify } = require('util');

const scryptAsync = promisify(scrypt);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

async function fixDevAdmin() {
  try {
    console.log('🔧 Fixing development admin password...');
    
    // Create password hash in development format
    const hashedPassword = await hashPassword('password123');
    
    // Update admin user with stable settings
    await pool.query(
      'UPDATE users SET password_hash = $1, approved = true WHERE username = $2',
      [hashedPassword, 'admin']
    );
    
    console.log('✅ Development admin password fixed!');
    console.log('Admin login: admin/password123');
  } catch (error) {
    console.error('❌ Error fixing admin:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

fixDevAdmin().catch(console.error);