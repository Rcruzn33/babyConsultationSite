/**
 * Complete Admin System for Hostinger VPS
 * Replicates the original Replit admin interface exactly
 * Baby Sleep Whisperer - Complete Admin Dashboard
 */

const express = require('express');
const session = require('express-session');
const path = require('path');
const crypto = require('crypto');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://admin:admin123@localhost:5432/baby_sleep_db',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Admin user data (in production, this would be in database)
const adminUser = {
  username: 'admin',
  password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: 'password123'
  id: 1
};

// Auth middleware
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
}

// Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (username === adminUser.username && bcrypt.compareSync(password, adminUser.password)) {
      req.session.userId = adminUser.id;
      res.json({ 
        success: true, 
        message: 'Login successful',
        user: { id: adminUser.id, username: adminUser.username }
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ error: 'Could not log out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

// Protected admin routes
app.get('/api/admin/testimonials', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

app.get('/api/admin/contacts', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.get('/api/admin/consultations', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM consultations ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ error: 'Failed to fetch consultations' });
  }
});

app.get('/api/admin/blog', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Admin login page
app.get('/admin-auth', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            background: linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%);
            min-height: 100vh;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .btn-primary {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            border: none;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            width: 100%;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
        }
        .form-input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s ease;
        }
        .form-input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .hero-section {
            background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%);
            color: white;
            padding: 48px;
            border-radius: 12px;
            margin-bottom: 32px;
        }
        .feature-item {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
        }
        .feature-icon {
            width: 20px;
            height: 20px;
            color: #60a5fa;
        }
    </style>
</head>
<body>
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
            <!-- Left side - Hero content -->
            <div class="hero-section">
                <h1 class="text-4xl font-bold mb-4">
                    Admin Dashboard
                </h1>
                <p class="text-xl text-blue-100 mb-6">
                    Manage your baby sleep consulting business with our comprehensive admin tools.
                </p>
                <div class="space-y-4">
                    <div class="feature-item">
                        <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                        <span>Secure authentication system</span>
                    </div>
                    <div class="feature-item">
                        <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <span>Admin approval required</span>
                    </div>
                    <div class="feature-item">
                        <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span>Email notifications</span>
                    </div>
                </div>
                <div class="mt-8">
                    <a href="/" class="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        ← Back to Main Site
                    </a>
                </div>
            </div>

            <!-- Right side - Login form -->
            <div class="card p-8">
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-bold text-blue-600 mb-2">
                        Happy Baby Sleeping
                    </h2>
                    <p class="text-gray-600">
                        Admin Portal Access
                    </p>
                </div>

                <form id="loginForm">
                    <div class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input 
                                type="text" 
                                id="username" 
                                name="username" 
                                class="form-input"
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                class="form-input"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button type="submit" class="btn-primary">
                            Sign In
                        </button>
                    </div>
                </form>

                <div id="message" class="mt-4 text-center"></div>
            </div>
        </div>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const messageDiv = document.getElementById('message');
            
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    messageDiv.innerHTML = '<div class="text-green-600 font-medium">Login successful! Redirecting...</div>';
                    setTimeout(() => {
                        window.location.href = '/admin.html';
                    }, 1000);
                } else {
                    messageDiv.innerHTML = '<div class="text-red-600 font-medium">' + data.error + '</div>';
                }
            } catch (error) {
                console.error('Login error:', error);
                messageDiv.innerHTML = '<div class="text-red-600 font-medium">Login failed. Please try again.</div>';
            }
        });
    </script>
</body>
</html>
  `);
});

// Admin dashboard page
app.get('/admin.html', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Baby Sleep Whisperer - Admin Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .dashboard-header {
            background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%);
            color: white;
            padding: 24px;
            border-radius: 12px;
            margin-bottom: 32px;
            box-shadow: 0 10px 25px rgba(30, 64, 175, 0.3);
        }
        .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
            border: 1px solid #e5e7eb;
        }
        .btn {
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        .btn-primary {
            background: #3b82f6;
            color: white;
        }
        .btn-primary:hover {
            background: #2563eb;
            transform: translateY(-1px);
        }
        .btn-success {
            background: #10b981;
            color: white;
        }
        .btn-success:hover {
            background: #059669;
        }
        .btn-warning {
            background: #f59e0b;
            color: white;
        }
        .btn-warning:hover {
            background: #d97706;
        }
        .btn-danger {
            background: #ef4444;
            color: white;
        }
        .btn-danger:hover {
            background: #dc2626;
        }
        .btn-secondary {
            background: #6b7280;
            color: white;
        }
        .btn-secondary:hover {
            background: #4b5563;
        }
        .stat-card {
            background: white;
            padding: 24px;
            border-radius: 12px;
            border-left: 4px solid #3b82f6;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .stat-number {
            font-size: 32px;
            font-weight: 700;
            color: #1f2937;
        }
        .stat-label {
            color: #6b7280;
            font-size: 14px;
            margin-top: 4px;
        }
        .tab-button {
            padding: 12px 24px;
            border: none;
            background: #f3f4f6;
            color: #6b7280;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-weight: 500;
        }
        .tab-button.active {
            background: #3b82f6;
            color: white;
        }
        .tab-button:hover {
            background: #e5e7eb;
        }
        .tab-button.active:hover {
            background: #2563eb;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
        }
        .table th {
            background: #f9fafb;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            color: #374151;
            border-bottom: 2px solid #e5e7eb;
        }
        .table td {
            padding: 12px;
            border-bottom: 1px solid #e5e7eb;
            color: #6b7280;
        }
        .table tr:hover {
            background: #f9fafb;
        }
        .badge {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
        }
        .badge-success {
            background: #dcfce7;
            color: #166534;
        }
        .badge-warning {
            background: #fef3c7;
            color: #92400e;
        }
        .badge-danger {
            background: #fee2e2;
            color: #991b1b;
        }
        .hidden {
            display: none;
        }
        .loading {
            text-align: center;
            padding: 48px;
            color: #6b7280;
        }
    </style>
</head>
<body class="bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="dashboard-header">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-3xl font-bold mb-2">Admin Dashboard</h1>
                    <p class="text-blue-100">Manage your baby sleep consulting business</p>
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-blue-100">Welcome, Admin</span>
                    <a href="/" class="btn btn-secondary">
                        🏠 Main Site
                    </a>
                    <button onclick="logout()" class="btn btn-danger">
                        🚪 Logout
                    </button>
                </div>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="stat-card">
                <div class="stat-number" id="contactCount">0</div>
                <div class="stat-label">New Contacts</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="consultationCount">0</div>
                <div class="stat-label">Consultations</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="testimonialCount">0</div>
                <div class="stat-label">Testimonials</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="blogCount">0</div>
                <div class="stat-label">Blog Posts</div>
            </div>
        </div>

        <!-- Tabs Navigation -->
        <div class="mb-8">
            <div class="flex space-x-4">
                <button class="tab-button active" onclick="showTab('contacts')">
                    📧 Contacts
                </button>
                <button class="tab-button" onclick="showTab('consultations')">
                    🗓️ Consultations
                </button>
                <button class="tab-button" onclick="showTab('testimonials')">
                    ⭐ Testimonials
                </button>
                <button class="tab-button" onclick="showTab('blog')">
                    📝 Blog Posts
                </button>
            </div>
        </div>

        <!-- Content Sections -->
        <div id="contacts" class="tab-content">
            <div class="card">
                <div class="p-6 border-b">
                    <h2 class="text-xl font-semibold text-gray-900">Contact Submissions</h2>
                </div>
                <div class="p-6">
                    <div id="contactsLoading" class="loading">Loading contacts...</div>
                    <div id="contactsContent" class="hidden">
                        <div class="overflow-x-auto">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Subject</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="contactsTable">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="consultations" class="tab-content hidden">
            <div class="card">
                <div class="p-6 border-b">
                    <h2 class="text-xl font-semibold text-gray-900">Consultation Requests</h2>
                </div>
                <div class="p-6">
                    <div id="consultationsLoading" class="loading">Loading consultations...</div>
                    <div id="consultationsContent" class="hidden">
                        <div class="overflow-x-auto">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Parent Name</th>
                                        <th>Child Age</th>
                                        <th>Type</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="consultationsTable">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="testimonials" class="tab-content hidden">
            <div class="card">
                <div class="p-6 border-b">
                    <h2 class="text-xl font-semibold text-gray-900">Customer Testimonials</h2>
                </div>
                <div class="p-6">
                    <div id="testimonialsLoading" class="loading">Loading testimonials...</div>
                    <div id="testimonialsContent" class="hidden">
                        <div class="overflow-x-auto">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Parent Name</th>
                                        <th>Child Age</th>
                                        <th>Rating</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="testimonialsTable">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="blog" class="tab-content hidden">
            <div class="card">
                <div class="p-6 border-b">
                    <h2 class="text-xl font-semibold text-gray-900">Blog Posts</h2>
                </div>
                <div class="p-6">
                    <div id="blogLoading" class="loading">Loading blog posts...</div>
                    <div id="blogContent" class="hidden">
                        <div class="overflow-x-auto">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="blogTable">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Global data storage
        let contacts = [];
        let consultations = [];
        let testimonials = [];
        let blogPosts = [];

        // Load all data on page load
        window.addEventListener('load', async () => {
            await loadAllData();
        });

        async function loadAllData() {
            try {
                // Load contacts
                const contactsResponse = await fetch('/api/admin/contacts');
                contacts = await contactsResponse.json();
                document.getElementById('contactCount').textContent = contacts.length;
                renderContacts();

                // Load consultations
                const consultationsResponse = await fetch('/api/admin/consultations');
                consultations = await consultationsResponse.json();
                document.getElementById('consultationCount').textContent = consultations.length;
                renderConsultations();

                // Load testimonials
                const testimonialsResponse = await fetch('/api/admin/testimonials');
                testimonials = await testimonialsResponse.json();
                document.getElementById('testimonialCount').textContent = testimonials.length;
                renderTestimonials();

                // Load blog posts
                const blogResponse = await fetch('/api/admin/blog');
                blogPosts = await blogResponse.json();
                document.getElementById('blogCount').textContent = blogPosts.length;
                renderBlogPosts();

            } catch (error) {
                console.error('Error loading data:', error);
            }
        }

        function renderContacts() {
            const tbody = document.getElementById('contactsTable');
            tbody.innerHTML = contacts.map(contact => `
                <tr>
                    <td class="font-medium">${contact.name}</td>
                    <td>${contact.email}</td>
                    <td>${contact.subject}</td>
                    <td>${formatDate(contact.created_at)}</td>
                    <td>
                        <span class="badge ${contact.responded ? 'badge-success' : 'badge-warning'}">
                            ${contact.responded ? 'Responded' : 'Pending'}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="viewContact(${contact.id})">
                            View
                        </button>
                    </td>
                </tr>
            `).join('');
            
            document.getElementById('contactsLoading').classList.add('hidden');
            document.getElementById('contactsContent').classList.remove('hidden');
        }

        function renderConsultations() {
            const tbody = document.getElementById('consultationsTable');
            tbody.innerHTML = consultations.map(consultation => `
                <tr>
                    <td class="font-medium">${consultation.parent_name}</td>
                    <td>${consultation.child_age}</td>
                    <td>${consultation.consultation_type}</td>
                    <td>${formatDate(consultation.created_at)}</td>
                    <td>
                        <span class="badge ${getBadgeClass(consultation.status)}">
                            ${consultation.status}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="viewConsultation(${consultation.id})">
                            View
                        </button>
                    </td>
                </tr>
            `).join('');
            
            document.getElementById('consultationsLoading').classList.add('hidden');
            document.getElementById('consultationsContent').classList.remove('hidden');
        }

        function renderTestimonials() {
            const tbody = document.getElementById('testimonialsTable');
            tbody.innerHTML = testimonials.map(testimonial => `
                <tr>
                    <td class="font-medium">${testimonial.parent_name}</td>
                    <td>${testimonial.child_age || 'N/A'}</td>
                    <td>${'⭐'.repeat(testimonial.rating)}</td>
                    <td>${formatDate(testimonial.created_at)}</td>
                    <td>
                        <span class="badge ${testimonial.approved ? 'badge-success' : 'badge-warning'}">
                            ${testimonial.approved ? 'Approved' : 'Pending'}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="viewTestimonial(${testimonial.id})">
                            View
                        </button>
                    </td>
                </tr>
            `).join('');
            
            document.getElementById('testimonialsLoading').classList.add('hidden');
            document.getElementById('testimonialsContent').classList.remove('hidden');
        }

        function renderBlogPosts() {
            const tbody = document.getElementById('blogTable');
            tbody.innerHTML = blogPosts.map(post => `
                <tr>
                    <td class="font-medium">${post.title}</td>
                    <td>Admin</td>
                    <td>${formatDate(post.created_at)}</td>
                    <td>
                        <span class="badge ${post.published ? 'badge-success' : 'badge-warning'}">
                            ${post.published ? 'Published' : 'Draft'}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="viewBlogPost(${post.id})">
                            View
                        </button>
                    </td>
                </tr>
            `).join('');
            
            document.getElementById('blogLoading').classList.add('hidden');
            document.getElementById('blogContent').classList.remove('hidden');
        }

        function showTab(tabName) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.add('hidden');
            });
            
            // Remove active class from all buttons
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById(tabName).classList.remove('hidden');
            
            // Add active class to clicked button
            event.target.classList.add('active');
        }

        function formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }

        function getBadgeClass(status) {
            switch(status) {
                case 'completed': return 'badge-success';
                case 'pending': return 'badge-warning';
                case 'cancelled': return 'badge-danger';
                default: return 'badge-warning';
            }
        }

        function viewContact(id) {
            const contact = contacts.find(c => c.id === id);
            if (contact) {
                alert(`Contact: ${contact.name}\\nEmail: ${contact.email}\\nSubject: ${contact.subject}\\nMessage: ${contact.message}`);
            }
        }

        function viewConsultation(id) {
            const consultation = consultations.find(c => c.id === id);
            if (consultation) {
                alert(`Consultation: ${consultation.parent_name}\\nChild Age: ${consultation.child_age}\\nType: ${consultation.consultation_type}\\nChallenges: ${consultation.sleep_challenges}`);
            }
        }

        function viewTestimonial(id) {
            const testimonial = testimonials.find(t => t.id === id);
            if (testimonial) {
                alert(`Testimonial: ${testimonial.parent_name}\\nRating: ${testimonial.rating}/5\\nTestimonial: ${testimonial.testimonial}`);
            }
        }

        function viewBlogPost(id) {
            const post = blogPosts.find(p => p.id === id);
            if (post) {
                alert(`Blog Post: ${post.title}\\nExcerpt: ${post.excerpt}\\nPublished: ${post.published ? 'Yes' : 'No'}`);
            }
        }

        async function logout() {
            try {
                await fetch('/api/auth/logout', { method: 'POST' });
                window.location.href = '/admin-auth';
            } catch (error) {
                console.error('Logout error:', error);
            }
        }
    </script>
</body>
</html>
  `);
});

// Main website route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Baby Sleep Whisperer</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto py-16 px-4 text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Baby Sleep Whisperer</h1>
          <p class="text-xl text-gray-600 mb-8">Professional sleep consulting services for your little one</p>
          <a href="/admin-auth" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Admin Login
          </a>
        </div>
      </body>
    </html>
  `);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Admin server running on port ${PORT}`);
  console.log(`Admin login: http://localhost:${PORT}/admin-auth`);
  console.log(`Admin dashboard: http://localhost:${PORT}/admin.html`);
});