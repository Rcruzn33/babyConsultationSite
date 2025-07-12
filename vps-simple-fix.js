const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Happy Baby Sleeping - Professional Sleep Consulting</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            line-height: 1.6;
            color: #2F4F4F;
            background: #FFF8DC;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Header Styles */
        .header {
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
            padding: 1rem 0;
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .logo-icon {
            font-size: 2rem;
        }
        
        .logo-text h1 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #2F4F4F;
            margin: 0;
        }
        
        .logo-text p {
            font-size: 0.8rem;
            color: #696969;
            margin: 0;
        }
        
        .nav {
            display: flex;
            gap: 2rem;
            align-items: center;
        }
        
        .nav-link {
            color: #2F4F4F;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .nav-link:hover,
        .nav-link.active {
            background: #87CEEB;
            color: white;
        }
        
        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, rgba(135, 206, 235, 0.2) 0%, rgba(255, 182, 193, 0.1) 50%, rgba(152, 251, 152, 0.2) 100%);
            padding: 5rem 0;
            text-align: center;
        }
        
        .hero-content {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .hero h1 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: #2F4F4F;
            line-height: 1.2;
        }
        
        .hero .highlight {
            color: #87CEEB;
        }
        
        .hero p {
            font-size: 1.25rem;
            margin-bottom: 2.5rem;
            color: #696969;
            line-height: 1.6;
        }
        
        .hero-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 1rem 2rem;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            text-align: center;
            min-width: 200px;
        }
        
        .btn-primary {
            background: #FFB6C1;
            color: white;
        }
        
        .btn-primary:hover {
            background: #FF69B4;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 182, 193, 0.4);
        }
        
        .btn-secondary {
            background: transparent;
            color: #87CEEB;
            border: 2px solid #87CEEB;
        }
        
        .btn-secondary:hover {
            background: #87CEEB;
            color: white;
            transform: translateY(-2px);
        }
        
        /* Trust Indicators */
        .trust-section {
            background: white;
            padding: 3rem 0;
        }
        
        .trust-indicators {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            text-align: center;
        }
        
        .trust-item {
            padding: 1rem;
        }
        
        .trust-number {
            font-size: 2rem;
            font-weight: 700;
            color: #87CEEB;
            margin-bottom: 0.5rem;
        }
        
        .trust-label {
            font-size: 1rem;
            color: #696969;
            font-weight: 500;
        }
        
        /* Features Section */
        .features-section {
            padding: 5rem 0;
            background: #FFF8DC;
        }
        
        .section-title {
            text-align: center;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: #2F4F4F;
        }
        
        .section-subtitle {
            text-align: center;
            font-size: 1.2rem;
            color: #696969;
            margin-bottom: 3rem;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .feature-card {
            background: white;
            padding: 2.5rem;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        
        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        
        .feature-icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 2rem;
        }
        
        .feature-card:nth-child(1) .feature-icon {
            background: rgba(135, 206, 235, 0.2);
            color: #87CEEB;
        }
        
        .feature-card:nth-child(2) .feature-icon {
            background: rgba(255, 182, 193, 0.2);
            color: #FFB6C1;
        }
        
        .feature-card:nth-child(3) .feature-icon {
            background: rgba(152, 251, 152, 0.2);
            color: #98FB98;
        }
        
        .feature-card h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #2F4F4F;
            font-weight: 600;
        }
        
        .feature-card p {
            color: #696969;
            line-height: 1.8;
        }
        
        /* Services Section */
        .services-section {
            padding: 5rem 0;
            background: white;
        }
        
        .services {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .service-card {
            background: white;
            padding: 2.5rem;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            position: relative;
            border: 2px solid transparent;
        }
        
        .service-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        
        .service-card.popular {
            border-color: #FFB6C1;
            background: linear-gradient(135deg, #fff 0%, rgba(255, 182, 193, 0.05) 100%);
        }
        
        .service-card.popular::before {
            content: "Most Popular";
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            background: #FFB6C1;
            color: white;
            padding: 0.5rem 1.5rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
        }
        
        .service-icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 2rem;
            color: white;
        }
        
        .service-card:nth-child(1) .service-icon {
            background: #87CEEB;
        }
        
        .service-card:nth-child(2) .service-icon {
            background: #FFB6C1;
        }
        
        .service-card:nth-child(3) .service-icon {
            background: #98FB98;
        }
        
        .service-card h3 {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            color: #2F4F4F;
            font-weight: 600;
        }
        
        .service-features {
            text-align: left;
            margin-bottom: 2rem;
            list-style: none;
        }
        
        .service-features li {
            margin-bottom: 0.75rem;
            color: #696969;
            display: flex;
            align-items: center;
            line-height: 1.5;
        }
        
        .service-features li::before {
            content: "✓";
            color: #87CEEB;
            font-weight: 700;
            margin-right: 0.75rem;
            font-size: 1.1rem;
        }
        
        /* Contact Section */
        .contact-section {
            padding: 5rem 0;
            background: linear-gradient(135deg, rgba(135, 206, 235, 0.2) 0%, rgba(255, 182, 193, 0.1) 50%, rgba(152, 251, 152, 0.2) 100%);
        }
        
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .contact-card {
            background: white;
            padding: 2rem;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        
        .contact-card:hover {
            transform: translateY(-5px);
        }
        
        .contact-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            font-size: 1.5rem;
            color: white;
        }
        
        .contact-card:nth-child(1) .contact-icon {
            background: #87CEEB;
        }
        
        .contact-card:nth-child(2) .contact-icon {
            background: #FFB6C1;
        }
        
        .contact-card h4 {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
            color: #2F4F4F;
        }
        
        .contact-card p {
            color: #696969;
            font-size: 1rem;
        }
        
        .contact-card a {
            color: #87CEEB;
            text-decoration: none;
        }
        
        .contact-card a:hover {
            text-decoration: underline;
        }
        
        /* Footer */
        .footer {
            background: #2F4F4F;
            color: white;
            padding: 3rem 0 1.5rem;
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .footer-section h4 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            color: white;
        }
        
        .footer-section p,
        .footer-section li {
            color: #ccc;
            margin-bottom: 0.5rem;
            line-height: 1.6;
        }
        
        .footer-section ul {
            list-style: none;
        }
        
        .footer-section ul li {
            padding: 0.25rem 0;
        }
        
        .footer-bottom {
            text-align: center;
            border-top: 1px solid #555;
            padding-top: 1.5rem;
            color: #ccc;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2rem;
            }
            
            .hero p {
                font-size: 1.1rem;
            }
            
            .hero-buttons {
                flex-direction: column;
                align-items: center;
            }
            
            .btn {
                width: 100%;
                max-width: 300px;
            }
            
            .nav {
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .header-content {
                flex-direction: column;
                gap: 1rem;
            }
            
            .section-title {
                font-size: 2rem;
            }
            
            .container {
                padding: 0 1rem;
            }
        }
        
        @media (max-width: 480px) {
            .hero {
                padding: 3rem 0;
            }
            
            .hero h1 {
                font-size: 1.8rem;
            }
            
            .features-section,
            .services-section,
            .contact-section {
                padding: 3rem 0;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <div class="logo-icon">🌙</div>
                    <div class="logo-text">
                        <h1>Happy Baby Sleeping</h1>
                        <p>Professional Sleep Consulting</p>
                    </div>
                </div>
                <nav class="nav">
                    <a href="#home" class="nav-link active">Home</a>
                    <a href="#about" class="nav-link">About</a>
                    <a href="#services" class="nav-link">Services</a>
                    <a href="#contact" class="nav-link">Contact</a>
                </nav>
            </div>
        </div>
    </header>

    <section class="hero" id="home">
        <div class="container">
            <div class="hero-content">
                <h1>Peaceful Nights for Your <span class="highlight">Little One</span></h1>
                <p>Expert sleep consulting tailored specifically to your child to help develop healthy sleep habits, giving your whole family the rest you deserve.</p>
                <div class="hero-buttons">
                    <a href="#contact" class="btn btn-primary">Book Free Consultation</a>
                    <a href="#services" class="btn btn-secondary">View Services</a>
                </div>
            </div>
        </div>
    </section>

    <section class="trust-section">
        <div class="container">
            <div class="trust-indicators">
                <div class="trust-item">
                    <div class="trust-number">100+</div>
                    <div class="trust-label">Families Helped</div>
                </div>
                <div class="trust-item">
                    <div class="trust-number">8</div>
                    <div class="trust-label">Years Experience</div>
                </div>
                <div class="trust-item">
                    <div class="trust-number">Expert</div>
                    <div class="trust-label">Guidance</div>
                </div>
                <div class="trust-item">
                    <div class="trust-number">24/7</div>
                    <div class="trust-label">Support</div>
                </div>
            </div>
        </div>
    </section>

    <section class="features-section" id="about">
        <div class="container">
            <h2 class="section-title">Why Families Choose My Services</h2>
            <p class="section-subtitle">
                My sleep training approach is holistic and covers your child's full 24-hours — including naps, nighttime sleep, feedings, bedtime routines, and daytime activities.
            </p>
            <div class="features">
                <div class="feature-card">
                    <div class="feature-icon">💖</div>
                    <h3>Personalized Methods</h3>
                    <p>Utilize a variety of techniques that are customized for your child and your family. Methods are based on the developmental, emotional, and biological needs of your child.</p>
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
    </section>

    <section class="services-section" id="services">
        <div class="container">
            <h2 class="section-title">Sleep Solutions for Every Family</h2>
            <p class="section-subtitle">
                Personalized sleep plans designed to work with your baby's temperament and your family's lifestyle.
            </p>
            <div class="services">
                <div class="service-card">
                    <div class="service-icon">📞</div>
                    <h3>Free Consultation</h3>
                    <ul class="service-features">
                        <li>15-minute phone call</li>
                        <li>Sleep assessment</li>
                        <li>General information</li>
                        <li>Next steps discussion</li>
                    </ul>
                    <a href="#contact" class="btn btn-primary">Schedule Free Call</a>
                </div>
                <div class="service-card popular">
                    <div class="service-icon">🛏️</div>
                    <h3>Complete Sleep Package</h3>
                    <ul class="service-features">
                        <li>Comprehensive sleep assessment</li>
                        <li>Day and Night sleep monitoring</li>
                        <li>Personalized daily schedule</li>
                        <li>Personalized sleep plan</li>
                        <li>Child's room assessment</li>
                        <li>Unlimited support and Follow-up calls</li>
                        <li>Support for sleep regressions</li>
                        <li>Schedule adjustment due to growth</li>
                    </ul>
                    <a href="#contact" class="btn btn-primary">Get Started Today</a>
                </div>
                <div class="service-card">
                    <div class="service-icon">👶</div>
                    <h3>Newborn Care</h3>
                    <ul class="service-features">
                        <li>Prenatal and Postpartum education</li>
                        <li>Creating sustainable routines from day 1</li>
                        <li>One-on-one newborn care consultation</li>
                        <li>Custom newborn care sleep plan</li>
                        <li>Education on feeding, soothing, routines</li>
                        <li>Gentle methods for child and parents</li>
                        <li>In home or virtual assistance</li>
                    </ul>
                    <a href="#contact" class="btn btn-primary">Get Started Today</a>
                </div>
            </div>
        </div>
    </section>

    <section class="contact-section" id="contact">
        <div class="container">
            <h2 class="section-title">Ready for Peaceful Nights?</h2>
            <p class="section-subtitle">
                Join hundreds of families who've transformed their sleep with expert guidance. Your journey to better sleep starts with a free consultation.
            </p>
            <div class="contact-grid">
                <div class="contact-card">
                    <div class="contact-icon">📧</div>
                    <h4>Email</h4>
                    <p><a href="mailto:happybabysleeping@gmail.com">happybabysleeping@gmail.com</a></p>
                </div>
                <div class="contact-card">
                    <div class="contact-icon">📞</div>
                    <h4>Phone</h4>
                    <p><a href="tel:+16614706815">(661) 470-6815</a></p>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="logo">
                        <div class="logo-icon">🌙</div>
                        <div class="logo-text">
                            <h4>Happy Baby Sleeping</h4>
                        </div>
                    </div>
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
                    <h4>Resources</h4>
                    <ul>
                        <li>Sleep Tips</li>
                        <li>Blog Articles</li>
                        <li>Parent Guides</li>
                        <li>Success Stories</li>
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
                <p>&copy; 2025 Happy Baby Sleeping. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;
    
    res.writeHead(200, { 
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache'
    });
    res.end(htmlContent);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Happy Baby Sleeping Server running on port ${PORT}`);
    console.log(`🌐 Website accessible at: http://31.97.99.104`);
    console.log(`📊 Server started at: ${new Date().toISOString()}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('🛑 Received SIGINT, shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('🛑 Received SIGTERM, shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});