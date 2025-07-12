const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Complete Baby Sleep Consulting Website - Matching Replit Design
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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        .hero-section {
            background: linear-gradient(135deg, rgba(135, 206, 235, 0.15) 0%, rgba(255, 182, 193, 0.1) 30%, rgba(152, 251, 152, 0.15) 70%, rgba(255, 248, 220, 0.2) 100%);
            position: relative;
            overflow: hidden;
        }
        
        .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 70%, rgba(135, 206, 235, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.1) 0%, transparent 50%);
            pointer-events: none;
        }
        
        .service-card {
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        
        .service-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .service-card.free {
            background: linear-gradient(135deg, rgba(135, 206, 235, 0.1) 0%, rgba(135, 206, 235, 0.05) 100%);
            border-color: rgba(135, 206, 235, 0.3);
        }
        
        .service-card.premium {
            background: linear-gradient(135deg, rgba(255, 182, 193, 0.1) 0%, rgba(255, 182, 193, 0.05) 100%);
            border-color: rgba(255, 182, 193, 0.3);
        }
        
        .service-card.newborn {
            background: linear-gradient(135deg, rgba(152, 251, 152, 0.1) 0%, rgba(152, 251, 152, 0.05) 100%);
            border-color: rgba(152, 251, 152, 0.3);
        }
        
        .nav-button {
            transition: all 0.2s ease;
            position: relative;
            overflow: hidden;
        }
        
        .nav-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }
        
        .nav-button:hover::before {
            left: 100%;
        }
        
        .testimonial-card {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .form-input {
            transition: all 0.3s ease;
        }
        
        .form-input:focus {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(135, 206, 235, 0.2);
        }
        
        .admin-card {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .contact-item {
            background: linear-gradient(135deg, rgba(240, 248, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%);
            border-left: 4px solid #87CEEB;
        }
        
        .consultation-item {
            background: linear-gradient(135deg, rgba(255, 240, 245, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%);
            border-left: 4px solid #FFB6C1;
        }
        
        .hero-image {
            border-radius: 24px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            transition: transform 0.3s ease;
        }
        
        .hero-image:hover {
            transform: scale(1.02);
        }
        
        .feature-icon {
            background: linear-gradient(135deg, #87CEEB 0%, #98FB98 100%);
            color: white;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin: 0 auto 16px;
            box-shadow: 0 10px 25px rgba(135, 206, 235, 0.3);
        }
        
        .section-title {
            background: linear-gradient(135deg, #2F4F4F 0%, #87CEEB 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .price-badge {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50px;
            padding: 8px 16px;
            position: relative;
            overflow: hidden;
        }
        
        .price-badge::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s;
        }
        
        .price-badge:hover::before {
            left: 100%;
        }
    </style>
</head>
<body>
    <div id="root"></div>
    
    <script type="text/babel">
        const { useState, useEffect } = React;
        
        function App() {
            const [currentPage, setCurrentPage] = useState('home');
            const [showAdmin, setShowAdmin] = useState(false);
            const [contacts, setContacts] = useState([]);
            const [consultations, setConsultations] = useState([]);
            const [formSubmitting, setFormSubmitting] = useState(false);
            
            useEffect(() => {
                if (showAdmin) {
                    setContacts([
                        { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@email.com', phone: '(555) 123-4567', message: 'Hi! I have a 6-month-old who wakes up every 2 hours at night. We have tried everything and are exhausted. Looking for professional help with sleep training.', createdAt: '2025-01-12', status: 'new' },
                        { id: 2, name: 'Mike Chen', email: 'mike.chen@email.com', phone: '(555) 987-6543', message: 'Need guidance for our newborn. Day and night are completely mixed up and we are struggling with establishing any routine.', createdAt: '2025-01-11', status: 'replied' },
                        { id: 3, name: 'Jessica Williams', email: 'jessica.w@email.com', phone: '(555) 456-7890', message: 'My 18-month-old toddler fights bedtime every night. Takes 2+ hours to get him to sleep. Please help!', createdAt: '2025-01-10', status: 'new' },
                        { id: 4, name: 'David Rodriguez', email: 'david.r@email.com', phone: '(555) 321-0987', message: 'Twin babies, 4 months old. One sleeps well, the other is constantly waking up. Need help with sleep synchronization.', createdAt: '2025-01-09', status: 'new' }
                    ]);
                    setConsultations([
                        { id: 1, name: 'Emma Davis', email: 'emma.davis@email.com', phone: '(555) 456-7890', serviceType: 'Complete Sleep Package', childAge: '4-6 months', sleepIssues: 'Frequent night wakings every 1-2 hours, difficulty self-soothing, relies on nursing to fall asleep', goals: 'Sleep through the night independently, establish consistent bedtime routine', createdAt: '2025-01-12', status: 'scheduled' },
                        { id: 2, name: 'Tom Wilson', email: 'tom.wilson@email.com', phone: '(555) 234-5678', serviceType: 'Newborn Care', childAge: '0-3 months', sleepIssues: 'Day/night confusion, very short naps (20-30 minutes), difficulty settling', goals: 'Establish healthy sleep patterns from early age, longer naps during day', createdAt: '2025-01-11', status: 'in-progress' },
                        { id: 3, name: 'Anna Rodriguez', email: 'anna.r@email.com', phone: '(555) 345-6789', serviceType: 'Free Consultation', childAge: '7-12 months', sleepIssues: 'Waking every 2 hours at night, refuses to nap without being held', goals: 'Independent sleep, longer sleep stretches at night', createdAt: '2025-01-10', status: 'completed' },
                        { id: 4, name: 'James Thompson', email: 'james.t@email.com', phone: '(555) 567-8901', serviceType: 'Complete Sleep Package', childAge: '1-2 years', sleepIssues: 'Bedtime battles lasting 2+ hours, frequent night terrors, early morning wake-ups', goals: 'Smooth bedtime routine, eliminate night terrors, age-appropriate sleep schedule', createdAt: '2025-01-09', status: 'scheduled' }
                    ]);
                }
            }, [showAdmin]);
            
            const submitContact = async (formData) => {
                setFormSubmitting(true);
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setFormSubmitting(false);
                alert('Thank you for your message! We will get back to you within 24 hours to discuss how we can help your family achieve better sleep.');
                return true;
            };
            
            const submitConsultation = async (formData) => {
                setFormSubmitting(true);
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setFormSubmitting(false);
                alert('Thank you for booking a consultation! We will contact you within 24 hours to schedule your appointment and discuss your specific sleep challenges.');
                return true;
            };
            
            if (showAdmin) {
                return <AdminDashboard contacts={contacts} consultations={consultations} onBack={() => setShowAdmin(false)} />;
            }
            
            return (
                <div className="min-h-screen bg-cream">
                    <Header currentPage={currentPage} setCurrentPage={setCurrentPage} setShowAdmin={setShowAdmin} />
                    <main>
                        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
                        {currentPage === 'services' && <ServicesPage onSubmitConsultation={submitConsultation} formSubmitting={formSubmitting} />}
                        {currentPage === 'about' && <AboutPage />}
                        {currentPage === 'contact' && <ContactPage onSubmitContact={submitContact} formSubmitting={formSubmitting} />}
                        {currentPage === 'blog' && <BlogPage />}
                    </main>
                    <Footer />
                </div>
            );
        }
        
        function Header({ currentPage, setCurrentPage, setShowAdmin }) {
            return (
                <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
                    <nav className="max-w-7xl mx-auto px-4 py-4">
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
                                    className={\`nav-button px-4 py-2 rounded-lg transition-all duration-200 \${
                                        currentPage === 'home' ? 'bg-baby-blue text-white shadow-lg' : 'text-soft-dark hover:bg-baby-blue/10'
                                    }\`}
                                >
                                    Home
                                </button>
                                <button
                                    onClick={() => setCurrentPage('services')}
                                    className={\`nav-button px-4 py-2 rounded-lg transition-all duration-200 \${
                                        currentPage === 'services' ? 'bg-baby-blue text-white shadow-lg' : 'text-soft-dark hover:bg-baby-blue/10'
                                    }\`}
                                >
                                    Services
                                </button>
                                <button
                                    onClick={() => setCurrentPage('about')}
                                    className={\`nav-button px-4 py-2 rounded-lg transition-all duration-200 \${
                                        currentPage === 'about' ? 'bg-baby-blue text-white shadow-lg' : 'text-soft-dark hover:bg-baby-blue/10'
                                    }\`}
                                >
                                    About
                                </button>
                                <button
                                    onClick={() => setCurrentPage('blog')}
                                    className={\`nav-button px-4 py-2 rounded-lg transition-all duration-200 \${
                                        currentPage === 'blog' ? 'bg-baby-blue text-white shadow-lg' : 'text-soft-dark hover:bg-baby-blue/10'
                                    }\`}
                                >
                                    Blog
                                </button>
                                <button
                                    onClick={() => setCurrentPage('contact')}
                                    className={\`nav-button px-4 py-2 rounded-lg transition-all duration-200 \${
                                        currentPage === 'contact' ? 'bg-baby-blue text-white shadow-lg' : 'text-soft-dark hover:bg-baby-blue/10'
                                    }\`}
                                >
                                    Contact
                                </button>
                                <button
                                    onClick={() => setShowAdmin(true)}
                                    className="nav-button px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg"
                                >
                                    Admin
                                </button>
                            </div>
                        </div>
                    </nav>
                </header>
            );
        }
        
        function HomePage({ setCurrentPage }) {
            return (
                <div>
                    <section className="hero-section py-20 lg:py-32">
                        <div className="relative max-w-7xl mx-auto px-4">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className="text-center lg:text-left">
                                    <h1 className="text-5xl lg:text-7xl font-bold text-soft-dark mb-6 leading-tight">
                                        Peaceful Nights for Your{' '}
                                        <span className="text-baby-blue">Little One</span>
                                    </h1>
                                    <p className="text-xl lg:text-2xl text-medium-gray mb-8 leading-relaxed">
                                        Expert sleep consulting for healthy sleep habits and lasting family rest. 
                                        Transform your nights with professional, gentle guidance.
                                    </p>
                                    <div className="text-center lg:text-left mb-12">
                                        <h2 className="text-2xl lg:text-3xl font-bold text-soft-dark mb-8">
                                            Sweet Dreams Start Here 🌙✨
                                        </h2>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                            <button
                                                onClick={() => setCurrentPage('services')}
                                                className="bg-gradient-to-r from-baby-blue to-mint text-white px-8 py-4 rounded-lg hover:from-baby-blue/90 hover:to-mint/90 transition-all duration-300 font-semibold text-lg shadow-lg transform hover:scale-105"
                                            >
                                                Get Started Today
                                            </button>
                                            <button
                                                onClick={() => setCurrentPage('contact')}
                                                className="bg-white/80 text-soft-dark px-8 py-4 rounded-lg hover:bg-white transition-all duration-300 font-semibold text-lg shadow-lg border border-baby-blue/20"
                                            >
                                                Free Consultation
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 lg:mt-0 relative">
                                    <div className="relative z-10">
                                        <img 
                                            src="/attached_assets/image_1751435091363.jpeg" 
                                            alt="Peaceful baby sleeping" 
                                            className="hero-image w-full h-96 lg:h-[500px] object-cover"
                                        />
                                        <div className="absolute inset-0 hero-image bg-gradient-to-t from-soft-dark/20 to-transparent"></div>
                                    </div>
                                    <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-baby-blue/20 to-mint/20 rounded-3xl -z-10"></div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-baby-blue/5 to-mint/5 opacity-50"></div>
                        <div className="relative max-w-7xl mx-auto px-4">
                            <div className="text-center mb-16">
                                <h2 className="section-title text-4xl lg:text-5xl font-bold mb-6">Choose Your Sleep Solution</h2>
                                <p className="text-xl text-medium-gray max-w-3xl mx-auto">
                                    Professional guidance tailored to your family's unique needs and sleep challenges
                                </p>
                            </div>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="service-card free p-8 rounded-3xl text-center shadow-xl">
                                    <div className="feature-icon mb-6">🌙</div>
                                    <h3 className="text-2xl font-bold text-baby-blue mb-4">Free Consultation</h3>
                                    <p className="text-medium-gray mb-6">30-minute comprehensive assessment</p>
                                    <div className="price-badge text-4xl font-bold text-baby-blue mb-6">FREE</div>
                                    <ul className="text-sm text-medium-gray space-y-3 mb-8 text-left">
                                        <li className="flex items-center"><span className="text-baby-blue mr-2">✓</span>Initial sleep assessment</li>
                                        <li className="flex items-center"><span className="text-baby-blue mr-2">✓</span>Personalized recommendations</li>
                                        <li className="flex items-center"><span className="text-baby-blue mr-2">✓</span>Resource sharing</li>
                                        <li className="flex items-center"><span className="text-baby-blue mr-2">✓</span>Q&A session</li>
                                        <li className="flex items-center"><span className="text-baby-blue mr-2">✓</span>No commitment required</li>
                                    </ul>
                                    <button 
                                        onClick={() => setCurrentPage('services')}
                                        className="w-full bg-baby-blue text-white py-3 rounded-lg hover:bg-baby-blue/90 transition-all duration-300 font-semibold shadow-lg"
                                    >
                                        Book Free Call
                                    </button>
                                </div>
                                
                                <div className="service-card premium p-8 rounded-3xl text-center shadow-xl relative">
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-soft-pink to-baby-blue text-white px-6 py-2 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </div>
                                    <div className="feature-icon mb-6">💤</div>
                                    <h3 className="text-2xl font-bold text-soft-pink mb-4">Complete Sleep Package</h3>
                                    <p className="text-medium-gray mb-6">Full training and ongoing support</p>
                                    <div className="price-badge text-4xl font-bold text-soft-pink mb-6">$299</div>
                                    <ul className="text-sm text-medium-gray space-y-3 mb-8 text-left">
                                        <li className="flex items-center"><span className="text-soft-pink mr-2">✓</span>Comprehensive sleep plan</li>
                                        <li className="flex items-center"><span className="text-soft-pink mr-2">✓</span>2 weeks of daily support</li>
                                        <li className="flex items-center"><span className="text-soft-pink mr-2">✓</span>Phone and text support</li>
                                        <li className="flex items-center"><span className="text-soft-pink mr-2">✓</span>Plan adjustments as needed</li>
                                        <li className="flex items-center"><span className="text-soft-pink mr-2">✓</span>Follow-up sessions</li>
                                        <li className="flex items-center"><span className="text-soft-pink mr-2">✓</span>Sleep tracking tools</li>
                                    </ul>
                                    <button 
                                        onClick={() => setCurrentPage('services')}
                                        className="w-full bg-soft-pink text-white py-3 rounded-lg hover:bg-soft-pink/90 transition-all duration-300 font-semibold shadow-lg"
                                    >
                                        Start Sleep Training
                                    </button>
                                </div>
                                
                                <div className="service-card newborn p-8 rounded-3xl text-center shadow-xl">
                                    <div className="feature-icon mb-6">👶</div>
                                    <h3 className="text-2xl font-bold text-mint mb-4">Newborn Care</h3>
                                    <p className="text-medium-gray mb-6">Specialized gentle infant care</p>
                                    <div className="price-badge text-4xl font-bold text-mint mb-6">$199</div>
                                    <ul className="text-sm text-medium-gray space-y-3 mb-8 text-left">
                                        <li className="flex items-center"><span className="text-mint mr-2">✓</span>Gentle sleep shaping</li>
                                        <li className="flex items-center"><span className="text-mint mr-2">✓</span>Feeding and sleep schedule</li>
                                        <li className="flex items-center"><span className="text-mint mr-2">✓</span>Newborn care guidance</li>
                                        <li className="flex items-center"><span className="text-mint mr-2">✓</span>1 week of support</li>
                                        <li className="flex items-center"><span className="text-mint mr-2">✓</span>Safe sleep education</li>
                                        <li className="flex items-center"><span className="text-mint mr-2">✓</span>Parent education sessions</li>
                                    </ul>
                                    <button 
                                        onClick={() => setCurrentPage('services')}
                                        className="w-full bg-mint text-white py-3 rounded-lg hover:bg-mint/90 transition-all duration-300 font-semibold shadow-lg"
                                    >
                                        Get Newborn Help
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <section className="py-20 lg:py-32 bg-gradient-to-br from-baby-blue/10 to-mint/10">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="text-center mb-16">
                                <h2 className="section-title text-4xl lg:text-5xl font-bold mb-6">Why Choose Happy Baby Sleeping?</h2>
                                <p className="text-xl text-medium-gray max-w-3xl mx-auto">
                                    Trusted by thousands of families for gentle, effective sleep solutions
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <div className="text-center p-6 bg-white/80 rounded-2xl shadow-lg">
                                    <div className="feature-icon mb-4">🎓</div>
                                    <h3 className="text-xl font-bold text-soft-dark mb-3">Certified Experts</h3>
                                    <p className="text-medium-gray">Professional sleep consultants with proven methods and ongoing education</p>
                                </div>
                                <div className="text-center p-6 bg-white/80 rounded-2xl shadow-lg">
                                    <div className="feature-icon mb-4">💝</div>
                                    <h3 className="text-xl font-bold text-soft-dark mb-3">Personalized Care</h3>
                                    <p className="text-medium-gray">Tailored solutions for your family's unique needs and parenting style</p>
                                </div>
                                <div className="text-center p-6 bg-white/80 rounded-2xl shadow-lg">
                                    <div className="feature-icon mb-4">📞</div>
                                    <h3 className="text-xl font-bold text-soft-dark mb-3">24/7 Support</h3>
                                    <p className="text-medium-gray">Daily check-ins, text support, and adjustments as needed throughout the process</p>
                                </div>
                                <div className="text-center p-6 bg-white/80 rounded-2xl shadow-lg">
                                    <div className="feature-icon mb-4">⭐</div>
                                    <h3 className="text-xl font-bold text-soft-dark mb-3">Proven Results</h3>
                                    <p className="text-medium-gray">Over 5,000 families sleeping better with 95% success rate</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
        
        function ServicesPage({ onSubmitConsultation, formSubmitting }) {
            const [formData, setFormData] = useState({
                name: '',
                email: '',
                phone: '',
                serviceType: '',
                childAge: '',
                sleepIssues: '',
                goals: '',
                urgency: ''
            });
            
            const handleSubmit = async (e) => {
                e.preventDefault();
                const success = await onSubmitConsultation(formData);
                if (success) {
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        serviceType: '',
                        childAge: '',
                        sleepIssues: '',
                        goals: '',
                        urgency: ''
                    });
                }
            };
            
            return (
                <div className="py-16 bg-gradient-to-br from-cream to-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h1 className="section-title text-4xl lg:text-5xl font-bold mb-6">Our Services</h1>
                            <p className="text-xl text-medium-gray max-w-3xl mx-auto">
                                Choose the perfect solution for your family's sleep journey
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <div className="service-card free p-8 rounded-3xl shadow-xl">
                                <div className="text-center">
                                    <div className="feature-icon mb-6">🌙</div>
                                    <h3 className="text-2xl font-bold text-baby-blue mb-4">Free Consultation</h3>
                                    <div className="price-badge text-4xl font-bold text-baby-blue mb-6">FREE</div>
                                    <ul className="text-sm text-medium-gray space-y-3 mb-8 text-left">
                                        <li className="flex items-center"><span className="text-baby-blue mr-2">✓</span>30-minute phone/video call</li>
                                        <li className="flex items-center"><span className="text-baby-blue mr-2">✓</span>Comprehensive sleep assessment</li>
                                        <li className="flex items-center"><span className="text-baby-blue mr-2">✓</span>Personalized recommendations</li>
                                        <li className="flex items-center"><span className="text-baby-blue mr-2">✓</span>Resource sharing and tips</li>
                                        <li className="flex items-center"><span className="text-baby-blue mr-2">✓</span>Q&A session</li>
                                        <li className="flex items-center"><span className="text-baby-blue mr-2">✓</span>No commitment required</li>
                                    </ul>
                                    <button 
                                        onClick={() => setFormData({...formData, serviceType: 'Free Consultation'})}
                                        className="w-full bg-baby-blue text-white py-3 rounded-lg hover:bg-baby-blue/90 transition-colors font-semibold"
                                    >
                                        Select Free Consultation
                                    </button>
                                </div>
                            </div>
                            
                            <div className="service-card premium p-8 rounded-3xl shadow-xl relative">
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-soft-pink to-baby-blue text-white px-6 py-2 rounded-full text-sm font-semibold">
                                    Most Popular
                                </div>
                                <div className="text-center">
                                    <div className="feature-icon mb-6">💤</div>
                                    <h3 className="text-2xl font-bold text-soft-pink mb-4">Complete Sleep Package</h3>
                                    <div className="price-badge text-4xl font-bold text-soft-pink mb-6">$299</div>
                                    <ul className="text-sm text-medium-gray space-y-3 mb-8 text-left">
                                        <li className="flex items-center"><span className="text-soft-pink mr-2">✓</span>Comprehensive sleep plan</li>
                                        <li className="flex items-center"><span className="text-soft-pink mr-2">✓</span>2 weeks of daily support</li>
                                        <li className="flex items-center"><span className="text-soft-pink mr-2">✓</span>Phone and text support</li>
                                        <li className="flex items-center"><span className="text-soft-pink mr-2">✓</span>Plan adjustments as needed</li>
                                        <li className="flex items-center"><span className="text-soft-pink mr-2">✓</span>Follow-up sessions</li>
                                        <li className="flex items-center"><span className="text-soft-pink mr-2">✓</span>Sleep tracking tools</li>
                                        <li className="flex items-center"><span className="text-soft-pink mr-2">✓</span>Email support included</li>
                                    </ul>
                                    <button 
                                        onClick={() => setFormData({...formData, serviceType: 'Complete Sleep Package'})}
                                        className="w-full bg-soft-pink text-white py-3 rounded-lg hover:bg-soft-pink/90 transition-colors font-semibold"
                                    >
                                        Select Complete Package
                                    </button>
                                </div>
                            </div>
                            
                            <div className="service-card newborn p-8 rounded-3xl shadow-xl">
                                <div className="text-center">
                                    <div className="feature-icon mb-6">👶</div>
                                    <h3 className="text-2xl font-bold text-mint mb-4">Newborn Care</h3>
                                    <div className="price-badge text-4xl font-bold text-mint mb-6">$199</div>
                                    <ul className="text-sm text-medium-gray space-y-3 mb-8 text-left">
                                        <li className="flex items-center"><span className="text-mint mr-2">✓</span>Gentle sleep shaping</li>
                                        <li className="flex items-center"><span className="text-mint mr-2">✓</span>Feeding and sleep schedule</li>
                                        <li className="flex items-center"><span className="text-mint mr-2">✓</span>Newborn care guidance</li>
                                        <li className="flex items-center"><span className="text-mint mr-2">✓</span>1 week of intensive support</li>
                                        <li className="flex items-center"><span className="text-mint mr-2">✓</span>Safe sleep education</li>
                                        <li className="flex items-center"><span className="text-mint mr-2">✓</span>Parent education sessions</li>
                                        <li className="flex items-center"><span className="text-mint mr-2">✓</span>Feeding consultation</li>
                                    </ul>
                                    <button 
                                        onClick={() => setFormData({...formData, serviceType: 'Newborn Care'})}
                                        className="w-full bg-mint text-white py-3 rounded-lg hover:bg-mint/90 transition-colors font-semibold"
                                    >
                                        Select Newborn Care
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
                            <h2 className="text-3xl font-bold text-soft-dark mb-8 text-center">Book Your Consultation</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="form-input w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="form-input w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            className="form-input w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                            placeholder="(555) 123-4567"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Service Type *</label>
                                        <select
                                            required
                                            value={formData.serviceType}
                                            onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                                            className="form-input w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        >
                                            <option value="">Select a service</option>
                                            <option value="Free Consultation">Free Consultation</option>
                                            <option value="Complete Sleep Package">Complete Sleep Package ($299)</option>
                                            <option value="Newborn Care">Newborn Care ($199)</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Child's Age *</label>
                                        <select
                                            required
                                            value={formData.childAge}
                                            onChange={(e) => setFormData({...formData, childAge: e.target.value})}
                                            className="form-input w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        >
                                            <option value="">Select age range</option>
                                            <option value="0-3 months">0-3 months (Newborn)</option>
                                            <option value="4-6 months">4-6 months (Infant)</option>
                                            <option value="7-12 months">7-12 months (Mobile infant)</option>
                                            <option value="1-2 years">1-2 years (Toddler)</option>
                                            <option value="2+ years">2+ years (Preschooler)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Urgency Level</label>
                                        <select
                                            value={formData.urgency}
                                            onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                                            className="form-input w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        >
                                            <option value="">Select urgency</option>
                                            <option value="Low">Low - Can wait 1-2 weeks</option>
                                            <option value="Medium">Medium - Need help within a week</option>
                                            <option value="High">High - Need immediate help</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-soft-dark mb-2">Sleep Issues *</label>
                                    <textarea
                                        required
                                        rows="4"
                                        value={formData.sleepIssues}
                                        onChange={(e) => setFormData({...formData, sleepIssues: e.target.value})}
                                        placeholder="Please describe your child's current sleep challenges in detail (e.g., frequent night wakings, difficulty falling asleep, short naps, early morning wake-ups, bedtime battles)..."
                                        className="form-input w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                    ></textarea>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-soft-dark mb-2">Sleep Goals</label>
                                    <textarea
                                        rows="3"
                                        value={formData.goals}
                                        onChange={(e) => setFormData({...formData, goals: e.target.value})}
                                        placeholder="What are your sleep goals for your child? (e.g., sleep through the night, longer naps, better bedtime routine, independent sleep)..."
                                        className="form-input w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                    ></textarea>
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={formSubmitting}
                                    className={\`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 \${
                                        formSubmitting 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-gradient-to-r from-baby-blue to-mint text-white hover:from-baby-blue/90 hover:to-mint/90 shadow-lg transform hover:scale-105'
                                    }\`}
                                >
                                    {formSubmitting ? 'Submitting...' : 'Book Consultation'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
        
        function AboutPage() {
            return (
                <div className="py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h1 className="section-title text-4xl lg:text-5xl font-bold mb-6">About Happy Baby Sleeping</h1>
                            <p className="text-xl text-medium-gray max-w-3xl mx-auto">
                                Professional sleep consulting with a personal touch for families worldwide
                            </p>
                        </div>
                        
                        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                            <div>
                                <h2 className="text-3xl font-bold text-soft-dark mb-6">Our Mission</h2>
                                <p className="text-lg text-medium-gray mb-6 leading-relaxed">
                                    At Happy Baby Sleeping, we believe every family deserves peaceful nights and restful sleep. 
                                    Our certified sleep consultants work with families to create personalized sleep solutions 
                                    that fit your unique needs and parenting style.
                                </p>
                                <p className="text-lg text-medium-gray mb-6 leading-relaxed">
                                    We understand that every child is different, and there's no one-size-fits-all approach to sleep. 
                                    That's why we take the time to understand your family's specific challenges and create a 
                                    customized plan that works for you.
                                </p>
                                <p className="text-lg text-medium-gray leading-relaxed">
                                    Our gentle, evidence-based methods help establish healthy sleep habits while respecting 
                                    your family's comfort level and parenting philosophy.
                                </p>
                            </div>
                            <div>
                                <div className="bg-gradient-to-br from-baby-blue/10 to-mint/10 p-8 rounded-3xl shadow-lg">
                                    <h3 className="text-2xl font-bold text-baby-blue mb-6">Why Choose Us?</h3>
                                    <ul className="space-y-4 text-medium-gray">
                                        <li className="flex items-start">
                                            <span className="text-baby-blue mr-3 mt-1">✓</span>
                                            <span>Certified sleep consultants with 10+ years of experience</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-baby-blue mr-3 mt-1">✓</span>
                                            <span>Personalized approach tailored to your family's needs</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-baby-blue mr-3 mt-1">✓</span>
                                            <span>Ongoing support throughout the entire process</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-baby-blue mr-3 mt-1">✓</span>
                                            <span>Proven methods with over 5,000 success stories</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-baby-blue mr-3 mt-1">✓</span>
                                            <span>Family-centered solutions that actually work</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-baby-blue mr-3 mt-1">✓</span>
                                            <span>Flexible packages to fit every budget</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
                            <h2 className="text-3xl font-bold text-soft-dark mb-8 text-center">What Parents Say</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="testimonial-card text-center p-6 rounded-2xl">
                                    <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
                                    <p className="text-medium-gray italic mb-4 leading-relaxed">
                                        "Life-changing! Our 6-month-old went from waking up 5 times a night to sleeping through the night in just one week. The support was incredible."
                                    </p>
                                    <div className="border-t pt-4">
                                        <p className="font-semibold text-soft-dark">Sarah M.</p>
                                        <p className="text-sm text-medium-gray">Mother of 6-month-old</p>
                                    </div>
                                </div>
                                <div className="testimonial-card text-center p-6 rounded-2xl">
                                    <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
                                    <p className="text-medium-gray italic mb-4 leading-relaxed">
                                        "The personalized approach made all the difference. Finally, our whole family is getting the sleep we desperately needed. Highly recommend!"
                                    </p>
                                    <div className="border-t pt-4">
                                        <p className="font-semibold text-soft-dark">Mike & Jenny K.</p>
                                        <p className="text-sm text-medium-gray">Parents of twins</p>
                                    </div>
                                </div>
                                <div className="testimonial-card text-center p-6 rounded-2xl">
                                    <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
                                    <p className="text-medium-gray italic mb-4 leading-relaxed">
                                        "Professional, caring, and incredibly effective. The ongoing support was invaluable. Our toddler now goes to bed without any battles!"
                                    </p>
                                    <div className="border-t pt-4">
                                        <p className="font-semibold text-soft-dark">Emma R.</p>
                                        <p className="text-sm text-medium-gray">Mother of 2-year-old</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        
        function BlogPage() {
            return (
                <div className="py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h1 className="section-title text-4xl lg:text-5xl font-bold mb-6">Sleep Tips & Resources</h1>
                            <p className="text-xl text-medium-gray max-w-3xl mx-auto">
                                Expert advice and practical tips for better family sleep
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div className="h-48 bg-gradient-to-br from-baby-blue/20 to-mint/20 flex items-center justify-center">
                                    <span className="text-6xl">😴</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-soft-dark mb-3">Sleep Training Methods: What Works Best</h3>
                                    <p className="text-medium-gray mb-4">
                                        Explore different sleep training approaches and find the one that fits your family's comfort level and parenting style.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-medium-gray">January 15, 2025</span>
                                        <span className="text-baby-blue text-sm font-semibold">5 min read</span>
                                    </div>
                                </div>
                            </article>
                            
                            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div className="h-48 bg-gradient-to-br from-soft-pink/20 to-baby-blue/20 flex items-center justify-center">
                                    <span className="text-6xl">👶</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-soft-dark mb-3">Newborn Sleep Patterns: What to Expect</h3>
                                    <p className="text-medium-gray mb-4">
                                        Understanding your newborn's sleep cycles and how to establish healthy sleep habits from day one.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-medium-gray">January 12, 2025</span>
                                        <span className="text-baby-blue text-sm font-semibold">7 min read</span>
                                    </div>
                                </div>
                            </article>
                            
                            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div className="h-48 bg-gradient-to-br from-mint/20 to-soft-pink/20 flex items-center justify-center">
                                    <span className="text-6xl">🌙</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-soft-dark mb-3">Creating the Perfect Sleep Environment</h3>
                                    <p className="text-medium-gray mb-4">
                                        Simple changes to your child's sleep environment that can make a dramatic difference in sleep quality.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-medium-gray">January 10, 2025</span>
                                        <span className="text-baby-blue text-sm font-semibold">4 min read</span>
                                    </div>
                                </div>
                            </article>
                            
                            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div className="h-48 bg-gradient-to-br from-baby-blue/20 to-mint/20 flex items-center justify-center">
                                    <span className="text-6xl">⏰</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-soft-dark mb-3">Bedtime Routines That Actually Work</h3>
                                    <p className="text-medium-gray mb-4">
                                        Step-by-step guide to creating a calming bedtime routine that signals sleep time for your child.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-medium-gray">January 8, 2025</span>
                                        <span className="text-baby-blue text-sm font-semibold">6 min read</span>
                                    </div>
                                </div>
                            </article>
                            
                            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div className="h-48 bg-gradient-to-br from-soft-pink/20 to-baby-blue/20 flex items-center justify-center">
                                    <span className="text-6xl">🚼</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-soft-dark mb-3">Handling Sleep Regressions</h3>
                                    <p className="text-medium-gray mb-4">
                                        What to expect during common sleep regressions and practical strategies to get back on track.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-medium-gray">January 5, 2025</span>
                                        <span className="text-baby-blue text-sm font-semibold">8 min read</span>
                                    </div>
                                </div>
                            </article>
                            
                            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div className="h-48 bg-gradient-to-br from-mint/20 to-soft-pink/20 flex items-center justify-center">
                                    <span className="text-6xl">💤</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-soft-dark mb-3">Nap Transitions: A Parent's Guide</h3>
                                    <p className="text-medium-gray mb-4">
                                        Navigate the tricky transitions from multiple naps to fewer, longer naps as your child grows.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-medium-gray">January 3, 2025</span>
                                        <span className="text-baby-blue text-sm font-semibold">5 min read</span>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            );
        }
        
        function ContactPage({ onSubmitContact, formSubmitting }) {
            const [formData, setFormData] = useState({
                name: '',
                email: '',
                phone: '',
                message: '',
                preferredContact: 'email'
            });
            
            const handleSubmit = async (e) => {
                e.preventDefault();
                const success = await onSubmitContact(formData);
                if (success) {
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        message: '',
                        preferredContact: 'email'
                    });
                }
            };
            
            return (
                <div className="py-16">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h1 className="section-title text-4xl lg:text-5xl font-bold mb-6">Contact Us</h1>
                            <p className="text-xl text-medium-gray max-w-3xl mx-auto">
                                Ready to start your journey to better sleep? We're here to help your family rest peacefully.
                            </p>
                        </div>
                        
                        <div className="grid lg:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-3xl font-bold text-soft-dark mb-8">Get In Touch</h2>
                                <div className="space-y-6 mb-8">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-baby-blue rounded-full flex items-center justify-center">
                                            <span className="text-white text-xl">📧</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-soft-dark">Email</h3>
                                            <p className="text-medium-gray">info@happybabysleeping.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-baby-blue rounded-full flex items-center justify-center">
                                            <span className="text-white text-xl">📱</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-soft-dark">Phone</h3>
                                            <p className="text-medium-gray">(555) 123-4567</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-baby-blue rounded-full flex items-center justify-center">
                                            <span className="text-white text-xl">🕐</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-soft-dark">Hours</h3>
                                            <p className="text-medium-gray">Mon-Fri: 9AM-6PM EST</p>
                                            <p className="text-medium-gray">Sat-Sun: 10AM-4PM EST</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gradient-to-br from-baby-blue/10 to-mint/10 p-8 rounded-3xl">
                                    <h3 className="text-xl font-bold text-baby-blue mb-4">Quick Response Promise</h3>
                                    <p className="text-medium-gray mb-4">
                                        We understand that sleep challenges can't wait. We typically respond to all inquiries within 24 hours during business days.
                                    </p>
                                    <div className="bg-white/80 p-4 rounded-xl">
                                        <p className="text-sm text-soft-dark">
                                            <strong>Emergency Support:</strong> For urgent sleep emergencies, please call us directly for immediate assistance.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-3xl shadow-2xl p-8">
                                <h2 className="text-2xl font-bold text-soft-dark mb-6 text-center">Send Us A Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="form-input w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="form-input w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            className="form-input w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                            placeholder="(555) 123-4567"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Preferred Contact Method</label>
                                        <select
                                            value={formData.preferredContact}
                                            onChange={(e) => setFormData({...formData, preferredContact: e.target.value})}
                                            className="form-input w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        >
                                            <option value="email">Email</option>
                                            <option value="phone">Phone</option>
                                            <option value="both">Either Email or Phone</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Message *</label>
                                        <textarea
                                            required
                                            rows="5"
                                            value={formData.message}
                                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                                            placeholder="Tell us about your child's sleep challenges, your questions, or how we can help your family..."
                                            className="form-input w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={formSubmitting}
                                        className={\`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 \${
                                            formSubmitting 
                                                ? 'bg-gray-400 cursor-not-allowed' 
                                                : 'bg-gradient-to-r from-baby-blue to-mint text-white hover:from-baby-blue/90 hover:to-mint/90 shadow-lg transform hover:scale-105'
                                        }\`}
                                    >
                                        {formSubmitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        
        function AdminDashboard({ contacts, consultations, onBack }) {
            const [activeTab, setActiveTab] = useState('contacts');
            
            return (
                <div className="min-h-screen bg-gray-50">
                    <header className="bg-white shadow-sm border-b">
                        <div className="max-w-7xl mx-auto px-4 py-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-3xl font-bold text-soft-dark">Admin Dashboard</h1>
                                    <p className="text-medium-gray">Manage contacts and consultations</p>
                                </div>
                                <button
                                    onClick={onBack}
                                    className="px-6 py-3 bg-baby-blue text-white rounded-lg hover:bg-baby-blue/90 transition-colors font-semibold"
                                >
                                    Back to Website
                                </button>
                            </div>
                        </div>
                    </header>
                    
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="mb-8">
                            <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
                                <button
                                    onClick={() => setActiveTab('contacts')}
                                    className={\`px-6 py-3 rounded-md transition-colors font-medium \${
                                        activeTab === 'contacts' 
                                            ? 'bg-baby-blue text-white' 
                                            : 'text-medium-gray hover:bg-gray-100'
                                    }\`}
                                >
                                    Contact Messages ({contacts.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('consultations')}
                                    className={\`px-6 py-3 rounded-md transition-colors font-medium \${
                                        activeTab === 'consultations' 
                                            ? 'bg-baby-blue text-white' 
                                            : 'text-medium-gray hover:bg-gray-100'
                                    }\`}
                                >
                                    Consultations ({consultations.length})
                                </button>
                            </div>
                        </div>
                        
                        {activeTab === 'contacts' && (
                            <div className="grid gap-6">
                                {contacts.map(contact => (
                                    <div key={contact.id} className="admin-card contact-item p-6 rounded-2xl">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-soft-dark">{contact.name}</h3>
                                                <p className="text-medium-gray">{contact.email}</p>
                                                <p className="text-medium-gray">{contact.phone}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs text-medium-gray bg-white px-3 py-1 rounded-full">
                                                    {contact.createdAt}
                                                </span>
                                                <div className="mt-2">
                                                    <span className={\`text-xs px-2 py-1 rounded-full \${
                                                        contact.status === 'new' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-blue-100 text-blue-800'
                                                    }\`}>
                                                        {contact.status === 'new' ? 'New' : 'Replied'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white/80 p-4 rounded-xl">
                                            <p className="text-soft-dark leading-relaxed">{contact.message}</p>
                                        </div>
                                        <div className="mt-4 flex space-x-3">
                                            <button className="px-4 py-2 bg-baby-blue text-white rounded-lg hover:bg-baby-blue/90 transition-colors">
                                                Reply
                                            </button>
                                            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                                                Mark as Read
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {activeTab === 'consultations' && (
                            <div className="grid gap-6">
                                {consultations.map(consultation => (
                                    <div key={consultation.id} className="admin-card consultation-item p-6 rounded-2xl">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-soft-dark">{consultation.name}</h3>
                                                <p className="text-medium-gray">{consultation.email}</p>
                                                <p className="text-medium-gray">{consultation.phone}</p>
                                                <p className="text-soft-pink font-medium mt-2">
                                                    {consultation.serviceType} - Child: {consultation.childAge}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs text-medium-gray bg-white px-3 py-1 rounded-full">
                                                    {consultation.createdAt}
                                                </span>
                                                <div className="mt-2">
                                                    <span className={\`text-xs px-2 py-1 rounded-full \${
                                                        consultation.status === 'scheduled' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : consultation.status === 'in-progress'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-blue-100 text-blue-800'
                                                    }\`}>
                                                        {consultation.status === 'scheduled' ? 'Scheduled' : 
                                                         consultation.status === 'in-progress' ? 'In Progress' : 'Completed'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white/80 p-4 rounded-xl space-y-3">
                                            <div>
                                                <p className="text-sm font-medium text-soft-dark mb-1">Sleep Issues:</p>
                                                <p className="text-medium-gray">{consultation.sleepIssues}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-soft-dark mb-1">Goals:</p>
                                                <p className="text-medium-gray">{consultation.goals}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex space-x-3">
                                            <button className="px-4 py-2 bg-soft-pink text-white rounded-lg hover:bg-soft-pink/90 transition-colors">
                                                Schedule Call
                                            </button>
                                            <button className="px-4 py-2 bg-mint text-white rounded-lg hover:bg-mint/90 transition-colors">
                                                Send Plan
                                            </button>
                                            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            );
        }
        
        function Footer() {
            return (
                <footer className="bg-soft-dark text-white py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <span className="text-2xl">🌙</span>
                                    <h3 className="text-xl font-bold">Happy Baby Sleeping</h3>
                                </div>
                                <p className="text-gray-300 mb-4">
                                    Professional sleep consulting for peaceful nights and happy families.
                                </p>
                                <div className="flex space-x-4">
                                    <div className="w-8 h-8 bg-baby-blue rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm">📧</span>
                                    </div>
                                    <div className="w-8 h-8 bg-baby-blue rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm">📱</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Services</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li>Free Consultation</li>
                                    <li>Complete Sleep Package</li>
                                    <li>Newborn Care</li>
                                    <li>Sleep Training</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li>Sleep Tips</li>
                                    <li>Blog Articles</li>
                                    <li>Parent Guides</li>
                                    <li>Success Stories</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                                <div className="space-y-2 text-gray-300">
                                    <p>info@happybabysleeping.com</p>
                                    <p>(555) 123-4567</p>
                                    <p>Mon-Fri: 9AM-6PM EST</p>
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
        
        ReactDOM.render(<App />, document.getElementById('root'));
    </script>
</body>
</html>`;

// Create HTTP server
const server = http.createServer((req, res) => {
    const url = req.url;
    
    // Handle static files (images)
    if (url.startsWith('/attached_assets/')) {
        const filePath = path.join('/var/www', url);
        
        try {
            if (fs.existsSync(filePath)) {
                const ext = path.extname(filePath).toLowerCase();
                let contentType = 'text/plain';
                
                switch (ext) {
                    case '.jpg':
                    case '.jpeg':
                        contentType = 'image/jpeg';
                        break;
                    case '.png':
                        contentType = 'image/png';
                        break;
                    case '.gif':
                        contentType = 'image/gif';
                        break;
                }
                
                res.writeHead(200, { 'Content-Type': contentType });
                fs.createReadStream(filePath).pipe(res);
                return;
            }
        } catch (error) {
            console.error('Error serving static file:', error);
        }
    }
    
    // Serve the main application
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Happy Baby Sleeping Server running on port ${PORT}`);
    console.log(`Website accessible at: http://31.97.99.104`);
    console.log(`Local test: http://localhost:${PORT}`);
});