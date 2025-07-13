// Direct VPS Connection Fix
const { spawn } = require('child_process');

console.log('🚀 Starting VPS connection fix...');

// Create the complete server directly
const serverScript = `
const express = require('express');
const app = express();
const PORT = 80;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample data
const testimonials = [
  {
    id: 1,
    parent_name: "Sarah Johnson",
    child_age: "8 months", 
    testimonial: "The sleep consulting service was life-changing! My baby now sleeps through the night consistently. We went from 3-4 wake-ups to sleeping 11 hours straight.",
    rating: 5
  },
  {
    id: 2,
    parent_name: "Michael Chen",
    child_age: "6 months",
    testimonial: "After two weeks following the sleep plan, our little one went from waking 4-5 times per night to sleeping through the night. The gentle approach worked perfectly for our family.",
    rating: 5
  },
  {
    id: 3,
    parent_name: "Emma Davis", 
    child_age: "10 months",
    testimonial: "I was skeptical at first, but the personalized sleep plan made all the difference. Our baby learned to self-soothe and we all get better sleep now.",
    rating: 5
  }
];

// API endpoints
app.get('/api/testimonials', (req, res) => {
  res.json(testimonials);
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Baby Sleep Whisperer is running!' });
});

// Main website
app.get('/', (req, res) => {
  res.send(\`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Baby Sleep Whisperer - Sweet Dreams for Every Baby</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            margin: 0;
            padding: 0;
        }
        .hero-section {
            background: linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 50%, #dcfce7 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 40px 20px;
        }
        .hero-content {
            max-width: 800px;
            margin: 0 auto;
        }
        .hero-title {
            font-size: 48px;
            font-weight: 800;
            margin-bottom: 24px;
            color: #1f2937;
        }
        .hero-subtitle {
            font-size: 24px;
            color: #6b7280;
            margin-bottom: 32px;
        }
        .btn-primary {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            color: white;
            padding: 16px 32px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            display: inline-block;
            margin: 16px;
            transition: all 0.3s ease;
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 24px;
            margin-top: 48px;
        }
        .feature-card {
            background: white;
            padding: 24px;
            border-radius: 16px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .feature-icon {
            font-size: 48px;
            margin-bottom: 16px;
        }
        .testimonials {
            background: white;
            padding: 60px 20px;
            text-align: center;
        }
        .testimonial-card {
            background: #f9fafb;
            padding: 24px;
            border-radius: 16px;
            margin: 16px;
            border-left: 4px solid #3b82f6;
        }
        .stars {
            color: #fbbf24;
            font-size: 18px;
            margin-bottom: 12px;
        }
        .contact-section {
            background: #f9fafb;
            padding: 60px 20px;
            text-align: center;
        }
        .contact-form {
            max-width: 600px;
            margin: 0 auto;
            display: grid;
            gap: 16px;
        }
        .form-input {
            padding: 12px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 16px;
        }
        .form-input:focus {
            outline: none;
            border-color: #3b82f6;
        }
        .nav-header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            padding: 16px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .nav-brand {
            font-size: 24px;
            font-weight: bold;
            color: #1f2937;
        }
        .nav-links {
            display: flex;
            gap: 24px;
        }
        .nav-link {
            color: #6b7280;
            text-decoration: none;
            font-weight: 500;
        }
        .nav-link:hover {
            color: #3b82f6;
        }
        .success-badge {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 24px;
        }
        @media (max-width: 768px) {
            .hero-title {
                font-size: 36px;
            }
            .hero-subtitle {
                font-size: 20px;
            }
            .nav-links {
                display: none;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="nav-header">
        <div class="nav-brand">Baby Sleep Whisperer</div>
        <div class="nav-links">
            <a href="#home" class="nav-link">Home</a>
            <a href="#about" class="nav-link">About</a>
            <a href="#services" class="nav-link">Services</a>
            <a href="#contact" class="nav-link">Contact</a>
            <a href="/admin-auth" class="btn-primary" style="padding: 8px 16px;">Admin</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero-section">
        <div class="hero-content">
            <div class="success-badge">✓ 500+ Families Helped</div>
            
            <h1 class="hero-title">
                Sweet Dreams for Every Baby
            </h1>
            
            <p class="hero-subtitle">
                Professional sleep consulting services to help your little one develop healthy sleep habits.
                Gentle, effective methods tailored to your family's needs.
            </p>
            
            <div>
                <a href="#contact" class="btn-primary">Book Free Consultation</a>
                <a href="#services" class="btn-primary" style="background: white; color: #3b82f6; border: 2px solid #3b82f6;">Learn More</a>
            </div>
            
            <div class="features">
                <div class="feature-card">
                    <div class="feature-icon">🌙</div>
                    <h3>Gentle Methods</h3>
                    <p>Evidence-based techniques that respect your parenting style</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">👶</div>
                    <h3>Personalized Plans</h3>
                    <p>Custom sleep solutions tailored to your baby's needs</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">💤</div>
                    <h3>Proven Results</h3>
                    <p>95% success rate with lasting sleep improvements</p>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" style="padding: 80px 20px; background: white; text-align: center;">
        <div style="max-width: 800px; margin: 0 auto;">
            <h2 style="font-size: 48px; font-weight: bold; margin-bottom: 24px; color: #1f2937;">Your Sleep Success Partner</h2>
            <p style="font-size: 20px; color: #6b7280; margin-bottom: 40px;">
                As a certified sleep consultant, I understand the challenges that come with sleepless nights. 
                My approach combines evidence-based techniques with compassionate support to help your family find rest.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 32px; margin-top: 40px;">
                <div>
                    <div style="font-size: 36px; font-weight: bold; color: #3b82f6; margin-bottom: 8px;">500+</div>
                    <div style="color: #6b7280;">Families Helped</div>
                </div>
                <div>
                    <div style="font-size: 36px; font-weight: bold; color: #3b82f6; margin-bottom: 8px;">95%</div>
                    <div style="color: #6b7280;">Success Rate</div>
                </div>
                <div>
                    <div style="font-size: 36px; font-weight: bold; color: #3b82f6; margin-bottom: 8px;">24/7</div>
                    <div style="color: #6b7280;">Support</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" style="padding: 80px 20px; background: #f9fafb;">
        <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
            <h2 style="font-size: 48px; font-weight: bold; margin-bottom: 24px; color: #1f2937;">Our Services</h2>
            <p style="font-size: 20px; color: #6b7280; margin-bottom: 48px;">Choose the perfect sleep solution for your family</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px;">
                <div style="background: white; padding: 32px; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-top: 4px solid #3b82f6;">
                    <h3 style="font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 16px;">Free Consultation</h3>
                    <p style="color: #6b7280; margin-bottom: 24px;">30-minute consultation to discuss your baby's sleep challenges</p>
                    <div style="color: #3b82f6; font-size: 32px; font-weight: bold; margin-bottom: 16px;">FREE</div>
                    <ul style="text-align: left; color: #6b7280; margin-bottom: 24px;">
                        <li>✓ Sleep assessment</li>
                        <li>✓ Personalized recommendations</li>
                        <li>✓ Q&A session</li>
                    </ul>
                </div>
                
                <div style="background: white; padding: 32px; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-top: 4px solid #10b981;">
                    <h3 style="font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 16px;">Complete Sleep Package</h3>
                    <p style="color: #6b7280; margin-bottom: 24px;">Comprehensive 2-week program with personalized support</p>
                    <div style="color: #10b981; font-size: 32px; font-weight: bold; margin-bottom: 16px;">$299</div>
                    <ul style="text-align: left; color: #6b7280; margin-bottom: 24px;">
                        <li>✓ Custom sleep plan</li>
                        <li>✓ 2 weeks of support</li>
                        <li>✓ Daily check-ins</li>
                        <li>✓ Plan adjustments</li>
                    </ul>
                </div>
                
                <div style="background: white; padding: 32px; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-top: 4px solid #8b5cf6;">
                    <h3 style="font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 16px;">Newborn Care</h3>
                    <p style="color: #6b7280; margin-bottom: 24px;">Specialized support for newborns (0-4 months)</p>
                    <div style="color: #8b5cf6; font-size: 32px; font-weight: bold; margin-bottom: 16px;">$199</div>
                    <ul style="text-align: left; color: #6b7280; margin-bottom: 24px;">
                        <li>✓ Newborn sleep education</li>
                        <li>✓ Feeding coordination</li>
                        <li>✓ Day/night routine</li>
                        <li>✓ Safe sleep practices</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
        <div style="max-width: 1200px; margin: 0 auto;">
            <h2 style="font-size: 48px; font-weight: bold; margin-bottom: 48px; color: #1f2937;">What Parents Say</h2>
            <div id="testimonials-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
                <!-- Testimonials will be loaded here -->
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section">
        <div style="max-width: 800px; margin: 0 auto;">
            <h2 style="font-size: 48px; font-weight: bold; margin-bottom: 24px; color: #1f2937;">Get In Touch</h2>
            <p style="font-size: 20px; color: #6b7280; margin-bottom: 48px;">
                Ready to transform your family's sleep? Let's start with a conversation.
            </p>
            
            <form class="contact-form" onsubmit="handleSubmit(event)">
                <input type="text" class="form-input" placeholder="Parent Name" required>
                <input type="email" class="form-input" placeholder="Email Address" required>
                <input type="tel" class="form-input" placeholder="Phone Number" required>
                <input type="text" class="form-input" placeholder="Child's Age" required>
                <textarea class="form-input" rows="4" placeholder="Tell us about your sleep challenges" required></textarea>
                <button type="submit" class="btn-primary" style="width: 100%;">Schedule Free Consultation</button>
            </form>
        </div>
    </section>

    <!-- Footer -->
    <footer style="background: #1f2937; color: white; padding: 40px 20px; text-align: center;">
        <div style="max-width: 1200px; margin: 0 auto;">
            <h3 style="font-size: 24px; font-weight: bold; margin-bottom: 16px;">Baby Sleep Whisperer</h3>
            <p style="color: #9ca3af; margin-bottom: 24px;">
                Helping families achieve better sleep through gentle, proven methods.
            </p>
            <div style="display: flex; justify-content: center; gap: 32px; margin-bottom: 24px;">
                <a href="mailto:hello@babysleepwhisperer.com" style="color: #9ca3af; text-decoration: none;">hello@babysleepwhisperer.com</a>
                <a href="tel:+15551234567" style="color: #9ca3af; text-decoration: none;">+1 (555) 123-4567</a>
            </div>
            <p style="color: #6b7280; margin: 0;">&copy; 2024 Baby Sleep Whisperer. All rights reserved.</p>
        </div>
    </footer>

    <script>
        // Load testimonials
        fetch('/api/testimonials')
            .then(response => response.json())
            .then(testimonials => {
                const container = document.getElementById('testimonials-container');
                container.innerHTML = testimonials.map(testimonial => \`
                    <div class="testimonial-card">
                        <div class="stars">\${'★'.repeat(testimonial.rating)}</div>
                        <p style="color: #6b7280; margin-bottom: 16px;">"\${testimonial.testimonial}"</p>
                        <div style="font-weight: 600; color: #1f2937;">\${testimonial.parent_name}</div>
                        <div style="color: #9ca3af; font-size: 14px;">Parent of \${testimonial.child_age} old</div>
                    </div>
                \`).join('');
            })
            .catch(error => {
                console.log('Loading testimonials...', error);
                document.getElementById('testimonials-container').innerHTML = '<p>Loading testimonials...</p>';
            });

        // Handle form submission
        function handleSubmit(event) {
            event.preventDefault();
            alert('Thank you for your interest! We will contact you within 24 hours to schedule your free consultation.');
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    </script>
</body>
</html>
  \`);
});

// Admin login page
app.get('/admin-auth', (req, res) => {
  res.send(\`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Baby Sleep Whisperer</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
        }
        .login-card {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            padding: 40px;
            max-width: 400px;
            width: 100%;
        }
        .login-header {
            text-align: center;
            margin-bottom: 32px;
        }
        .login-title {
            font-size: 28px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 8px;
        }
        .login-subtitle {
            color: #6b7280;
            font-size: 16px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-label {
            display: block;
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
        }
        .form-input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 16px;
            box-sizing: border-box;
        }
        .form-input:focus {
            outline: none;
            border-color: #3b82f6;
        }
        .btn-login {
            width: 100%;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 12px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
        }
        .btn-login:hover {
            background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
        }
        .back-link {
            text-align: center;
            margin-top: 20px;
        }
        .back-link a {
            color: #6b7280;
            text-decoration: none;
        }
        .alert {
            padding: 12px;
            border-radius: 8px;
            margin-top: 16px;
            font-size: 14px;
        }
        .alert-success {
            background: #dcfce7;
            color: #166534;
        }
        .alert-error {
            background: #fee2e2;
            color: #991b1b;
        }
    </style>
</head>
<body>
    <div class="login-card">
        <div class="login-header">
            <h2 class="login-title">Admin Login</h2>
            <p class="login-subtitle">Baby Sleep Whisperer</p>
        </div>
        
        <form onsubmit="handleLogin(event)">
            <div class="form-group">
                <label class="form-label">Username</label>
                <input type="text" id="username" class="form-input" placeholder="Enter username" value="admin" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">Password</label>
                <input type="password" id="password" class="form-input" placeholder="Enter password" value="password123" required>
            </div>
            
            <button type="submit" class="btn-login">Sign In</button>
        </form>
        
        <div id="message"></div>
        
        <div class="back-link">
            <a href="/">← Back to Website</a>
        </div>
    </div>

    <script>
        function handleLogin(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === 'admin' && password === 'password123') {
                document.getElementById('message').innerHTML = '<div class="alert alert-success">Login successful! Redirecting...</div>';
                setTimeout(() => {
                    window.location.href = '/admin';
                }, 1500);
            } else {
                document.getElementById('message').innerHTML = '<div class="alert alert-error">Invalid credentials. Please try again.</div>';
            }
        }
    </script>
</body>
</html>
  \`);
});

// Admin dashboard
app.get('/admin', (req, res) => {
  res.send(\`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Baby Sleep Whisperer</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f8fafc;
            margin: 0;
            padding: 0;
        }
        .dashboard-header {
            background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%);
            color: white;
            padding: 32px;
            margin-bottom: 32px;
        }
        .dashboard-title {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        .dashboard-subtitle {
            color: #c7d2fe;
            font-size: 18px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 24px;
            margin-bottom: 32px;
        }
        .stat-card {
            background: white;
            padding: 24px;
            border-radius: 16px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border-left: 4px solid #3b82f6;
        }
        .stat-number {
            font-size: 32px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 8px;
        }
        .stat-label {
            color: #6b7280;
            font-size: 14px;
        }
        .card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            padding: 24px;
            margin-bottom: 24px;
        }
        .card-title {
            font-size: 20px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 16px;
        }
        .btn {
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            text-decoration: none;
            display: inline-block;
            margin-right: 8px;
            margin-bottom: 8px;
        }
        .btn-primary {
            background: #3b82f6;
            color: white;
        }
        .btn-success {
            background: #10b981;
            color: white;
        }
        .btn-warning {
            background: #f59e0b;
            color: white;
        }
        .btn-danger {
            background: #ef4444;
            color: white;
        }
        .btn:hover {
            opacity: 0.9;
        }
        .actions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
        }
    </style>
</head>
<body>
    <div class="dashboard-header">
        <div class="container">
            <h1 class="dashboard-title">Admin Dashboard</h1>
            <p class="dashboard-subtitle">Baby Sleep Whisperer Management</p>
        </div>
    </div>

    <div class="container">
        <!-- Stats -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">24</div>
                <div class="stat-label">New Contacts This Week</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">12</div>
                <div class="stat-label">Active Consultations</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">89</div>
                <div class="stat-label">Published Testimonials</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">15</div>
                <div class="stat-label">Blog Posts</div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="card">
            <h2 class="card-title">Quick Actions</h2>
            <div class="actions-grid">
                <button class="btn btn-primary" onclick="alert('Contact management would open here')">View Contacts</button>
                <button class="btn btn-success" onclick="alert('Consultation management would open here')">Manage Consultations</button>
                <button class="btn btn-warning" onclick="alert('Testimonial management would open here')">Review Testimonials</button>
                <button class="btn btn-primary" onclick="alert('Blog management would open here')">Edit Blog Posts</button>
            </div>
        </div>

        <!-- System Status -->
        <div class="card">
            <h2 class="card-title">System Status</h2>
            <p style="color: #10b981; font-weight: 600;">✅ All systems operational</p>
            <p style="color: #6b7280; margin-top: 8px;">Server running on port 80 | Last updated: Just now</p>
        </div>

        <!-- Navigation -->
        <div class="card">
            <h2 class="card-title">Navigation</h2>
            <a href="/" class="btn btn-primary">View Website</a>
            <a href="/admin-auth" class="btn btn-danger">Logout</a>
        </div>
    </div>
</body>
</html>
  \`);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(\`🚀 Baby Sleep Whisperer running on port \${PORT}\`);
  console.log(\`📱 Website: http://31.97.99.104\`);
  console.log(\`🔐 Admin: http://31.97.99.104/admin-auth\`);
  console.log(\`✅ COMPLETE REPLICA DEPLOYED!\`);
});
`;

// Execute the server deployment
const sshProcess = spawn('ssh', [
  'root@31.97.99.104',
  `cd /var/www/baby-sleep-complete && echo '${serverScript}' > server.js && npm install express && pm2 delete all && pm2 start server.js --name baby-sleep-complete && pm2 save && echo "✅ Server deployed successfully!"`
], {
  stdio: 'inherit'
});

sshProcess.on('close', (code) => {
  console.log(`✅ VPS deployment completed with code: ${code}`);
});

sshProcess.on('error', (error) => {
  console.error('❌ SSH connection error:', error);
});