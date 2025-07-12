const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Complete Baby Sleep Consulting Website HTML
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
        .hero-gradient {
            background: linear-gradient(135deg, rgba(135, 206, 235, 0.2) 0%, rgba(255, 182, 193, 0.1) 50%, rgba(152, 251, 152, 0.2) 100%);
        }
    </style>
</head>
<body class="bg-cream">
    <div id="root"></div>
    
    <script type="text/babel">
        const { useState, useEffect } = React;
        
        function App() {
            const [currentPage, setCurrentPage] = useState('home');
            const [showAdmin, setShowAdmin] = useState(false);
            const [contacts, setContacts] = useState([]);
            const [consultations, setConsultations] = useState([]);
            
            useEffect(() => {
                if (showAdmin) {
                    setContacts([
                        { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '(555) 123-4567', message: 'Looking for help with my 6-month-old sleep schedule', createdAt: '2025-01-10' },
                        { id: 2, name: 'Mike Chen', email: 'mike@example.com', phone: '(555) 987-6543', message: 'Need guidance for newborn sleep patterns', createdAt: '2025-01-09' },
                        { id: 3, name: 'Jessica Williams', email: 'jess@example.com', phone: '(555) 456-7890', message: 'Struggling with bedtime routine for toddler', createdAt: '2025-01-08' }
                    ]);
                    setConsultations([
                        { id: 1, name: 'Emma Davis', email: 'emma@example.com', phone: '(555) 456-7890', serviceType: 'Complete Sleep Package', childAge: '4-6 months', sleepIssues: 'Frequent night wakings, difficulty falling asleep', goals: 'Sleep through the night', createdAt: '2025-01-11' },
                        { id: 2, name: 'Tom Wilson', email: 'tom@example.com', phone: '(555) 234-5678', serviceType: 'Newborn Care', childAge: '0-3 months', sleepIssues: 'Day/night confusion, short naps', goals: 'Establish good sleep habits early', createdAt: '2025-01-10' },
                        { id: 3, name: 'Anna Rodriguez', email: 'anna@example.com', phone: '(555) 345-6789', serviceType: 'Free Consultation', childAge: '7-12 months', sleepIssues: 'Waking every 2 hours at night', goals: 'Longer sleep stretches', createdAt: '2025-01-09' }
                    ]);
                }
            }, [showAdmin]);
            
            const submitContact = async (formData) => {
                alert('Thank you! Your message has been sent successfully. We will get back to you within 24 hours.');
                return true;
            };
            
            const submitConsultation = async (formData) => {
                alert('Thank you! Your consultation request has been submitted. We will contact you within 24 hours to schedule your appointment.');
                return true;
            };
            
            if (showAdmin) {
                return (
                    <div className="min-h-screen bg-gray-50">
                        <header className="bg-white shadow-sm border-b">
                            <div className="max-w-7xl mx-auto px-4 py-4">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-2xl font-bold text-soft-dark">Admin Dashboard</h1>
                                    <button
                                        onClick={() => setShowAdmin(false)}
                                        className="px-4 py-2 bg-baby-blue text-white rounded-lg hover:bg-baby-blue/80 transition-colors"
                                    >
                                        Back to Website
                                    </button>
                                </div>
                            </div>
                        </header>
                        
                        <main className="max-w-7xl mx-auto px-4 py-8">
                            <div className="grid lg:grid-cols-2 gap-8">
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-xl font-bold text-soft-dark mb-4">Contact Messages ({contacts.length})</h2>
                                    <div className="space-y-4 max-h-96 overflow-y-auto">
                                        {contacts.map(contact => (
                                            <div key={contact.id} className="border-l-4 border-baby-blue pl-4 py-3 bg-gray-50 rounded-r-lg">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-semibold text-soft-dark">{contact.name}</h3>
                                                        <p className="text-sm text-medium-gray">{contact.email}</p>
                                                        <p className="text-sm text-medium-gray">{contact.phone}</p>
                                                    </div>
                                                    <span className="text-xs text-medium-gray bg-white px-2 py-1 rounded">{contact.createdAt}</span>
                                                </div>
                                                <p className="text-sm text-soft-dark mt-2">{contact.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-xl font-bold text-soft-dark mb-4">Consultation Requests ({consultations.length})</h2>
                                    <div className="space-y-4 max-h-96 overflow-y-auto">
                                        {consultations.map(consultation => (
                                            <div key={consultation.id} className="border-l-4 border-soft-pink pl-4 py-3 bg-gray-50 rounded-r-lg">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-semibold text-soft-dark">{consultation.name}</h3>
                                                        <p className="text-sm text-medium-gray">{consultation.email}</p>
                                                        <p className="text-sm text-medium-gray">{consultation.phone}</p>
                                                        <p className="text-sm font-medium text-soft-pink mt-1">
                                                            {consultation.serviceType} - Child: {consultation.childAge}
                                                        </p>
                                                    </div>
                                                    <span className="text-xs text-medium-gray bg-white px-2 py-1 rounded">{consultation.createdAt}</span>
                                                </div>
                                                <p className="text-sm text-soft-dark mt-2"><strong>Issues:</strong> {consultation.sleepIssues}</p>
                                                <p className="text-sm text-soft-dark mt-1"><strong>Goals:</strong> {consultation.goals}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                );
            }
            
            return (
                <div className="min-h-screen bg-cream">
                    <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
                        <nav className="max-w-7xl mx-auto px-4 py-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl">🌙</span>
                                    <h1 className="text-xl font-bold text-soft-dark">Happy Baby Sleeping</h1>
                                </div>
                                <div className="flex space-x-6">
                                    <button
                                        onClick={() => setCurrentPage('home')}
                                        className={\`px-3 py-2 rounded-lg transition-colors \${
                                            currentPage === 'home' ? 'bg-baby-blue text-white' : 'text-soft-dark hover:bg-baby-blue/10'
                                        }\`}
                                    >
                                        Home
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage('services')}
                                        className={\`px-3 py-2 rounded-lg transition-colors \${
                                            currentPage === 'services' ? 'bg-baby-blue text-white' : 'text-soft-dark hover:bg-baby-blue/10'
                                        }\`}
                                    >
                                        Services
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage('about')}
                                        className={\`px-3 py-2 rounded-lg transition-colors \${
                                            currentPage === 'about' ? 'bg-baby-blue text-white' : 'text-soft-dark hover:bg-baby-blue/10'
                                        }\`}
                                    >
                                        About
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage('contact')}
                                        className={\`px-3 py-2 rounded-lg transition-colors \${
                                            currentPage === 'contact' ? 'bg-baby-blue text-white' : 'text-soft-dark hover:bg-baby-blue/10'
                                        }\`}
                                    >
                                        Contact
                                    </button>
                                    <button
                                        onClick={() => setShowAdmin(true)}
                                        className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                    >
                                        Admin Dashboard
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </header>
                    
                    <main>
                        {currentPage === 'home' && <HomePage />}
                        {currentPage === 'services' && <ServicesPage onSubmitConsultation={submitConsultation} />}
                        {currentPage === 'about' && <AboutPage />}
                        {currentPage === 'contact' && <ContactPage onSubmitContact={submitContact} />}
                    </main>
                </div>
            );
        }
        
        function HomePage() {
            return (
                <div>
                    <section className="relative overflow-hidden hero-gradient">
                        <div className="relative max-w-7xl mx-auto px-4 py-20">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className="text-center lg:text-left">
                                    <h1 className="text-5xl lg:text-6xl font-bold text-soft-dark mb-6 leading-tight">
                                        Peaceful Nights for Your{' '}
                                        <span className="text-baby-blue">Little One</span>
                                    </h1>
                                    <p className="text-xl text-medium-gray mb-8">
                                        Expert sleep consulting for healthy sleep habits and family rest. 
                                        Transform your nights with professional guidance.
                                    </p>
                                    <div className="text-center lg:text-left mb-8">
                                        <h2 className="text-2xl font-bold text-soft-dark mb-6">
                                            Sweet Dreams Start Here 🌙✨
                                        </h2>
                                        <button
                                            onClick={() => setCurrentPage('services')}
                                            className="bg-baby-blue text-white px-8 py-3 rounded-lg hover:bg-baby-blue/90 transition-colors font-semibold text-lg"
                                        >
                                            Get Started Today
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-8 lg:mt-0">
                                    <div className="relative">
                                        <img 
                                            src="/attached_assets/image_1751435091363.jpeg" 
                                            alt="Peaceful baby sleeping" 
                                            className="rounded-3xl shadow-2xl w-full"
                                            style={{objectFit: 'cover', height: '400px'}}
                                        />
                                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-soft-dark/20 to-transparent"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <section className="py-20 bg-white">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-soft-dark mb-4">Choose Your Sleep Solution</h2>
                                <p className="text-medium-gray text-lg">Professional guidance tailored to your family's needs</p>
                            </div>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="bg-baby-blue/10 p-8 rounded-2xl text-center border-2 border-baby-blue/20 hover:shadow-lg transition-shadow">
                                    <div className="text-4xl mb-4">🌙</div>
                                    <h3 className="text-xl font-bold text-baby-blue mb-4">Free Consultation</h3>
                                    <p className="text-medium-gray mb-4">30-minute assessment call</p>
                                    <div className="text-4xl font-bold text-baby-blue mb-4">FREE</div>
                                    <ul className="text-sm text-medium-gray space-y-2 mb-6">
                                        <li>• Initial sleep assessment</li>
                                        <li>• Personalized recommendations</li>
                                        <li>• Resource sharing</li>
                                        <li>• No commitment required</li>
                                    </ul>
                                    <button className="w-full bg-baby-blue text-white py-2 rounded-lg hover:bg-baby-blue/90 transition-colors">
                                        Book Free Call
                                    </button>
                                </div>
                                
                                <div className="bg-soft-pink/10 p-8 rounded-2xl text-center border-2 border-soft-pink/20 hover:shadow-lg transition-shadow">
                                    <div className="text-4xl mb-4">💤</div>
                                    <h3 className="text-xl font-bold text-soft-pink mb-4">Complete Sleep Package</h3>
                                    <p className="text-medium-gray mb-4">Full training and support</p>
                                    <div className="text-4xl font-bold text-soft-pink mb-4">$299</div>
                                    <ul className="text-sm text-medium-gray space-y-2 mb-6">
                                        <li>• Comprehensive sleep plan</li>
                                        <li>• 2 weeks of daily support</li>
                                        <li>• Phone and text support</li>
                                        <li>• Plan adjustments as needed</li>
                                        <li>• Follow-up sessions</li>
                                    </ul>
                                    <button className="w-full bg-soft-pink text-white py-2 rounded-lg hover:bg-soft-pink/90 transition-colors">
                                        Start Sleep Training
                                    </button>
                                </div>
                                
                                <div className="bg-mint/10 p-8 rounded-2xl text-center border-2 border-mint/20 hover:shadow-lg transition-shadow">
                                    <div className="text-4xl mb-4">👶</div>
                                    <h3 className="text-xl font-bold text-mint mb-4">Newborn Care</h3>
                                    <p className="text-medium-gray mb-4">Specialized infant care</p>
                                    <div className="text-4xl font-bold text-mint mb-4">$199</div>
                                    <ul className="text-sm text-medium-gray space-y-2 mb-6">
                                        <li>• Gentle sleep shaping</li>
                                        <li>• Feeding and sleep schedule</li>
                                        <li>• Newborn care guidance</li>
                                        <li>• 1 week of support</li>
                                        <li>• Safe sleep education</li>
                                    </ul>
                                    <button className="w-full bg-mint text-white py-2 rounded-lg hover:bg-mint/90 transition-colors">
                                        Get Newborn Help
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <section className="py-20 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-soft-dark mb-4">Why Choose Happy Baby Sleeping?</h2>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <div className="text-center">
                                    <div className="text-3xl mb-4">🎓</div>
                                    <h3 className="font-bold text-soft-dark mb-2">Certified Experts</h3>
                                    <p className="text-medium-gray text-sm">Professional sleep consultants with proven methods</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-4">💝</div>
                                    <h3 className="font-bold text-soft-dark mb-2">Personalized Care</h3>
                                    <p className="text-medium-gray text-sm">Tailored solutions for your family's unique needs</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-4">📞</div>
                                    <h3 className="font-bold text-soft-dark mb-2">Ongoing Support</h3>
                                    <p className="text-medium-gray text-sm">Daily check-ins and adjustments as needed</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-4">⭐</div>
                                    <h3 className="font-bold text-soft-dark mb-2">Proven Results</h3>
                                    <p className="text-medium-gray text-sm">Thousands of families sleeping better</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
        
        function ServicesPage({ onSubmitConsultation }) {
            const [formData, setFormData] = useState({
                name: '',
                email: '',
                phone: '',
                serviceType: '',
                childAge: '',
                sleepIssues: '',
                goals: ''
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
                        goals: ''
                    });
                }
            };
            
            return (
                <div className="py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-soft-dark mb-4">Our Services</h1>
                            <p className="text-xl text-medium-gray">Choose the perfect solution for your family</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-baby-blue/20">
                                <div className="text-center">
                                    <div className="text-4xl mb-4">🌙</div>
                                    <h3 className="text-xl font-bold text-baby-blue mb-4">Free Consultation</h3>
                                    <div className="text-3xl font-bold text-baby-blue mb-4">FREE</div>
                                    <ul className="text-sm text-medium-gray space-y-2 mb-6 text-left">
                                        <li>• 30-minute phone/video call</li>
                                        <li>• Sleep assessment questionnaire</li>
                                        <li>• Personalized recommendations</li>
                                        <li>• Resource sharing</li>
                                        <li>• No commitment required</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-soft-pink/20">
                                <div className="text-center">
                                    <div className="text-4xl mb-4">💤</div>
                                    <h3 className="text-xl font-bold text-soft-pink mb-4">Complete Sleep Package</h3>
                                    <div className="text-3xl font-bold text-soft-pink mb-4">$299</div>
                                    <ul className="text-sm text-medium-gray space-y-2 mb-6 text-left">
                                        <li>• Comprehensive sleep plan</li>
                                        <li>• 2 weeks of daily support</li>
                                        <li>• Phone/text support</li>
                                        <li>• Plan adjustments as needed</li>
                                        <li>• Follow-up sessions</li>
                                        <li>• Sleep tracking tools</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-mint/20">
                                <div className="text-center">
                                    <div className="text-4xl mb-4">👶</div>
                                    <h3 className="text-xl font-bold text-mint mb-4">Newborn Care</h3>
                                    <div className="text-3xl font-bold text-mint mb-4">$199</div>
                                    <ul className="text-sm text-medium-gray space-y-2 mb-6 text-left">
                                        <li>• Gentle sleep shaping</li>
                                        <li>• Feeding and sleep schedule</li>
                                        <li>• Newborn care guidance</li>
                                        <li>• 1 week of support</li>
                                        <li>• Safe sleep education</li>
                                        <li>• Parent education</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-soft-dark mb-6 text-center">Book Your Consultation</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Service Type *</label>
                                        <select
                                            required
                                            value={formData.serviceType}
                                            onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        >
                                            <option value="">Select a service</option>
                                            <option value="Free Consultation">Free Consultation</option>
                                            <option value="Complete Sleep Package">Complete Sleep Package ($299)</option>
                                            <option value="Newborn Care">Newborn Care ($199)</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-soft-dark mb-2">Child's Age *</label>
                                    <select
                                        required
                                        value={formData.childAge}
                                        onChange={(e) => setFormData({...formData, childAge: e.target.value})}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
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
                                    <label className="block text-sm font-medium text-soft-dark mb-2">Sleep Issues *</label>
                                    <textarea
                                        required
                                        rows="4"
                                        value={formData.sleepIssues}
                                        onChange={(e) => setFormData({...formData, sleepIssues: e.target.value})}
                                        placeholder="Please describe your child's current sleep challenges (e.g., frequent night wakings, difficulty falling asleep, short naps, early morning wake-ups)..."
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                    ></textarea>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-soft-dark mb-2">Goals</label>
                                    <textarea
                                        rows="3"
                                        value={formData.goals}
                                        onChange={(e) => setFormData({...formData, goals: e.target.value})}
                                        placeholder="What are your sleep goals for your child? (e.g., sleep through the night, longer naps, better bedtime routine)..."
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                    ></textarea>
                                </div>
                                
                                <button
                                    type="submit"
                                    className="w-full bg-baby-blue text-white py-3 px-6 rounded-lg hover:bg-baby-blue/90 transition-colors font-semibold"
                                >
                                    Book Consultation
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
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-soft-dark mb-4">About Happy Baby Sleeping</h1>
                            <p className="text-xl text-medium-gray">Professional sleep consulting with a personal touch</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                            <div>
                                <h2 className="text-2xl font-bold text-soft-dark mb-6">Our Mission</h2>
                                <p className="text-medium-gray mb-4">
                                    At Happy Baby Sleeping, we believe every family deserves peaceful nights and restful sleep. 
                                    Our certified sleep consultants work with families to create personalized sleep solutions 
                                    that fit your unique needs and parenting style.
                                </p>
                                <p className="text-medium-gray mb-4">
                                    We understand that every child is different, and there's no one-size-fits-all approach to sleep. 
                                    That's why we take the time to understand your family's specific challenges and create a 
                                    customized plan that works for you.
                                </p>
                                <p className="text-medium-gray">
                                    Our gentle, evidence-based methods help establish healthy sleep habits while respecting 
                                    your family's comfort level and parenting philosophy.
                                </p>
                            </div>
                            <div>
                                <div className="bg-baby-blue/10 p-8 rounded-2xl">
                                    <h3 className="text-xl font-bold text-baby-blue mb-4">Why Choose Us?</h3>
                                    <ul className="space-y-3 text-medium-gray">
                                        <li>• Certified sleep consultants with years of experience</li>
                                        <li>• Personalized approach tailored to your family</li>
                                        <li>• Ongoing support throughout the process</li>
                                        <li>• Proven methods with thousands of success stories</li>
                                        <li>• Family-centered solutions that work</li>
                                        <li>• Flexible packages to fit your budget</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-soft-dark mb-6 text-center">What Parents Say</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="text-yellow-400 text-2xl mb-2">⭐⭐⭐⭐⭐</div>
                                    <p className="text-medium-gray italic mb-4">
                                        "Amazing results! Our baby went from waking up 5 times a night to sleeping through the night in just one week."
                                    </p>
                                    <p className="font-semibold text-soft-dark">- Sarah M.</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-yellow-400 text-2xl mb-2">⭐⭐⭐⭐⭐</div>
                                    <p className="text-medium-gray italic mb-4">
                                        "The personalized approach made all the difference. Finally, our whole family is getting the sleep we need."
                                    </p>
                                    <p className="font-semibold text-soft-dark">- Mike & Jenny K.</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-yellow-400 text-2xl mb-2">⭐⭐⭐⭐⭐</div>
                                    <p className="text-medium-gray italic mb-4">
                                        "Professional, caring, and effective. The ongoing support was invaluable during the process."
                                    </p>
                                    <p className="font-semibold text-soft-dark">- Emma R.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        
        function ContactPage({ onSubmitContact }) {
            const [formData, setFormData] = useState({
                name: '',
                email: '',
                phone: '',
                message: ''
            });
            
            const handleSubmit = async (e) => {
                e.preventDefault();
                const success = await onSubmitContact(formData);
                if (success) {
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        message: ''
                    });
                }
            };
            
            return (
                <div className="py-16">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-soft-dark mb-4">Contact Us</h1>
                            <p className="text-xl text-medium-gray">Ready to start your journey to better sleep?</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-2xl font-bold text-soft-dark mb-6">Get In Touch</h2>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-baby-blue rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm">📧</span>
                                        </div>
                                        <span className="text-medium-gray">info@happybabysleeping.com</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-baby-blue rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm">📱</span>
                                        </div>
                                        <span className="text-medium-gray">(555) 123-4567</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-baby-blue rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm">🕐</span>
                                        </div>
                                        <span className="text-medium-gray">Mon-Fri: 9AM-6PM EST</span>
                                    </div>
                                </div>
                                
                                <div className="bg-baby-blue/10 p-6 rounded-2xl">
                                    <h3 className="font-bold text-baby-blue mb-3">Quick Response Promise</h3>
                                    <p className="text-medium-gray text-sm">
                                        We typically respond to all inquiries within 24 hours. 
                                        For urgent questions, please call us directly.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-soft-dark mb-2">Message *</label>
                                        <textarea
                                            required
                                            rows="5"
                                            value={formData.message}
                                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                                            placeholder="Tell us about your child's sleep challenges and how we can help..."
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-blue focus:border-transparent"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-baby-blue text-white py-3 px-6 rounded-lg hover:bg-baby-blue/90 transition-colors font-semibold"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
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
    console.log(`🚀 Baby Sleep Consulting Server running on port ${PORT}`);
    console.log(`Website accessible at: http://31.97.99.104`);
    console.log(`Local test: http://localhost:${PORT}`);
});