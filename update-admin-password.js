/**
 * Update admin password to match development server format
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

async function updateAdminPassword() {
  try {
    console.log('🔧 Updating admin password format...');
    
    // Create password hash in development format
    const hashedPassword = await hashPassword('password123');
    
    // Update admin user
    await pool.query(
      'UPDATE users SET password_hash = $1 WHERE username = $2',
      [hashedPassword, 'admin']
    );
    
    console.log('✅ Admin password updated successfully!');
  } catch (error) {
    console.error('❌ Error updating password:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

updateAdminPassword().catch(console.error);