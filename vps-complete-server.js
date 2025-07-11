const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static assets
app.use('/attached_assets', express.static('/var/www/attached_assets'));

// Complete React Application HTML
const completeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Happy Baby Sleeping - Expert Sleep Consulting</title>
    <meta name="description" content="Professional baby sleep consulting services. Get peaceful nights for your little one with expert guidance, proven methods, and personalized support.">
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
                        'medium-gray': '#696969',
                        'light-gray': '#F5F5F5'
                    }
                }
            }
        }
    </script>
    <style>
        .mobile-full-width { width: 100%; }
        .touch-target { min-height: 44px; }
        @media (min-width: 640px) {
            .mobile-full-width { width: auto; }
        }
    </style>
</head>
<body class="bg-cream">
    <!-- Navigation -->
    <nav class="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <a href="/" class="text-2xl font-bold text-baby-blue">Happy Baby Sleeping</a>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <a href="/" class="text-soft-dark hover:text-baby-blue px-3 py-2 rounded-md text-sm font-medium">Home</a>
                        <a href="/about" class="text-soft-dark hover:text-baby-blue px-3 py-2 rounded-md text-sm font-medium">About</a>
                        <a href="/services" class="text-soft-dark hover:text-baby-blue px-3 py-2 rounded-md text-sm font-medium">Services</a>
                        <a href="/blog" class="text-soft-dark hover:text-baby-blue px-3 py-2 rounded-md text-sm font-medium">Blog</a>
                        <a href="/contact" class="text-soft-dark hover:text-baby-blue px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                    </div>
                </div>
                <div class="md:hidden">
                    <button class="text-soft-dark hover:text-baby-blue">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main>
        <!-- Hero Section -->
        <section class="relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-baby-blue/20 via-soft-pink/10 to-mint/20"></div>
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
                            <a href="/services">
                                <button class="bg-soft-pink text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-baby-blue transition-colors touch-target mobile-full-width">
                                    Book Free Consultation
                                </button>
                            </a>
                            <a href="/services">
                                <button class="border-2 border-baby-blue text-baby-blue px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-baby-blue hover:text-white transition-colors touch-target mobile-full-width">
                                    View Services
                                </button>
                            </a>
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
                            <div class="text-center">
                                <div class="text-2xl sm:text-3xl font-bold text-baby-blue">Excellent</div>
                                <div class="text-xs sm:text-sm text-medium-gray">Results</div>
                            </div>
                        </div>
                    </div>

                    <div class="relative mt-8 lg:mt-0">
                        <img src="/attached_assets/image_1751435091363.jpeg" alt="Peaceful baby sleeping in nursery" class="rounded-2xl sm:rounded-3xl shadow-2xl w-full h-auto">
                        <div class="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg">
                            <div class="flex items-center space-x-2 sm:space-x-3">
                                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-mint rounded-full flex items-center justify-center">
                                    <svg class="text-white h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
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
        <section class="py-16 sm:py-24 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">Our Services</h2>
                    <p class="text-lg text-medium-gray max-w-2xl mx-auto">Choose the perfect sleep solution for your family</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Free Consultation -->
                    <div class="bg-baby-blue/10 p-8 rounded-2xl text-center border-2 border-baby-blue/20 hover:border-baby-blue/40 transition-all">
                        <div class="w-16 h-16 bg-baby-blue rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg class="text-white h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 class="text-2xl font-bold text-baby-blue mb-4">Free Consultation</h3>
                        <p class="text-medium-gray mb-6">30-minute assessment to understand your baby's sleep challenges and create a personalized plan</p>
                        <div class="text-4xl font-bold text-baby-blue mb-6">FREE</div>
                        <a href="/services">
                            <button class="bg-baby-blue text-white px-8 py-3 rounded-full font-medium hover:bg-baby-blue/90 transition-colors w-full">
                                Book Now
                            </button>
                        </a>
                    </div>

                    <!-- Complete Sleep Package -->
                    <div class="bg-soft-pink/10 p-8 rounded-2xl text-center border-2 border-soft-pink/20 hover:border-soft-pink/40 transition-all">
                        <div class="w-16 h-16 bg-soft-pink rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg class="text-white h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 class="text-2xl font-bold text-soft-pink mb-4">Complete Sleep Package</h3>
                        <p class="text-medium-gray mb-6">Comprehensive sleep training program with ongoing support and personalized guidance</p>
                        <div class="text-4xl font-bold text-soft-pink mb-6">$299</div>
                        <a href="/services">
                            <button class="bg-soft-pink text-white px-8 py-3 rounded-full font-medium hover:bg-soft-pink/90 transition-colors w-full">
                                Learn More
                            </button>
                        </a>
                    </div>

                    <!-- Newborn Care -->
                    <div class="bg-mint/10 p-8 rounded-2xl text-center border-2 border-mint/20 hover:border-mint/40 transition-all">
                        <div class="w-16 h-16 bg-mint rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg class="text-white h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 class="text-2xl font-bold text-mint mb-4">Newborn Care</h3>
                        <p class="text-medium-gray mb-6">Specialized care and sleep guidance for newborns 0-3 months with gentle techniques</p>
                        <div class="text-4xl font-bold text-mint mb-6">$199</div>
                        <a href="/services">
                            <button class="bg-mint text-white px-8 py-3 rounded-full font-medium hover:bg-mint/90 transition-colors w-full">
                                Get Started
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials -->
        <section class="py-16 sm:py-24 bg-cream">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">What Parents Say</h2>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div class="bg-white p-6 rounded-2xl shadow-sm">
                        <div class="flex items-center mb-4">
                            <div class="flex text-yellow-400">
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            </div>
                        </div>
                        <p class="text-medium-gray mb-4">"Amazing results! Our baby went from waking up every 2 hours to sleeping through the night in just 10 days. The support was incredible."</p>
                        <div class="font-semibold text-soft-dark">Sarah M.</div>
                        <div class="text-sm text-medium-gray">Mother of 8-month-old</div>
                    </div>

                    <div class="bg-white p-6 rounded-2xl shadow-sm">
                        <div class="flex items-center mb-4">
                            <div class="flex text-yellow-400">
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            </div>
                        </div>
                        <p class="text-medium-gray mb-4">"Professional, caring, and effective. The personalized approach made all the difference for our family's sleep journey."</p>
                        <div class="font-semibold text-soft-dark">Mike & Jessica</div>
                        <div class="text-sm text-medium-gray">Parents of twins</div>
                    </div>

                    <div class="bg-white p-6 rounded-2xl shadow-sm">
                        <div class="flex items-center mb-4">
                            <div class="flex text-yellow-400">
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            </div>
                        </div>
                        <p class="text-medium-gray mb-4">"I was skeptical at first, but the gentle methods worked perfectly for our newborn. Highly recommend!"</p>
                        <div class="font-semibold text-soft-dark">Emma L.</div>
                        <div class="text-sm text-medium-gray">First-time mother</div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="bg-soft-dark text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-2xl font-bold text-baby-blue mb-4">Happy Baby Sleeping</h3>
                    <p class="text-gray-300">Expert sleep consulting for peaceful nights and happy families.</p>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4">Services</h4>
                    <ul class="space-y-2 text-gray-300">
                        <li><a href="/services" class="hover:text-baby-blue">Free Consultation</a></li>
                        <li><a href="/services" class="hover:text-baby-blue">Sleep Training</a></li>
                        <li><a href="/services" class="hover:text-baby-blue">Newborn Care</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4">Resources</h4>
                    <ul class="space-y-2 text-gray-300">
                        <li><a href="/blog" class="hover:text-baby-blue">Blog</a></li>
                        <li><a href="/about" class="hover:text-baby-blue">About</a></li>
                        <li><a href="/contact" class="hover:text-baby-blue">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4">Legal</h4>
                    <ul class="space-y-2 text-gray-300">
                        <li><a href="/privacy-policy" class="hover:text-baby-blue">Privacy Policy</a></li>
                        <li><a href="/terms-of-service" class="hover:text-baby-blue">Terms of Service</a></li>
                        <li><a href="/admin" class="hover:text-baby-blue">Admin</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
                <p>&copy; 2025 Happy Baby Sleeping. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;

// All routes serve the same HTML
app.get('*', (req, res) => {
    res.send(completeHTML);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Baby sleep consulting server running on port ${port}`);
    console.log(`Hero image should be available at: http://localhost:${port}/attached_assets/image_1751435091363.jpeg`);
});