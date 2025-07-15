const { Pool } = require('pg');
const crypto = require('crypto');

// Simple database initialization for Render
async function initializeDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔄 Starting database initialization...');
    
    // Create sessions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        sid VARCHAR NOT NULL COLLATE "default",
        sess JSON NOT NULL,
        expire TIMESTAMP(6) NOT NULL
      )
      WITH (OIDS=FALSE);
    `);
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON sessions ("expire");
    `);
    
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        approved BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Create contacts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Create consultations table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS consultations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        service_type VARCHAR(50) NOT NULL,
        child_age VARCHAR(50),
        current_challenges TEXT,
        preferred_date DATE,
        preferred_time VARCHAR(20),
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Create blog_posts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        author VARCHAR(100) DEFAULT 'Admin',
        published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Create testimonials table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        approved BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Check if admin exists
    const adminCheck = await pool.query(`SELECT COUNT(*) FROM users WHERE username = 'admin'`);
    
    if (adminCheck.rows[0].count === '0') {
      // Create admin user
      const salt = crypto.randomBytes(16).toString('hex');
      const hash = crypto.pbkdf2Sync('password123', salt, 1000, 64, 'sha512').toString('hex');
      const passwordHash = `${salt}:${hash}`;
      
      await pool.query(`
        INSERT INTO users (username, email, password_hash, role, approved)
        VALUES ('admin', 'admin@happybabysleeping.com', $1, 'admin', true)
      `, [passwordHash]);
      
      console.log('✅ Admin user created: admin/password123');
    }
    
    // Add sample data
    const blogCheck = await pool.query(`SELECT COUNT(*) FROM blog_posts`);
    if (blogCheck.rows[0].count === '0') {
      await pool.query(`
        INSERT INTO blog_posts (title, content, excerpt, published) VALUES
        ('5 Essential Sleep Tips for New Parents', 'Creating a consistent bedtime routine is crucial for your baby''s sleep development. Here are five proven strategies that can help establish healthy sleep patterns from the very beginning...', 'Learn the fundamental sleep strategies every new parent should know.', true),
        ('Understanding Baby Sleep Cycles', 'Baby sleep cycles are different from adult sleep patterns. Understanding these differences can help you work with your baby''s natural rhythm rather than against it...', 'A comprehensive guide to how babies sleep and what to expect.', true),
        ('Common Sleep Challenges and Solutions', 'Every parent faces sleep challenges with their little one. From sleep regressions to night wakings, here are practical solutions to the most common issues...', 'Practical advice for overcoming typical baby sleep problems.', true)
      `);
      console.log('✅ Sample blog posts added');
    }
    
    const testimonialCheck = await pool.query(`SELECT COUNT(*) FROM testimonials`);
    if (testimonialCheck.rows[0].count === '0') {
      await pool.query(`
        INSERT INTO testimonials (name, content, rating, approved) VALUES
        ('Sarah M.', 'The sleep consultation changed our lives! Our baby now sleeps through the night and we finally feel rested. The personalized approach made all the difference.', 5, true),
        ('Michael & Lisa', 'We were skeptical at first, but the results speak for themselves. Our 6-month-old went from waking every 2 hours to sleeping 8-hour stretches. Thank you!', 5, true),
        ('Jennifer K.', 'Professional, caring, and incredibly knowledgeable. The sleep plan was easy to follow and we saw improvements within the first week. Highly recommend!', 5, true)
      `);
      console.log('✅ Sample testimonials added');
    }
    
    console.log('🎉 Database initialization complete!');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initializeDatabase().then(() => {
  console.log('✅ Database ready for production');
  process.exit(0);
}).catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});