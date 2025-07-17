const { Pool } = require('pg');

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

  console.log('Initializing Render production database...');
  
  try {
    // Drop existing tables to start fresh (only for fixing schema issues)
    console.log('Dropping existing tables for schema fix...');
    await pool.query('DROP TABLE IF EXISTS session CASCADE');
    await pool.query('DROP TABLE IF EXISTS testimonials CASCADE');
    await pool.query('DROP TABLE IF EXISTS blog_posts CASCADE');
    await pool.query('DROP TABLE IF EXISTS consultations CASCADE');
    await pool.query('DROP TABLE IF EXISTS contacts CASCADE');
    await pool.query('DROP TABLE IF EXISTS users CASCADE');

    // Create tables with correct schema
    console.log('Creating users table...');
    await pool.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'admin',
        approved BOOLEAN DEFAULT false,
        approved_by INTEGER,
        approved_at TIMESTAMP,
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

    console.log('Creating contacts table...');
    await pool.query(`
      CREATE TABLE contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(200),
        message TEXT NOT NULL,
        responded BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Creating consultations table...');
    await pool.query(`
      CREATE TABLE consultations (
        id SERIAL PRIMARY KEY,
        parent_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        child_age VARCHAR(50),
        sleep_challenges TEXT,
        consultation_type VARCHAR(100),
        preferred_date TIMESTAMP,
        status VARCHAR(50) DEFAULT 'pending',
        notes TEXT,
        sleep_challenges TEXT,
        preferred_date DATE,
        preferred_time VARCHAR(50),
        status VARCHAR(20) DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Creating blog_posts table...');
    await pool.query(`
      CREATE TABLE blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        slug VARCHAR(200) NOT NULL UNIQUE,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        image_url TEXT,
        published BOOLEAN DEFAULT false,
        author_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Creating testimonials table...');
    await pool.query(`
      CREATE TABLE testimonials (
        id SERIAL PRIMARY KEY,
        parent_name VARCHAR(100) NOT NULL,
        child_age VARCHAR(50),
        testimonial TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        photo_url TEXT,
        approved BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Creating session table...');
    await pool.query(`
      CREATE TABLE session (
        sid VARCHAR NOT NULL COLLATE "default",
        sess JSON NOT NULL,
        expire TIMESTAMP(6) NOT NULL,
        CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE
      ) WITH (OIDS=FALSE);
    `);

    // Create indexes
    console.log('Creating indexes...');
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_session_expire ON session(expire);
    `);

    // Create default admin user
    console.log('Creating admin user...');
    const hashedPassword = hashPassword('password123');
    
    // Delete existing admin user if exists
    await pool.query('DELETE FROM users WHERE username = $1', ['admin']);
    
    await pool.query(
      'INSERT INTO users (username, email, password_hash, approved, can_manage_blog, can_manage_testimonials, can_manage_contacts, can_manage_consultations, can_manage_users) VALUES ($1, $2, $3, true, true, true, true, true, true)',
      ['admin', 'admin@babysleep.com', hashedPassword]
    );
    console.log('Created default admin user (admin/password123)');

    // Insert sample blog posts
    console.log('Creating sample blog posts...');
    const adminUser = await pool.query('SELECT id FROM users WHERE username = $1', ['admin']);
    const adminId = adminUser.rows[0].id;

    await pool.query(`
      INSERT INTO blog_posts (title, slug, excerpt, content, published, author_id) VALUES 
      ($1, $2, $3, $4, true, $5),
      ($6, $7, $8, $9, true, $10),
      ($11, $12, $13, $14, true, $15)
    `, [
      '5 Essential Tips for Better Baby Sleep',
      '5-essential-tips-for-better-baby-sleep',
      'Discover five proven strategies that can help your little one sleep better through consistent routines and proper environment.',
      'Establishing a consistent bedtime routine is crucial for your baby\'s sleep development. Here are five proven strategies that can help your little one sleep better: 1) Create a calming bedtime environment, 2) Maintain consistent sleep schedules, 3) Use white noise for comfort, 4) Ensure proper room temperature, and 5) Practice patience and consistency. Remember, every baby is unique, and what works for one may not work for another.',
      adminId,
      'Understanding Your Baby\'s Sleep Cycles',
      'understanding-your-babys-sleep-cycles',
      'Learn about baby sleep patterns and how they differ from adult sleep to better support your baby\'s natural rhythm.',
      'Baby sleep cycles are different from adult sleep patterns. Newborns spend about 50% of their time in REM sleep, compared to 20% for adults. Understanding these cycles can help you better support your baby\'s natural sleep rhythm. Babies typically have shorter sleep cycles of 45-60 minutes, which is why they wake more frequently than adults.',
      adminId,
      'Creating the Perfect Sleep Environment',
      'creating-the-perfect-sleep-environment',
      'Tips for setting up the ideal sleep environment with proper temperature, lighting, and noise control for better baby sleep.',
      'The right sleep environment can make a significant difference in your baby\'s sleep quality. Keep the room cool (around 68-70°F), dark, and quiet. Use blackout curtains or shades to block out light, and consider a white noise machine to mask household sounds. Ensure the crib is safe and comfortable with a firm mattress and fitted sheet.',
      adminId
    ]);
    console.log('Created sample blog posts');

    // Insert sample testimonials
    console.log('Creating sample testimonials...');
    await pool.query(`
      INSERT INTO testimonials (parent_name, child_age, testimonial, rating, approved) VALUES 
      ($1, $2, $3, 5, true),
      ($4, $5, $6, 5, true),
      ($7, $8, $9, 5, true)
    `, [
      'Sarah Johnson',
      '8 months',
      'Happy Baby Sleeping transformed our nights completely! Within just two weeks, our 8-month-old went from waking up 5 times a night to sleeping through the night. The personalized approach and ongoing support made all the difference. I finally feel like myself again!',
      'Michael Chen',
      '6 months',
      'I was skeptical about sleep training, but the gentle methods recommended were perfect for our baby. The consultant was patient, knowledgeable, and provided practical solutions that actually worked. Our whole family is now getting better sleep.',
      'Emily Rodriguez',
      '10 months',
      'The comprehensive sleep package was worth every penny. Not only did our baby learn to sleep better, but we also learned valuable techniques for maintaining healthy sleep habits. Highly recommend to any exhausted parent!'
    ]);
    console.log('Created sample testimonials');

    console.log('✅ Render production database initialization complete!');
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Export the function for use by other scripts
module.exports = initDB;

// Run if called directly
if (require.main === module) {
  initDB().catch(error => {
    console.error('Fatal initialization error:', error);
    process.exit(1);
  });
}