const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log('Request:', req.method, req.url);
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Happy Baby Sleeping - Professional Sleep Consulting</title>
    <style>
        :root {
            --cream: hsl(200, 25%, 98%);
            --baby-blue: hsl(207, 90%, 84%);
            --soft-pink: hsl(338, 100%, 92%);
            --mint: hsl(150, 50%, 88%);
            --soft-dark: hsl(0, 0%, 20%);
            --medium-gray: hsl(0, 0%, 40%);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background-color: var(--cream);
            color: var(--soft-dark);
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Header */
        .header {
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
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
            color: var(--soft-dark);
        }

        .logo-text p {
            font-size: 0.8rem;
            color: var(--medium-gray);
        }

        .nav {
            display: flex;
            gap: 2rem;
        }

        .nav a {
            color: var(--soft-dark);
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .nav a:hover {
            background: var(--baby-blue);
            color: white;
        }

        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, 
                hsla(207, 90%, 84%, 0.2) 0%, 
                hsla(338, 100%, 92%, 0.1) 50%, 
                hsla(150, 50%, 88%, 0.2) 100%);
            padding: 5rem 0;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, 
                hsla(207, 90%, 84%, 0.15) 0%, 
                hsla(338, 100%, 92%, 0.08) 50%, 
                hsla(150, 50%, 88%, 0.15) 100%);
            z-index: 1;
        }

        .hero-content {
            position: relative;
            z-index: 2;
        }

        .hero h1 {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: var(--soft-dark);
            line-height: 1.2;
        }

        .hero .highlight {
            color: var(--baby-blue);
            background: linear-gradient(135deg, var(--baby-blue), hsl(207, 90%, 70%));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .hero p {
            font-size: 1.25rem;
            margin-bottom: 2.5rem;
            color: var(--medium-gray);
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.7;
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
            min-width: 200px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .btn-primary {
            background: var(--soft-pink);
            color: white;
        }

        .btn-primary:hover {
            background: hsl(338, 100%, 85%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .btn-secondary {
            background: transparent;
            color: var(--baby-blue);
            border: 2px solid var(--baby-blue);
        }

        .btn-secondary:hover {
            background: var(--baby-blue);
            color: white;
            transform: translateY(-2px);
        }

        /* Sections */
        .section {
            padding: 5rem 0;
        }

        .section-title {
            text-align: center;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--soft-dark);
        }

        .section-subtitle {
            text-align: center;
            font-size: 1.2rem;
            color: var(--medium-gray);
            margin-bottom: 3rem;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.7;
        }

        /* Services Grid */
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
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .service-card.popular {
            border-color: var(--soft-pink);
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }

        .service-card.popular::before {
            content: "Most Popular";
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--soft-pink);
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
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .service-card:nth-child(1) .service-icon {
            background: linear-gradient(135deg, var(--baby-blue), hsl(207, 90%, 70%));
        }

        .service-card:nth-child(2) .service-icon {
            background: linear-gradient(135deg, var(--soft-pink), hsl(338, 100%, 85%));
        }

        .service-card:nth-child(3) .service-icon {
            background: linear-gradient(135deg, var(--mint), hsl(150, 50%, 75%));
        }

        .service-card h3 {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            color: var(--soft-dark);
            font-weight: 600;
        }

        .service-features {
            text-align: left;
            margin-bottom: 2rem;
            list-style: none;
        }

        .service-features li {
            margin-bottom: 0.75rem;
            color: var(--medium-gray);
            display: flex;
            align-items: flex-start;
            line-height: 1.6;
        }

        .service-features li::before {
            content: "✓";
            color: var(--baby-blue);
            font-weight: 700;
            margin-right: 0.75rem;
            margin-top: 0.1rem;
            flex-shrink: 0;
        }

        .service-card .btn {
            width: 100%;
            margin-top: 1rem;
        }

        /* Features Section */
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
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
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
            color: white;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .feature-card:nth-child(1) .feature-icon {
            background: linear-gradient(135deg, var(--baby-blue), hsl(207, 90%, 70%));
        }

        .feature-card:nth-child(2) .feature-icon {
            background: linear-gradient(135deg, var(--soft-pink), hsl(338, 100%, 85%));
        }

        .feature-card:nth-child(3) .feature-icon {
            background: linear-gradient(135deg, var(--mint), hsl(150, 50%, 75%));
        }

        .feature-card h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--soft-dark);
            font-weight: 600;
        }

        .feature-card p {
            color: var(--medium-gray);
            line-height: 1.8;
        }

        /* Contact Section */
        .contact-section {
            background: linear-gradient(135deg, 
                hsla(207, 90%, 84%, 0.15) 0%, 
                hsla(338, 100%, 92%, 0.08) 50%, 
                hsla(150, 50%, 88%, 0.15) 100%);
        }

        /* Footer */
        .footer {
            background: var(--soft-dark);
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

        .footer-section p {
            color: #ccc;
            margin-bottom: 0.5rem;
        }

        .footer-section ul {
            list-style: none;
        }

        .footer-section li {
            color: #ccc;
            margin-bottom: 0.5rem;
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
                font-size: 2.5rem;
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

            .services {
                grid-template-columns: 1fr;
            }

            .features {
                grid-template-columns: 1fr;
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
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact</a>
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

    <section class="section" id="about" style="background: white;">
        <div class="container">
            <h2 class="section-title">Why Families Choose My Services</h2>
            <p class="section-subtitle">My sleep training approach is holistic and covers your child's full 24-hours — including naps, nighttime sleep, feedings, bedtime routines, and daytime activities.</p>
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

    <section class="section" id="services">
        <div class="container">
            <h2 class="section-title">Sleep Solutions for Every Family</h2>
            <p class="section-subtitle">Personalized sleep plans designed to work with your baby's temperament and your family's lifestyle.</p>
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

    <section class="section contact-section" id="contact">
        <div class="container">
            <h2 class="section-title">Ready for Peaceful Nights?</h2>
            <p class="section-subtitle">Join hundreds of families who've transformed their sleep with expert guidance. Your journey to better sleep starts with a free consultation.</p>
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
</html>`);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Happy Baby Sleeping Server running on port ${PORT}`);
    console.log(`Website: http://31.97.99.104`);
});