const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'baby-sleep-secret-key-2025',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// In-memory storage for demo (replace with database in production)
let testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    message: "The sleep training program transformed our nights! Our 8-month-old now sleeps through the night consistently. The personalized approach made all the difference.",
    rating: 5,
    approved: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Michael Chen",
    message: "Professional, caring, and incredibly effective. Our baby went from waking up 5 times a night to sleeping peacefully. Highly recommended!",
    rating: 5,
    approved: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    message: "The gentle methods worked perfectly for our sensitive baby. We saw improvements within the first week. Thank you for giving us our sleep back!",
    rating: 5,
    approved: true,
    createdAt: new Date().toISOString()
  }
];

let blogPosts = [
  {
    id: 1,
    title: "5 Gentle Sleep Training Methods That Actually Work",
    content: "Sleep training doesn't have to be stressful for you or your baby. Here are five gentle, effective methods that have helped thousands of families achieve better sleep...",
    excerpt: "Discover gentle sleep training methods that work without the stress.",
    published: true,
    createdAt: new Date().toISOString(),
    author: "Baby Sleep Expert"
  },
  {
    id: 2,
    title: "Understanding Your Baby's Sleep Cycles",
    content: "Every parent should understand how baby sleep cycles work. This knowledge is the foundation of successful sleep training and helps you respond appropriately to your baby's needs...",
    excerpt: "Learn about baby sleep cycles and how to work with them.",
    published: true,
    createdAt: new Date().toISOString(),
    author: "Baby Sleep Expert"
  },
  {
    id: 3,
    title: "Creating the Perfect Sleep Environment",
    content: "The right sleep environment can make or break your baby's sleep. From room temperature to lighting, every detail matters when creating a space that promotes restful sleep...",
    excerpt: "Tips for creating the ideal sleep environment for your baby.",
    published: true,
    createdAt: new Date().toISOString(),
    author: "Baby Sleep Expert"
  }
];

let contacts = [];
let consultations = [];

// Demo admin user (in production, use proper user management)
const adminUser = {
  username: 'admin',
  password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: 'password123'
  id: 1
};

// Auth middleware
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
};

// API Routes
app.get('/api/auth/me', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (username === adminUser.username) {
      const validPassword = await bcrypt.compare(password, adminUser.password);
      if (validPassword) {
        req.session.user = { id: adminUser.id, username: adminUser.username };
        res.json({ message: 'Login successful', user: req.session.user });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logout successful' });
});

// Blog routes
app.get('/api/blog-posts', (req, res) => {
  const publishedPosts = blogPosts.filter(post => post.published);
  res.json(publishedPosts);
});

app.get('/api/blog-posts/:id', (req, res) => {
  const post = blogPosts.find(p => p.id === parseInt(req.params.id));
  if (!post || !post.published) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

// Testimonials routes
app.get('/api/testimonials', (req, res) => {
  const approvedTestimonials = testimonials.filter(t => t.approved);
  res.json(approvedTestimonials);
});

// Contact routes
app.post('/api/contacts', (req, res) => {
  const { name, email, message } = req.body;
  const newContact = {
    id: contacts.length + 1,
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };
  contacts.push(newContact);
  res.json({ message: 'Contact form submitted successfully' });
});

// Consultation routes
app.post('/api/consultations', (req, res) => {
  const { name, email, phone, serviceType, message } = req.body;
  const newConsultation = {
    id: consultations.length + 1,
    name,
    email,
    phone,
    serviceType,
    message,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  consultations.push(newConsultation);
  res.json({ message: 'Consultation request submitted successfully' });
});

// Admin routes
app.get('/api/admin/contacts', requireAuth, (req, res) => {
  res.json(contacts);
});

app.get('/api/admin/consultations', requireAuth, (req, res) => {
  res.json(consultations);
});

app.get('/api/admin/blog-posts', requireAuth, (req, res) => {
  res.json(blogPosts);
});

app.get('/api/admin/testimonials', requireAuth, (req, res) => {
  res.json(testimonials);
});

// Serve static files from dist/public
app.use(express.static(path.join(__dirname, 'dist/public')));

// Handle all other routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Baby Sleep Whisperer server running on port ${PORT}`);
});