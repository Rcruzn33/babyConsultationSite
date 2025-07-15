const { Pool } = require('pg');

// Password hashing function
function hashPassword(password) {
  const crypto = require('crypto');
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

async function initDB() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  console.log('Initializing production database...');
  
  try {
    // Create tables if they don't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'admin',
        approved BOOLEAN DEFAULT false,
        can_manage_blog BOOLEAN DEFAULT true,
        can_manage_testimonials BOOLEAN DEFAULT true,
        can_manage_contacts BOOLEAN DEFAULT true,
        can_manage_consultations BOOLEAN DEFAULT true,
        can_manage_users BOOLEAN DEFAULT true,
        reset_token VARCHAR(255),
        reset_token_expiry TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Add missing columns if they don't exist
    const columnsToAdd = [
      'approved BOOLEAN DEFAULT false',
      'can_manage_blog BOOLEAN DEFAULT true',
      'can_manage_testimonials BOOLEAN DEFAULT true',
      'can_manage_contacts BOOLEAN DEFAULT true',
      'can_manage_consultations BOOLEAN DEFAULT true',
      'can_manage_users BOOLEAN DEFAULT true',
      'reset_token VARCHAR(255)',
      'reset_token_expiry TIMESTAMP'
    ];

    for (const column of columnsToAdd) {
      try {
        await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS ${column};`);
      } catch (error) {
        // Ignore if column already exists
        if (error.code !== '42701') {
          console.log(`Warning: Could not add column ${column}:`, error.message);
        }
      }
    }

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

    await pool.query(`
      CREATE TABLE IF NOT EXISTS consultations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        service_type VARCHAR(100),
        child_age VARCHAR(50),
        current_challenges TEXT,
        preferred_date DATE,
        preferred_time VARCHAR(50),
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL,
        published BOOLEAN DEFAULT false,
        author_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        parent_name VARCHAR(100) NOT NULL,
        child_age VARCHAR(50),
        testimonial TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        approved BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Add missing columns to testimonials table
    const testimonialColumns = [
      'parent_name VARCHAR(100)',
      'child_age VARCHAR(50)',
      'testimonial TEXT',
      'approved BOOLEAN DEFAULT false'
    ];

    for (const column of testimonialColumns) {
      try {
        await pool.query(`ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS ${column};`);
      } catch (error) {
        if (error.code !== '42701') {
          console.log(`Warning: Could not add testimonial column ${column}:`, error.message);
        }
      }
    }

    // Create session table for express-session
    await pool.query(`
      CREATE TABLE IF NOT EXISTS session (
        sid VARCHAR NOT NULL COLLATE "default",
        sess JSON NOT NULL,
        expire TIMESTAMP(6) NOT NULL
      ) WITH (OIDS=FALSE);
    `);

    // Add primary key constraint if it doesn't exist
    try {
      await pool.query(`
        ALTER TABLE session ADD CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;
      `);
    } catch (error) {
      // Ignore if constraint already exists
      if (error.code !== '42P16') {
        throw error;
      }
    }

    // Create indexes
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_session_expire ON session(expire);
    `);

    // Create default admin user if not exists
    const adminExists = await pool.query('SELECT id FROM users WHERE username = $1', ['admin']);
    if (adminExists.rows.length === 0) {
      const hashedPassword = hashPassword('password123');
      await pool.query(
        'INSERT INTO users (username, email, password_hash, approved) VALUES ($1, $2, $3, true)',
        ['admin', 'admin@babysleep.com', hashedPassword]
      );
      console.log('Created default admin user (admin/password123)');
    }

    // Insert sample blog posts if none exist
    const blogExists = await pool.query('SELECT id FROM blog_posts LIMIT 1');
    if (blogExists.rows.length === 0) {
      const adminUser = await pool.query('SELECT id FROM users WHERE username = $1', ['admin']);
      const adminId = adminUser.rows[0].id;

      await pool.query(`
        INSERT INTO blog_posts (title, content, published, author_id) VALUES 
        ($1, $2, true, $3),
        ($4, $5, true, $3),
        ($6, $7, true, $3)
      `, [
        '5 Essential Tips for Better Baby Sleep',
        'Establishing a consistent bedtime routine is crucial for your baby\'s sleep development. Here are five proven strategies that can help your little one sleep better: 1) Create a calming bedtime environment, 2) Maintain consistent sleep schedules, 3) Use white noise for comfort, 4) Ensure proper room temperature, and 5) Practice patience and consistency. Remember, every baby is unique, and what works for one may not work for another.',
        adminId,
        'Understanding Your Baby\'s Sleep Cycles',
        'Baby sleep cycles are different from adult sleep patterns. Newborns spend about 50% of their time in REM sleep, compared to 20% for adults. Understanding these cycles can help you better support your baby\'s natural sleep rhythm. Babies typically have shorter sleep cycles of 45-60 minutes, which is why they wake more frequently than adults.',
        adminId,
        'Creating the Perfect Sleep Environment',
        'The right sleep environment can make a significant difference in your baby\'s sleep quality. Keep the room cool (around 68-70°F), dark, and quiet. Use blackout curtains or shades to block out light, and consider a white noise machine to mask household sounds. Ensure the crib is safe and comfortable with a firm mattress and fitted sheet.',
        adminId
      ]);
      console.log('Created sample blog posts');
    }

    // Insert sample testimonials if none exist
    const testimonialExists = await pool.query('SELECT id FROM testimonials LIMIT 1');
    if (testimonialExists.rows.length === 0) {
      await pool.query(`
        INSERT INTO testimonials (parent_name, child_age, testimonial, rating, approved) VALUES 
        ($1, $2, $3, 5, true),
        ($4, $5, $6, 5, true),
        ($7, $8, $9, 5, true)
      `, [
        'Sarah Johnson',
        '8 months',
        'Working with the Baby Sleep Whisperer was a game-changer for our family. Within just two weeks, our 8-month-old went from waking up 5 times a night to sleeping through the night. The personalized approach and ongoing support made all the difference.',
        'Michael Chen',
        '6 months',
        'I was skeptical about sleep training, but the gentle methods recommended were perfect for our baby. The consultant was patient, knowledgeable, and provided practical solutions that actually worked. Our whole family is now getting better sleep.',
        'Emily Rodriguez',
        '10 months',
        'The comprehensive sleep package was worth every penny. Not only did our baby learn to sleep better, but we also learned valuable techniques for maintaining healthy sleep habits. Highly recommend to any exhausted parent!'
      ]);
      console.log('Created sample testimonials');
    }

    console.log('Production database initialization complete');
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initDB();