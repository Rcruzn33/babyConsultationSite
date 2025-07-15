const express = require('express');
const path = require('path');
const session = require('express-session');
const ConnectPgSimple = require('connect-pg-simple');
const { Pool } = require('pg');
const crypto = require('crypto');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Trust proxy for production deployment
app.set('trust proxy', 1);

// Redirect www to non-www
app.use((req, res, next) => {
  if (req.headers.host && req.headers.host.startsWith('www.')) {
    const redirectHost = req.headers.host.slice(4);
    const redirectUrl = `${req.protocol}://${redirectHost}${req.originalUrl}`;
    return res.redirect(301, redirectUrl);
  }
  next();
});

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
  saveUninitialized: true,
  name: 'connect.sid',
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "lax",
  },
}));

// Helper functions
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  const [salt, hash] = storedHash.split(':');
  const testHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === testHash;
}

// Authentication middleware
function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
}

// File upload configuration
const uploadDir = path.join(__dirname, 'dist', 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// API Routes
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = hashPassword(password);
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash, approved) VALUES ($1, $2, $3, false) RETURNING id, username, email, approved',
      [username, email, hashedPassword]
    );

    res.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND approved = true',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials or account not approved' });
    }

    const user = result.rows[0];
    if (!verifyPassword(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    res.json({ success: true, user: req.session.user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

app.get('/api/me', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Contact form
app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    const result = await pool.query(
      'INSERT INTO contacts (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone, message]
    );

    res.json({ success: true, contact: result.rows[0] });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Consultations
app.post('/api/consultations', async (req, res) => {
  try {
    const { name, email, phone, service_type, child_age, current_challenges, preferred_date, preferred_time } = req.body;
    
    const result = await pool.query(
      'INSERT INTO consultations (name, email, phone, service_type, child_age, current_challenges, preferred_date, preferred_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, email, phone, service_type, child_age, current_challenges, preferred_date, preferred_time]
    );

    res.json({ success: true, consultation: result.rows[0] });
  } catch (error) {
    console.error('Consultation booking error:', error);
    res.status(500).json({ error: 'Failed to book consultation' });
  }
});

// Blog posts
app.get('/api/blog-posts', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Blog posts error:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Testimonials
app.get('/api/testimonials', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM testimonials WHERE approved = true ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Testimonials error:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Admin routes
app.get('/api/admin/contacts', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Admin contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.get('/api/admin/consultations', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM consultations ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Admin consultations error:', error);
    res.status(500).json({ error: 'Failed to fetch consultations' });
  }
});

app.get('/api/admin/blog-posts', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Admin blog posts error:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

app.get('/api/admin/testimonials', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Admin testimonials error:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Static file serving
app.use('/uploads', express.static(uploadDir));
app.use('/attached_assets', express.static(path.join(__dirname, 'attached_assets')));

// Serve built React app
const distPath = path.join(__dirname, 'dist', 'public');
app.use(express.static(distPath));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📝 Admin login: admin/password123`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});