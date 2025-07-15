const express = require('express');
const path = require('path');
const session = require('express-session');
const { Pool } = require('pg');
const crypto = require('crypto');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Trust proxy for production deployment
app.set('trust proxy', 1);

// Database connection with fallback for development
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/baby_sleep_dev',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Simple session store for development
app.use(session({
  secret: process.env.SESSION_SECRET || "dev-secret-key",
  resave: false,
  saveUninitialized: true,
  name: 'connect.sid',
  cookie: {
    secure: false,
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

// Initialize in-memory storage for development
let contacts = [];
let consultations = [];
let blogPosts = [
  {
    id: 1,
    title: "5 Essential Sleep Tips for New Parents",
    content: "Creating a consistent bedtime routine is crucial for your baby's sleep development. Here are five proven strategies that can help establish healthy sleep patterns from the very beginning...",
    excerpt: "Learn the fundamental sleep strategies every new parent should know.",
    author: "Admin",
    published: true,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Understanding Baby Sleep Cycles",
    content: "Baby sleep cycles are different from adult sleep patterns. Understanding these differences can help you work with your baby's natural rhythm rather than against it...",
    excerpt: "A comprehensive guide to how babies sleep and what to expect.",
    author: "Admin",
    published: true,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: "Common Sleep Challenges and Solutions",
    content: "Every parent faces sleep challenges with their little one. From sleep regressions to night wakings, here are practical solutions to the most common issues...",
    excerpt: "Practical advice for overcoming typical baby sleep problems.",
    author: "Admin",
    published: true,
    created_at: new Date().toISOString()
  }
];

let testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    content: "The sleep consultation changed our lives! Our baby now sleeps through the night and we finally feel rested. The personalized approach made all the difference.",
    rating: 5,
    approved: true,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: "Michael & Lisa",
    content: "We were skeptical at first, but the results speak for themselves. Our 6-month-old went from waking every 2 hours to sleeping 8-hour stretches. Thank you!",
    rating: 5,
    approved: true,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: "Jennifer K.",
    content: "Professional, caring, and incredibly knowledgeable. The sleep plan was easy to follow and we saw improvements within the first week. Highly recommend!",
    rating: 5,
    approved: true,
    created_at: new Date().toISOString()
  }
];

let users = [{
  id: 1,
  username: 'admin',
  email: 'admin@happybabysleeping.com',
  password_hash: hashPassword('password123'),
  role: 'admin',
  approved: true
}];

// API Routes
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = hashPassword(password);
    const user = {
      id: users.length + 1,
      username,
      email,
      password_hash: hashedPassword,
      approved: false,
      role: 'user'
    };
    
    users.push(user);
    res.json({ success: true, user: { id: user.id, username: user.username, email: user.email, approved: user.approved } });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = users.find(u => u.username === username && u.approved);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials or account not approved' });
    }

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
    
    const contact = {
      id: contacts.length + 1,
      name,
      email,
      phone,
      message,
      created_at: new Date().toISOString()
    };
    
    contacts.push(contact);
    res.json({ success: true, contact });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Consultations
app.post('/api/consultations', async (req, res) => {
  try {
    const { name, email, phone, service_type, child_age, current_challenges, preferred_date, preferred_time } = req.body;
    
    const consultation = {
      id: consultations.length + 1,
      name,
      email,
      phone,
      service_type,
      child_age,
      current_challenges,
      preferred_date,
      preferred_time,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    
    consultations.push(consultation);
    res.json({ success: true, consultation });
  } catch (error) {
    console.error('Consultation booking error:', error);
    res.status(500).json({ error: 'Failed to book consultation' });
  }
});

// Blog posts
app.get('/api/blog-posts', async (req, res) => {
  try {
    const published = blogPosts.filter(post => post.published);
    res.json(published);
  } catch (error) {
    console.error('Blog posts error:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Testimonials
app.get('/api/testimonials', async (req, res) => {
  try {
    const approved = testimonials.filter(testimonial => testimonial.approved);
    res.json(approved);
  } catch (error) {
    console.error('Testimonials error:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Admin routes
app.get('/api/admin/contacts', requireAuth, async (req, res) => {
  try {
    res.json(contacts);
  } catch (error) {
    console.error('Admin contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.get('/api/admin/consultations', requireAuth, async (req, res) => {
  try {
    res.json(consultations);
  } catch (error) {
    console.error('Admin consultations error:', error);
    res.status(500).json({ error: 'Failed to fetch consultations' });
  }
});

app.get('/api/admin/blog-posts', requireAuth, async (req, res) => {
  try {
    res.json(blogPosts);
  } catch (error) {
    console.error('Admin blog posts error:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

app.get('/api/admin/testimonials', requireAuth, async (req, res) => {
  try {
    res.json(testimonials);
  } catch (error) {
    console.error('Admin testimonials error:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Static file serving
app.use('/attached_assets', express.static(path.join(__dirname, 'attached_assets')));

// For development, serve a simple HTML page
app.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Baby Sleep Consulting - Development Server</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #2563eb; }
        .status { background: #dcfce7; padding: 15px; border-radius: 4px; margin: 20px 0; }
        .api-test { background: #f3f4f6; padding: 15px; border-radius: 4px; margin: 10px 0; }
        button { background: #2563eb; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #1d4ed8; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Happy Baby Sleeping - Development Server</h1>
        
        <div class="status">
          ✅ <strong>Server is running successfully!</strong><br>
          This is a development server that bypasses the vite configuration issues.
        </div>
        
        <h2>API Test Endpoints</h2>
        <div class="api-test">
          <button onclick="testAPI('/api/testimonials')">Test Testimonials</button>
          <button onclick="testAPI('/api/blog-posts')">Test Blog Posts</button>
          <button onclick="testAdmin()">Test Admin Login</button>
        </div>
        
        <h2>Login Information</h2>
        <p><strong>Admin Username:</strong> admin</p>
        <p><strong>Admin Password:</strong> password123</p>
        
        <div id="result"></div>
        
        <script>
          function testAPI(endpoint) {
            fetch(endpoint)
              .then(response => response.json())
              .then(data => {
                document.getElementById('result').innerHTML = '<h3>API Response:</h3><pre>' + JSON.stringify(data, null, 2) + '</pre>';
              })
              .catch(error => {
                document.getElementById('result').innerHTML = '<h3>Error:</h3><pre>' + error.message + '</pre>';
              });
          }
          
          function testAdmin() {
            fetch('/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username: 'admin', password: 'password123' })
            })
            .then(response => response.json())
            .then(data => {
              document.getElementById('result').innerHTML = '<h3>Admin Login Response:</h3><pre>' + JSON.stringify(data, null, 2) + '</pre>';
            })
            .catch(error => {
              document.getElementById('result').innerHTML = '<h3>Error:</h3><pre>' + error.message + '</pre>';
            });
          }
        </script>
      </div>
    </body>
    </html>
  `);
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Development server running on port ${port}`);
  console.log(`📝 Admin login: admin/password123`);
  console.log(`🔧 This server bypasses vite configuration issues`);
  console.log(`🌐 Visit: http://localhost:${port}`);
});