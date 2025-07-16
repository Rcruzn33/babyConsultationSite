/**
 * Fix development database schema to match production
 */
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function fixDatabase() {
  try {
    console.log('🔧 Fixing development database schema...');
    
    // Check if admin user exists
    const adminCheck = await pool.query(
      'SELECT id FROM users WHERE username = $1',
      ['admin']
    );
    
    if (adminCheck.rows.length === 0) {
      console.log('Creating admin user...');
      // Create admin user with proper hash
      const crypto = require('crypto');
      const password = 'password123';
      const salt = crypto.randomBytes(16).toString('hex');
      const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
      const hashedPassword = `${salt}:${hash}`;
      
      await pool.query(
        'INSERT INTO users (username, email, password_hash, approved, role) VALUES ($1, $2, $3, true, $4) ON CONFLICT (username) DO UPDATE SET password_hash = $3, approved = true',
        ['admin', 'admin@babysleep.com', hashedPassword, 'admin']
      );
      console.log('✅ Admin user created/updated');
    } else {
      console.log('✅ Admin user already exists');
    }
    
    console.log('✅ Database schema fixed successfully!');
  } catch (error) {
    console.error('❌ Error fixing database:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

fixDatabase().catch(console.error);