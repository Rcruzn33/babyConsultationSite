/**
 * QUICK PRODUCTION FIX - Dashboard Rendering Issue
 * Directly updates production-server.js to handle admin dashboard properly
 */

const express = require('express');
const session = require('express-session');
const ConnectPgSimple = require('connect-pg-simple');
const { Pool } = require('pg');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

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

// Session configuration
const PgSession = ConnectPgSimple(session);
app.use(session({
  store: new PgSession({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  }),
  secret: process.env.SESSION_SECRET || "your-secret-key-change-in-production",
  resave: false,
  saveUninitialized: false,
  name: 'connect.sid',
  cookie: {
    secure: process.env.NODE_ENV === 'production',
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
    const result = await pool.query('SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC');
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

// Admin authentication route (React app expects /admin/auth)
app.get('/admin/auth', (req, res) => {
  if (req.session.user) {
    return res.redirect('/admin');
  }
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

// Legacy admin-auth route for backward compatibility
app.get('/admin-auth', (req, res) => {
  res.redirect('/admin/auth');
});

// Admin dashboard route
app.get('/admin', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/admin/auth');
  }
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

// Blog post detail routes
app.get('/blog/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

// All other admin routes
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

// Catch-all handler for React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📝 Admin login: admin/password123`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Export for testing
module.exports = app;