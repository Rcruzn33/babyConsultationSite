const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);
    
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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: linear-gradient(135deg, #FFF8DC 0%, #F0F8FF 100%);
            line-height: 1.6;
            color: #2F4F4F;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .header {
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 20px 0;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .logo-icon {
            font-size: 32px;
        }
        
        .logo-text h1 {
            font-size: 24px;
            font-weight: bold;
            color: #2F4F4F;
        }
        
        .logo-text p {
            font-size: 12px;
            color: #696969;
        }
        
        .nav {
            display: flex;
            gap: 30px;
        }
        
        .nav a {
            color: #2F4F4F;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .nav a:hover, .nav a.active {
            background: #87CEEB;
            color: white;
        }
        
        .hero {
            padding: 80px 0;
            text-align: center;
            background: linear-gradient(135deg, rgba(135, 206, 235, 0.2) 0%, rgba(255, 182, 193, 0.1) 50%, rgba(152, 251, 152, 0.2) 100%);
        }
        
        .hero h1 {
            font-size: 48px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #2F4F4F;
        }
        
        .hero .highlight {
            color: #87CEEB;
        }
        
        .hero p {
            font-size: 20px;
            margin-bottom: 40px;
            color: #696969;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .hero-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 15px 30px;
            border: none;
            border-radius: 50px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }
        
        .btn-primary {
            background: #FFB6C1;
            color: white;
        }
        
        .btn-primary:hover {
            background: #87CEEB;
            transform: translateY(-2px);
        }
        
        .btn-secondary {
            background: transparent;
            color: #87CEEB;
            border: 2px solid #87CEEB;
        }
        
        .btn-secondary:hover {
            background: #87CEEB;
            color: white;
        }
        
        .trust-indicators {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-top: 60px;
            flex-wrap: wrap;
        }
        
        .trust-item {
            text-align: center;
        }
        
        .trust-number {
            font-size: 28px;
            font-weight: bold;
            color: #87CEEB;
        }
        
        .trust-label {
            font-size: 14px;
            color: #696969;
        }
        
        .section {
            padding: 80px 0;
        }
        
        .section-title {
            text-align: center;
            font-size: 36px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #2F4F4F;
        }
        
        .section-subtitle {
            text-align: center;
            font-size: 18px;
            color: #696969;
            margin-bottom: 60px;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
            margin-top: 60px;
        }
        
        .feature-card {
            background: white;
            padding: 40px;
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
            margin: 0 auto 20px;
            font-size: 32px;
        }
        
        .feature-card:nth-child(1) .feature-icon {
            background: rgba(135, 206, 235, 0.1);
            color: #87CEEB;
        }
        
        .feature-card:nth-child(2) .feature-icon {
            background: rgba(255, 182, 193, 0.1);
            color: #FFB6C1;
        }
        
        .feature-card:nth-child(3) .feature-icon {
            background: rgba(152, 251, 152, 0.1);
            color: #98FB98;
        }
        
        .feature-card h3 {
            font-size: 24px;
            margin-bottom: 15px;
            color: #2F4F4F;
        }
        
        .feature-card p {
            color: #696969;
            line-height: 1.8;
        }
        
        .services {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 30px;
            margin-top: 60px;
        }
        
        .service-card {
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            position: relative;
        }
        
        .service-card:hover {
            transform: translateY(-5px);
        }
        
        .service-card.popular {
            border: 3px solid #FFB6C1;
        }
        
        .service-card.popular::before {
            content: "Most Popular";
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            background: #FFB6C1;
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
        }
        
        .service-icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 32px;
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
            font-size: 24px;
            margin-bottom: 20px;
            color: #2F4F4F;
        }
        
        .service-features {
            text-align: left;
            margin-bottom: 30px;
        }
        
        .service-features li {
            margin-bottom: 10px;
            color: #696969;
            display: flex;
            align-items: center;
        }
        
        .service-features li::before {
            content: "✓";
            color: #87CEEB;
            font-weight: bold;
            margin-right: 10px;
        }
        
        .footer {
            background: #2F4F4F;
            color: white;
            padding: 60px 0 30px;
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 40px;
            margin-bottom: 40px;
        }
        
        .footer-section h4 {
            font-size: 20px;
            margin-bottom: 20px;
        }
        
        .footer-section p, .footer-section li {
            color: #ccc;
            margin-bottom: 10px;
        }
        
        .footer-section ul {
            list-style: none;
        }
        
        .footer-bottom {
            text-align: center;
            border-top: 1px solid #555;
            padding-top: 20px;
            color: #ccc;
        }
        
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 36px;
            }
            
            .hero p {
                font-size: 18px;
            }
            
            .hero-buttons {
                flex-direction: column;
                align-items: center;
            }
            
            .nav {
                flex-direction: column;
                gap: 10px;
            }
            
            .trust-indicators {
                gap: 20px;
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
                    <a href="#home" class="active">Home</a>
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#blog">Blog</a>
                    <a href="#contact">Contact</a>
                </nav>
            </div>
        </div>
    </header>

    <section class="hero">
        <div class="container">
            <h1>Peaceful Nights for Your <span class="highlight">Little One</span></h1>
            <p>Expert sleep consulting tailored specifically to your child to help develop healthy sleep habits, giving your whole family the rest you deserve.</p>
            <div class="hero-buttons">
                <a href="#contact" class="btn btn-primary">Book Free Consultation</a>
                <a href="#services" class="btn btn-secondary">View Services</a>
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
    </section>

    <section class="section" id="about">
        <div class="container">
            <h2 class="section-title">Why Families Choose My Services</h2>
            <p class="section-subtitle">
                My sleep training approach is holistic and covers your child's full 24-hours — including naps, nighttime sleep, feedings, bedtime routines, and daytime activities. It's designed to establish healthy sleep habits, support overall well-being, and help your child thrive and reach important developmental milestones.
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

    <section class="section" id="services" style="background: white;">
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

    <section class="section" id="contact" style="background: linear-gradient(135deg, rgba(135, 206, 235, 0.2) 0%, rgba(255, 182, 193, 0.1) 50%, rgba(152, 251, 152, 0.2) 100%);">
        <div class="container">
            <h2 class="section-title">Ready for Peaceful Nights?</h2>
            <p class="section-subtitle">
                Join hundreds of families who've transformed their sleep with effective methods. Your journey to better sleep starts with a free consultation.
            </p>
            <div class="hero-buttons">
                <a href="mailto:happybabysleeping@gmail.com" class="btn btn-primary">Email: happybabysleeping@gmail.com</a>
                <a href="tel:+16614706815" class="btn btn-secondary">Call: (661) 470-6815</a>
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
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Happy Baby Sleeping Server running on port ${PORT}`);
    console.log(`Website accessible at: http://31.97.99.104`);
});