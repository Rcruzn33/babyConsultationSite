// Simple server for VPS that serves the complete React app
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files including images
app.use('/attached_assets', express.static('/var/www/attached_assets'));
app.use(express.static('/var/www/public'));

// Serve the complete React app HTML
app.get('*', (req, res) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Happy Baby Sleeping - Professional Sleep Consulting Services</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .bg-gradient-to-br { background: linear-gradient(135deg, rgba(147, 197, 253, 0.2), rgba(251, 207, 232, 0.1), rgba(167, 243, 208, 0.2)); }
        .text-baby-blue { color: #3B82F6; }
        .text-soft-pink { color: #EC4899; }
        .text-mint { color: #10B981; }
        .text-soft-dark { color: #1F2937; }
        .text-medium-gray { color: #6B7280; }
        .bg-baby-blue { background-color: #3B82F6; }
        .bg-soft-pink { background-color: #EC4899; }
        .bg-mint { background-color: #10B981; }
        .border-baby-blue { border-color: #3B82F6; }
        .hover\\:bg-baby-blue:hover { background-color: #3B82F6; }
        .hover\\:text-white:hover { color: white; }
    </style>
</head>
<body class="bg-white">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <h1 class="text-2xl font-bold text-baby-blue">Happy Baby Sleeping</h1>
                </div>
                <div class="hidden md:flex space-x-8">
                    <a href="#home" class="text-soft-dark hover:text-baby-blue transition-colors">Home</a>
                    <a href="#services" class="text-soft-dark hover:text-baby-blue transition-colors">Services</a>
                    <a href="#about" class="text-soft-dark hover:text-baby-blue transition-colors">About</a>
                    <a href="#contact" class="text-soft-dark hover:text-baby-blue transition-colors">Contact</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div class="space-y-6 sm:space-y-8 text-center lg:text-left">
                    <h1 class="text-3xl sm:text-4xl lg:text-6xl font-bold text-soft-dark leading-tight">
                        Peaceful Nights for Your <span class="text-baby-blue">Little One</span>
                    </h1>
                    <p class="text-lg sm:text-xl text-medium-gray leading-relaxed">
                        Expert sleep consulting tailored specifically to your child to help develop healthy sleep habits, giving your whole family the rest you deserve.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <button class="bg-soft-pink text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-baby-blue transition-colors">
                            Book Free Consultation
                        </button>
                        <button class="border-2 border-baby-blue text-baby-blue px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-baby-blue hover:text-white transition-colors">
                            View Services
                        </button>
                    </div>
                    
                    <!-- Trust Indicators -->
                    <div class="flex items-center justify-center lg:justify-start space-x-2 sm:space-x-6 pt-6 sm:pt-8">
                        <div class="text-center">
                            <div class="text-2xl sm:text-3xl font-bold text-baby-blue">100+</div>
                            <div class="text-xs sm:text-sm text-medium-gray">Families Helped</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl sm:text-3xl font-bold text-soft-pink">Proven</div>
                            <div class="text-xs sm:text-sm text-medium-gray">Methods</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl sm:text-3xl font-bold text-mint">Expert</div>
                            <div class="text-xs sm:text-sm text-medium-gray">Guidance</div>
                        </div>
                    </div>
                </div>

                <div class="relative mt-8 lg:mt-0">
                    <img src="/attached_assets/image_1751435091363.jpeg" alt="Peaceful baby sleeping in nursery" class="rounded-2xl sm:rounded-3xl shadow-2xl w-full h-auto">
                    <div class="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg">
                        <div class="flex items-center space-x-2 sm:space-x-3">
                            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-mint rounded-full flex items-center justify-center">
                                <svg class="text-white h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                                </svg>
                            </div>
                            <div>
                                <div class="font-semibold text-soft-dark text-sm sm:text-base">Sleep Success</div>
                                <div class="text-xs sm:text-sm text-medium-gray">Within 2 weeks</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">Our Sleep Solutions</h2>
                <p class="text-lg text-medium-gray">Choose the perfect package for your family's needs</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Free Consultation -->
                <div class="bg-white rounded-2xl shadow-lg p-8 text-center">
                    <div class="text-baby-blue text-4xl font-bold mb-2">FREE</div>
                    <h3 class="text-xl font-semibold text-soft-dark mb-4">Free Consultation</h3>
                    <p class="text-medium-gray mb-6">30-minute assessment</p>
                    <button class="w-full bg-baby-blue text-white py-3 rounded-full font-medium hover:bg-blue-600 transition-colors">
                        Book Now
                    </button>
                </div>
                
                <!-- Complete Sleep Package -->
                <div class="bg-white rounded-2xl shadow-lg p-8 text-center border-2 border-baby-blue">
                    <div class="text-baby-blue text-4xl font-bold mb-2">$299</div>
                    <h3 class="text-xl font-semibold text-soft-dark mb-4">Complete Sleep Package</h3>
                    <p class="text-medium-gray mb-6">Full training and support</p>
                    <button class="w-full bg-baby-blue text-white py-3 rounded-full font-medium hover:bg-blue-600 transition-colors">
                        Get Started
                    </button>
                </div>
                
                <!-- Newborn Care -->
                <div class="bg-white rounded-2xl shadow-lg p-8 text-center">
                    <div class="text-mint text-4xl font-bold mb-2">$199</div>
                    <h3 class="text-xl font-semibold text-soft-dark mb-4">Newborn Care</h3>
                    <p class="text-medium-gray mb-6">Specialized infant care</p>
                    <button class="w-full bg-mint text-white py-3 rounded-full font-medium hover:bg-green-600 transition-colors">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-soft-dark text-white py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h3 class="text-2xl font-bold mb-4">Happy Baby Sleeping</h3>
                <p class="text-gray-300">Professional Sleep Consulting Services</p>
                <div class="mt-6">
                    <a href="/admin" class="inline-block bg-soft-pink text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-pink-600 transition-colors">
                        Admin Dashboard
                    </a>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
  `;
  
  res.send(htmlContent);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Complete Baby Sleep App running on port ${PORT}`);
});