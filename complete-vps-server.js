const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background-color: #FFF8DC;
        }
        
        .card-hover {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .touch-target {
            min-height: 44px;
        }
        
        .mobile-full-width {
            width: 100%;
        }
        
        @media (min-width: 640px) {
            .mobile-full-width {
                width: auto;
            }
        }
        
        .nav-hover {
            transition: all 0.2s ease;
        }
        
        .nav-hover:hover {
            background-color: rgba(135, 206, 235, 0.1);
        }
        
        .hero-section {
            background: linear-gradient(135deg, rgba(135, 206, 235, 0.2) 0%, rgba(255, 182, 193, 0.1) 30%, rgba(152, 251, 152, 0.2) 70%, rgba(255, 248, 220, 0.2) 100%);
        }
        
        .section-bg {
            background: linear-gradient(135deg, rgba(135, 206, 235, 0.05) 0%, rgba(255, 182, 193, 0.05) 100%);
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
            const [adminData, setAdminData] = useState({
                contacts: [],
                consultations: [],
                blogPosts: [],
                testimonials: []
            });
            
            useEffect(() => {
                // Sample data for admin dashboard
                if (showAdmin) {
                    setAdminData({
                        contacts: [
                            { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@email.com', phone: '(555) 123-4567', subject: 'Sleep Training Help', message: 'Hi! I have a 6-month-old who wakes up every 2 hours at night. We have tried everything and are exhausted. Looking for professional help with sleep training. Can you help us?', createdAt: '2025-01-12', status: 'new' },
                            { id: 2, name: 'Mike Chen', email: 'mike.chen@email.com', phone: '(555) 987-6543', subject: 'Newborn Sleep Questions', message: 'Need guidance for our newborn. Day and night are completely mixed up and we are struggling with establishing any routine. Looking for expert advice.', createdAt: '2025-01-11', status: 'replied' },
                            { id: 3, name: 'Jessica Williams', email: 'jessica.w@email.com', phone: '(555) 456-7890', subject: 'Toddler Sleep Issues', message: 'My 18-month-old toddler fights bedtime every night. Takes 2+ hours to get him to sleep. Please help! We are desperate for solutions.', createdAt: '2025-01-10', status: 'new' }
                        ],
                        consultations: [
                            { id: 1, parentName: 'Emma Davis', email: 'emma.davis@email.com', phone: '(555) 456-7890', consultationType: 'Complete Sleep Package', childAge: '4-6 months', sleepChallenges: 'Frequent night wakings every 1-2 hours, difficulty self-soothing, relies on nursing to fall asleep, short naps during the day', preferredDate: '2025-01-15', createdAt: '2025-01-12', status: 'scheduled' },
                            { id: 2, parentName: 'Tom Wilson', email: 'tom.wilson@email.com', phone: '(555) 234-5678', consultationType: 'Newborn Care', childAge: '0-3 months', sleepChallenges: 'Day/night confusion, very short naps (20-30 minutes), difficulty settling, feeding issues', preferredDate: '2025-01-14', createdAt: '2025-01-11', status: 'in-progress' },
                            { id: 3, parentName: 'Anna Rodriguez', email: 'anna.r@email.com', phone: '(555) 345-6789', consultationType: 'Free Consultation', childAge: '7-12 months', sleepChallenges: 'Waking every 2 hours at night, refuses to nap without being held, sleep regression issues', preferredDate: '2025-01-13', createdAt: '2025-01-10', status: 'completed' }
                        ],
                        blogPosts: [
                            { id: 1, title: 'The Ultimate Guide to Creating the Perfect Sleep Environment', excerpt: 'Discover how to optimize your baby\'s room for better sleep. From lighting and temperature to white noise and blackout curtains, learn the science-backed strategies that make a real difference.', content: 'Creating the perfect sleep environment is crucial for your baby\'s sleep success...', author: 'Yanina, Sleep Consultant', createdAt: '2025-01-15', readTime: '8 min read', status: 'published' },
                            { id: 2, title: 'Mastering the Art of Daytime Naps', excerpt: 'Learn why daytime naps are crucial for nighttime sleep and how to establish a consistent nap schedule that works.', content: 'Daytime naps are not just a break for parents - they are essential for your baby\'s development...', author: 'Yanina, Sleep Consultant', createdAt: '2025-01-12', readTime: '5 min read', status: 'published' },
                            { id: 3, title: 'Building a Calming Bedtime Routine', excerpt: 'Discover the key elements of an effective bedtime routine that signals to your baby that it\'s time to sleep.', content: 'A consistent bedtime routine is one of the most powerful tools in your sleep toolkit...', author: 'Yanina, Sleep Consultant', createdAt: '2025-01-10', readTime: '6 min read', status: 'published' }
                        ],
                        testimonials: [
                            { id: 1, name: 'Sarah M.', title: 'Mother of 6-month-old', content: 'Life-changing! Our 6-month-old went from waking up 5 times a night to sleeping through the night in just one week. The personalized approach made all the difference. Yanina was so supportive throughout the process.', rating: 5, status: 'approved', createdAt: '2025-01-08' },
                            { id: 2, name: 'Mike & Jenny K.', title: 'Parents of twins', content: 'The personalized approach made all the difference. Finally, our whole family is getting the sleep we desperately needed. Highly recommend! Working with twins seemed impossible until we found Yanina.', rating: 5, status: 'approved', createdAt: '2025-01-05' },
                            { id: 3, name: 'Emma R.', title: 'Mother of 2-year-old', content: 'Professional, caring, and incredibly effective. Our toddler now goes to bed without any battles! Worth every penny. The methods were gentle but firm, exactly what we needed.', rating: 5, status: 'approved', createdAt: '2025-01-03' }
                        ]
                    });
                }
            }, [showAdmin]);
            
            const handleContactSubmit = (formData) => {
                alert('Thank you for your message! I will get back to you within 24 hours to discuss how I can help your family achieve better sleep.');
                return Promise.resolve(true);
            };
            
            const handleConsultationSubmit = (formData) => {
                alert('Thank you for booking a consultation! I will contact you within 24 hours to schedule your appointment and discuss your specific sleep challenges.');
                return Promise.resolve(true);
            };
            
            if (showAdmin) {
                return <AdminDashboard data={adminData} onBack={() => setShowAdmin(false)} />;
            }
            
            return (
                <div className="min-h-screen bg-cream">
                    <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} setShowAdmin={setShowAdmin} />
                    <main>
                        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
                        {currentPage === 'about' && <AboutPage />}
                        {currentPage === 'services' && <ServicesPage onSubmit={handleConsultationSubmit} />}
                        {currentPage === 'blog' && <BlogPage />}
                        {currentPage === 'contact' && <ContactPage onSubmit={handleContactSubmit} />}
                    </main>
                    <Footer />
                </div>
            );
        }
        
        function Navigation({ currentPage, setCurrentPage, setShowAdmin }) {
            return (
                <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
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
                                    className={\`px-4 py-2 rounded-lg transition-all duration-200 nav-hover \${currentPage === 'home' ? 'bg-baby-blue text-white shadow-lg' : 'text-soft-dark'}\`}
                                >
                                    Home
                                </button>
                                <button
                                    onClick={() => setCurrentPage('about')}
                                    className={\`px-4 py-2 rounded-lg transition-all duration-200 nav-hover \${currentPage === 'about' ? 'bg-baby-blue text-white shadow-lg' : 'text-soft-dark'}\`}
                                >
                                    About
                                </button>
                                <button
                                    onClick={() => setCurrentPage('services')}
                                    className={\`px-4 py-2 rounded-lg transition-all duration-200 nav-hover \${currentPage === 'services' ? 'bg-baby-blue text-white shadow-lg' : 'text-soft-dark'}\`}
                                >
                                    Services
                                </button>
                                <button
                                    onClick={() => setCurrentPage('blog')}
                                    className={\`px-4 py-2 rounded-lg transition-all duration-200 nav-hover \${currentPage === 'blog' ? 'bg-baby-blue text-white shadow-lg' : 'text-soft-dark'}\`}
                                >
                                    Blog
                                </button>
                                <button
                                    onClick={() => setCurrentPage('contact')}
                                    className={\`px-4 py-2 rounded-lg transition-all duration-200 nav-hover \${currentPage === 'contact' ? 'bg-baby-blue text-white shadow-lg' : 'text-soft-dark'}\`}
                                >
                                    Contact
                                </button>
                                <button
                                    onClick={() => setShowAdmin(true)}
                                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg"
                                >
                                    Admin
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            );
        }
        
        function HomePage({ setCurrentPage }) {
            const testimonials = [
                { id: 1, name: 'Sarah M.', title: 'Mother of 6-month-old', content: 'Life-changing! Our 6-month-old went from waking up 5 times a night to sleeping through the night in just one week. The personalized approach made all the difference.', rating: 5 },
                { id: 2, name: 'Mike & Jenny K.', title: 'Parents of twins', content: 'The personalized approach made all the difference. Finally, our whole family is getting the sleep we desperately needed. Highly recommend!', rating: 5 },
                { id: 3, name: 'Emma R.', title: 'Mother of 2-year-old', content: 'Professional, caring, and incredibly effective. Our toddler now goes to bed without any battles! Worth every penny.', rating: 5 }
            ];
            
            return (
                <main>
                    {/* Hero Section */}
                    <section className="hero-section relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-baby-blue/20 via-soft-pink/10 to-mint/20"></div>
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
                                            className="bg-soft-pink text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-baby-blue transition-colors touch-target mobile-full-width"
                                        >
                                            Book Free Consultation
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage('services')}
                                            className="border-2 border-baby-blue text-baby-blue px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-baby-blue hover:text-white transition-colors touch-target mobile-full-width"
                                        >
                                            View Services
                                        </button>
                                    </div>

                                    {/* Trust Indicators */}
                                    <div className="flex items-center justify-center lg:justify-start space-x-2 sm:space-x-6 pt-6 sm:pt-8">
                                        <div className="text-center">
                                            <div className="text-2xl sm:text-3xl font-bold text-baby-blue">100+</div>
                                            <div className="text-xs sm:text-sm text-medium-gray">Families Helped</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl sm:text-3xl font-bold text-soft-pink">Proven</div>
                                            <div className="text-xs sm:text-sm text-medium-gray">Methods</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl sm:text-3xl font-bold text-mint">Expert</div>
                                            <div className="text-xs sm:text-sm text-medium-gray">Guidance</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl sm:text-3xl font-bold text-baby-blue">Excellent</div>
                                            <div className="text-xs sm:text-sm text-medium-gray">Results</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative mt-8 lg:mt-0">
                                    <img
                                        src="/attached_assets/image_1751435091363.jpeg"
                                        alt="Peaceful baby sleeping in nursery"
                                        className="rounded-2xl sm:rounded-3xl shadow-2xl w-full h-auto"
                                    />
                                    <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg">
                                        <div className="flex items-center space-x-2 sm:space-x-3">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-mint rounded-full flex items-center justify-center">
                                                <span className="text-white text-xl">🌙</span>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-soft-dark text-sm sm:text-base">Sleep Success</div>
                                                <div className="text-xs sm:text-sm text-medium-gray">Within 2 weeks</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Why Choose Us Section */}
                    <section className="py-16 sm:py-24 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12 sm:mb-16">
                                <h2 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">Why Families Choose My Services:</h2>
                                <p className="text-lg sm:text-xl text-medium-gray max-w-4xl mx-auto">
                                    My sleep training approach is holistic and covers your child's full 24-hours — including naps, nighttime sleep, feedings, bedtime routines, and daytime activities. It's designed to establish healthy sleep habits, support overall well-being, and help your child thrive and reach important developmental milestones.
                                </p>
                                <br />
                                <p className="text-lg sm:text-xl text-medium-gray max-w-4xl mx-auto">
                                    The results are built to last. I will adjust the schedule to support transitions, sleep regressions, family changes, travel, and more. Throughout the process, I offer parents valuable guidance to better understand their child's needs and provide support every step of the way.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                                <div className="text-center p-6 sm:p-8 rounded-2xl bg-baby-blue/5 card-hover">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-baby-blue rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                        <span className="text-white text-2xl">💖</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-semibold text-soft-dark mb-3 sm:mb-4">Personalized Methods</h3>
                                    <p className="text-sm sm:text-base text-medium-gray leading-relaxed">
                                        Utilize a variety of techniques that are customized for your child and your family. 
                                        Methods are based on the developmental, emotional, and biological needs of your child.
                                    </p>
                                </div>

                                <div className="text-center p-6 sm:p-8 rounded-2xl bg-soft-pink/10 card-hover">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-soft-pink rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                        <span className="text-white text-2xl">🎓</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-semibold text-soft-dark mb-3 sm:mb-4">Expert Guidance</h3>
                                    <p className="text-sm sm:text-base text-medium-gray leading-relaxed">
                                        Experienced sleep consultant and newborn care specialist helping families 
                                        achieve better sleep through education, guidance, and personalized plans.
                                    </p>
                                </div>

                                <div className="text-center p-6 sm:p-8 rounded-2xl bg-mint/10 card-hover">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-mint rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                        <span className="text-white text-2xl">🕐</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-semibold text-soft-dark mb-3 sm:mb-4">Ongoing Support</h3>
                                    <p className="text-sm sm:text-base text-medium-gray leading-relaxed">
                                        Unlimited text support, follow-up calls, and plan adjustments to ensure lasting success for your family.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Final CTA Section */}
                    <section className="py-16 sm:py-24 bg-gradient-to-br from-baby-blue/20 via-soft-pink/10 to-mint/20">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h2 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4 sm:mb-6">
                                Ready for Peaceful Nights?
                            </h2>
                            <p className="text-lg sm:text-xl text-medium-gray mb-6 sm:mb-8 leading-relaxed">
                                Join hundreds of families who've transformed their sleep with effective methods. 
                                Your journey to better sleep starts with a free consultation.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => setCurrentPage('services')}
                                    className="bg-soft-pink text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-baby-blue transition-colors touch-target mobile-full-width"
                                >
                                    Book Free Consultation
                                </button>
                                <button
                                    onClick={() => setCurrentPage('services')}
                                    className="border-2 border-baby-blue text-baby-blue px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-baby-blue hover:text-white transition-colors touch-target mobile-full-width"
                                >
                                    View All Services
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
            );
        }
        
        function AboutPage() {
            const testimonials = [
                { id: 1, name: 'Sarah M.', title: 'Mother of 6-month-old', content: 'Life-changing! Our 6-month-old went from waking up 5 times a night to sleeping through the night in just one week. The personalized approach made all the difference.', rating: 5 },
                { id: 2, name: 'Mike & Jenny K.', title: 'Parents of twins', content: 'The personalized approach made all the difference. Finally, our whole family is getting the sleep we desperately needed. Highly recommend!', rating: 5 },
                { id: 3, name: 'Emma R.', title: 'Mother of 2-year-old', content: 'Professional, caring, and incredibly effective. Our toddler now goes to bed without any battles! Worth every penny.', rating: 5 }
            ];
            
            return (
                <main>
                    <section className="py-16 sm:py-24 bg-cream">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                                <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
                                    <div>
                                        <h1 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4 sm:mb-6">
                                            Hello and Welcome! I am Yanina, your sleep consultant.
                                        </h1>
                                        <p className="text-base sm:text-lg text-medium-gray leading-relaxed mb-4 sm:mb-6">
                                            My journey began with a bachelor's degree in psychology, which laid the foundation for my understanding of child development, sleep cycles and patterns, family dynamics, and the emotional and physical needs of babies and parents. The passion for working with families has always been a driving force in my career path, and the goal was to have a positive impact on the lives of children and their families. While pursuing my academic goal, I met two incredible, highly professional, newborn care specialists who introduced me to this profession and gave me valuable training.
                                        </p>
                                        <p className="text-base sm:text-lg text-medium-gray leading-relaxed mb-4 sm:mb-6">
                                            Over 8 years, I have combined this academic background with extensive real world experience, helping many families create nurturing environments and healthy sleep habits for their little ones. I specialize in sleep training for infants and toddlers and newborn care. My priority is to meet each family's unique needs and parenting style.
                                        </p>
                                        <p className="text-base sm:text-lg text-medium-gray leading-relaxed mb-4 sm:mb-6">
                                            If you are having sleepless nights with an infant or a toddler, or if you need help navigating your baby's first days at home, I am here to guide you with compassion, knowledge and practical solutions. My goal is to empower parents with the confidence and tools they need to thrive, not just survive in the early months and years of parenthood. I look forward to supporting you and your family on this beautiful journey.
                                        </p>
                                        <p className="text-base sm:text-lg text-medium-gray leading-relaxed">
                                            I believe every baby can learn to sleep well with the right approach, 
                                            patience, and support. My methods are rooted in child development research 
                                            and tailored to each family's unique needs and values.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative mt-8 lg:mt-0">
                                    <img
                                        src="/attached_assets/friend website pic_1751661228509.jpeg"
                                        alt="Yanina, certified sleep consultant"
                                        className="rounded-2xl sm:rounded-3xl shadow-2xl w-full h-auto"
                                    />
                                </div>
                            </div>

                            {/* Testimonials Section */}
                            <div className="mt-16 sm:mt-24">
                                <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
                                    <h2 className="text-3xl font-bold text-soft-dark mb-8 text-center">What Parents Say</h2>
                                    <div className="grid md:grid-cols-3 gap-8">
                                        {testimonials.map(testimonial => (
                                            <div key={testimonial.id} className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
                                                <div className="text-yellow-400 text-2xl mb-4">{'⭐'.repeat(testimonial.rating)}</div>
                                                <p className="text-medium-gray italic mb-4 leading-relaxed">
                                                    "{testimonial.content}"
                                                </p>
                                                <div className="border-t pt-4">
                                                    <p className="font-semibold text-soft-dark">{testimonial.name}</p>
                                                    <p className="text-sm text-medium-gray">{testimonial.title}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            );
        }
        
        function ServicesPage({ onSubmit }) {
            const [formData, setFormData] = useState({
                parentName: '',
                email: '',
                phone: '',
                childAge: '',
                sleepChallenges: '',
                consultationType: '',
                preferredDate: ''
            });
            
            const [isSubmitting, setIsSubmitting] = useState(false);
            
            const handleSubmit = async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                
                try {
                    await onSubmit(formData);
                    setFormData({
                        parentName: '',
                        email: '',
                        phone: '',
                        childAge: '',
                        sleepChallenges: '',
                        consultationType: '',
                        preferredDate: ''
                    });
                } catch (error) {
                    console.error('Error submitting form:', error);
                } finally {
                    setIsSubmitting(false);
                }
            };
            
            const handleServiceSelect = (serviceTitle) => {
                setFormData(prev => ({...prev, consultationType: serviceTitle}));
                
                // Scroll to form
                const formElement = document.getElementById('consultation-form');
                if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth' });
                }
            };
            
            const services = [
                {
                    title: "Free Consultation",
                    bgColor: "bg-baby-blue/5",
                    iconBg: "bg-baby-blue",
                    buttonBg: "bg-baby-blue",
                    icon: "📞",
                    features: [
                        "15-minute phone call",
                        "Sleep assessment",
                        "General information",
                        "Next steps discussion",
                    ],
                },
                {
                    title: "Complete Sleep Package",
                    bgColor: "bg-soft-pink/10",
                    iconBg: "bg-soft-pink",
                    buttonBg: "bg-soft-pink",
                    icon: "🛏️",
                    popular: true,
                    features: [
                        "Comprehensive sleep assessment",
                        "Day and Night sleep monitoring",
                        "Personalized daily schedule and daytime activities",
                        "Personalized sleep plan",
                        "Child's room assessment",
                        "Unlimited support and Follow-up calls",
                        "Support for future sleep regressions due to travel, environmental changes, etc",
                        "Schedule adjustment due to child's growth",
                    ],
                },
                {
                    title: "Newborn Care",
                    bgColor: "bg-mint/10",
                    iconBg: "bg-mint",
                    buttonBg: "bg-mint",
                    icon: "👶",
                    features: [
                        "Prenatal and Postpartum education",
                        "Creating sustainable routines from day 1",
                        "One-on-one newborn care consultation",
                        "Custom newborn care sleep plan",
                        "Education on feeding, soothing, routines, and more",
                        "Gentle methods that support both child and parents",
                        "In home or virtual assistance",
                    ],
                },
            ];
            
            return (
                <main>
                    <section className="py-16 sm:py-24 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12 sm:mb-16">
                                <h1 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">
                                    Sleep Solutions for Every Family
                                </h1>
                                <p className="text-lg sm:text-xl text-medium-gray max-w-3xl mx-auto">
                                    Personalized sleep plans designed to work with your baby's temperament 
                                    and your family's lifestyle.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
                                {services.map((service, index) => (
                                    <div
                                        key={index}
                                        className={\`\${service.bgColor} p-6 sm:p-8 rounded-2xl border-2 \${service.popular ? "border-soft-pink" : "border-transparent"} hover:border-baby-blue transition-colors card-hover relative\`}
                                    >
                                        {service.popular && (
                                            <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                                                <span className="bg-soft-pink text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                                                    Most Popular
                                                </span>
                                            </div>
                                        )}
                                        <div className="text-center mb-6">
                                            <div className={\`w-14 h-14 sm:w-16 sm:h-16 \${service.iconBg} rounded-full flex items-center justify-center mx-auto mb-4\`}>
                                                <span className="text-white text-2xl">{service.icon}</span>
                                            </div>
                                            <h3 className="text-xl sm:text-2xl font-bold text-soft-dark mb-2">
                                                {service.title}
                                            </h3>
                                        </div>
                                        <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                                            {service.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-center text-sm sm:text-base text-medium-gray">
                                                    <span className="text-baby-blue mr-2 sm:mr-3">✓</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <button 
                                            className={\`w-full \${service.buttonBg} text-white py-3 rounded-full font-semibold hover:bg-baby-blue transition-colors touch-target\`}
                                            onClick={() => handleServiceSelect(service.title)}
                                        >
                                            {service.title === "Free Consultation" ? "Schedule Free Call" : "Get Started Today"}
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Consultation Form */}
                            <div className="bg-cream p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl text-center">
                                <h2 className="text-2xl sm:text-3xl font-bold text-soft-dark mb-4">
                                    Ready to Get Started?
                                </h2>
                                <p className="text-lg sm:text-xl text-medium-gray mb-6 sm:mb-8 max-w-2xl mx-auto">
                                    Book your free consultation today and take the first step toward 
                                    peaceful nights for your whole family.
                                </p>

                                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
                                    <div className="text-center mb-6">
                                        <span className="text-baby-blue text-4xl">📅</span>
                                        <h3 className="text-xl sm:text-2xl font-semibold text-soft-dark mb-4">
                                            Schedule Your Free Consultation
                                        </h3>
                                        <p className="text-sm sm:text-base text-medium-gray mb-6">Choose a time that works for you</p>
                                    </div>
                                    
                                    <div id="consultation-form" className="mt-6 sm:mt-8 text-left">
                                        <h4 className="text-lg font-semibold text-soft-dark mb-2">Book Your Free Consultation</h4>
                                        <p className="text-sm text-medium-gray mb-6">Tell me about your sleep challenges and I'll contact you within 48 hours</p>
                                        
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-soft-dark mb-2">Your Name</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.parentName}
                                                        onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                                                        placeholder="Enter your name"
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-baby-blue focus:ring-2 focus:ring-baby-blue/20 touch-target"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-soft-dark mb-2">Email</label>
                                                    <input
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                        placeholder="Enter your email"
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-baby-blue focus:ring-2 focus:ring-baby-blue/20 touch-target"
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-soft-dark mb-2">Phone (Optional)</label>
                                                    <input
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                        placeholder="Phone number"
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-baby-blue focus:ring-2 focus:ring-baby-blue/20 touch-target"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-soft-dark mb-2">Child's Age</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.childAge}
                                                        onChange={(e) => setFormData({...formData, childAge: e.target.value})}
                                                        placeholder="e.g., 8 months"
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-baby-blue focus:ring-2 focus:ring-baby-blue/20 touch-target"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-soft-dark mb-2">Consultation Type</label>
                                                <select
                                                    required
                                                    value={formData.consultationType}
                                                    onChange={(e) => setFormData({...formData, consultationType: e.target.value})}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-baby-blue focus:ring-2 focus:ring-baby-blue/20 touch-target"
                                                >
                                                    <option value="">Select consultation type</option>
                                                    <option value="Free Consultation">Free Consultation</option>
                                                    <option value="Complete Sleep Package">Complete Sleep Package</option>
                                                    <option value="Newborn Care">Newborn Care</option>
                                                </select>
                                            </div>
                                            
                                            <div>
                                                <label className="block text-sm font-medium text-soft-dark mb-2">Sleep Challenges</label>
                                                <textarea
                                                    required
                                                    rows="4"
                                                    value={formData.sleepChallenges}
                                                    onChange={(e) => setFormData({...formData, sleepChallenges: e.target.value})}
                                                    placeholder="Describe your current sleep challenges..."
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-baby-blue focus:ring-2 focus:ring-baby-blue/20 touch-target"
                                                />
                                            </div>
                                            
                                            <div>
                                                <label className="block text-sm font-medium text-soft-dark mb-2">Preferred Date (Optional)</label>
                                                <input
                                                    type="text"
                                                    value={formData.preferredDate}
                                                    onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                                                    placeholder="When would you like to schedule?"
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-baby-blue focus:ring-2 focus:ring-baby-blue/20 touch-target"
                                                />
                                            </div>
                                            
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-baby-blue text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:bg-soft-pink transform hover:scale-105 touch-target"
                                            >
                                                {isSubmitting ? 'Booking...' : 'Book My Free Consultation'}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            );
        }
        
        function BlogPage() {
            const featuredArticle = {
                title: "The Ultimate Guide to Creating the Perfect Sleep Environment",
                excerpt: "Discover how to optimize your baby's room for better sleep. From lighting and temperature to white noise and blackout curtains, learn the science-backed strategies that make a real difference.",
                date: "March 15, 2024",
                readTime: "8 min read",
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
            };

            const articles = [
                {
                    id: 1,
                    title: "Mastering the Art of Daytime Naps",
                    excerpt: "Learn why daytime naps are crucial for nighttime sleep and how to establish a consistent nap schedule that works.",
                    date: "March 10, 2024",
                    readTime: "5 min read",
                    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
                },
                {
                    id: 2,
                    title: "Building a Calming Bedtime Routine",
                    excerpt: "Discover the key elements of an effective bedtime routine that signals to your baby that it's time to sleep.",
                    date: "March 5, 2024",
                    readTime: "6 min read",
                    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
                },
                {
                    id: 3,
                    title: "Gentle Sleep Training Methods That Work",
                    excerpt: "Explore compassionate approaches to sleep training that respect your baby's needs while promoting healthy sleep habits.",
                    date: "February 28, 2024",
                    readTime: "7 min read",
                    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
                },
            ];
            
            return (
                <main>
                    <section className="py-16 sm:py-24 bg-cream">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12 sm:mb-16">
                                <h1 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">
                                    Sleep Tips & Resources
                                </h1>
                                <p className="text-lg sm:text-xl text-medium-gray max-w-3xl mx-auto">
                                    Expert advice, tips, and insights to help you understand your baby's 
                                    sleep needs and create healthy sleep habits.
                                </p>
                            </div>

                            {/* Featured Article */}
                            <div className="mb-12 sm:mb-16">
                                <div className="bg-white rounded-3xl shadow-lg overflow-hidden card-hover">
                                    <div className="grid grid-cols-1 lg:grid-cols-2">
                                        <div className="relative">
                                            <img
                                                src={featuredArticle.image}
                                                alt={featuredArticle.title}
                                                className="w-full h-80 lg:h-full object-cover"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-soft-pink text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                    Featured
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 sm:p-8 lg:p-12">
                                            <div className="flex items-center text-medium-gray text-xs sm:text-sm mb-4">
                                                <span className="mr-2">📅</span>
                                                <span>{featuredArticle.date}</span>
                                                <span className="mx-2">•</span>
                                                <span>{featuredArticle.readTime}</span>
                                            </div>
                                            <h2 className="text-2xl sm:text-3xl font-bold text-soft-dark mb-4">
                                                {featuredArticle.title}
                                            </h2>
                                            <p className="text-sm sm:text-base text-medium-gray leading-relaxed mb-6">
                                                {featuredArticle.excerpt}
                                            </p>
                                            <button className="inline-flex items-center text-baby-blue font-semibold hover:text-soft-pink transition-colors touch-target">
                                                Read Full Article
                                                <span className="ml-2">→</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Blog Articles Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {articles.map((article) => (
                                    <article
                                        key={article.id}
                                        className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
                                    >
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-40 sm:h-48 object-cover"
                                        />
                                        <div className="p-4 sm:p-6">
                                            <div className="flex items-center text-medium-gray text-xs sm:text-sm mb-3">
                                                <span className="mr-2">📅</span>
                                                <span>{article.date}</span>
                                                <span className="mx-2">•</span>
                                                <span>{article.readTime}</span>
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-semibold text-soft-dark mb-3">
                                                {article.title}
                                            </h3>
                                            <p className="text-sm sm:text-base text-medium-gray leading-relaxed mb-4">
                                                {article.excerpt}
                                            </p>
                                            <button className="text-baby-blue font-semibold hover:text-soft-pink transition-colors touch-target">
                                                Read More →
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            <div className="text-center mt-8 sm:mt-12">
                                <button className="bg-baby-blue text-white px-6 py-3 rounded-full font-semibold hover:bg-soft-pink transition-colors touch-target">
                                    View All Articles
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
            );
        }
        
        function ContactPage({ onSubmit }) {
            const [formData, setFormData] = useState({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            
            const [isSubmitting, setIsSubmitting] = useState(false);
            
            const handleSubmit = async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                
                try {
                    await onSubmit(formData);
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: ''
                    });
                } catch (error) {
                    console.error('Error submitting form:', error);
                } finally {
                    setIsSubmitting(false);
                }
            };
            
            const contactInfo = [
                {
                    icon: "📞",
                    title: "Phone",
                    content: "(661) 470-6815",
                    subtitle: "Text or Call",
                    bgColor: "bg-baby-blue",
                },
                {
                    icon: "📧",
                    title: "Email",
                    content: "happybabysleeping@gmail.com",
                    subtitle: "I respond within 48 hours",
                    bgColor: "bg-soft-pink",
                },
                {
                    icon: "🕐",
                    title: "Response Time",
                    content: "Within 48 hours",
                    subtitle: "Emergency support for active clients",
                    bgColor: "bg-mint",
                },
            ];
            
            return (
                <main>
                    <section className="py-16 sm:py-24 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12 sm:mb-16">
                                <h1 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">Get in Touch</h1>
                                <p className="text-lg sm:text-xl text-medium-gray max-w-3xl mx-auto">
                                    Have questions about your baby's sleep? Ready to start your journey to better nights? 
                                    I'm here to help.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                                {/* Contact Form */}
                                <div className="bg-cream p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
                                    <h2 className="text-xl sm:text-2xl font-bold text-soft-dark mb-6">Send a Message</h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-soft-dark mb-2">
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                    placeholder="Enter your name"
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-baby-blue focus:ring-2 focus:ring-baby-blue/20 touch-target"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-soft-dark mb-2">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                    placeholder="Enter your email"
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-baby-blue focus:ring-2 focus:ring-baby-blue/20 touch-target"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-soft-dark mb-2">
                                                Phone Number (Optional)
                                            </label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                placeholder="Enter your phone number"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-baby-blue focus:ring-2 focus:ring-baby-blue/20 touch-target"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-soft-dark mb-2">
                                                Subject
                                            </label>
                                            <select
                                                required
                                                value={formData.subject}
                                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-baby-blue focus:ring-2 focus:ring-baby-blue/20 touch-target"
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="Sleep Training Help">Sleep Training Help</option>
                                                <option value="Newborn Sleep Questions">Newborn Sleep Questions</option>
                                                <option value="Consultation Booking">Consultation Booking</option>
                                                <option value="General Questions">General Questions</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-soft-dark mb-2">
                                                Message
                                            </label>
                                            <textarea
                                                required
                                                rows="5"
                                                value={formData.message}
                                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                                placeholder="Tell me about your sleep challenges..."
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-baby-blue focus:ring-2 focus:ring-baby-blue/20 touch-target"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-baby-blue text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:bg-soft-pink transform hover:scale-105 touch-target"
                                        >
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </form>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-6">
                                    <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg">
                                        <h3 className="text-xl sm:text-2xl font-bold text-soft-dark mb-6">Contact Information</h3>
                                        <div className="space-y-6">
                                            {contactInfo.map((info, index) => (
                                                <div key={index} className="flex items-start space-x-4">
                                                    <div className={\`w-12 h-12 \${info.bgColor} rounded-full flex items-center justify-center\`}>
                                                        <span className="text-white text-xl">{info.icon}</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-soft-dark">{info.title}</h4>
                                                        <p className="text-medium-gray font-medium">{info.content}</p>
                                                        <p className="text-sm text-medium-gray">{info.subtitle}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-baby-blue/10 to-soft-pink/10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
                                        <h3 className="text-xl font-bold text-soft-dark mb-4">Let's Connect!</h3>
                                        <p className="text-medium-gray mb-4">
                                            I'm passionate about helping families get the sleep they deserve. 
                                            Whether you're dealing with newborn sleep challenges or toddler bedtime battles, 
                                            I'm here to support you every step of the way.
                                        </p>
                                        <div className="flex space-x-4">
                                            <button className="bg-baby-blue text-white px-4 py-2 rounded-lg hover:bg-soft-pink transition-colors">
                                                📱 Follow on Instagram
                                            </button>
                                            <button className="bg-soft-pink text-white px-4 py-2 rounded-lg hover:bg-baby-blue transition-colors">
                                                📘 Like on Facebook
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            );
        }
        
        function AdminDashboard({ data, onBack }) {
            const [activeTab, setActiveTab] = useState('contacts');
            
            return (
                <div className="min-h-screen bg-gray-50">
                    <header className="bg-white shadow-sm border-b">
                        <div className="max-w-7xl mx-auto px-4 py-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-3xl font-bold text-soft-dark">Admin Dashboard</h1>
                                    <p className="text-medium-gray">Manage contacts, consultations, blog posts, and testimonials</p>
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
                                    className={\`px-6 py-3 rounded-md transition-colors font-medium \${activeTab === 'contacts' ? 'bg-baby-blue text-white' : 'text-medium-gray hover:bg-gray-100'}\`}
                                >
                                    Contact Messages ({data.contacts.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('consultations')}
                                    className={\`px-6 py-3 rounded-md transition-colors font-medium \${activeTab === 'consultations' ? 'bg-baby-blue text-white' : 'text-medium-gray hover:bg-gray-100'}\`}
                                >
                                    Consultations ({data.consultations.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('blog')}
                                    className={\`px-6 py-3 rounded-md transition-colors font-medium \${activeTab === 'blog' ? 'bg-baby-blue text-white' : 'text-medium-gray hover:bg-gray-100'}\`}
                                >
                                    Blog Posts ({data.blogPosts.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('testimonials')}
                                    className={\`px-6 py-3 rounded-md transition-colors font-medium \${activeTab === 'testimonials' ? 'bg-baby-blue text-white' : 'text-medium-gray hover:bg-gray-100'}\`}
                                >
                                    Testimonials ({data.testimonials.length})
                                </button>
                            </div>
                        </div>
                        
                        {activeTab === 'contacts' && (
                            <div className="grid gap-6">
                                {data.contacts.map(contact => (
                                    <div key={contact.id} className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-baby-blue">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-soft-dark">{contact.name}</h3>
                                                <p className="text-medium-gray">{contact.email}</p>
                                                <p className="text-medium-gray">{contact.phone}</p>
                                                <p className="text-sm text-baby-blue font-medium mt-1">Subject: {contact.subject}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs text-medium-gray bg-gray-100 px-3 py-1 rounded-full">
                                                    {contact.createdAt}
                                                </span>
                                                <div className="mt-2">
                                                    <span className={\`text-xs px-2 py-1 rounded-full \${contact.status === 'new' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}\`}>
                                                        {contact.status === 'new' ? 'New' : 'Replied'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-soft-dark leading-relaxed">{contact.message}</p>
                                        </div>
                                        <div className="mt-4 flex space-x-3">
                                            <button className="px-4 py-2 bg-baby-blue text-white rounded-lg hover:bg-baby-blue/90 transition-colors">
                                                Reply via Email
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
                                {data.consultations.map(consultation => (
                                    <div key={consultation.id} className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-soft-pink">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-soft-dark">{consultation.parentName}</h3>
                                                <p className="text-medium-gray">{consultation.email}</p>
                                                <p className="text-medium-gray">{consultation.phone}</p>
                                                <p className="text-soft-pink font-medium mt-2">
                                                    {consultation.consultationType} - Child: {consultation.childAge}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs text-medium-gray bg-gray-100 px-3 py-1 rounded-full">
                                                    {consultation.createdAt}
                                                </span>
                                                <div className="mt-2">
                                                    <span className={\`text-xs px-2 py-1 rounded-full \${consultation.status === 'scheduled' ? 'bg-green-100 text-green-800' : consultation.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}\`}>
                                                        {consultation.status === 'scheduled' ? 'Scheduled' : consultation.status === 'in-progress' ? 'In Progress' : 'Completed'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                                            <div>
                                                <p className="text-sm font-medium text-soft-dark mb-1">Sleep Challenges:</p>
                                                <p className="text-medium-gray">{consultation.sleepChallenges}</p>
                                            </div>
                                            {consultation.preferredDate && (
                                                <div>
                                                    <p className="text-sm font-medium text-soft-dark mb-1">Preferred Date:</p>
                                                    <p className="text-medium-gray">{consultation.preferredDate}</p>
                                                </div>
                                            )}
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
                        
                        {activeTab === 'blog' && (
                            <div className="grid gap-6">
                                {data.blogPosts.map(post => (
                                    <div key={post.id} className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-mint">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-soft-dark">{post.title}</h3>
                                                <p className="text-medium-gray">{post.excerpt}</p>
                                                <p className="text-sm text-medium-gray mt-2">By {post.author} • {post.createdAt} • {post.readTime}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                                                    {post.status === 'published' ? 'Published' : 'Draft'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex space-x-3">
                                            <button className="px-4 py-2 bg-mint text-white rounded-lg hover:bg-mint/90 transition-colors">
                                                Edit Post
                                            </button>
                                            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                                                View Post
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {activeTab === 'testimonials' && (
                            <div className="grid gap-6">
                                {data.testimonials.map(testimonial => (
                                    <div key={testimonial.id} className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-400">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-soft-dark">{testimonial.name}</h3>
                                                <p className="text-medium-gray">{testimonial.title}</p>
                                                <div className="text-yellow-400 text-lg mt-2">{'⭐'.repeat(testimonial.rating)}</div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs text-medium-gray bg-gray-100 px-3 py-1 rounded-full">
                                                    {testimonial.createdAt}
                                                </span>
                                                <div className="mt-2">
                                                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                                                        {testimonial.status === 'approved' ? 'Approved' : 'Pending'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-soft-dark leading-relaxed">"{testimonial.content}"</p>
                                        </div>
                                        <div className="mt-4 flex space-x-3">
                                            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                                                Edit Testimonial
                                            </button>
                                            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                                                Hide from Public
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
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <span className="text-2xl">🌙</span>
                                    <h3 className="text-xl font-bold">Happy Baby Sleeping</h3>
                                </div>
                                <p className="text-gray-300 mb-4">
                                    Professional sleep consulting for peaceful nights and happy families.
                                </p>
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
                                    <p>happybabysleeping@gmail.com</p>
                                    <p>(661) 470-6815</p>
                                    <p>Response within 48 hours</p>
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

const server = http.createServer((req, res) => {
    const url = req.url;
    
    if (url.startsWith('/attached_assets/')) {
        const filePath = path.join('/var/www', url);
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
            }
        } catch (error) {
            console.error('Error serving static file:', error);
        }
    }
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Happy Baby Sleeping Server running on port ${PORT}`);
    console.log(`Website accessible at: http://31.97.99.104`);
});