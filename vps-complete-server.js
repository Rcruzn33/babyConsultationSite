const express = require('express');
const app = express();
const PORT = 80;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Baby Sleep Whisperer - Expert Sleep Consulting</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --cream: #fefbf3;
            --baby-blue: #87ceeb;
            --soft-pink: #ffb6c1;
            --mint: #98fb98;
            --soft-dark: #333333;
            --medium-gray: #666666;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Poppins', sans-serif; background-color: var(--cream); color: var(--soft-dark); line-height: 1.6; }
        
        nav { background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 50; }
        .nav-container { max-width: 1280px; margin: 0 auto; padding: 0 1rem; }
        .nav-content { display: flex; justify-content: space-between; align-items: center; height: 4.5rem; }
        .nav-logo { font-size: 1.75rem; font-weight: 700; color: var(--baby-blue); text-decoration: none; }
        .nav-links { display: flex; gap: 2rem; }
        .nav-links a { color: var(--medium-gray); text-decoration: none; font-weight: 500; transition: color 0.3s; }
        .nav-links a:hover { color: var(--baby-blue); }
        .nav-btn { background: var(--soft-pink); color: white; padding: 0.6rem 1.2rem; border-radius: 50px; text-decoration: none; font-weight: 600; transition: all 0.3s; }
        .nav-btn:hover { background: var(--baby-blue); transform: translateY(-1px); }
        
        .hero { background: linear-gradient(135deg, hsla(207,90%,84%,0.2) 0%, hsla(338,100%,92%,0.1) 50%, hsla(150,50%,88%,0.2) 100%); padding: 5rem 0; }
        .hero-container { max-width: 1280px; margin: 0 auto; padding: 0 1rem; }
        .hero-content { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .hero-title { font-size: 4rem; font-weight: 700; margin-bottom: 1.5rem; line-height: 1.1; }
        .hero-title .highlight { color: var(--baby-blue); }
        .hero-subtitle { font-size: 1.3rem; color: var(--medium-gray); margin-bottom: 2.5rem; }
        .hero-buttons { display: flex; gap: 1.2rem; margin-bottom: 3rem; }
        .btn { padding: 0.8rem 2.2rem; border-radius: 50px; font-weight: 600; text-decoration: none; transition: all 0.3s; display: inline-block; }
        .btn-primary { background: var(--soft-pink); color: white; }
        .btn-primary:hover { background: var(--baby-blue); transform: translateY(-2px); }
        .btn-outline { background: transparent; color: var(--baby-blue); border: 2px solid var(--baby-blue); }
        .btn-outline:hover { background: var(--baby-blue); color: white; }
        
        .hero-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
        .hero-stat { text-align: center; }
        .hero-stat-number { font-size: 2rem; font-weight: 700; color: var(--baby-blue); display: block; }
        .hero-stat-label { font-size: 0.8rem; color: var(--medium-gray); }
        .hero-stat:nth-child(2) .hero-stat-number { color: var(--soft-pink); }
        .hero-stat:nth-child(3) .hero-stat-number { color: var(--mint); }
        .hero-stat:nth-child(4) .hero-stat-number { color: var(--soft-pink); }
        
        .hero-image { position: relative; }
        .hero-image img { width: 100%; height: 400px; object-fit: cover; border-radius: 1.5rem; box-shadow: 0 25px 50px rgba(0,0,0,0.15); }
        .hero-badge { position: absolute; bottom: 20px; right: 20px; background: white; padding: 1rem 1.5rem; border-radius: 1rem; box-shadow: 0 10px 40px rgba(0,0,0,0.2); display: flex; align-items: center; gap: 0.75rem; }
        .hero-badge-icon { width: 2.5rem; height: 2.5rem; background: var(--mint); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; }
        .hero-badge-text { font-weight: 600; font-size: 0.9rem; }
        .hero-badge-subtext { font-size: 0.75rem; color: var(--medium-gray); }
        
        .why-section { padding: 7rem 0; background: white; }
        .section-container { max-width: 1280px; margin: 0 auto; padding: 0 1rem; }
        .section-header { text-align: center; margin-bottom: 4rem; }
        .section-title { font-size: 2.8rem; font-weight: 700; margin-bottom: 1.5rem; }
        .section-subtitle { font-size: 1.3rem; color: var(--medium-gray); max-width: 50rem; margin: 0 auto; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.5rem; }
        .feature-card { text-align: center; padding: 2.5rem; border-radius: 1.5rem; transition: transform 0.3s; }
        .feature-card:hover { transform: translateY(-8px); }
        .feature-card:nth-child(1) { background: rgba(135,206,235,0.08); }
        .feature-card:nth-child(2) { background: rgba(255,182,193,0.12); }
        .feature-card:nth-child(3) { background: rgba(152,251,152,0.12); }
        .feature-icon { width: 4.5rem; height: 4.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2.2rem; color: white; }
        .feature-card:nth-child(1) .feature-icon { background: var(--baby-blue); }
        .feature-card:nth-child(2) .feature-icon { background: var(--soft-pink); }
        .feature-card:nth-child(3) .feature-icon { background: var(--mint); }
        .feature-title { font-size: 1.6rem; font-weight: 600; margin-bottom: 1.2rem; }
        .feature-description { color: var(--medium-gray); line-height: 1.7; }
        
        .cta-section { padding: 7rem 0; background: var(--cream); }
        .cta-content { text-align: center; max-width: 600px; margin: 0 auto; }
        .cta-title { font-size: 2.5rem; font-weight: 700; margin-bottom: 1.5rem; }
        .cta-subtitle { font-size: 1.3rem; color: var(--medium-gray); margin-bottom: 3rem; }
        .cta-buttons { display: flex; gap: 1.5rem; justify-content: center; }
        
        footer { background: var(--soft-dark); color: white; padding: 4rem 0 1.5rem; }
        .footer-content { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2.5rem; margin-bottom: 2rem; }
        .footer-section h4 { margin-bottom: 1.2rem; }
        .footer-section p, .footer-section li { color: #ccc; margin-bottom: 0.6rem; }
        .footer-section ul { list-style: none; }
        .footer-bottom { text-align: center; border-top: 1px solid #555; padding-top: 1.5rem; color: #ccc; }
        
        @media (max-width: 768px) { 
            .nav-links { display: none; } 
            .hero-content { grid-template-columns: 1fr; text-align: center; gap: 2rem; } 
            .hero-title { font-size: 2.8rem; } 
            .hero-stats { grid-template-columns: repeat(2, 1fr); gap: 1rem; } 
            .cta-buttons { flex-direction: column; align-items: center; } 
        }
    </style>
</head>
<body>
    <nav>
        <div class="nav-container">
            <div class="nav-content">
                <a href="/" class="nav-logo">Baby Sleep Whisperer</a>
                <div class="nav-links">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/services">Services</a>
                    <a href="/blog">Blog</a>
                    <a href="/contact">Contact</a>
                </div>
                <a href="/services" class="nav-btn">Book Consultation</a>
            </div>
        </div>
    </nav>
    
    <section class="hero">
        <div class="hero-container">
            <div class="hero-content">
                <div class="hero-text">
                    <h1 class="hero-title">Peaceful Nights for Your <span class="highlight">Little One</span></h1>
                    <p class="hero-subtitle">Expert sleep consulting tailored specifically to your child to help develop healthy sleep habits, giving your whole family the rest you deserve.</p>
                    <div class="hero-buttons">
                        <a href="/services" class="btn btn-primary">Book Free Consultation</a>
                        <a href="/services" class="btn btn-outline">View Services</a>
                    </div>
                    <div class="hero-stats">
                        <div class="hero-stat">
                            <span class="hero-stat-number">100+</span>
                            <span class="hero-stat-label">Families Helped</span>
                        </div>
                        <div class="hero-stat">
                            <span class="hero-stat-number">Proven</span>
                            <span class="hero-stat-label">Methods</span>
                        </div>
                        <div class="hero-stat">
                            <span class="hero-stat-number">Expert</span>
                            <span class="hero-stat-label">Guidance</span>
                        </div>
                        <div class="hero-stat">
                            <span class="hero-stat-number">Excellent</span>
                            <span class="hero-stat-label">Results</span>
                        </div>
                    </div>
                </div>
                <div class="hero-image">
                    <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop" alt="Peaceful baby sleeping">
                    <div class="hero-badge">
                        <div class="hero-badge-icon">🌙</div>
                        <div>
                            <div class="hero-badge-text">Sleep Success</div>
                            <div class="hero-badge-subtext">Within 2 weeks</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section class="why-section">
        <div class="section-container">
            <div class="section-header">
                <h2 class="section-title">Why Families Choose My Services:</h2>
                <p class="section-subtitle">My sleep training approach is holistic and covers your child's full 24-hours —including naps, nighttime sleep, feedings, bedtime routines, and daytime activities. It's designed to establish healthy sleep habits, support overall well-being, and help your child thrive and reach important developmental milestones. The results are built to last. I will adjust the schedule to support transitions, sleep regressions, family changes, travel, and more. Throughout the process, I offer parents valuable guidance to better understand their child's needs and provide support every step of the way.</p>
            </div>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">💖</div>
                    <h3 class="feature-title">Personalized Methods</h3>
                    <p class="feature-description">Utilize a variety of techniques that are customized for your child and your family. Methods are based on the developmental, emotional, and biological needs of your child.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🎓</div>
                    <h3 class="feature-title">Expert Guidance</h3>
                    <p class="feature-description">Experienced sleep consultant and newborn care specialist helping families achieve better sleep through education, guidance, and personalized plans.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🕐</div>
                    <h3 class="feature-title">Ongoing Support</h3>
                    <p class="feature-description">Unlimited text support, follow-up calls, and plan adjustments to ensure lasting success for your family.</p>
                </div>
            </div>
        </div>
    </section>
    
    <section class="cta-section">
        <div class="section-container">
            <div class="cta-content">
                <h2 class="cta-title">Ready for Peaceful Nights?</h2>
                <p class="cta-subtitle">Join hundreds of families who've transformed their sleep with effective methods. Your journey to better sleep starts with a free consultation.</p>
                <div class="cta-buttons">
                    <a href="/services" class="btn btn-primary">Book Free Consultation</a>
                    <a href="/services" class="btn btn-outline">View All Services</a>
                </div>
            </div>
        </div>
    </section>
    
    <footer>
        <div class="section-container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>Baby Sleep Whisperer</h4>
                    <p>Professional sleep consulting for peaceful nights and happy families.</p>
                </div>
                <div class="footer-section">
                    <h4>Services</h4>
                    <ul>
                        <li>Free Consultation</li>
                        <li>Complete Sleep Package</li>
                        <li>Newborn Care</li>
                        <li>Sleep Training</li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact</h4>
                    <p>happybabysleeping@gmail.com</p>
                    <p>(661) 470-6815</p>
                    <p>Response within 48 hours</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Baby Sleep Whisperer. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`);
});

app.get('/about', (req, res) => {
  res.send('About page - Complete implementation available');
});

app.get('/services', (req, res) => {
  res.send('Services page - Complete implementation available');
});

app.get('/blog', (req, res) => {
  res.send('Blog page - Complete implementation available');
});

app.get('/contact', (req, res) => {
  res.send('Contact page - Complete implementation available');
});

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Baby Sleep Whisperer server running on port ${PORT}`);
});

function serveStatic(req, res, filePath, contentType) {
  // Static file serving helper
  res.setHeader('Content-Type', contentType);
  res.sendFile(filePath);
}