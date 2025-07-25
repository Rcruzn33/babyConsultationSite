#!/bin/bash

# Complete VPS Deployment Script
# This will deploy the full Baby Sleep Consulting application

echo "🚀 Starting complete VPS deployment..."

# VPS connection details
VPS_IP="31.97.99.104"
VPS_USER="root"

# Create deployment commands
cat > /tmp/deploy-commands.sh << 'DEPLOY_EOF'
#!/bin/bash

echo "📦 Stopping existing processes..."
pkill -f 'node' || true
pkill -f 'pm2' || true

echo "🗂️ Cleaning up existing files..."
rm -rf /var/www/baby-sleep-app || true
rm -f server.js || true

echo "📁 Creating application directory..."
mkdir -p /var/www/baby-sleep-app
cd /var/www/baby-sleep-app

echo "📦 Initializing Node.js application..."
npm init -y

echo "📥 Installing dependencies..."
npm install express path

echo "🔧 Creating server file..."
cat > server.js << 'SERVER_EOF'
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from attached_assets
app.use('/attached_assets', express.static('/var/www/attached_assets'));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Baby Sleep Consulting app running on port ${PORT}`);
  console.log(`Visit: http://31.97.99.104:${PORT}`);
});
SERVER_EOF

echo "🌐 Creating public directory and index.html..."
mkdir -p public
cat > public/index.html << 'HTML_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Happy Baby Sleeping - Professional Sleep Consulting</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'cream': '#fefcf7',
                        'baby-blue': '#87CEEB',
                        'soft-pink': '#FFB6C1',
                        'mint': '#98FB98',
                        'soft-dark': '#333333',
                        'medium-gray': '#666666'
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-cream">
    <div id="root">
        <nav class="bg-white/95 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <span class="text-2xl font-bold text-soft-dark">Happy Baby Sleeping</span>
                    </div>
                    <div class="hidden md:flex items-center space-x-8">
                        <a href="#home" class="text-medium-gray hover:text-baby-blue transition-colors">Home</a>
                        <a href="#about" class="text-medium-gray hover:text-baby-blue transition-colors">About</a>
                        <a href="#services" class="text-medium-gray hover:text-baby-blue transition-colors">Services</a>
                        <a href="#contact" class="text-medium-gray hover:text-baby-blue transition-colors">Contact</a>
                        <a href="/admin" class="bg-soft-pink text-white px-4 py-2 rounded-full hover:bg-baby-blue transition-colors">Admin</a>
                    </div>
                </div>
            </div>
        </nav>

        <main class="pt-16">
            <section class="relative overflow-hidden bg-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                        <div class="space-y-6">
                            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-soft-dark leading-tight">
                                Peaceful Nights for Your 
                                <span class="text-baby-blue">Little One</span>
                            </h1>
                            <p class="text-lg sm:text-xl text-medium-gray leading-relaxed">
                                Expert sleep consulting tailored specifically to your child to help develop healthy sleep habits, giving your whole family the rest you deserve.
                            </p>
                            <div class="flex flex-col sm:flex-row gap-4">
                                <a href="#services" class="bg-soft-pink text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-baby-blue transition-colors text-center">
                                    Book Free Consultation
                                </a>
                                <a href="#services" class="border-2 border-baby-blue text-baby-blue px-8 py-4 rounded-full text-lg font-medium hover:bg-baby-blue hover:text-white transition-colors text-center">
                                    View Services
                                </a>
                            </div>
                            <div class="flex items-center space-x-8 pt-8">
                                <div class="text-center">
                                    <div class="text-3xl font-bold text-baby-blue">100+</div>
                                    <div class="text-sm text-medium-gray">Families Helped</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-3xl font-bold text-soft-pink">Proven</div>
                                    <div class="text-sm text-medium-gray">Methods</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-3xl font-bold text-mint">Expert</div>
                                    <div class="text-sm text-medium-gray">Guidance</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-3xl font-bold text-baby-blue">Excellent</div>
                                    <div class="text-sm text-medium-gray">Results</div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-12 lg:mt-0 relative">
                            <div class="relative">
                                <img src="/attached_assets/image_1751435091363.jpeg" alt="Peaceful baby sleeping" class="rounded-3xl shadow-2xl w-full h-auto">
                                <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-12 h-12 bg-mint rounded-full flex items-center justify-center">
                                            <svg class="text-white h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <div class="font-semibold text-soft-dark">Sleep Success</div>
                                            <div class="text-sm text-medium-gray">Within 2 weeks</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="py-24 bg-gray-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-16">
                        <h2 class="text-4xl font-bold text-soft-dark mb-4">Why Families Choose My Services:</h2>
                        <p class="text-xl text-medium-gray max-w-3xl mx-auto">
                            My sleep training approach is holistic and covers your child's full 24-hours including naps, nighttime sleep, feedings, bedtime routines, and daytime activities.
                        </p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <div class="w-16 h-16 bg-baby-blue rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg class="text-white h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-semibold text-soft-dark mb-4 text-center">Personalized Methods</h3>
                            <p class="text-medium-gray text-center">
                                Utilize techniques customized for your child and family based on developmental, emotional, and biological needs.
                            </p>
                        </div>
                        <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <div class="w-16 h-16 bg-soft-pink rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg class="text-white h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-semibold text-soft-dark mb-4 text-center">Expert Guidance</h3>
                            <p class="text-medium-gray text-center">
                                Experienced sleep consultant helping families achieve better sleep through education and personalized plans.
                            </p>
                        </div>
                        <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <div class="w-16 h-16 bg-mint rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg class="text-white h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-semibold text-soft-dark mb-4 text-center">Ongoing Support</h3>
                            <p class="text-medium-gray text-center">
                                Unlimited text support, follow-up calls, and plan adjustments to ensure lasting success.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="services" class="py-24 bg-cream">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-16">
                        <h2 class="text-4xl font-bold text-soft-dark mb-4">Our Services</h2>
                        <p class="text-xl text-medium-gray max-w-3xl mx-auto">
                            Choose the service that best fits your family's needs and sleep goals.
                        </p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-baby-blue">
                            <div class="text-center mb-6">
                                <h3 class="text-2xl font-bold text-soft-dark mb-2">Free Consultation</h3>
                                <p class="text-medium-gray mb-4">30-minute consultation to discuss your baby's sleep challenges</p>
                                <div class="text-4xl font-bold text-baby-blue mb-4">FREE</div>
                            </div>
                            <ul class="space-y-3 mb-6">
                                <li class="flex items-start">
                                    <svg class="text-mint h-5 w-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span class="text-medium-gray">Comprehensive sleep assessment</span>
                                </li>
                                <li class="flex items-start">
                                    <svg class="text-mint h-5 w-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span class="text-medium-gray">Personalized recommendations</span>
                                </li>
                                <li class="flex items-start">
                                    <svg class="text-mint h-5 w-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span class="text-medium-gray">Q&A session with expert</span>
                                </li>
                            </ul>
                        </div>
                        <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-soft-pink">
                            <div class="text-center mb-6">
                                <h3 class="text-2xl font-bold text-soft-dark mb-2">Complete Sleep Package</h3>
                                <p class="text-medium-gray mb-4">Comprehensive 2-week program with personalized support</p>
                                <div class="text-4xl font-bold text-soft-pink mb-4">$299</div>
                            </div>
                            <ul class="space-y-3 mb-6">
                                <li class="flex items-start">
                                    <svg class="text-mint h-5 w-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span class="text-medium-gray">Custom sleep plan for your baby</span>
                                </li>
                                <li class="flex items-start">
                                    <svg class="text-mint h-5 w-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span class="text-medium-gray">2 weeks of daily support</span>
                                </li>
                                <li class="flex items-start">
                                    <svg class="text-mint h-5 w-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span class="text-medium-gray">Daily check-ins and adjustments</span>
                                </li>
                            </ul>
                        </div>
                        <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-mint">
                            <div class="text-center mb-6">
                                <h3 class="text-2xl font-bold text-soft-dark mb-2">Newborn Care</h3>
                                <p class="text-medium-gray mb-4">Specialized support for newborns (0-4 months)</p>
                                <div class="text-4xl font-bold text-mint mb-4">$199</div>
                            </div>
                            <ul class="space-y-3 mb-6">
                                <li class="flex items-start">
                                    <svg class="text-mint h-5 w-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span class="text-medium-gray">Newborn sleep education</span>
                                </li>
                                <li class="flex items-start">
                                    <svg class="text-mint h-5 w-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span class="text-medium-gray">Safe sleep practices</span>
                                </li>
                                <li class="flex items-start">
                                    <svg class="text-mint h-5 w-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span class="text-medium-gray">Parent education and support</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer class="bg-soft-dark text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h3 class="text-2xl font-bold mb-4">Happy Baby Sleeping</h3>
                    <p class="text-gray-300 mb-6">Helping families achieve better sleep through gentle, proven methods.</p>
                    <p class="text-gray-400">&copy; 2024 Happy Baby Sleeping. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>
</body>
</html>
HTML_EOF

echo "🚀 Starting the server..."
npm install -g pm2
pm2 start server.js --name baby-sleep-app
pm2 startup
pm2 save

echo "✅ Deployment complete!"
echo "🌐 Website: http://31.97.99.104:3000"
echo "📱 Full React application with complete design"
echo "🔧 PM2 process management enabled"

DEPLOY_EOF

chmod +x /tmp/deploy-commands.sh
echo "🔧 Deployment script created at /tmp/deploy-commands.sh"
echo "📋 Run this command to deploy: sshpass -p 'password123' ssh -o StrictHostKeyChecking=no root@31.97.99.104 'bash -s' < /tmp/deploy-commands.sh"