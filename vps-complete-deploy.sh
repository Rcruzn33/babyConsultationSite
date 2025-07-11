#!/bin/bash

# VPS Complete Clean Deploy Script
# This script completely cleans the VPS and deploys the full-stack React application

echo "🧹 Starting complete VPS cleanup and deployment..."

# Step 1: Stop all existing services
echo "Stopping all existing services..."
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# Step 2: Clean up all existing files
echo "Cleaning up existing files..."
rm -rf /var/www/html/*
rm -rf /var/www/baby-*
rm -rf /var/www/server*
rm -rf /var/www/complete-server.js
rm -rf /tmp/baby-*

# Step 3: Create fresh application directory
echo "Creating fresh application directory..."
mkdir -p /var/www/baby-app
cd /var/www/baby-app

# Step 4: Initialize Node.js project
echo "Initializing Node.js project..."
cat > package.json << 'EOL'
{
  "name": "baby-sleep-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "build": "echo 'Build complete'"
  },
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  }
}
EOL

# Step 5: Install dependencies
echo "Installing Node.js dependencies..."
npm install

# Step 6: Create environment file
echo "Creating environment configuration..."
cat > .env << 'EOL'
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/baby_sleep_db
EOL

# Step 7: Create complete server with React app embedded
echo "Creating complete server application..."
cat > server.js << 'EOL'
import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/attached_assets', express.static('/var/www/attached_assets'));

// Database connection
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

// Initialize database tables
async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        is_approved BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        message TEXT,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS consultations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        service_type VARCHAR(100),
        child_age VARCHAR(50),
        sleep_issues TEXT,
        goals TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        image_url VARCHAR(255),
        published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        approved BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
  }
}

// API Routes
app.get('/api/contacts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const result = await pool.query(
      'INSERT INTO contacts (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone, message]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/consultations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM consultations ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/consultations', async (req, res) => {
  try {
    const { name, email, phone, service_type, child_age, sleep_issues, goals } = req.body;
    const result = await pool.query(
      'INSERT INTO consultations (name, email, phone, service_type, child_age, sleep_issues, goals) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, email, phone, service_type, child_age, sleep_issues, goals]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/blog-posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/testimonials', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM testimonials WHERE approved = true ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Complete React Application HTML
const htmlApp = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Happy Baby Sleeping - Professional Sleep Consulting</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'baby-blue': '#87CEEB',
                        'soft-pink': '#FFB6C1',
                        'mint': '#98FB98',
                        'cream': '#FFF8DC',
                        'soft-dark': '#2F4F4F',
                        'medium-gray': '#696969'
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-cream">
    <div id="root"></div>
    
    <script type="text/babel">
        const { useState, useEffect } = React;
        
        function App() {
            const [currentPage, setCurrentPage] = useState('home');
            const [showAdmin, setShowAdmin] = useState(false);
            const [contacts, setContacts] = useState([]);
            const [consultations, setConsultations] = useState([]);
            
            useEffect(() => {
                if (showAdmin) {
                    fetchAdminData();
                }
            }, [showAdmin]);
            
            const fetchAdminData = async () => {
                try {
                    const contactsRes = await fetch('/api/contacts');
                    const consultationsRes = await fetch('/api/consultations');
                    
                    if (contactsRes.ok) setContacts(await contactsRes.json());
                    if (consultationsRes.ok) setConsultations(await consultationsRes.json());
                } catch (error) {
                    console.error('Error fetching admin data:', error);
                }
            };
            
            const submitContact = async (formData) => {
                try {
                    const response = await fetch('/api/contacts', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });
                    
                    if (response.ok) {
                        alert('Thank you! Your message has been sent successfully.');
                        return true;
                    }
                } catch (error) {
                    console.error('Error submitting contact:', error);
                }
                return false;
            };
            
            const submitConsultation = async (formData) => {
                try {
                    const response = await fetch('/api/consultations', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });
                    
                    if (response.ok) {
                        alert('Thank you! Your consultation request has been submitted.');
                        return true;
                    }
                } catch (error) {
                    console.error('Error submitting consultation:', error);
                }
                return false;
            };
            
            if (showAdmin) {
                return (
                    <div className="min-h-screen bg-gray-50">
                        <header className="bg-white shadow-sm border-b">
                            <div className="max-w-7xl mx-auto px-4 py-4">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-2xl font-bold text-soft-dark">Admin Dashboard</h1>
                                    <button
                                        onClick={() => setShowAdmin(false)}
                                        className="px-4 py-2 bg-baby-blue text-white rounded-lg hover:bg-baby-blue/80"
                                    >
                                        Back to Website
                                    </button>
                                </div>
                            </div>
                        </header>
                        
                        <main className="max-w-7xl mx-auto px-4 py-8">
                            <div className="grid lg:grid-cols-2 gap-8">
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-xl font-bold text-soft-dark mb-4">Contact Messages ({contacts.length})</h2>
                                    <div className="space-y-4 max-h-96 overflow-y-auto">
                                        {contacts.map(contact => (
                                            <div key={contact.id} className="border-l-4 border-baby-blue pl-4 py-2">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-semibold text-soft-dark">{contact.name}</h3>
                                                        <p className="text-sm text-medium-gray">{contact.email}</p>
                                                        {contact.phone && (
                                                            <p className="text-sm text-medium-gray">{contact.phone}</p>
                                                        )}
                                                    </div>
                                                    <span className="text-xs text-medium-gray">
                                                        {new Date(contact.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-soft-dark mt-2">{contact.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-xl font-bold text-soft-dark mb-4">Consultation Requests ({consultations.length})</h2>
                                    <div className="space-y-4 max-h-96 overflow-y-auto">
                                        {consultations.map(consultation => (
                                            <div key={consultation.id} className="border-l-4 border-soft-pink pl-4 py-2">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-semibold text-soft-dark">{consultation.name}</h3>
                                                        <p className="text-sm text-medium-gray">{consultation.email}</p>
                                                        {consultation.phone && (
                                                            <p className="text-sm text-medium-gray">{consultation.phone}</p>
                                                        )}
                                                        <p className="text-sm font-medium text-soft-pink mt-1">
                                                            {consultation.service_type} - Child: {consultation.child_age}
                                                        </p>
                                                    </div>
                                                    <span className="text-xs text-medium-gray">
                                                        {new Date(consultation.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-soft-dark mt-2">{consultation.sleep_issues}</p>
                                                {consultation.goals && (
                                                    <p className="text-sm text-soft-dark mt-1"><strong>Goals:</strong> {consultation.goals}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                );
            }
            
            return (
                <div className="min-h-screen bg-cream">
                    <header className="bg-white/80 backdrop-blur-sm shadow-sm">
                        <nav className="max-w-7xl mx-auto px-4 py-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl">🌙</span>
                                    <h1 className="text-xl font-bold text-soft-dark">Happy Baby Sleeping</h1>
                                </div>
                                <div className="flex space-x-6">
                                    <button
                                        onClick={() => setCurrentPage('home')}
                                        className={`px-3 py-2 rounded-lg transition-colors ${
                                            currentPage === 'home' ? 'bg-baby-blue text-white' : 'text-soft-dark hover:bg-baby-blue/10'
                                        }`}
                                    >
                                        Home
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage('services')}
                                        className={`px-3 py-2 rounded-lg transition-colors ${
                                            currentPage === 'services' ? 'bg-baby-blue text-white' : 'text-soft-dark hover:bg-baby-blue/10'
                                        }`}
                                    >
                                        Services
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage('contact')}
                                        className={`px-3 py-2 rounded-lg transition-colors ${
                                            currentPage === 'contact' ? 'bg-baby-blue text-white' : 'text-soft-dark hover:bg-baby-blue/10'
                                        }`}
                                    >
                                        Contact
                                    </button>
                                    <button
                                        onClick={() => setShowAdmin(true)}
                                        className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                    >
                                        Admin Dashboard
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </header>
                    
                    <main>
                        {currentPage === 'home' && <HomePage />}
                        {currentPage === 'services' && <ServicesPage onSubmitConsultation={submitConsultation} />}
                        {currentPage === 'contact' && <ContactPage onSubmitContact={submitContact} />}
                    </main>
                </div>
            );
        }
        
        function HomePage() {
            return (
                <div>
                    <section className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-baby-blue/20 via-soft-pink/10 to-mint/20"></div>
                        <div className="relative max-w-7xl mx-auto px-4 py-16">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className="text-center lg:text-left">
                                    <h1 className="text-5xl lg:text-6xl font-bold text-soft-dark mb-6">
                                        Peaceful Nights for Your{' '}
                                        <span className="text-baby-blue">Little One</span>
                                    </h1>
                                    <p className="text-xl text-medium-gray mb-8">
                                        Expert sleep consulting for healthy sleep habits and family rest.
                                    </p>
                                    <p className="text-lg text-soft-dark mb-8">
                                        Professional Sleep Consulting Services
                                    </p>
                                    <div className="text-center mb-8">
                                        <h2 className="text-2xl font-bold text-soft-dark mb-6">
                                            Sweet Dreams Start Here 🌙✨
                                        </h2>
                                    </div>
                                </div>
                                <div className="mt-8 lg:mt-0">
                                    <img 
                                        src="/attached_assets/image_1751435091363.jpeg" 
                                        alt="Peaceful baby sleeping" 
                                        className="rounded-3xl shadow-2xl w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <section className="py-16 bg-white">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="bg-baby-blue/10 p-8 rounded-2xl text-center border-2 border-baby-blue/20">
                                    <div className="text-3xl mb-4">🌙</div>
                                    <h3 className="text-xl font-bold text-baby-blue mb-4">Free Consultation</h3>
                                    <p className="text-medium-gray mb-4">30-minute assessment</p>
                                    <div className="text-3xl font-bold text-baby-blue mb-4">FREE</div>
                                    <p className="text-sm text-medium-gray">Initial sleep assessment and personalized recommendations</p>
                                </div>
                                
                                <div className="bg-soft-pink/10 p-8 rounded-2xl text-center border-2 border-soft-pink/20">
                                    <div className="text-3xl mb-4">💤</div>
                                    <h3 className="text-xl font-bold text-soft-pink mb-4">Complete Sleep Package</h3>
                                    <p className="text-medium-gray mb-4">Full training and support</p>
                                    <div className="text-3xl font-bold text-soft-pink mb-4">$299</div>
                                    <p className="text-sm text-medium-gray">Comprehensive sleep training with ongoing support</p>
                                </div>
                                
                                <div className="bg-mint/10 p-8 rounded-2xl text-center border-2 border-mint/20">
                                    <div className="text-3xl mb-4">👶</div>
                                    <h3 className="text-xl font-bold text-mint mb-4">Newborn Care</h3>
                                    <p className="text-medium-gray mb-4">Specialized infant care</p>
                                    <div className="text-3xl font-bold text-mint mb-4">$199</div>
                                    <p className="text-sm text-medium-gray">Gentle newborn sleep guidance and care</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
        
        function ServicesPage({ onSubmitConsultation }) {
            const [formData, setFormData] = useState({
                name: '',
                email: '',
                phone: '',
                service_type: '',
                child_age: '',
                sleep_issues: '',
                goals: ''
            });
            
            const handleSubmit = async (e) => {
                e.preventDefault();
                const success = await onSubmitConsultation(formData);
                if (success) {
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        service_type: '',
                        child_age: '',
                        sleep_issues: '',
                        goals: ''
                    });
                }
            };
            
            return (
                <div className="py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-soft-dark mb-4">Our Services</h1>
                            <p className="text-xl text-medium-gray">Choose the perfect solution for your family</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-baby-blue/20">
                                <div className="text-center">
                                    <div className="text-4xl mb-4">🌙</div>
                                    <h3 className="text-xl font-bold text-baby-blue mb-4">Free Consultation</h3>
                                    <div className="text-3xl font-bold text-baby-blue mb-4">FREE</div>
                                    <ul className="text-sm text-medium-gray space-y-2 mb-6">
                                        <li>• 30-minute phone/video call</li>
                                        <li>• Sleep assessment questionnaire</li>
                                        <li>• Personalized recommendations</li>
                                        <li>• Resource sharing</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-soft-pink/20">
                                <div className="text-center">
                                    <div className="text-4xl mb-4">💤</div>
                                    <h3 className="text-xl font-bold text-soft-pink mb-4">Complete Sleep Package</h3>
                                    <div className="text-3xl font-bold text-soft-pink mb-4">$299</div>
                                    <ul className="text-sm text-medium-gray space-y-2 mb-6">
                                        <li>• Comprehensive sleep plan</li>
                                        <li>• 2 weeks of daily support</li>
                                        <li>• Phone/text support</li>
                                        <li>• Plan adjustments as needed</li>
                                        <li>• Follow-up sessions</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-mint/20">
                                <div className="text-center">
                                    <div className="text-4xl mb-4">👶</div>
                                    <h3 className="text-xl font-bold text-mint mb-4">Newborn Care</h3>
                                    <div className="text-3xl font-bold text-mint mb-4">$199</div>
                                    <ul className="text-sm text-medium-gray space-y-2 mb-6">
                                        <li>• Gentle sleep shaping</li>
                                        <li>• Feeding and sleep schedule</li>
                                        <li>• Newborn care guidance</li>
                                        <li>• 1 week of support</li>
                                        <li>• Safe sleep education</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-soft-dark mb-6 text-center">Book Your Consultation</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Service Type *</label>
                                        <select
                                            required
                                            value={formData.service_type}
                                            onChange={(e) => setFormData({...formData, service_type: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        >
                                            <option value="">Select a service</option>
                                            <option value="Free Consultation">Free Consultation</option>
                                            <option value="Complete Sleep Package">Complete Sleep Package</option>
                                            <option value="Newborn Care">Newborn Care</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-soft-dark mb-2">Child's Age *</label>
                                    <select
                                        required
                                        value={formData.child_age}
                                        onChange={(e) => setFormData({...formData, child_age: e.target.value})}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                    >
                                        <option value="">Select age range</option>
                                        <option value="0-3 months">0-3 months</option>
                                        <option value="4-6 months">4-6 months</option>
                                        <option value="7-12 months">7-12 months</option>
                                        <option value="1-2 years">1-2 years</option>
                                        <option value="2+ years">2+ years</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-soft-dark mb-2">Sleep Issues *</label>
                                    <textarea
                                        required
                                        rows="4"
                                        value={formData.sleep_issues}
                                        onChange={(e) => setFormData({...formData, sleep_issues: e.target.value})}
                                        placeholder="Please describe your child's current sleep challenges..."
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                    ></textarea>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-soft-dark mb-2">Goals</label>
                                    <textarea
                                        rows="3"
                                        value={formData.goals}
                                        onChange={(e) => setFormData({...formData, goals: e.target.value})}
                                        placeholder="What are your sleep goals for your child?"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                    ></textarea>
                                </div>
                                
                                <button
                                    type="submit"
                                    className="w-full bg-baby-blue text-white py-3 px-6 rounded-lg hover:bg-baby-blue/90 transition-colors font-semibold"
                                >
                                    Book Consultation
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
        
        function ContactPage({ onSubmitContact }) {
            const [formData, setFormData] = useState({
                name: '',
                email: '',
                phone: '',
                message: ''
            });
            
            const handleSubmit = async (e) => {
                e.preventDefault();
                const success = await onSubmitContact(formData);
                if (success) {
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        message: ''
                    });
                }
            };
            
            return (
                <div className="py-16">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-soft-dark mb-4">Contact Us</h1>
                            <p className="text-xl text-medium-gray">Ready to start your journey to better sleep?</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-2xl font-bold text-soft-dark mb-6">Get In Touch</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-baby-blue rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm">📧</span>
                                        </div>
                                        <span className="text-medium-gray">info@happybabysleeping.com</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-baby-blue rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm">📱</span>
                                        </div>
                                        <span className="text-medium-gray">(555) 123-4567</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-baby-blue rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm">🕐</span>
                                        </div>
                                        <span className="text-medium-gray">Mon-Fri: 9AM-6PM EST</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Message *</label>
                                        <textarea
                                            required
                                            rows="5"
                                            value={formData.message}
                                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                                            placeholder="How can we help you?"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-baby-blue text-white py-3 px-6 rounded-lg hover:bg-baby-blue/90 transition-colors font-semibold"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        
        ReactDOM.render(<App />, document.getElementById('root'));
    </script>
</body>
</html>`;

// Serve the React application
app.get('*', (req, res) => {
    res.send(htmlApp);
});

// Start server
app.listen(PORT, '0.0.0.0', async () => {
    console.log(`🚀 Baby Sleep Consulting Server running on port ${PORT}`);
    await initDatabase();
});
EOL

echo "✅ Complete server application created successfully!"

# Step 8: Create PostgreSQL database
echo "Creating PostgreSQL database..."
sudo -u postgres createdb baby_sleep_db 2>/dev/null || echo "Database already exists"

# Step 9: Update environment with correct database URL
echo "Updating environment configuration..."
cat > .env << 'EOL'
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/baby_sleep_db
EOL

# Step 10: Start the application
echo "Starting the complete application..."
pm2 start server.js --name baby-sleep-app
pm2 save

echo "🎉 Deployment complete!"
echo "Your complete React application with PostgreSQL database is now running!"
echo "Website: http://31.97.99.104"
echo "Features:"
echo "  ✅ Complete React application with navigation"
echo "  ✅ PostgreSQL database with all tables"
echo "  ✅ Admin dashboard accessible via 'Admin Dashboard' button"
echo "  ✅ Contact form with database storage"
echo "  ✅ Consultation booking with database storage"
echo "  ✅ Professional hero image and design"
echo "  ✅ All three service tiers (Free, $299, $199)"
echo ""
echo "To verify deployment:"
echo "  curl -s http://localhost:3000 | grep -i 'peaceful nights' && echo '✅ Server working!'"
echo "  curl -s http://31.97.99.104 | grep -i 'peaceful nights' && echo '🎉 Website is LIVE!'"
EOL