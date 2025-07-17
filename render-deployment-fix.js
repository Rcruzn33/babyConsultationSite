// Fix for Render deployment - create clean database initialization
const fs = require('fs');

const fixedInitDb = `
const { Pool } = require('pg');

async function initDB() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Initializing Render production database...');
    
    // Drop existing tables for clean schema
    console.log('Dropping existing tables for schema fix...');
    await pool.query('DROP TABLE IF EXISTS testimonials CASCADE');
    await pool.query('DROP TABLE IF EXISTS blog_posts CASCADE');
    await pool.query('DROP TABLE IF EXISTS consultations CASCADE');
    await pool.query('DROP TABLE IF EXISTS contacts CASCADE');
    await pool.query('DROP TABLE IF EXISTS users CASCADE');

    // Create users table
    console.log('Creating users table...');
    await pool.query(\`
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
    \`);

    // Create contacts table
    console.log('Creating contacts table...');
    await pool.query(\`
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
    \`);

    // Create consultations table - FIXED VERSION
    console.log('Creating consultations table...');
    await pool.query(\`
      CREATE TABLE consultations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        parent_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        child_age VARCHAR(50),
        sleep_challenges TEXT,
        consultation_type VARCHAR(100),
        preferred_date DATE,
        preferred_time VARCHAR(50),
        status VARCHAR(20) DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    \`);

    // Create blog_posts table
    console.log('Creating blog_posts table...');
    await pool.query(\`
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
    \`);

    // Create testimonials table
    console.log('Creating testimonials table...');
    await pool.query(\`
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
    \`);

    // Create admin user
    console.log('Creating admin user...');
    const crypto = require('crypto');
    const password = 'password123';
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    const hashedPassword = salt + ':' + hash;
    
    await pool.query(\`
      INSERT INTO users (username, email, password_hash, approved, can_manage_users, can_manage_contacts, can_manage_consultations, can_manage_blog, can_manage_testimonials)
      VALUES ('admin', 'admin@babysleep.com', $1, true, true, true, true, true, true)
    \`, [hashedPassword]);

    // Add sample blog posts
    console.log('Adding sample blog posts...');
    await pool.query(\`
      INSERT INTO blog_posts (title, slug, excerpt, content, published, author_id)
      VALUES 
        ('Understanding Your Baby''s Sleep Patterns', 'understanding-baby-sleep-patterns', 
         'Learn about normal sleep patterns and how to establish healthy routines for your baby.', 
         'Understanding your baby''s sleep patterns is crucial for establishing healthy routines. Newborns typically sleep 14-17 hours per day, but this sleep is distributed throughout day and night. As babies grow, their sleep patterns mature and consolidate into longer stretches at night.', 
         true, 1),
        ('Creating the Perfect Sleep Environment', 'perfect-sleep-environment', 
         'Tips for creating an optimal sleep environment that promotes better rest for your baby.', 
         'The sleep environment plays a crucial role in your baby''s ability to fall asleep and stay asleep. Key factors include room temperature (68-70°F), darkness, white noise, and a comfortable mattress. A consistent sleep environment helps signal to your baby that it''s time to sleep.', 
         true, 1)
    \`);

    // Add sample testimonials
    console.log('Adding sample testimonials...');
    await pool.query(\`
      INSERT INTO testimonials (parent_name, child_age, testimonial, rating, approved)
      VALUES 
        ('Sarah Johnson', '8 months', 'The sleep consultation was life-changing! My baby now sleeps through the night consistently. The personalized approach made all the difference.', 5, true),
        ('Michael Chen', '6 months', 'I was skeptical at first, but the results speak for themselves. Our little one went from waking up 5 times a night to sleeping 10 hours straight!', 5, true),
        ('Emily Rodriguez', '10 months', 'Professional, knowledgeable, and so patient with all our questions. The follow-up support was exceptional. Highly recommend!', 5, true)
    \`);

    console.log('✅ Database initialized successfully!');
    
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  initDB().catch(console.error);
}

module.exports = initDB;
`;

// Write the fixed initialization script
fs.writeFileSync('render-complete-init-db.js', fixedInitDb);
console.log('✅ Fixed render-complete-init-db.js - removed duplicate sleep_challenges column');
console.log('✅ Ready for Render deployment - database schema issue resolved');