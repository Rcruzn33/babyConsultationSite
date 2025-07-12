const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

// Simple debug server to check what's happening
const server = http.createServer((req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);
    
    if (req.url.startsWith('/attached_assets/')) {
        const filePath = path.join('/var/www', req.url);
        console.log(`Looking for asset: ${filePath}`);
        try {
            if (fs.existsSync(filePath)) {
                const ext = path.extname(filePath).toLowerCase();
                let contentType = 'text/plain';
                switch (ext) {
                    case '.jpg':
                    case '.jpeg': contentType = 'image/jpeg'; break;
                    case '.png': contentType = 'image/png'; break;
                    case '.gif': contentType = 'image/gif'; break;
                }
                res.writeHead(200, { 'Content-Type': contentType });
                fs.createReadStream(filePath).pipe(res);
                return;
            } else {
                console.log(`Asset not found: ${filePath}`);
            }
        } catch (error) {
            console.error('Error serving static file:', error);
        }
    }
    
    // Serve main HTML with debugging
    const htmlContent = `<!DOCTYPE html>
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
        console.log('Scripts loading...');
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
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background-color: #FFF8DC;
        }
        
        .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #FFF8DC;
            font-size: 24px;
            font-weight: bold;
            color: #2F4F4F;
        }
        
        .card-hover {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div id="loading" class="loading">Loading Happy Baby Sleeping...</div>
    <div id="root"></div>
    
    <script type="text/babel">
        console.log('Babel script starting...');
        
        const { useState, useEffect } = React;
        
        function App() {
            const [currentPage, setCurrentPage] = useState('home');
            const [isLoading, setIsLoading] = useState(true);
            
            useEffect(() => {
                console.log('App mounted, hiding loading...');
                document.getElementById('loading').style.display = 'none';
                setIsLoading(false);
            }, []);
            
            if (isLoading) {
                return <div className="loading">Loading...</div>;
            }
            
            return (
                <div className="min-h-screen bg-cream">
                    <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    <main>
                        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
                        {currentPage === 'about' && <AboutPage />}
                        {currentPage === 'services' && <ServicesPage />}
                        {currentPage === 'blog' && <BlogPage />}
                        {currentPage === 'contact' && <ContactPage />}
                    </main>
                    <Footer />
                </div>
            );
        }
        
        function Navigation({ currentPage, setCurrentPage }) {
            return (
                <nav className="bg-white shadow-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <span className="text-3xl">🌙</span>
                                <div>
                                    <h1 className="text-xl font-bold text-soft-dark">Happy Baby Sleeping</h1>
                                    <p className="text-xs text-medium-gray">Professional Sleep Consulting</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6">
                                <button
                                    onClick={() => setCurrentPage('home')}
                                    className={\`px-4 py-2 rounded-lg transition-all duration-200 \${currentPage === 'home' ? 'bg-baby-blue text-white shadow-lg' : 'text-soft-dark hover:bg-baby-blue hover:bg-opacity-10'}\`}
                                >
                                    Home
                                </button>
                                <button
                                    onClick={() => setCurrentPage('about')}
                                    className={\`px-4 py-2 rounded-lg transition-all duration-200 \${currentPage === 'about' ? 'bg-baby-blue text-white shadow-lg' : 'text-soft-dark hover:bg-baby-blue hover:bg-opacity-10'}\`}
                                >
                                    About
                                </button>
                                <button
                                    onClick={() => setCurrentPage('services')}
                                    className={\`px-4 py-2 rounded-lg transition-all duration-200 \${currentPage === 'services' ? 'bg-baby-blue text-white shadow-lg' : 'text-soft-dark hover:bg-baby-blue hover:bg-opacity-10'}\`}
                                >
                                    Services
                                </button>
                                <button
                                    onClick={() => setCurrentPage('blog')}
                                    className={\`px-4 py-2 rounded-lg transition-all duration-200 \${currentPage === 'blog' ? 'bg-baby-blue text-white shadow-lg' : 'text-soft-dark hover:bg-baby-blue hover:bg-opacity-10'}\`}
                                >
                                    Blog
                                </button>
                                <button
                                    onClick={() => setCurrentPage('contact')}
                                    className={\`px-4 py-2 rounded-lg transition-all duration-200 \${currentPage === 'contact' ? 'bg-baby-blue text-white shadow-lg' : 'text-soft-dark hover:bg-baby-blue hover:bg-opacity-10'}\`}
                                >
                                    Contact
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            );
        }
        
        function HomePage({ setCurrentPage }) {
            return (
                <main>
                    <section className="relative overflow-hidden bg-gradient-to-br from-baby-blue/20 via-soft-pink/10 to-mint/20">
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                                <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
                                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-soft-dark leading-tight">
                                        Peaceful Nights for Your{" "}
                                        <span className="text-baby-blue">Little One</span>
                                    </h1>
                                    <p className="text-lg sm:text-xl text-medium-gray leading-relaxed">
                                        Expert sleep consulting tailored specifically to your child to help develop healthy sleep habits, giving your whole family the rest you deserve.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                        <button
                                            onClick={() => setCurrentPage('services')}
                                            className="bg-soft-pink text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-baby-blue transition-colors"
                                        >
                                            Book Free Consultation
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage('services')}
                                            className="border-2 border-baby-blue text-baby-blue px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-baby-blue hover:text-white transition-colors"
                                        >
                                            View Services
                                        </button>
                                    </div>
                                </div>
                                <div className="relative mt-8 lg:mt-0">
                                    <div className="w-full h-96 bg-gradient-to-br from-baby-blue/30 to-soft-pink/30 rounded-2xl flex items-center justify-center">
                                        <div className="text-center text-soft-dark">
                                            <div className="text-6xl mb-4">🌙</div>
                                            <div className="text-2xl font-bold">Peaceful Sleep</div>
                                            <div className="text-lg">for Your Baby</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <section className="py-16 sm:py-24 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12 sm:mb-16">
                                <h2 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">Why Families Choose My Services</h2>
                                <p className="text-lg sm:text-xl text-medium-gray max-w-4xl mx-auto">
                                    My sleep training approach is holistic and covers your child's full 24-hours — including naps, nighttime sleep, feedings, bedtime routines, and daytime activities.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                                <div className="text-center p-6 sm:p-8 rounded-2xl bg-baby-blue/5 card-hover">
                                    <div className="w-16 h-16 bg-baby-blue rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="text-white text-2xl">💖</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-semibold text-soft-dark mb-4">Personalized Methods</h3>
                                    <p className="text-medium-gray leading-relaxed">
                                        Techniques customized for your child and family, based on developmental, emotional, and biological needs.
                                    </p>
                                </div>
                                <div className="text-center p-6 sm:p-8 rounded-2xl bg-soft-pink/10 card-hover">
                                    <div className="w-16 h-16 bg-soft-pink rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="text-white text-2xl">🎓</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-semibold text-soft-dark mb-4">Expert Guidance</h3>
                                    <p className="text-medium-gray leading-relaxed">
                                        Experienced sleep consultant helping families achieve better sleep through education and personalized plans.
                                    </p>
                                </div>
                                <div className="text-center p-6 sm:p-8 rounded-2xl bg-mint/10 card-hover">
                                    <div className="w-16 h-16 bg-mint rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="text-white text-2xl">🕐</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-semibold text-soft-dark mb-4">Ongoing Support</h3>
                                    <p className="text-medium-gray leading-relaxed">
                                        Unlimited text support, follow-up calls, and plan adjustments for lasting success.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            );
        }
        
        function AboutPage() {
            return (
                <main>
                    <section className="py-16 sm:py-24 bg-cream">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h1 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-6">
                                    Hello! I am Yanina, your sleep consultant.
                                </h1>
                                <div className="max-w-4xl mx-auto space-y-6 text-lg text-medium-gray leading-relaxed">
                                    <p>
                                        My journey began with a bachelor's degree in psychology, which laid the foundation for my understanding of child development, sleep cycles and patterns, family dynamics, and the emotional and physical needs of babies and parents.
                                    </p>
                                    <p>
                                        Over 8 years, I have combined this academic background with extensive real world experience, helping many families create nurturing environments and healthy sleep habits for their little ones.
                                    </p>
                                    <p>
                                        If you are having sleepless nights with an infant or a toddler, I am here to guide you with compassion, knowledge and practical solutions. My goal is to empower parents with the confidence and tools they need to thrive.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            );
        }
        
        function ServicesPage() {
            return (
                <main>
                    <section className="py-16 sm:py-24 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h1 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">
                                    Sleep Solutions for Every Family
                                </h1>
                                <p className="text-lg sm:text-xl text-medium-gray max-w-3xl mx-auto">
                                    Personalized sleep plans designed to work with your baby's temperament and your family's lifestyle.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="bg-baby-blue/5 p-8 rounded-2xl border-2 border-transparent card-hover">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-baby-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-white text-2xl">📞</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-soft-dark mb-6">Free Consultation</h3>
                                        <ul className="space-y-3 mb-8 text-medium-gray">
                                            <li>✓ 15-minute phone call</li>
                                            <li>✓ Sleep assessment</li>
                                            <li>✓ General information</li>
                                            <li>✓ Next steps discussion</li>
                                        </ul>
                                        <button className="w-full bg-baby-blue text-white py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
                                            Schedule Free Call
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="bg-soft-pink/10 p-8 rounded-2xl border-2 border-soft-pink card-hover relative">
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-soft-pink text-white px-4 py-1 rounded-full text-sm font-semibold">
                                            Most Popular
                                        </span>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-soft-pink rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-white text-2xl">🛏️</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-soft-dark mb-6">Complete Sleep Package</h3>
                                        <ul className="space-y-3 mb-8 text-medium-gray">
                                            <li>✓ Comprehensive sleep assessment</li>
                                            <li>✓ Personalized sleep plan</li>
                                            <li>✓ Unlimited support</li>
                                            <li>✓ Follow-up calls</li>
                                        </ul>
                                        <button className="w-full bg-soft-pink text-white py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
                                            Get Started Today
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="bg-mint/10 p-8 rounded-2xl border-2 border-transparent card-hover">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-mint rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-white text-2xl">👶</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-soft-dark mb-6">Newborn Care</h3>
                                        <ul className="space-y-3 mb-8 text-medium-gray">
                                            <li>✓ Prenatal education</li>
                                            <li>✓ Postpartum support</li>
                                            <li>✓ Newborn care plan</li>
                                            <li>✓ In-home assistance</li>
                                        </ul>
                                        <button className="w-full bg-mint text-white py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
                                            Get Started Today
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            );
        }
        
        function BlogPage() {
            return (
                <main>
                    <section className="py-16 sm:py-24 bg-cream">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h1 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">
                                    Sleep Tips & Resources
                                </h1>
                                <p className="text-lg sm:text-xl text-medium-gray max-w-3xl mx-auto">
                                    Expert advice and insights to help you understand your baby's sleep needs.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
                                    <div className="h-48 bg-gradient-to-br from-baby-blue/20 to-soft-pink/20 flex items-center justify-center">
                                        <span className="text-4xl">🌙</span>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-soft-dark mb-3">
                                            Creating the Perfect Sleep Environment
                                        </h3>
                                        <p className="text-medium-gray leading-relaxed">
                                            Learn how to optimize your baby's room for better sleep.
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
                                    <div className="h-48 bg-gradient-to-br from-soft-pink/20 to-mint/20 flex items-center justify-center">
                                        <span className="text-4xl">☀️</span>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-soft-dark mb-3">
                                            Mastering Daytime Naps
                                        </h3>
                                        <p className="text-medium-gray leading-relaxed">
                                            Why naps are crucial for nighttime sleep success.
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
                                    <div className="h-48 bg-gradient-to-br from-mint/20 to-baby-blue/20 flex items-center justify-center">
                                        <span className="text-4xl">🛏️</span>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-soft-dark mb-3">
                                            Gentle Sleep Training Methods
                                        </h3>
                                        <p className="text-medium-gray leading-relaxed">
                                            Compassionate approaches that work for every family.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            );
        }
        
        function ContactPage() {
            return (
                <main>
                    <section className="py-16 sm:py-24 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h1 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">Get in Touch</h1>
                                <p className="text-lg sm:text-xl text-medium-gray max-w-3xl mx-auto">
                                    Ready to start your journey to better nights? I'm here to help.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                                <div className="bg-cream p-8 rounded-3xl">
                                    <h2 className="text-2xl font-bold text-soft-dark mb-6">Send a Message</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-baby-blue focus:outline-none" />
                                        </div>
                                        <div>
                                            <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-baby-blue focus:outline-none" />
                                        </div>
                                        <div>
                                            <textarea rows="4" placeholder="Your Message" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-baby-blue focus:outline-none resize-none"></textarea>
                                        </div>
                                        <button className="w-full bg-baby-blue text-white py-4 rounded-xl font-semibold hover:bg-opacity-90 transition-colors">
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="bg-white p-8 rounded-3xl shadow-lg">
                                        <h3 className="text-2xl font-bold text-soft-dark mb-6">Contact Information</h3>
                                        <div className="space-y-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-baby-blue rounded-full flex items-center justify-center">
                                                    <span className="text-white text-xl">📞</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-soft-dark">Phone</h4>
                                                    <p className="text-medium-gray">(661) 470-6815</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-soft-pink rounded-full flex items-center justify-center">
                                                    <span className="text-white text-xl">📧</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-soft-dark">Email</h4>
                                                    <p className="text-medium-gray">happybabysleeping@gmail.com</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center">
                                                    <span className="text-white text-xl">🕐</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-soft-dark">Response Time</h4>
                                                    <p className="text-medium-gray">Within 48 hours</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            );
        }
        
        function Footer() {
            return (
                <footer className="bg-soft-dark text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <span className="text-2xl">🌙</span>
                                    <h3 className="text-xl font-bold">Happy Baby Sleeping</h3>
                                </div>
                                <p className="text-gray-300">
                                    Professional sleep consulting for peaceful nights and happy families.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Services</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li>Free Consultation</li>
                                    <li>Complete Sleep Package</li>
                                    <li>Newborn Care</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li>Sleep Tips</li>
                                    <li>Blog Articles</li>
                                    <li>Success Stories</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                                <div className="space-y-2 text-gray-300">
                                    <p>happybabysleeping@gmail.com</p>
                                    <p>(661) 470-6815</p>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-600 mt-12 pt-8 text-center text-gray-400">
                            <p>&copy; 2025 Happy Baby Sleeping. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            );
        }
        
        console.log('About to render App...');
        ReactDOM.render(React.createElement(App), document.getElementById('root'));
        console.log('App rendered successfully!');
    </script>
</body>
</html>`;
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Debug Happy Baby Sleeping Server running on port ${PORT}`);
    console.log(`Website accessible at: http://31.97.99.104`);
    console.log(`Console logs will help debug any JavaScript issues`);
});