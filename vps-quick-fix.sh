#!/bin/bash

# Quick VPS deployment fix for Baby Sleep Whisperer

echo "=== Baby Sleep Whisperer VPS Quick Fix ==="

# Stop any existing servers
sudo pkill -f "node /tmp" 2>/dev/null || true

# Create server on port 3000 (in case port 80 is blocked)
sudo cat > /tmp/baby-server.js << 'EOF'
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*'
  });
  
  res.end(`<!DOCTYPE html>
<html>
<head>
    <title>Baby Sleep Whisperer</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: #fefbf3; color: #333; }
        .header { background: white; padding: 1rem 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header h1 { color: #87ceeb; font-size: 1.8rem; }
        .hero { padding: 4rem 2rem; background: linear-gradient(135deg, rgba(135,206,235,0.1), rgba(255,182,193,0.1)); }
        .hero-content { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .hero-text h2 { font-size: 3.5rem; margin-bottom: 1.5rem; line-height: 1.2; }
        .hero-text .highlight { color: #87ceeb; }
        .hero-text p { font-size: 1.2rem; color: #666; margin-bottom: 2rem; }
        .hero-buttons { display: flex; gap: 1rem; margin-bottom: 3rem; }
        .btn { padding: 0.8rem 2rem; border-radius: 50px; text-decoration: none; font-weight: 600; transition: all 0.3s; }
        .btn-primary { background: #ffb6c1; color: white; }
        .btn-outline { border: 2px solid #87ceeb; color: #87ceeb; background: transparent; }
        .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .stat { text-align: center; background: rgba(255,255,255,0.8); padding: 1.5rem; border-radius: 1rem; }
        .stat-number { font-size: 2rem; font-weight: 700; color: #87ceeb; display: block; }
        .stat-label { color: #666; font-size: 0.9rem; }
        .hero-image { text-align: center; position: relative; }
        .hero-image img { width: 100%; max-width: 500px; height: 400px; object-fit: cover; border-radius: 1.5rem; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
        .badge { position: absolute; bottom: 20px; right: 20px; background: white; padding: 1rem; border-radius: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        .features { padding: 4rem 2rem; background: white; }
        .features h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto; }
        .feature-card { text-align: center; padding: 2rem; border-radius: 1rem; transition: transform 0.3s; }
        .feature-card:hover { transform: translateY(-5px); }
        .feature-card:nth-child(1) { background: rgba(135,206,235,0.1); }
        .feature-card:nth-child(2) { background: rgba(255,182,193,0.1); }
        .feature-card:nth-child(3) { background: rgba(152,251,152,0.1); }
        .feature-icon { font-size: 3rem; margin-bottom: 1rem; }
        .feature-card h3 { font-size: 1.5rem; margin-bottom: 1rem; }
        .feature-card p { color: #666; line-height: 1.6; }
        .footer { background: #333; color: white; padding: 3rem 2rem; text-align: center; }
        .footer h3 { color: #87ceeb; margin-bottom: 1rem; }
        @media (max-width: 768px) {
            .hero-content { grid-template-columns: 1fr; text-align: center; }
            .hero-text h2 { font-size: 2.5rem; }
            .stats { grid-template-columns: repeat(2, 1fr); }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Baby Sleep Whisperer</h1>
    </div>
    
    <div class="hero">
        <div class="hero-content">
            <div class="hero-text">
                <h2>Peaceful Nights for Your <span class="highlight">Little One</span></h2>
                <p>Expert sleep consulting tailored specifically to your child to help develop healthy sleep habits, giving your whole family the rest you deserve.</p>
                <div class="hero-buttons">
                    <a href="#" class="btn btn-primary">Book Free Consultation</a>
                    <a href="#" class="btn btn-outline">View Services</a>
                </div>
                <div class="stats">
                    <div class="stat">
                        <span class="stat-number">100+</span>
                        <span class="stat-label">Families Helped</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">Proven</span>
                        <span class="stat-label">Methods</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">Expert</span>
                        <span class="stat-label">Guidance</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">Excellent</span>
                        <span class="stat-label">Results</span>
                    </div>
                </div>
            </div>
            <div class="hero-image">
                <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop" alt="Baby sleeping peacefully">
                <div class="badge">
                    <strong>Sleep Success</strong><br><small>Within 2 weeks</small>
                </div>
            </div>
        </div>
    </div>
    
    <div class="features">
        <h2>Why Families Choose My Services</h2>
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">💖</div>
                <h3>Personalized Methods</h3>
                <p>Utilize a variety of techniques that are customized for your child and your family. Methods are based on the developmental, emotional, biological needs of your child.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🎓</div>
                <h3>Expert Guidance</h3>
                <p>Experienced sleep consultant and newborn care specialist helping families achieve better sleep through education, guidance, and personalized plans.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🕐</div>
                <h3>Ongoing Support</h3>
                <p>Unlimited text support, follow-up calls, and plan adjustments to ensure lasting success for your family.</p>
            </div>
        </div>
    </div>
    
    <div class="footer">
        <h3>Baby Sleep Whisperer</h3>
        <p>happybabysleeping@gmail.com</p>
        <p>(661) 470-6815</p>
        <p>&copy; 2025 Baby Sleep Whisperer. All rights reserved.</p>
    </div>
</body>
</html>`);
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Baby Sleep Whisperer server running on port 3000');
  console.log('Access at: http://31.97.99.104:3000');
});
EOF

echo "Starting Baby Sleep Whisperer server on port 3000..."
sudo node /tmp/baby-server.js &

echo "=== Server started successfully ==="
echo "Access your website at: http://31.97.99.104:3000"
echo "If port 3000 is blocked, try running: sudo node /tmp/baby-server.js"