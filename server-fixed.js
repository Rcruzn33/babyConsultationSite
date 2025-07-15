const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'baby-sleep-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Configure multer for file uploads
const uploadDir = path.join(__dirname, 'client', 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
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

// Static file serving
app.use('/uploads', express.static(uploadDir));
app.use('/attached_assets', express.static(path.join(__dirname, 'attached_assets')));

// Sample data for development
const sampleData = {
  testimonials: [
    {
      id: 1,
      parent_name: "Sarah Johnson",
      child_age: "8 months",
      testimonial: "The sleep consulting service was life-changing! My baby now sleeps through the night consistently. We went from 3-4 wake-ups to sleeping 11 hours straight.",
      rating: 5,
      approved: true,
      created_at: new Date('2024-01-15').toISOString()
    },
    {
      id: 2,
      parent_name: "Michael Chen",
      child_age: "6 months",
      testimonial: "After two weeks following the sleep plan, our little one went from waking 4-5 times per night to sleeping through the night. The gentle approach worked perfectly for our family.",
      rating: 5,
      approved: true,
      created_at: new Date('2024-01-20').toISOString()
    },
    {
      id: 3,
      parent_name: "Emma Davis",
      child_age: "10 months",
      testimonial: "I was skeptical at first, but the personalized sleep plan made all the difference. Our baby learned to self-soothe and we all get better sleep now.",
      rating: 5,
      approved: true,
      created_at: new Date('2024-01-25').toISOString()
    }
  ],
  blogPosts: [
    {
      id: 1,
      title: "The Ultimate Guide to Baby Sleep Training",
      slug: "ultimate-guide-baby-sleep-training",
      excerpt: "Learn gentle and effective methods to help your baby develop healthy sleep habits that will benefit the whole family.",
      content: "Sleep training is one of the most important skills you can teach your baby. This comprehensive guide covers everything from establishing routines to handling night wakings. We'll explore gentle methods that work with your baby's natural development while giving you the tools you need for success.",
      author: "Sleep Consultant",
      published: true,
      created_at: new Date('2024-01-10').toISOString()
    },
    {
      id: 2,
      title: "Creating the Perfect Sleep Environment",
      slug: "perfect-sleep-environment",
      excerpt: "Discover how to set up your baby's room for optimal sleep success.",
      content: "The right environment can make or break your baby's sleep. Learn about lighting, temperature, sound, and safety considerations. We'll cover everything from blackout curtains to white noise machines, and how to create a space that promotes healthy sleep patterns.",
      author: "Sleep Consultant",
      published: true,
      created_at: new Date('2024-01-12').toISOString()
    },
    {
      id: 3,
      title: "Understanding Baby Sleep Cycles",
      slug: "understanding-baby-sleep-cycles",
      excerpt: "Learn about your baby's natural sleep patterns and how to work with them.",
      content: "Understanding your baby's sleep cycles is crucial for successful sleep training. We'll explore how baby sleep differs from adult sleep, the importance of sleep windows, and how to recognize your baby's unique sleep cues.",
      author: "Sleep Consultant",
      published: true,
      created_at: new Date('2024-01-18').toISOString()
    }
  ],
  contacts: [],
  consultations: []
};

// API Routes
app.get('/api/testimonials', (req, res) => {
  res.json(sampleData.testimonials.filter(t => t.approved));
});

app.get('/api/blog', (req, res) => {
  res.json(sampleData.blogPosts.filter(p => p.published));
});

app.get('/api/blog/:slug', (req, res) => {
  const post = sampleData.blogPosts.find(p => p.slug === req.params.slug && p.published);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Blog post not found' });
  }
});

app.post('/api/contacts', (req, res) => {
  const contact = {
    id: Date.now(),
    ...req.body,
    created_at: new Date().toISOString(),
    status: 'new'
  };
  sampleData.contacts.push(contact);
  console.log('Contact form submitted:', contact);
  res.json({ success: true, message: 'Contact form submitted successfully' });
});

app.post('/api/consultations', (req, res) => {
  const consultation = {
    id: Date.now(),
    ...req.body,
    created_at: new Date().toISOString(),
    status: 'pending'
  };
  sampleData.consultations.push(consultation);
  console.log('Consultation request submitted:', consultation);
  res.json({ success: true, message: 'Consultation request submitted successfully' });
});

// Admin routes (basic implementation)
app.get('/api/admin/contacts', (req, res) => {
  res.json(sampleData.contacts);
});

app.get('/api/admin/consultations', (req, res) => {
  res.json(sampleData.consultations);
});

app.get('/api/admin/testimonials', (req, res) => {
  res.json(sampleData.testimonials);
});

app.get('/api/admin/blog', (req, res) => {
  res.json(sampleData.blogPosts);
});

// Client-side routing support
const clientRoutes = [
  '/admin', '/admin/*', '/about', '/services', '/blog', '/blog/*', 
  '/contact', '/privacy-policy', '/terms-of-service'
];

app.get(clientRoutes, (req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return next();
  }
  
  // Serve the React app
  const indexPath = path.join(__dirname, 'client', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Baby Sleep Consulting</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .container { max-width: 600px; margin: 0 auto; }
            .error { color: #dc3545; }
            .info { color: #0dcaf0; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Baby Sleep Consulting</h1>
            <p class="error">The React application is not built yet.</p>
            <p class="info">Please run <code>npm run build:client</code> to build the frontend application.</p>
            <p>Once built, the full application will be available with all features including:</p>
            <ul style="text-align: left;">
              <li>Professional sleep consulting services</li>
              <li>Client testimonials and success stories</li>
              <li>Educational blog posts about baby sleep</li>
              <li>Contact forms and consultation booking</li>
              <li>Admin dashboard for content management</li>
            </ul>
          </div>
        </body>
      </html>
    `);
  }
});

// Default route for React app
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'client', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Baby Sleep Consulting - Development Server</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            h1 { color: #2c3e50; margin-bottom: 30px; }
            .status { background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .api-list { text-align: left; background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .api-endpoint { font-family: monospace; background: #e9ecef; padding: 5px 10px; border-radius: 4px; margin: 5px 0; display: block; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🌙 Baby Sleep Consulting - Development Server</h1>
            <div class="status">
              <h3>Server Status: ✅ Running</h3>
              <p>The Express server is running successfully on port ${PORT}</p>
            </div>
            
            <h3>Available API Endpoints:</h3>
            <div class="api-list">
              <code class="api-endpoint">GET /api/testimonials - Client testimonials</code>
              <code class="api-endpoint">GET /api/blog - Blog posts</code>
              <code class="api-endpoint">GET /api/blog/:slug - Individual blog post</code>
              <code class="api-endpoint">POST /api/contacts - Submit contact form</code>
              <code class="api-endpoint">POST /api/consultations - Book consultation</code>
              <code class="api-endpoint">GET /api/admin/contacts - Admin: View contacts</code>
              <code class="api-endpoint">GET /api/admin/consultations - Admin: View consultations</code>
            </div>
            
            <h3>Next Steps:</h3>
            <p>To see the full React application, run: <code>npm run build:client</code></p>
            <p>This will build the frontend and make the complete website available.</p>
          </div>
        </body>
      </html>
    `);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌙 Baby Sleep Consulting Server running on port ${PORT}`);
  console.log(`📱 Access your application at: http://localhost:${PORT}`);
  console.log(`🔧 Development server ready`);
});