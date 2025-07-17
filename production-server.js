const express = require('express');
const session = require('express-session');
const { Pool } = require('pg');
const crypto = require('crypto');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('trust proxy', 1);

// Serve static files from dist/public
app.use(express.static(path.join(__dirname, 'dist/public')));

// Serve assets from attached_assets directory
app.use('/attached_assets', express.static(path.join(__dirname, 'attached_assets')));

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Session configuration - Use simple memory store for production
app.use(session({
  store: new session.MemoryStore(),
  secret: process.env.SESSION_SECRET || "your-secret-key-change-in-production",
  resave: false,
  saveUninitialized: false,
  name: 'connect.sid',
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "lax",
  },
  proxy: true,
}));

// Helper functions
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  try {
    const [salt, hash] = storedHash.split(':');
    if (!salt || !hash) return false;
    const testHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === testHash;
  } catch (error) {
    return false;
  }
}

// Authentication middleware
function requireAuth(req, res, next) {
  console.log('Session check:', req.session?.user ? 'authenticated' : 'not authenticated');
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
}

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    
    if (!user || !verifyPassword(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      approved: user.approved,
      isApproved: user.approved || false
    };
    
    res.json({ 
      success: true, 
      user: req.session.user,
      authenticated: true
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.get('/api/auth/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ user: req.session.user });
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out successfully' });
});

// Admin API routes
app.get('/api/contacts', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.get('/api/consultations', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM consultations ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Get consultations error:', error);
    res.status(500).json({ error: 'Failed to fetch consultations' });
  }
});

app.get('/api/blog', async (req, res) => {
  try {
    // For admin dashboard, show all posts; for public, only published
    const isAdmin = req.session && req.session.user;
    let query = 'SELECT * FROM blog_posts';
    
    if (!isAdmin) {
      query += ' WHERE published = true';
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await pool.query(query);
    const posts = result.rows.map(post => ({
      ...post,
      imageUrl: post.image_url,
      authorId: post.author_id,
      createdAt: post.created_at
    }));
    res.json(posts);
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Get individual blog post by slug
app.get('/api/blog/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query('SELECT * FROM blog_posts WHERE slug = $1 AND published = true', [slug]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    const post = result.rows[0];
    const blogPost = {
      ...post,
      imageUrl: post.image_url,
      authorId: post.author_id,
      createdAt: post.created_at
    };
    
    res.json(blogPost);
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

app.get('/api/testimonials', async (req, res) => {
  try {
    const { approved } = req.query;
    let query = 'SELECT * FROM testimonials';
    let params = [];
    
    if (approved === 'true') {
      query += ' WHERE approved = true';
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await pool.query(query, params);
    const testimonials = result.rows.map(t => ({
      ...t,
      parentName: t.parent_name,
      childAge: t.child_age,
      photoUrl: t.photo_url,
      createdAt: t.created_at
    }));
    
    res.json(testimonials);
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Create new blog post
app.post('/api/blog', requireAuth, async (req, res) => {
  try {
    const { title, content, excerpt, slug, published, imageUrl } = req.body;
    const authorId = req.session.user.id;
    
    const result = await pool.query(
      'INSERT INTO blog_posts (title, content, excerpt, slug, published, image_url, author_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *',
      [title, content, excerpt, slug, published, imageUrl, authorId]
    );
    
    const post = result.rows[0];
    const blogPost = {
      ...post,
      imageUrl: post.image_url,
      authorId: post.author_id,
      createdAt: post.created_at
    };
    
    res.json(blogPost);
  } catch (error) {
    console.error('Create blog post error:', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// Create new testimonial
app.post('/api/testimonials', requireAuth, async (req, res) => {
  try {
    const { parentName, testimonial, childAge, rating, photoUrl, approved } = req.body;
    
    const result = await pool.query(
      'INSERT INTO testimonials (parent_name, testimonial, child_age, rating, photo_url, approved, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
      [parentName, testimonial, childAge, rating, photoUrl, approved]
    );
    
    const newTestimonial = result.rows[0];
    const testimonialData = {
      ...newTestimonial,
      parentName: newTestimonial.parent_name,
      childAge: newTestimonial.child_age,
      photoUrl: newTestimonial.photo_url,
      createdAt: newTestimonial.created_at
    };
    
    res.json(testimonialData);
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

// Contact management API
app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const result = await pool.query(
      'INSERT INTO contacts (name, email, phone, subject, message, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
      [name, email, phone, subject, message]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

app.get('/api/contacts', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    const contacts = result.rows.map(contact => ({
      ...contact,
      createdAt: contact.created_at
    }));
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.patch('/api/contacts/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { responded } = req.body;
    await pool.query('UPDATE contacts SET responded = $1 WHERE id = $2', [responded, id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

app.delete('/api/contacts/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

// Consultation management API
app.post('/api/consultations', async (req, res) => {
  try {
    const { parentName, email, phone, childAge, sleepChallenges, consultationType, preferredDate } = req.body;
    const result = await pool.query(
      'INSERT INTO consultations (parent_name, email, phone, child_age, sleep_challenges, consultation_type, preferred_date, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING *',
      [parentName, email, phone, childAge, sleepChallenges, consultationType, preferredDate, 'pending']
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Create consultation error:', error);
    res.status(500).json({ error: 'Failed to create consultation' });
  }
});

app.get('/api/consultations', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM consultations ORDER BY created_at DESC');
    const consultations = result.rows.map(consultation => ({
      ...consultation,
      parentName: consultation.parent_name,
      childAge: consultation.child_age,
      sleepChallenges: consultation.sleep_challenges,
      consultationType: consultation.consultation_type,
      preferredDate: consultation.preferred_date,
      createdAt: consultation.created_at
    }));
    res.json(consultations);
  } catch (error) {
    console.error('Get consultations error:', error);
    res.status(500).json({ error: 'Failed to fetch consultations' });
  }
});

app.patch('/api/consultations/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    await pool.query('UPDATE consultations SET status = $1, notes = $2 WHERE id = $3', [status, notes, id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Update consultation error:', error);
    res.status(500).json({ error: 'Failed to update consultation' });
  }
});

app.delete('/api/consultations/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM consultations WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Delete consultation error:', error);
    res.status(500).json({ error: 'Failed to delete consultation' });
  }
});

// Get users for admin dashboard
app.get('/api/admin/users', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, email, approved, created_at, approved_at FROM users ORDER BY created_at DESC');
    const users = result.rows.map(user => ({
      ...user,
      createdAt: user.created_at,
      approvedAt: user.approved_at,
      role: 'Admin',
      canManageUsers: true,
      canManageContacts: true,
      canManageConsultations: true,
      canManageBlog: true,
      canManageTestimonials: true
    }));
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Admin login page
app.get('/admin/auth', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

// Admin dashboard
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

// Blog routes
app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

app.get('/blog/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

// Redirect old admin auth route
app.get('/admin-auth', (req, res) => {
  res.redirect('/admin/auth');
});

// React catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});