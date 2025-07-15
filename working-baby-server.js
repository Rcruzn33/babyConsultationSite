const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/public')));

// Sample data for testimonials and blog posts
const testimonials = [
  {
    id: 1,
    parent_name: "Sarah Johnson",
    child_age: "8 months",
    testimonial: "The sleep consulting service was life-changing! My baby now sleeps through the night consistently. We went from 3-4 wake-ups to sleeping 11 hours straight.",
    rating: 5,
    approved: true
  },
  {
    id: 2,
    parent_name: "Michael Chen",
    child_age: "6 months", 
    testimonial: "After two weeks following the sleep plan, our little one went from waking 4-5 times per night to sleeping through the night. The gentle approach worked perfectly for our family.",
    rating: 5,
    approved: true
  },
  {
    id: 3,
    parent_name: "Emma Davis",
    child_age: "10 months",
    testimonial: "I was skeptical at first, but the personalized sleep plan made all the difference. Our baby learned to self-soothe and we all get better sleep now.",
    rating: 5,
    approved: true
  }
];

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Baby Sleep Training",
    excerpt: "Learn gentle and effective methods to help your baby develop healthy sleep habits that will benefit the whole family.",
    content: "Sleep training is one of the most important skills you can teach your baby. This comprehensive guide covers everything from establishing routines to handling night wakings.",
    author: "Sleep Consultant",
    published: true,
    created_at: new Date('2024-01-10').toISOString()
  },
  {
    id: 2,
    title: "Creating the Perfect Sleep Environment",
    excerpt: "Discover how to set up your baby's room for optimal sleep success.",
    content: "The right environment can make or break your baby's sleep. Learn about lighting, temperature, sound, and safety considerations.",
    author: "Sleep Consultant",
    published: true,
    created_at: new Date('2024-01-12').toISOString()
  }
];

// API Routes
app.get('/api/testimonials', (req, res) => {
  res.json(testimonials);
});

app.get('/api/blog', (req, res) => {
  res.json(blogPosts);
});

app.post('/api/contacts', (req, res) => {
  console.log('Contact form submitted:', req.body);
  res.json({ success: true, message: 'Contact form submitted successfully' });
});

app.post('/api/consultations', (req, res) => {
  console.log('Consultation request submitted:', req.body);
  res.json({ success: true, message: 'Consultation request submitted successfully' });
});

// Serve client files
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'client/index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Application not found. Please make sure the client files are built.');
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌙 Baby Sleep Consulting Server running on port ${PORT}`);
  console.log(`📱 Access your application at: http://localhost:${PORT}`);
});