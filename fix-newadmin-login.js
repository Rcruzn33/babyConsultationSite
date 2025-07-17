const { Pool } = require('pg');
const crypto = require('crypto');

// Fix newadmin login by checking the user approval status and password format
async function fixNewadminLogin() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
  });

  try {
    // Check current newadmin user status
    const result = await pool.query('SELECT * FROM users WHERE username = $1', ['newadmin']);
    
    if (result.rows.length === 0) {
      console.log('No newadmin user found, creating one...');
      
      // Create newadmin user with proper password format
      const password = 'password123';
      const salt = crypto.randomBytes(16).toString('hex');
      const buf = crypto.scryptSync(password, salt, 64);
      const hashedPassword = `${buf.toString('hex')}.${salt}`;
      
      await pool.query(
        'INSERT INTO users (username, email, password_hash, approved, role, created_at) VALUES ($1, $2, $3, $4, $5, NOW())',
        ['newadmin', 'newadmin@happybabysleeping.com', hashedPassword, true, 'admin']
      );
      
      console.log('Created newadmin user with scrypt password format');
    } else {
      const user = result.rows[0];
      console.log('Found newadmin user:', {
        id: user.id,
        username: user.username,
        email: user.email,
        approved: user.approved,
        password_format: user.password_hash ? 'exists' : 'missing'
      });
      
      // Update to approved if not already
      if (!user.approved) {
        await pool.query('UPDATE users SET approved = true WHERE id = $1', [user.id]);
        console.log('Updated newadmin to approved status');
      }
      
      // Update password format if needed
      if (user.password_hash && !user.password_hash.includes('.')) {
        const password = 'password123';
        const salt = crypto.randomBytes(16).toString('hex');
        const buf = crypto.scryptSync(password, salt, 64);
        const hashedPassword = `${buf.toString('hex')}.${salt}`;
        
        await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hashedPassword, user.id]);
        console.log('Updated newadmin password to scrypt format');
      }
    }
    
    // Verify final status
    const finalResult = await pool.query('SELECT id, username, email, approved FROM users WHERE username = $1', ['newadmin']);
    console.log('Final newadmin status:', finalResult.rows[0]);
    
  } catch (error) {
    console.error('Error fixing newadmin login:', error);
  } finally {
    await pool.end();
  }
}

fixNewadminLogin();