const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log('Request received:', req.method, req.url);
    
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Baby Sleep Whisperer - Professional Sleep Consulting</title>
    <style>
        :root {
            --cream: hsl(200, 25%, 98%);
            --baby-blue: hsl(207, 90%, 84%);
            --soft-pink: hsl(338, 100%, 92%);
            --pastel-yellow: hsl(53, 84%, 91%);
            --mint: hsl(150, 50%, 88%);
            --soft-dark: hsl(0, 0%, 20%);
            --medium-gray: hsl(0, 0%, 40%);
            --light-gray: hsl(0, 0%, 90%);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: var(--cream);
            color: var(--soft-dark);
            line-height: 1.6;
            scroll-behavior: smooth;
        }

        /* Navigation */
        nav {
            background: white;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 50;
        }

        .nav-container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        .nav-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 4rem;
        }

        .nav-logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--baby-blue);
            text-decoration: none;
            transition: opacity 0.3s ease;
        }

        .nav-logo:hover {
            opacity: 0.8;
        }

        .nav-links {
            display: flex;
            align-items: center;
            gap: 2rem;
        }

        .nav-links a {
            color: var(--medium-gray);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.875rem;
            transition: color 0.3s ease;
        }

        .nav-links a:hover {
            color: var(--baby-blue);
        }

        .nav-btn {
            background: var(--soft-pink);
            color: white;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 50px;
            font-size: 0.875rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .nav-btn:hover {
            background: var(--baby-blue);
            transform: translateY(-1px);
        }

        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, 
                hsla(207, 90%, 84%, 0.2) 0%, 
                hsla(338, 100%, 92%, 0.1) 50%, 
                hsla(150, 50%, 88%, 0.2) 100%);
            padding: 4rem 0 6rem;
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

        .hero-container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 1rem;
            position: relative;
            z-index: 2;
        }

        .hero-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: center;
        }

        .hero-text {
            text-align: left;
        }

        .hero-title {
            font-size: 3.75rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: var(--soft-dark);
            line-height: 1.1;
        }

        .hero-title .highlight {
            color: var(--baby-blue);
        }

        .hero-subtitle {
            font-size: 1.25rem;
            color: var(--medium-gray);
            margin-bottom: 2rem;
            line-height: 1.6;
        }

        .hero-buttons {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .btn {
            padding: 0.75rem 2rem;
            border: none;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            text-align: center;
        }

        .btn-primary {
            background: var(--soft-pink);
            color: white;
        }

        .btn-primary:hover {
            background: var(--baby-blue);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .btn-outline {
            background: transparent;
            color: var(--baby-blue);
            border: 2px solid var(--baby-blue);
        }

        .btn-outline:hover {
            background: var(--baby-blue);
            color: white;
            transform: translateY(-2px);
        }

        .hero-stats {
            display: flex;
            gap: 1.5rem;
            align-items: center;
        }

        .hero-stat {
            text-align: center;
        }

        .hero-stat-number {
            font-size: 1.875rem;
            font-weight: 700;
            color: var(--baby-blue);
            display: block;
        }

        .hero-stat-label {
            font-size: 0.75rem;
            color: var(--medium-gray);
        }

        .hero-stat:nth-child(2) .hero-stat-number {
            color: var(--soft-pink);
        }

        .hero-stat:nth-child(3) .hero-stat-number {
            color: var(--mint);
        }

        .hero-stat:nth-child(4) .hero-stat-number {
            color: var(--baby-blue);
        }

        .hero-image {
            position: relative;
        }

        .hero-image img {
            width: 100%;
            height: auto;
            border-radius: 1.5rem;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .hero-badge {
            position: absolute;
            bottom: -1.5rem;
            left: -1.5rem;
            background: white;
            padding: 1.5rem;
            border-radius: 1rem;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .hero-badge-icon {
            width: 3rem;
            height: 3rem;
            background: var(--mint);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: white;
        }

        .hero-badge-text {
            font-weight: 600;
            color: var(--soft-dark);
        }

        .hero-badge-subtext {
            font-size: 0.875rem;
            color: var(--medium-gray);
        }

        /* Why Choose Us Section */
        .why-section {
            padding: 6rem 0;
            background: white;
        }

        .section-container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--soft-dark);
            margin-bottom: 1rem;
        }

        .section-subtitle {
            font-size: 1.25rem;
            color: var(--medium-gray);
            max-width: 48rem;
            margin: 0 auto;
            line-height: 1.6;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .feature-card {
            text-align: center;
            padding: 2rem;
            border-radius: 1.5rem;
            transition: transform 0.3s ease;
        }

        .feature-card:hover {
            transform: translateY(-5px);
        }

        .feature-card:nth-child(1) {
            background: rgba(135, 206, 235, 0.05);
        }

        .feature-card:nth-child(2) {
            background: rgba(255, 182, 193, 0.1);
        }

        .feature-card:nth-child(3) {
            background: rgba(152, 251, 152, 0.1);
        }

        .feature-icon {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 2rem;
            color: white;
        }

        .feature-card:nth-child(1) .feature-icon {
            background: var(--baby-blue);
        }

        .feature-card:nth-child(2) .feature-icon {
            background: var(--soft-pink);
        }

        .feature-card:nth-child(3) .feature-icon {
            background: var(--mint);
        }

        .feature-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--soft-dark);
            margin-bottom: 1rem;
        }

        .feature-description {
            color: var(--medium-gray);
            line-height: 1.6;
        }

        /* CTA Section */
        .cta-section {
            padding: 6rem 0;
            background: linear-gradient(135deg, 
                hsla(207, 90%, 84%, 0.15) 0%, 
                hsla(338, 100%, 92%, 0.08) 50%, 
                hsla(150, 50%, 88%, 0.15) 100%);
        }

        .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }

        /* Footer */
        footer {
            background: var(--soft-dark);
            color: white;
            padding: 3rem 0 1rem;
        }

        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .footer-section h4 {
            font-size: 1.125rem;
            margin-bottom: 1rem;
            color: white;
        }

        .footer-section p,
        .footer-section li {
            color: #ccc;
            margin-bottom: 0.5rem;
        }

        .footer-section ul {
            list-style: none;
        }

        .footer-bottom {
            text-align: center;
            border-top: 1px solid #555;
            padding-top: 1rem;
            color: #ccc;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }

            .hero-content {
                grid-template-columns: 1fr;
                text-align: center;
            }

            .hero-title {
                font-size: 2.5rem;
            }

            .hero-buttons {
                flex-direction: column;
                align-items: center;
            }

            .hero-stats {
                justify-content: center;
            }

            .hero-badge {
                position: static;
                margin-top: 1rem;
                display: inline-flex;
            }
        }
    </style>
</head>
<body>
    <nav>
        <div class="nav-container">
            <div class="nav-content">
                <a href="#" class="nav-logo">Baby Sleep Whisperer</a>
                <div class="nav-links">
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#blog">Blog</a>
                    <a href="#contact">Contact</a>
                    <a href="#contact" class="nav-btn">Book Consultation</a>
                </div>
            </div>
        </div>
    </nav>

    <section class="hero" id="home">
        <div class="hero-container">
            <div class="hero-content">
                <div class="hero-text">
                    <h1 class="hero-title">Peaceful Nights for Your <span class="highlight">Little One</span></h1>
                    <p class="hero-subtitle">Expert sleep consulting tailored specifically to your child to help develop healthy sleep habits, giving your whole family the rest you deserve.</p>
                    <div class="hero-buttons">
                        <a href="#contact" class="btn btn-primary">Book Free Consultation</a>
                        <a href="#services" class="btn btn-outline">View Services</a>
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
                    <img src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Peaceful baby sleeping">
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

    <section class="why-section" id="about">
        <div class="section-container">
            <div class="section-header">
                <h2 class="section-title">Why Families Choose My Services:</h2>
                <p class="section-subtitle">My sleep training approach is holistic and covers your child's full 24-hours —including naps, nighttime sleep, feedings, bedtime routines, and daytime activities. It's designed to establish healthy sleep habits, support overall well-being, and help your child thrive and reach important developmental milestones.</p>
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

    <section class="cta-section" id="contact">
        <div class="section-container">
            <div class="section-header">
                <h2 class="section-title">Ready for Peaceful Nights?</h2>
                <p class="section-subtitle">Join hundreds of families who've transformed their sleep with effective methods. Your journey to better sleep starts with a free consultation.</p>
            </div>
            <div class="cta-buttons">
                <a href="mailto:happybabysleeping@gmail.com" class="btn btn-primary">Book Free Consultation</a>
                <a href="#services" class="btn btn-outline">View All Services</a>
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
                <p>&copy; 2025 Baby Sleep Whisperer. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Baby Sleep Whisperer Server running on port ${PORT}`);
    console.log(`Website accessible at: http://31.97.99.104`);
});