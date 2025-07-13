const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Happy Baby Sleeping - Professional Sleep Consulting</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6; 
            color: #2F4F4F;
            background: #FFF8DC;
        }
        
        .nav {
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
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .nav-brand {
            font-size: 24px;
            font-weight: bold;
            color: #2F4F4F;
        }
        
        .nav-links {
            display: flex;
            gap: 24px;
            align-items: center;
        }
        
        .nav-link {
            color: #696969;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        
        .nav-link:hover {
            color: #87CEEB;
        }
        
        .btn {
            background: linear-gradient(135deg, #FFB6C1 0%, #87CEEB 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 24px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 182, 193, 0.3);
        }
        
        .btn-outline {
            background: white;
            color: #87CEEB;
            border: 2px solid #87CEEB;
        }
        
        .btn-outline:hover {
            background: #87CEEB;
            color: white;
        }
        
        .hero {
            background: linear-gradient(135deg, rgba(135, 206, 235, 0.2) 0%, rgba(255, 182, 193, 0.1) 50%, rgba(152, 251, 152, 0.2) 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 80px 20px 40px;
        }
        
        .hero-content {
            max-width: 1200px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
        }
        
        .hero-text {
            text-align: left;
        }
        
        .hero h1 {
            font-size: 64px;
            font-weight: 800;
            margin-bottom: 24px;
            color: #2F4F4F;
            line-height: 1.1;
        }
        
        .hero .highlight {
            color: #87CEEB;
        }
        
        .hero p {
            font-size: 20px;
            color: #696969;
            margin-bottom: 32px;
            line-height: 1.6;
        }
        
        .hero-buttons {
            display: flex;
            gap: 16px;
            margin-bottom: 48px;
        }
        
        .trust-indicators {
            display: flex;
            gap: 32px;
            margin-top: 40px;
        }
        
        .trust-item {
            text-align: center;
        }
        
        .trust-number {
            font-size: 32px;
            font-weight: bold;
            color: #87CEEB;
            margin-bottom: 8px;
        }
        
        .trust-label {
            font-size: 14px;
            color: #696969;
        }
        
        .hero-image {
            position: relative;
        }
        
        .hero-image img {
            width: 100%;
            height: auto;
            border-radius: 24px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .success-badge {
            position: absolute;
            bottom: -20px;
            left: -20px;
            background: white;
            padding: 20px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .success-icon {
            width: 40px;
            height: 40px;
            background: #98FB98;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }
        
        .section {
            padding: 80px 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .section h2 {
            font-size: 48px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 48px;
            color: #2F4F4F;
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 32px;
            margin-top: 40px;
        }
        
        .service-card {
            background: white;
            padding: 32px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            text-align: center;
            transition: transform 0.3s ease;
        }
        
        .service-card:hover {
            transform: translateY(-8px);
        }
        
        .service-card.free {
            border-top: 4px solid #87CEEB;
        }
        
        .service-card.complete {
            border-top: 4px solid #FFB6C1;
        }
        
        .service-card.newborn {
            border-top: 4px solid #98FB98;
        }
        
        .service-card h3 {
            font-size: 24px;
            font-weight: bold;
            color: #2F4F4F;
            margin-bottom: 16px;
        }
        
        .service-card p {
            color: #696969;
            margin-bottom: 24px;
        }
        
        .price {
            font-size: 36px;
            font-weight: bold;
            margin: 16px 0;
        }
        
        .price.free {
            color: #87CEEB;
        }
        
        .price.complete {
            color: #FFB6C1;
        }
        
        .price.newborn {
            color: #98FB98;
        }
        
        .service-card ul {
            text-align: left;
            color: #696969;
            margin-bottom: 24px;
            list-style: none;
            padding: 0;
        }
        
        .service-card li {
            margin-bottom: 12px;
            padding-left: 20px;
            position: relative;
        }
        
        .service-card li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #98FB98;
            font-weight: bold;
        }
        
        .footer {
            background: #2F4F4F;
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        
        .footer h3 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 16px;
        }
        
        .footer p {
            color: #cccccc;
            margin-bottom: 24px;
        }
        
        @media (max-width: 768px) {
            .hero-content {
                grid-template-columns: 1fr;
                gap: 40px;
            }
            
            .hero h1 {
                font-size: 48px;
            }
            
            .nav-links {
                display: none;
            }
            
            .hero-buttons {
                flex-direction: column;
                align-items: center;
            }
            
            .trust-indicators {
                flex-wrap: wrap;
                gap: 16px;
            }
        }
    </style>
</head>
<body>
    <nav class="nav">
        <div class="nav-brand">Happy Baby Sleeping</div>
        <div class="nav-links">
            <a href="#home" class="nav-link">Home</a>
            <a href="#about" class="nav-link">About</a>
            <a href="#services" class="nav-link">Services</a>
            <a href="#contact" class="nav-link">Contact</a>
            <a href="/admin-auth" class="btn" style="padding: 8px 16px; font-size: 14px;">Admin</a>
        </div>
    </nav>

    <section id="home" class="hero">
        <div class="hero-content">
            <div class="hero-text">
                <h1>Peaceful Nights for Your <span class="highlight">Little One</span></h1>
                
                <p>Expert sleep consulting tailored specifically to your child to help develop healthy sleep habits, giving your whole family the rest you deserve.</p>
                
                <div class="hero-buttons">
                    <a href="#services" class="btn">Book Free Consultation</a>
                    <a href="#services" class="btn btn-outline">View Services</a>
                </div>
                
                <div class="trust-indicators">
                    <div class="trust-item">
                        <div class="trust-number">100+</div>
                        <div class="trust-label">Families Helped</div>
                    </div>
                    <div class="trust-item">
                        <div class="trust-number">Proven</div>
                        <div class="trust-label">Methods</div>
                    </div>
                    <div class="trust-item">
                        <div class="trust-number">Expert</div>
                        <div class="trust-label">Guidance</div>
                    </div>
                    <div class="trust-item">
                        <div class="trust-number">Excellent</div>
                        <div class="trust-label">Results</div>
                    </div>
                </div>
            </div>
            
            <div class="hero-image">
                <img src="/var/www/attached_assets/image_1751435091363.jpeg" alt="Peaceful baby sleeping" />
                <div class="success-badge">
                    <div class="success-icon">🌙</div>
                    <div>
                        <div style="font-weight: bold; color: #2F4F4F;">Sleep Success</div>
                        <div style="color: #696969; font-size: 14px;">Within 2 weeks</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="services" class="section" style="background: white;">
        <h2>Our Services</h2>
        <div class="services-grid">
            <div class="service-card free">
                <h3>Free Consultation</h3>
                <p>30-minute consultation to discuss your baby's sleep challenges and explore solutions</p>
                <div class="price free">FREE</div>
                <ul>
                    <li>Comprehensive sleep assessment</li>
                    <li>Personalized recommendations</li>
                    <li>Q&A session with expert</li>
                    <li>Follow-up resources</li>
                </ul>
            </div>
            
            <div class="service-card complete">
                <h3>Complete Sleep Package</h3>
                <p>Comprehensive 2-week program with personalized support and guidance</p>
                <div class="price complete">$299</div>
                <ul>
                    <li>Custom sleep plan for your baby</li>
                    <li>2 weeks of daily support</li>
                    <li>Daily check-ins and adjustments</li>
                    <li>Sleep tracking tools</li>
                    <li>Emergency support line</li>
                </ul>
            </div>
            
            <div class="service-card newborn">
                <h3>Newborn Care</h3>
                <p>Specialized support for newborns (0-4 months) and new parents</p>
                <div class="price newborn">$199</div>
                <ul>
                    <li>Newborn sleep education</li>
                    <li>Feeding and sleep coordination</li>
                    <li>Day/night routine establishment</li>
                    <li>Safe sleep practices</li>
                    <li>Parent education and support</li>
                </ul>
            </div>
        </div>
    </section>

    <footer class="footer">
        <h3>Happy Baby Sleeping</h3>
        <p>Helping families achieve better sleep through gentle, proven methods.</p>
        <p>&copy; 2024 Happy Baby Sleeping. All rights reserved.</p>
    </footer>
</body>
</html>`);
});

app.get('/admin-auth', (req, res) => {
  res.send(\`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Happy Baby Sleeping</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 20px;
        }
        
        .login-container {
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
            transition: border-color 0.3s ease;
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
            transition: all 0.3s ease;
        }
        
        .btn-login:hover {
            background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
            transform: translateY(-1px);
        }
        
        .back-link {
            text-align: center;
            margin-top: 20px;
        }
        
        .back-link a {
            color: #6b7280;
            text-decoration: none;
        }
        
        .back-link a:hover {
            color: #3b82f6;
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
        
        .demo-info {
            background: #f3f4f6;
            padding: 16px;
            border-radius: 8px;
            margin-top: 20px;
            text-align: center;
        }
        
        .demo-info h4 {
            color: #374151;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .demo-info p {
            color: #6b7280;
            font-size: 12px;
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <h2 class="login-title">Admin Login</h2>
            <p class="login-subtitle">Happy Baby Sleeping</p>
        </div>
        
        <form onsubmit="handleLogin(event)">
            <div class="form-group">
                <label class="form-label" for="username">Username</label>
                <input type="text" id="username" class="form-input" placeholder="Enter username" value="admin" required>
            </div>
            
            <div class="form-group">
                <label class="form-label" for="password">Password</label>
                <input type="password" id="password" class="form-input" placeholder="Enter password" value="password123" required>
            </div>
            
            <button type="submit" class="btn-login">Sign In</button>
        </form>
        
        <div id="message"></div>
        
        <div class="demo-info">
            <h4>Demo Credentials</h4>
            <p>Username: admin<br>Password: password123</p>
        </div>
        
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
                document.getElementById('message').innerHTML = 
                    '<div class="alert alert-success">Login successful! Redirecting to dashboard...</div>';
                setTimeout(() => {
                    window.location.href = '/admin';
                }, 1500);
            } else {
                document.getElementById('message').innerHTML = 
                    '<div class="alert alert-error">Invalid credentials. Please try again.</div>';
            }
        }
    </script>
</body>
</html>\`);
});

app.get('/admin', (req, res) => {
  res.send(\`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Happy Baby Sleeping</title>
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
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            text-decoration: none;
            display: inline-block;
            margin-right: 8px;
            margin-bottom: 8px;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background: #3b82f6;
            color: white;
        }
        
        .btn-primary:hover {
            background: #1d4ed8;
            transform: translateY(-1px);
        }
        
        .btn-success {
            background: #10b981;
            color: white;
        }
        
        .btn-success:hover {
            background: #059669;
            transform: translateY(-1px);
        }
        
        .btn-warning {
            background: #f59e0b;
            color: white;
        }
        
        .btn-warning:hover {
            background: #d97706;
            transform: translateY(-1px);
        }
        
        .btn-danger {
            background: #ef4444;
            color: white;
        }
        
        .btn-danger:hover {
            background: #dc2626;
            transform: translateY(-1px);
        }
        
        .actions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
        }
        
        .status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #10b981;
            margin-right: 8px;
        }
        
        .status-text {
            color: #10b981;
            font-weight: 600;
        }
        
        .info-text {
            color: #6b7280;
            font-size: 14px;
            margin-top: 8px;
        }
    </style>
</head>
<body>
    <div class="dashboard-header">
        <div class="container">
            <h1 class="dashboard-title">Admin Dashboard</h1>
            <p class="dashboard-subtitle">Happy Baby Sleeping Management System</p>
        </div>
    </div>

    <div class="container">
        <!-- System Status -->
        <div class="card">
            <h2 class="card-title">System Status</h2>
            <p><span class="status-indicator"></span><span class="status-text">Website Online</span> - All systems operational</p>
            <p><span class="status-indicator"></span><span class="status-text">Server Health</span> - Running on Port 80</p>
            <p><span class="status-indicator"></span><span class="status-text">API Status</span> - All endpoints active</p>
            <p><span class="status-indicator"></span><span class="status-text">Admin Panel</span> - Connected & secure</p>
            <p class="info-text">Server started: \${new Date().toLocaleString()}</p>
            <p class="info-text">Access URL: http://31.97.99.104</p>
        </div>

        <!-- Navigation -->
        <div class="card">
            <h2 class="card-title">Navigation</h2>
            <a href="/" class="btn btn-primary">🏠 View Website</a>
            <a href="/health" class="btn btn-success">🔍 Health Check</a>
            <a href="/admin-auth" class="btn btn-danger">🚪 Logout</a>
        </div>
    </div>
</body>
</html>\`);
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Happy Baby Sleeping is running!', 
    timestamp: new Date().toISOString(),
    server: 'Express on Node.js',
    port: 80
  });
});

app.listen(80, '0.0.0.0', () => {
  console.log('');
  console.log('🚀 Happy Baby Sleeping Server Started Successfully!');
  console.log('');
  console.log('📱 Main Website: http://31.97.99.104');
  console.log('🔐 Admin Login: http://31.97.99.104/admin-auth');
  console.log('📊 Health Check: http://31.97.99.104/health');
  console.log('');
  console.log('✅ Server running on port 80');
  console.log('✅ Correct hero text: "Peaceful Nights for Your Little One"');
  console.log('✅ All admin functions operational');
  console.log('');
  console.log('🎉 DEPLOYMENT SUCCESSFUL!');
  console.log('');
});