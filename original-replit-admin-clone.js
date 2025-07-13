/**
 * Perfect Replica of Original Replit Admin Interface
 * Baby Sleep Whisperer - Complete Admin Dashboard Clone
 * Hostinger VPS Deployment
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve static assets
app.use('/attached_assets', express.static('/var/www/attached_assets'));

// Sample data that matches the original Replit structure
const sampleData = {
  testimonials: [
    {
      id: 1,
      parent_name: "Sarah Johnson",
      child_age: "8 months",
      testimonial: "The sleep consulting service was life-changing! My baby now sleeps through the night consistently. The personalized approach and ongoing support made all the difference.",
      rating: 5,
      photo_url: null,
      approved: true,
      created_at: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      parent_name: "Michael Chen",
      child_age: "6 months",
      testimonial: "After just two weeks following the sleep plan, our little one went from waking up 4-5 times per night to sleeping 11 hours straight. Highly recommend!",
      rating: 5,
      photo_url: null,
      approved: true,
      created_at: "2024-01-20T14:45:00Z"
    },
    {
      id: 3,
      parent_name: "Emma Wilson",
      child_age: "10 months",
      testimonial: "Professional, caring, and effective. The sleep training techniques were gentle yet successful. Our family is finally getting the rest we needed.",
      rating: 5,
      photo_url: null,
      approved: true,
      created_at: "2024-01-25T09:15:00Z"
    },
    {
      id: 4,
      parent_name: "Jennifer Martinez",
      child_age: "4 months",
      testimonial: "The newborn sleep guidance was invaluable. Clear instructions and 24/7 support helped us establish healthy sleep habits from the start.",
      rating: 5,
      photo_url: null,
      approved: false,
      created_at: "2024-01-30T16:20:00Z"
    }
  ],
  
  blogPosts: [
    {
      id: 1,
      title: "The Ultimate Guide to Baby Sleep Training",
      excerpt: "Learn gentle and effective methods to help your baby develop healthy sleep habits.",
      content: "Sleep training is one of the most important skills you can teach your baby. In this comprehensive guide, we'll explore gentle methods that work for different age groups...",
      author: "Sleep Consultant",
      published: true,
      created_at: "2024-01-10T08:00:00Z",
      featured_image: null
    },
    {
      id: 2,
      title: "Common Sleep Challenges and Solutions",
      excerpt: "Addressing frequent night wakings, early rising, and bedtime resistance.",
      content: "Every baby is unique, but there are common sleep challenges that many parents face. Let's explore practical solutions for the most frequent issues...",
      author: "Sleep Consultant",
      published: true,
      created_at: "2024-01-18T12:00:00Z",
      featured_image: null
    },
    {
      id: 3,
      title: "Creating the Perfect Sleep Environment",
      excerpt: "Transform your nursery into a sleep sanctuary for your little one.",
      content: "The environment plays a crucial role in your baby's sleep quality. From lighting to temperature, every detail matters...",
      author: "Sleep Consultant",
      published: false,
      created_at: "2024-01-28T15:30:00Z",
      featured_image: null
    }
  ],
  
  contacts: [
    {
      id: 1,
      name: "Lisa Thompson",
      email: "lisa.thompson@email.com",
      phone: "+1 (555) 123-4567",
      subject: "Sleep Consultation Inquiry",
      message: "Hi, I'm interested in a sleep consultation for my 7-month-old. She's been waking up multiple times during the night and I'm exhausted. Could you help us?",
      responded: false,
      created_at: "2024-01-29T11:30:00Z"
    },
    {
      id: 2,
      name: "Robert Davis",
      email: "robert.davis@email.com",
      phone: "+1 (555) 987-6543",
      subject: "Newborn Sleep Support",
      message: "We just welcomed our first baby and are struggling with sleep schedules. Looking for professional guidance to establish good habits early.",
      responded: true,
      created_at: "2024-01-28T14:15:00Z"
    },
    {
      id: 3,
      name: "Amanda Rodriguez",
      email: "amanda.rodriguez@email.com",
      phone: "+1 (555) 456-7890",
      subject: "Toddler Sleep Regression",
      message: "My 18-month-old was sleeping well but recently started having bedtime battles and frequent night wakings. Need help getting back on track.",
      responded: false,
      created_at: "2024-01-30T09:45:00Z"
    }
  ],
  
  consultations: [
    {
      id: 1,
      parent_name: "Karen Anderson",
      email: "karen.anderson@email.com",
      phone: "+1 (555) 234-5678",
      child_age: "5 months",
      consultation_type: "Complete Sleep Package",
      preferred_date: "2024-02-05",
      sleep_challenges: "Baby wakes every 2 hours, difficulty falling asleep without feeding, early morning wake-ups at 5 AM",
      status: "pending",
      created_at: "2024-01-29T13:20:00Z"
    },
    {
      id: 2,
      parent_name: "David Kim",
      email: "david.kim@email.com",
      phone: "+1 (555) 345-6789",
      child_age: "3 months",
      consultation_type: "Newborn Care",
      preferred_date: "2024-02-03",
      sleep_challenges: "Newborn sleep schedule confusion, day/night reversal, short naps",
      status: "completed",
      created_at: "2024-01-27T10:10:00Z"
    },
    {
      id: 3,
      parent_name: "Michelle Brown",
      email: "michelle.brown@email.com",
      phone: "+1 (555) 567-8901",
      child_age: "12 months",
      consultation_type: "Free Consultation",
      preferred_date: "2024-02-08",
      sleep_challenges: "Transitioning from crib to toddler bed, bedtime resistance, multiple night wakings",
      status: "pending",
      created_at: "2024-01-30T16:30:00Z"
    }
  ]
};

// API Routes
app.get('/api/testimonials', (req, res) => {
  res.json(sampleData.testimonials);
});

app.get('/api/blog', (req, res) => {
  res.json(sampleData.blogPosts);
});

app.get('/api/contacts', (req, res) => {
  res.json(sampleData.contacts);
});

app.get('/api/consultations', (req, res) => {
  res.json(sampleData.consultations);
});

// Admin Authentication Routes
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple authentication check (in production, use proper authentication)
  if (username === 'admin' && password === 'password123') {
    res.json({ 
      success: true, 
      message: 'Login successful',
      user: { id: 1, username: 'admin' }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Admin login page route
app.get('/admin-auth', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-auth.html'));
});

// Admin dashboard route
app.get('/admin', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Baby Sleep Whisperer - Admin Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'baby-blue': '#3B82F6',
                        'soft-pink': '#EC4899',
                        'warm-cream': '#FEF7ED',
                        'sage-green': '#10B981',
                        'lavender': '#8B5CF6',
                        'peach': '#F97316',
                        'mint': '#06D6A0',
                        'sunset': '#F59E0B',
                        'rose': '#F43F5E'
                    }
                }
            }
        }
    </script>
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
            text-decoration: none;
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
        .btn-outline {
            background: white;
            color: #6b7280;
            border: 1px solid #d1d5db;
        }
        .btn-outline:hover {
            background: #f9fafb;
            border-color: #9ca3af;
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
        .tab-list {
            display: flex;
            gap: 16px;
            margin-bottom: 24px;
            border-bottom: 2px solid #e5e7eb;
        }
        .tab-button {
            padding: 12px 24px;
            border: none;
            background: transparent;
            color: #6b7280;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            transition: all 0.2s ease;
            font-weight: 500;
        }
        .tab-button.active {
            color: #3b82f6;
            border-bottom-color: #3b82f6;
        }
        .tab-button:hover {
            color: #3b82f6;
        }
        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
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
        .badge-info {
            background: #dbeafe;
            color: #1d4ed8;
        }
        .loading {
            text-align: center;
            padding: 48px;
            color: #6b7280;
        }
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
        }
        .modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-content {
            background: white;
            padding: 24px;
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
    </style>
</head>
<body>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="dashboard-header">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-3xl font-bold mb-2">Admin Dashboard</h1>
                    <p class="text-blue-100">Manage your baby sleep consulting business</p>
                </div>
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2 text-blue-100">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <span>Welcome, Admin</span>
                        <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                    </div>
                    <a href="/" class="btn btn-outline">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        Main Site
                    </a>
                    <button onclick="logout()" class="btn btn-danger">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        Logout
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
        <div class="tab-list">
            <button class="tab-button active" onclick="showTab('contacts')">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Contacts
            </button>
            <button class="tab-button" onclick="showTab('consultations')">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2h3z"></path>
                </svg>
                Consultations
            </button>
            <button class="tab-button" onclick="showTab('testimonials')">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
                Testimonials
            </button>
            <button class="tab-button" onclick="showTab('blog')">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Blog Posts
            </button>
        </div>

        <!-- Tab Contents -->
        <div id="contacts" class="tab-content active">
            <div class="card">
                <div class="p-6 border-b">
                    <h2 class="text-xl font-semibold text-gray-900">Contact Form Submissions</h2>
                    <p class="text-gray-600 mt-1">Manage contact form submissions from your website</p>
                </div>
                <div class="p-6">
                    <div id="contactsTable"></div>
                </div>
            </div>
        </div>

        <div id="consultations" class="tab-content">
            <div class="card">
                <div class="p-6 border-b">
                    <h2 class="text-xl font-semibold text-gray-900">Consultation Requests</h2>
                    <p class="text-gray-600 mt-1">Manage consultation booking requests</p>
                </div>
                <div class="p-6">
                    <div id="consultationsTable"></div>
                </div>
            </div>
        </div>

        <div id="testimonials" class="tab-content">
            <div class="card">
                <div class="p-6 border-b">
                    <h2 class="text-xl font-semibold text-gray-900">Customer Testimonials</h2>
                    <p class="text-gray-600 mt-1">Manage customer testimonials and reviews</p>
                </div>
                <div class="p-6">
                    <div id="testimonialsTable"></div>
                </div>
            </div>
        </div>

        <div id="blog" class="tab-content">
            <div class="card">
                <div class="p-6 border-b">
                    <h2 class="text-xl font-semibold text-gray-900">Blog Posts</h2>
                    <p class="text-gray-600 mt-1">Manage blog content and publications</p>
                </div>
                <div class="p-6">
                    <div id="blogTable"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal for viewing details -->
    <div id="detailModal" class="modal">
        <div class="modal-content">
            <div class="flex justify-between items-center mb-4">
                <h3 id="modalTitle" class="text-lg font-semibold"></h3>
                <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div id="modalContent"></div>
        </div>
    </div>

    <script>
        // Global data storage
        let contacts = [];
        let consultations = [];
        let testimonials = [];
        let blogPosts = [];

        // Load data on page load
        document.addEventListener('DOMContentLoaded', async () => {
            await loadAllData();
        });

        async function loadAllData() {
            try {
                // Load contacts
                const contactsResponse = await fetch('/api/contacts');
                contacts = await contactsResponse.json();
                document.getElementById('contactCount').textContent = contacts.filter(c => !c.responded).length;
                renderContacts();

                // Load consultations
                const consultationsResponse = await fetch('/api/consultations');
                consultations = await consultationsResponse.json();
                document.getElementById('consultationCount').textContent = consultations.filter(c => c.status === 'pending').length;
                renderConsultations();

                // Load testimonials
                const testimonialsResponse = await fetch('/api/testimonials');
                testimonials = await testimonialsResponse.json();
                document.getElementById('testimonialCount').textContent = testimonials.filter(t => !t.approved).length;
                renderTestimonials();

                // Load blog posts
                const blogResponse = await fetch('/api/blog');
                blogPosts = await blogResponse.json();
                document.getElementById('blogCount').textContent = blogPosts.length;
                renderBlogPosts();

            } catch (error) {
                console.error('Error loading data:', error);
            }
        }

        function renderContacts() {
            const container = document.getElementById('contactsTable');
            container.innerHTML = contacts.map(contact => `
                <div class="card p-4 mb-4">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h3 class="font-semibold text-gray-900">${contact.name}</h3>
                            <p class="text-sm text-gray-600">${contact.email}</p>
                            ${contact.phone ? `<p class="text-sm text-gray-600">${contact.phone}</p>` : ''}
                            <p class="text-sm text-gray-700 mt-2"><strong>Subject:</strong> ${contact.subject}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="badge ${contact.responded ? 'badge-success' : 'badge-warning'}">
                                ${contact.responded ? 'Responded' : 'New'}
                            </span>
                            <button class="btn btn-primary" onclick="viewContact(${contact.id})">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                                View
                            </button>
                            <button class="btn btn-info" onclick="emailReply('${contact.email}', '${contact.name}', '${contact.subject}')">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                Reply
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function renderConsultations() {
            const container = document.getElementById('consultationsTable');
            container.innerHTML = consultations.map(consultation => `
                <div class="card p-4 mb-4">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h3 class="font-semibold text-gray-900">${consultation.parent_name}</h3>
                            <p class="text-sm text-gray-600">${consultation.email}</p>
                            <p class="text-sm text-gray-700 mt-1"><strong>Child Age:</strong> ${consultation.child_age}</p>
                            <p class="text-sm text-gray-700"><strong>Type:</strong> ${consultation.consultation_type}</p>
                            <p class="text-sm text-gray-700"><strong>Preferred Date:</strong> ${consultation.preferred_date || 'Not specified'}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="badge ${getStatusBadge(consultation.status)}">
                                ${consultation.status}
                            </span>
                            <button class="btn btn-primary" onclick="viewConsultation(${consultation.id})">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                                View
                            </button>
                            <button class="btn btn-info" onclick="emailReply('${consultation.email}', '${consultation.parent_name}', 'Consultation Request')">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                Reply
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function renderTestimonials() {
            const container = document.getElementById('testimonialsTable');
            container.innerHTML = testimonials.map(testimonial => `
                <div class="card p-4 mb-4">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h3 class="font-semibold text-gray-900">${testimonial.parent_name}</h3>
                            <p class="text-sm text-gray-600">Child Age: ${testimonial.child_age}</p>
                            <div class="flex items-center mt-1">
                                <span class="text-sm text-gray-700 mr-2">Rating:</span>
                                <div class="flex">
                                    ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}
                                </div>
                            </div>
                            <p class="text-sm text-gray-700 mt-2 line-clamp-2">${testimonial.testimonial}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="badge ${testimonial.approved ? 'badge-success' : 'badge-warning'}">
                                ${testimonial.approved ? 'Approved' : 'Pending'}
                            </span>
                            <button class="btn btn-primary" onclick="viewTestimonial(${testimonial.id})">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                                View
                            </button>
                            ${!testimonial.approved ? 
                                `<button class="btn btn-success" onclick="approveTestimonial(${testimonial.id})">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Approve
                                </button>` : ''
                            }
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function renderBlogPosts() {
            const container = document.getElementById('blogTable');
            container.innerHTML = blogPosts.map(post => `
                <div class="card p-4 mb-4">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h3 class="font-semibold text-gray-900">${post.title}</h3>
                            <p class="text-sm text-gray-600 mt-1">${post.excerpt}</p>
                            <p class="text-sm text-gray-500 mt-2">By ${post.author} • ${formatDate(post.created_at)}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="badge ${post.published ? 'badge-success' : 'badge-warning'}">
                                ${post.published ? 'Published' : 'Draft'}
                            </span>
                            <button class="btn btn-primary" onclick="viewBlogPost(${post.id})">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                                View
                            </button>
                            <button class="btn ${post.published ? 'btn-warning' : 'btn-success'}" onclick="togglePublish(${post.id}, ${!post.published})">
                                ${post.published ? 'Unpublish' : 'Publish'}
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function showTab(tabName) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Remove active class from all buttons
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById(tabName).classList.add('active');
            
            // Add active class to clicked button
            event.target.classList.add('active');
        }

        function viewContact(id) {
            const contact = contacts.find(c => c.id === id);
            if (contact) {
                document.getElementById('modalTitle').textContent = 'Contact Details';
                document.getElementById('modalContent').innerHTML = \`
                    <div class="space-y-4">
                        <div><strong>Name:</strong> \${contact.name}</div>
                        <div><strong>Email:</strong> \${contact.email}</div>
                        <div><strong>Phone:</strong> \${contact.phone || 'Not provided'}</div>
                        <div><strong>Subject:</strong> \${contact.subject}</div>
                        <div><strong>Message:</strong></div>
                        <div class="bg-gray-50 p-4 rounded-lg">\${contact.message}</div>
                        <div><strong>Date:</strong> \${formatDate(contact.created_at)}</div>
                        <div><strong>Status:</strong> \${contact.responded ? 'Responded' : 'New'}</div>
                    </div>
                \`;
                document.getElementById('detailModal').classList.add('active');
            }
        }

        function viewConsultation(id) {
            const consultation = consultations.find(c => c.id === id);
            if (consultation) {
                document.getElementById('modalTitle').textContent = 'Consultation Details';
                document.getElementById('modalContent').innerHTML = \`
                    <div class="space-y-4">
                        <div><strong>Parent Name:</strong> \${consultation.parent_name}</div>
                        <div><strong>Email:</strong> \${consultation.email}</div>
                        <div><strong>Phone:</strong> \${consultation.phone || 'Not provided'}</div>
                        <div><strong>Child Age:</strong> \${consultation.child_age}</div>
                        <div><strong>Consultation Type:</strong> \${consultation.consultation_type}</div>
                        <div><strong>Preferred Date:</strong> \${consultation.preferred_date || 'Not specified'}</div>
                        <div><strong>Sleep Challenges:</strong></div>
                        <div class="bg-gray-50 p-4 rounded-lg">\${consultation.sleep_challenges}</div>
                        <div><strong>Status:</strong> \${consultation.status}</div>
                        <div><strong>Submitted:</strong> \${formatDate(consultation.created_at)}</div>
                    </div>
                \`;
                document.getElementById('detailModal').classList.add('active');
            }
        }

        function viewTestimonial(id) {
            const testimonial = testimonials.find(t => t.id === id);
            if (testimonial) {
                document.getElementById('modalTitle').textContent = 'Testimonial Details';
                document.getElementById('modalContent').innerHTML = \`
                    <div class="space-y-4">
                        <div><strong>Parent Name:</strong> \${testimonial.parent_name}</div>
                        <div><strong>Child Age:</strong> \${testimonial.child_age}</div>
                        <div><strong>Rating:</strong> \${'★'.repeat(testimonial.rating)}\${'☆'.repeat(5 - testimonial.rating)} (\${testimonial.rating}/5)</div>
                        <div><strong>Testimonial:</strong></div>
                        <div class="bg-gray-50 p-4 rounded-lg">\${testimonial.testimonial}</div>
                        <div><strong>Status:</strong> \${testimonial.approved ? 'Approved' : 'Pending Approval'}</div>
                        <div><strong>Submitted:</strong> \${formatDate(testimonial.created_at)}</div>
                    </div>
                \`;
                document.getElementById('detailModal').classList.add('active');
            }
        }

        function viewBlogPost(id) {
            const post = blogPosts.find(p => p.id === id);
            if (post) {
                document.getElementById('modalTitle').textContent = 'Blog Post Details';
                document.getElementById('modalContent').innerHTML = \`
                    <div class="space-y-4">
                        <div><strong>Title:</strong> \${post.title}</div>
                        <div><strong>Author:</strong> \${post.author}</div>
                        <div><strong>Excerpt:</strong></div>
                        <div class="bg-gray-50 p-4 rounded-lg">\${post.excerpt}</div>
                        <div><strong>Content:</strong></div>
                        <div class="bg-gray-50 p-4 rounded-lg max-h-48 overflow-y-auto">\${post.content}</div>
                        <div><strong>Status:</strong> \${post.published ? 'Published' : 'Draft'}</div>
                        <div><strong>Created:</strong> \${formatDate(post.created_at)}</div>
                    </div>
                \`;
                document.getElementById('detailModal').classList.add('active');
            }
        }

        function emailReply(email, name, subject) {
            const mailtoLink = \`mailto:\${email}?subject=Re: \${subject}&body=Hello \${name},%0D%0A%0D%0AThank you for contacting Happy Baby Sleeping.%0D%0A%0D%0A[Your message here]%0D%0A%0D%0ABest regards,%0D%0AHappy Baby Sleeping Team\`;
            window.open(mailtoLink, '_blank');
        }

        function approveTestimonial(id) {
            if (confirm('Are you sure you want to approve this testimonial?')) {
                // In a real app, this would make an API call
                const testimonial = testimonials.find(t => t.id === id);
                if (testimonial) {
                    testimonial.approved = true;
                    renderTestimonials();
                    loadAllData(); // Refresh counts
                }
            }
        }

        function togglePublish(id, publish) {
            const action = publish ? 'publish' : 'unpublish';
            if (confirm(\`Are you sure you want to \${action} this blog post?\`)) {
                // In a real app, this would make an API call
                const post = blogPosts.find(p => p.id === id);
                if (post) {
                    post.published = publish;
                    renderBlogPosts();
                }
            }
        }

        function closeModal() {
            document.getElementById('detailModal').classList.remove('active');
        }

        function formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        function getStatusBadge(status) {
            switch(status) {
                case 'completed': return 'badge-success';
                case 'pending': return 'badge-warning';
                case 'cancelled': return 'badge-danger';
                default: return 'badge-info';
            }
        }

        function logout() {
            if (confirm('Are you sure you want to log out?')) {
                fetch('/api/auth/logout', { method: 'POST' })
                    .then(() => {
                        window.location.href = '/admin-auth';
                    })
                    .catch(error => {
                        console.error('Logout error:', error);
                        window.location.href = '/admin-auth';
                    });
            }
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('detailModal');
            if (event.target === modal) {
                closeModal();
            }
        }
    </script>
</body>
</html>
  `);
});

// Main website (simple version)
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Baby Sleep Whisperer</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div class="max-w-4xl mx-auto py-16 px-4 text-center">
            <h1 class="text-5xl font-bold text-gray-900 mb-4">Baby Sleep Whisperer</h1>
            <p class="text-xl text-gray-600 mb-8">Peaceful Nights for Your Little One</p>
            <p class="text-lg text-gray-700 mb-8">Professional sleep consulting services to help your baby (and you!) get the rest you deserve.</p>
            <div class="flex justify-center gap-4">
                <a href="/admin-auth" class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Admin Login
                </a>
                <a href="#" class="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                    Book Consultation
                </a>
            </div>
        </div>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Baby Sleep Whisperer Admin System running on port ${PORT}`);
  console.log(`📱 Main site: http://localhost:${PORT}`);
  console.log(`🔐 Admin login: http://localhost:${PORT}/admin-auth`);
  console.log(`📊 Admin dashboard: http://localhost:${PORT}/admin`);
  console.log(`✨ Complete replica of original Replit admin interface`);
});