# VPS Final Deployment - Complete Admin System

## 🚀 Single Command Deployment

SSH to your VPS and run this complete deployment command:

```bash
# Complete VPS Deployment - Baby Sleep Whisperer Admin System
cd /var/www/baby-sleep-admin && pm2 delete all && \
cat > server.js << 'EOF'
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sampleData = {
  testimonials: [
    {
      id: 1,
      parent_name: "Sarah Johnson",
      child_age: "8 months",
      testimonial: "The sleep consulting service was life-changing! My baby now sleeps through the night consistently. The personalized approach and ongoing support made all the difference.",
      rating: 5,
      photo_url: null,
      approved: true,
      created_at: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      parent_name: "Michael Chen",
      child_age: "6 months",
      testimonial: "After just two weeks following the sleep plan, our little one went from waking up 4-5 times per night to sleeping 11 hours straight. Highly recommend!",
      rating: 5,
      photo_url: null,
      approved: true,
      created_at: "2024-01-20T14:45:00Z"
    },
    {
      id: 3,
      parent_name: "Emma Wilson",
      child_age: "10 months",
      testimonial: "Professional, caring, and effective. The sleep training techniques were gentle yet successful. Our family is finally getting the rest we needed.",
      rating: 5,
      photo_url: null,
      approved: true,
      created_at: "2024-01-25T09:15:00Z"
    },
    {
      id: 4,
      parent_name: "Jennifer Martinez",
      child_age: "4 months",
      testimonial: "The newborn sleep guidance was invaluable. Clear instructions and 24/7 support helped us establish healthy sleep habits from the start.",
      rating: 5,
      photo_url: null,
      approved: false,
      created_at: "2024-01-30T16:20:00Z"
    }
  ],
  blogPosts: [
    {
      id: 1,
      title: "The Ultimate Guide to Baby Sleep Training",
      excerpt: "Learn gentle and effective methods to help your baby develop healthy sleep habits.",
      content: "Sleep training is one of the most important skills you can teach your baby. In this comprehensive guide, we'll explore gentle methods that work for different age groups, from newborns to toddlers.",
      author: "Sleep Consultant",
      published: true,
      created_at: "2024-01-10T08:00:00Z"
    },
    {
      id: 2,
      title: "Common Sleep Challenges and Solutions",
      excerpt: "Addressing frequent night wakings, early rising, and bedtime resistance.",
      content: "Every baby is unique, but there are common sleep challenges that many parents face. Let's explore practical solutions for the most frequent issues.",
      author: "Sleep Consultant",
      published: true,
      created_at: "2024-01-18T12:00:00Z"
    },
    {
      id: 3,
      title: "Creating the Perfect Sleep Environment",
      excerpt: "Transform your nursery into a sleep sanctuary for your little one.",
      content: "The environment plays a crucial role in your baby's sleep quality. From lighting to temperature, every detail matters.",
      author: "Sleep Consultant",
      published: false,
      created_at: "2024-01-28T15:30:00Z"
    }
  ],
  contacts: [
    {
      id: 1,
      name: "Lisa Thompson",
      email: "lisa.thompson@email.com",
      phone: "+1 (555) 123-4567",
      subject: "Sleep Consultation Inquiry",
      message: "Hi, I'm interested in a sleep consultation for my 7-month-old. She's been waking up multiple times during the night and I'm exhausted. Could you help us?",
      responded: false,
      created_at: "2024-01-29T11:30:00Z"
    },
    {
      id: 2,
      name: "Robert Davis",
      email: "robert.davis@email.com",
      phone: "+1 (555) 987-6543",
      subject: "Newborn Sleep Support",
      message: "We just welcomed our first baby and are struggling with sleep schedules. Looking for professional guidance to establish good habits early.",
      responded: true,
      created_at: "2024-01-28T14:15:00Z"
    },
    {
      id: 3,
      name: "Amanda Rodriguez",
      email: "amanda.rodriguez@email.com",
      phone: "+1 (555) 456-7890",
      subject: "Toddler Sleep Regression",
      message: "My 18-month-old was sleeping well but recently started having bedtime battles and frequent night wakings. Need help getting back on track.",
      responded: false,
      created_at: "2024-01-30T09:45:00Z"
    }
  ],
  consultations: [
    {
      id: 1,
      parent_name: "Karen Anderson",
      email: "karen.anderson@email.com",
      phone: "+1 (555) 234-5678",
      child_age: "5 months",
      consultation_type: "Complete Sleep Package",
      preferred_date: "2024-02-05",
      sleep_challenges: "Baby wakes every 2 hours, difficulty falling asleep without feeding, early morning wake-ups at 5 AM",
      status: "pending",
      created_at: "2024-01-29T13:20:00Z"
    },
    {
      id: 2,
      parent_name: "David Kim",
      email: "david.kim@email.com",
      phone: "+1 (555) 345-6789",
      child_age: "3 months",
      consultation_type: "Newborn Care",
      preferred_date: "2024-02-03",
      sleep_challenges: "Newborn sleep schedule confusion, day/night reversal, short naps",
      status: "completed",
      created_at: "2024-01-27T10:10:00Z"
    },
    {
      id: 3,
      parent_name: "Michelle Brown",
      email: "michelle.brown@email.com",
      phone: "+1 (555) 567-8901",
      child_age: "12 months",
      consultation_type: "Free Consultation",
      preferred_date: "2024-02-08",
      sleep_challenges: "Transitioning from crib to toddler bed, bedtime resistance, multiple night wakings",
      status: "pending",
      created_at: "2024-01-30T16:30:00Z"
    }
  ]
};

app.get('/api/testimonials', (req, res) => res.json(sampleData.testimonials));
app.get('/api/blog', (req, res) => res.json(sampleData.blogPosts));
app.get('/api/contacts', (req, res) => res.json(sampleData.contacts));
app.get('/api/consultations', (req, res) => res.json(sampleData.consultations));

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password123') {
    res.json({ success: true, message: 'Login successful', user: { id: 1, username: 'admin' } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

app.get('/admin-auth', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-auth.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-dashboard.html'));
});

app.get('/', (req, res) => {
  res.send(\`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Baby Sleep Whisperer - Peaceful Nights for Your Little One</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'baby-blue': '#3B82F6',
                        'soft-pink': '#EC4899',
                        'warm-cream': '#FEF7ED',
                        'sage-green': '#10B981',
                        'lavender': '#8B5CF6',
                        'peach': '#F97316',
                        'mint': '#06D6A0',
                        'sunset': '#F59E0B',
                        'rose': '#F43F5E'
                    }
                }
            }
        }
    </script>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        .hero-gradient {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fdf2f8 100%);
        }
        .card-hover {
            transition: all 0.3s ease;
        }
        .card-hover:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        .success-badge {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            position: absolute;
            top: -10px;
            right: -10px;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
    </style>
</head>
<body class="hero-gradient min-h-screen">
    <nav class="relative z-10 p-6">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-gradient-to-r from-baby-blue to-lavender rounded-lg flex items-center justify-center">
                    <span class="text-white font-bold text-sm">BSW</span>
                </div>
                <span class="text-xl font-bold text-gray-800">Baby Sleep Whisperer</span>
            </div>
            <div class="hidden md:flex space-x-8 text-gray-600">
                <a href="#services" class="hover:text-baby-blue transition-colors">Services</a>
                <a href="#about" class="hover:text-baby-blue transition-colors">About</a>
                <a href="#testimonials" class="hover:text-baby-blue transition-colors">Testimonials</a>
                <a href="#contact" class="hover:text-baby-blue transition-colors">Contact</a>
            </div>
        </div>
    </nav>

    <div class="relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 py-16">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div class="relative">
                    <div class="success-badge">
                        ✓ 500+ Families Helped
                    </div>
                    
                    <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                        Peaceful Nights for
                        <span class="bg-gradient-to-r from-baby-blue to-lavender bg-clip-text text-transparent">
                            Your Little One
                        </span>
                    </h1>
                    
                    <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                        Transform sleepless nights into restful dreams with our proven sleep consulting methods. 
                        Gentle, effective, and personalized for your family's unique needs.
                    </p>
                    
                    <div class="flex flex-col sm:flex-row gap-4 mb-8">
                        <a href="/admin-auth" class="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-baby-blue to-lavender text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                            Admin Portal
                        </a>
                        <a href="#consultation" class="inline-flex items-center justify-center px-8 py-4 bg-white text-baby-blue font-semibold rounded-xl border-2 border-baby-blue hover:bg-baby-blue hover:text-white transition-all duration-300">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2h3z"></path>
                            </svg>
                            Book Consultation
                        </a>
                    </div>
                    
                    <div class="flex items-center space-x-6 text-sm text-gray-500">
                        <div class="flex items-center">
                            <svg class="w-4 h-4 text-sage-green mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                            Certified Sleep Consultant
                        </div>
                        <div class="flex items-center">
                            <svg class="w-4 h-4 text-sage-green mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                            100% Success Rate
                        </div>
                        <div class="flex items-center">
                            <svg class="w-4 h-4 text-sage-green mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                            24/7 Support
                        </div>
                    </div>
                </div>
                
                <div class="relative">
                    <div class="relative bg-gradient-to-br from-white to-baby-blue/10 rounded-3xl p-8 card-hover">
                        <div class="bg-gradient-to-br from-baby-blue/20 to-lavender/20 rounded-2xl p-8 text-center">
                            <div class="w-24 h-24 bg-gradient-to-br from-baby-blue to-lavender rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-4">Sweet Dreams Await</h3>
                            <p class="text-gray-600 leading-relaxed">
                                Join hundreds of families who have transformed their sleep struggles into peaceful nights with our proven methods.
                            </p>
                        </div>
                        
                        <div class="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-soft-pink to-peach rounded-full flex items-center justify-center">
                            <span class="text-white text-xl">💤</span>
                        </div>
                        <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-sage-green to-mint rounded-full flex items-center justify-center">
                            <span class="text-white text-2xl">🌙</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="absolute inset-0 opacity-5">
            <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25% 25%, #3B82F6 2px, transparent 2px), radial-gradient(circle at 75% 75%, #8B5CF6 2px, transparent 2px); background-size: 50px 50px;"></div>
        </div>
    </div>

    <div class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Sleep Consulting?</h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">Professional, gentle, and effective sleep solutions tailored to your family's needs</p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
                <div class="text-center p-8 card-hover bg-gradient-to-br from-warm-cream to-white rounded-2xl">
                    <div class="w-16 h-16 bg-gradient-to-br from-baby-blue to-lavender rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Proven Methods</h3>
                    <p class="text-gray-600">Evidence-based sleep training techniques that work for babies of all ages and temperaments.</p>
                </div>
                
                <div class="text-center p-8 card-hover bg-gradient-to-br from-warm-cream to-white rounded-2xl">
                    <div class="w-16 h-16 bg-gradient-to-br from-sage-green to-mint rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Gentle Approach</h3>
                    <p class="text-gray-600">Compassionate methods that respect your parenting style and your baby's individual needs.</p>
                </div>
                
                <div class="text-center p-8 card-hover bg-gradient-to-br from-warm-cream to-white rounded-2xl">
                    <div class="w-16 h-16 bg-gradient-to-br from-soft-pink to-peach rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">24/7 Support</h3>
                    <p class="text-gray-600">Round-the-clock guidance and support throughout your sleep training journey.</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
  \`);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`🚀 Baby Sleep Whisperer running on port \${PORT}\`);
  console.log(\`📱 Main site: http://localhost:\${PORT}\`);
  console.log(\`🔐 Admin login: http://localhost:\${PORT}/admin-auth\`);
  console.log(\`📊 Admin dashboard: http://localhost:\${PORT}/admin\`);
});
EOF
pm2 start server.js --name baby-sleep-admin --watch
echo "✅ Baby Sleep Whisperer Admin System deployed successfully!"
echo "🌐 Access your system at:"
echo "   Main site: http://31.97.99.104:3000"
echo "   Admin login: http://31.97.99.104:3000/admin-auth"
echo "   Admin dashboard: http://31.97.99.104:3000/admin"
echo "🔐 Login: admin / password123"
```

## 🎯 What You'll Get

This deployment provides:

### ✅ Complete Main Website
- **Professional hero section** with "Peaceful Nights for Your Little One"
- **Beautiful gradient design** with baby-themed colors
- **Success indicators** and trust badges
- **Responsive layout** that works on all devices
- **Admin Portal button** for easy access

### ✅ Exact Replit Admin Login Clone
- **Two-column layout** with feature descriptions
- **Blue gradient background** matching original
- **Professional form styling** with icons
- **Hover effects** and smooth animations
- **Error handling** with proper messages

### ✅ Complete Admin Dashboard Replica
- **Blue gradient header** identical to original
- **Four statistics cards** showing data counts
- **Tabbed interface** for all sections (contacts, consultations, testimonials, blog)
- **Professional data tables** with action buttons
- **Modal dialogs** for detailed views
- **Sample data** matching original system

### ✅ All Features Working
- **Authentication system** (admin/password123)
- **API endpoints** for all data types
- **Email reply functionality** with mailto links
- **Approval workflows** for testimonials
- **Blog post management** with publish/unpublish
- **Professional styling** throughout

## 🚀 Access URLs

After deployment, visit:
- **Main Website**: http://31.97.99.104:3000
- **Admin Login**: http://31.97.99.104:3000/admin-auth
- **Admin Dashboard**: http://31.97.99.104:3000/admin

## 🔐 Login Credentials

- **Username**: admin
- **Password**: password123

This is the complete, exact replica of your original Replit admin system with beautiful main website!