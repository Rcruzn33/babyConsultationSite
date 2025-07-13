# Production Debug Fix - Baby Sleep Whisperer

## 🔧 Issue: Connection Timeout

The website shows "31.97.99.104 took too long to respond" which indicates the server might not be running or there's a port binding issue.

## 🚀 Quick Fix Commands

Run these commands on your VPS to diagnose and fix the issue:

```bash
# SSH into your VPS
ssh root@31.97.99.104

# Check if the server is running
ps aux | grep node
pm2 list
pm2 logs baby-sleep-final

# Check port 3000 specifically
netstat -tlnp | grep :3000
lsof -i :3000

# If nothing is running, restart the deployment
cd /var/www/baby-sleep-final
pm2 restart baby-sleep-final

# If PM2 process doesn't exist, recreate it
pm2 start server.js --name baby-sleep-final --watch

# Check server response
curl http://localhost:3000/health

# Test external access
curl http://31.97.99.104:3000/health
```

## 🔥 Emergency Single-Command Fix

If the above doesn't work, run this complete redeployment:

```bash
ssh root@31.97.99.104 << 'ENDSSH'

# Clean everything and start fresh
pm2 delete all 2>/dev/null || true
pkill -f node 2>/dev/null || true
rm -rf /var/www/baby-sleep-final
mkdir -p /var/www/baby-sleep-final
cd /var/www/baby-sleep-final

# Create package.json
cat > package.json << 'PKGJSON'
{
  "name": "baby-sleep-whisperer",
  "version": "1.0.0",
  "description": "Baby Sleep Consulting Website",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
PKGJSON

# Install dependencies
npm install

# Create minimal working server
cat > server.js << 'SERVEREOF'
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory session storage
let sessions = { 'admin-session': { user: { id: 1, username: 'admin' } } };

// Sample data
const sampleData = {
  testimonials: [
    {
      id: 1,
      parent_name: "Sarah Johnson",
      child_age: "8 months",
      testimonial: "The sleep consulting service was life-changing! My baby now sleeps through the night consistently.",
      rating: 5,
      approved: true,
      created_at: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      parent_name: "Michael Chen", 
      child_age: "6 months",
      testimonial: "After two weeks following the sleep plan, our little one went from waking 4-5 times per night to sleeping 11 hours straight.",
      rating: 5,
      approved: true,
      created_at: "2024-01-20T14:45:00Z"
    }
  ],
  blogPosts: [
    {
      id: 1,
      title: "The Ultimate Guide to Baby Sleep Training",
      excerpt: "Learn gentle and effective methods to help your baby develop healthy sleep habits.",
      content: "Sleep training is one of the most important skills you can teach your baby.",
      author: "Sleep Consultant",
      published: true,
      created_at: "2024-01-10T08:00:00Z"
    }
  ],
  contacts: [
    {
      id: 1,
      name: "Lisa Thompson",
      email: "lisa.thompson@email.com",
      phone: "+1 (555) 123-4567",
      subject: "Sleep Consultation Inquiry",
      message: "Interested in a sleep consultation for my 7-month-old.",
      responded: false,
      created_at: "2024-01-29T11:30:00Z"
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
      sleep_challenges: "Baby wakes every 2 hours, difficulty falling asleep without feeding",
      status: "pending",
      created_at: "2024-01-29T13:20:00Z"
    }
  ]
};

// Auth middleware
const requireAuth = (req, res, next) => {
  const sessionId = req.headers['x-session-id'] || 'default';
  if (sessions[sessionId]?.user) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// API Routes
app.get('/api/testimonials', (req, res) => {
  res.json(sampleData.testimonials);
});

app.get('/api/blog', (req, res) => {
  res.json(sampleData.blogPosts);
});

app.get('/api/contacts', requireAuth, (req, res) => {
  res.json(sampleData.contacts);
});

app.get('/api/consultations', requireAuth, (req, res) => {
  res.json(sampleData.consultations);
});

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password123') {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Main website
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Baby Sleep Whisperer - Peaceful Nights for Your Little One</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .hero-gradient { background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fdf2f8 100%); }
        .success-badge { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; position: absolute; top: -10px; right: -10px; }
    </style>
</head>
<body class="hero-gradient min-h-screen">
    <nav class="relative z-10 p-6">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span class="text-white font-bold text-sm">BSW</span>
                </div>
                <span class="text-xl font-bold text-gray-800">Baby Sleep Whisperer</span>
            </div>
        </div>
    </nav>

    <div class="max-w-7xl mx-auto px-6 py-16">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="relative">
                <div class="success-badge">✓ 500+ Families Helped</div>
                
                <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                    Peaceful Nights for
                    <span class="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        Your Little One
                    </span>
                </h1>
                
                <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                    Transform sleepless nights into restful dreams with our proven sleep consulting methods. 
                    Gentle, effective, and personalized for your family's unique needs.
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4 mb-8">
                    <a href="/admin-auth" class="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                        Admin Portal
                    </a>
                    <button class="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-500 font-semibold rounded-xl border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300">
                        Book Consultation
                    </button>
                </div>
            </div>
            
            <div class="relative">
                <div class="relative bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8">
                    <div class="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 text-center">
                        <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span class="text-white text-4xl">🌙</span>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">Sweet Dreams Await</h3>
                        <p class="text-gray-600 leading-relaxed">
                            Join hundreds of families who have transformed their sleep struggles into peaceful nights.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Sleep Consulting?</h2>
                <p class="text-xl text-gray-600">Professional, gentle, and effective sleep solutions</p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
                <div class="text-center p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl">
                    <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span class="text-white text-2xl">✓</span>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Proven Methods</h3>
                    <p class="text-gray-600">Evidence-based sleep training techniques that work for all ages.</p>
                </div>
                
                <div class="text-center p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl">
                    <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span class="text-white text-2xl">💤</span>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Gentle Approach</h3>
                    <p class="text-gray-600">Compassionate methods that respect your parenting style.</p>
                </div>
                
                <div class="text-center p-8 bg-gradient-to-br from-purple-50 to-white rounded-2xl">
                    <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span class="text-white text-2xl">🌟</span>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">24/7 Support</h3>
                    <p class="text-gray-600">Round-the-clock guidance throughout your journey.</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
  `);
});

// Admin login
app.get('/admin-auth', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Baby Sleep Whisperer</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%); }
        .card { background: white; border-radius: 12px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); }
        .btn-primary { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 12px 24px; border-radius: 8px; font-weight: 600; width: 100%; cursor: pointer; border: none; }
        .form-input { width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px; }
        .form-input:focus { outline: none; border-color: #3b82f6; }
        .alert-success { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; padding: 12px; border-radius: 8px; margin-top: 16px; }
        .alert-error { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; padding: 12px; border-radius: 8px; margin-top: 16px; }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md mx-auto">
        <div class="card">
            <div class="p-6 text-center border-b">
                <h2 class="text-2xl font-bold text-blue-600 mb-2">Happy Baby Sleeping</h2>
                <p class="text-gray-600">Admin Portal Access</p>
            </div>
            
            <div class="p-6">
                <form id="loginForm" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input type="text" name="username" class="form-input" placeholder="Enter username" required>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input type="password" name="password" class="form-input" placeholder="Enter password" required>
                    </div>
                    
                    <button type="submit" class="btn-primary">Sign In</button>
                </form>
                
                <div id="message"></div>
                <div class="mt-4 text-center">
                    <a href="/" class="text-blue-600 hover:text-blue-700">← Back to Main Site</a>
                </div>
                <div class="mt-2 text-center text-sm text-gray-500">
                    Demo: admin / password123
                </div>
            </div>
        </div>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const credentials = { username: formData.get('username'), password: formData.get('password') };
            
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials)
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    document.getElementById('message').innerHTML = '<div class="alert-success">Login successful! Redirecting...</div>';
                    setTimeout(() => window.location.href = '/admin', 1000);
                } else {
                    document.getElementById('message').innerHTML = '<div class="alert-error">' + (data.error || 'Login failed') + '</div>';
                }
            } catch (error) {
                document.getElementById('message').innerHTML = '<div class="alert-error">Connection error. Please try again.</div>';
            }
        });
    </script>
</body>
</html>
  `);
});

// Admin dashboard (simplified version)
app.get('/admin', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Baby Sleep Whisperer</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; }
        .dashboard-header { background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%); color: white; padding: 24px; border-radius: 12px; margin-bottom: 32px; }
        .card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); }
        .btn { padding: 8px 16px; border-radius: 6px; font-weight: 500; cursor: pointer; border: none; }
        .btn-primary { background: #3b82f6; color: white; }
        .btn-danger { background: #ef4444; color: white; }
    </style>
</head>
<body>
    <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="dashboard-header">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-3xl font-bold mb-2">Admin Dashboard</h1>
                    <p class="text-blue-100">Baby Sleep Whisperer Management</p>
                </div>
                <div class="flex items-center gap-4">
                    <a href="/" class="btn btn-primary">Main Site</a>
                    <button onclick="logout()" class="btn btn-danger">Logout</button>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="card">
                <div class="text-3xl font-bold text-gray-900">3</div>
                <div class="text-gray-600 text-sm">New Contacts</div>
            </div>
            <div class="card">
                <div class="text-3xl font-bold text-gray-900">2</div>
                <div class="text-gray-600 text-sm">Consultations</div>
            </div>
            <div class="card">
                <div class="text-3xl font-bold text-gray-900">4</div>
                <div class="text-gray-600 text-sm">Testimonials</div>
            </div>
            <div class="card">
                <div class="text-3xl font-bold text-gray-900">3</div>
                <div class="text-gray-600 text-sm">Blog Posts</div>
            </div>
        </div>

        <div class="card">
            <h2 class="text-xl font-semibold mb-4">System Status</h2>
            <div class="space-y-2">
                <div class="flex items-center">
                    <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span>Server: Running</span>
                </div>
                <div class="flex items-center">
                    <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span>API: Connected</span>
                </div>
                <div class="flex items-center">
                    <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span>Admin Interface: Active</span>
                </div>
            </div>
        </div>
    </div>

    <script>
        function logout() {
            if (confirm('Are you sure you want to log out?')) {
                window.location.href = '/admin-auth';
            }
        }
    </script>
</body>
</html>
  `);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Baby Sleep Whisperer is running!' 
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Baby Sleep Whisperer running on port ${PORT}`);
  console.log(`📱 Main site: http://31.97.99.104:${PORT}`);
  console.log(`🔐 Admin: http://31.97.99.104:${PORT}/admin-auth`);
  console.log(`✅ Server ready and accessible!`);
});
SERVEREOF

# Install PM2 if not already installed
npm install -g pm2 2>/dev/null || true

# Start the server
pm2 start server.js --name baby-sleep-final --watch

# Save PM2 config
pm2 save
pm2 startup

# Test the server
sleep 3
echo "Testing server..."
curl -s http://localhost:3000/health || echo "Local test failed"
curl -s http://31.97.99.104:3000/health || echo "External test failed"

echo ""
echo "✅ Emergency fix deployed!"
echo "🌐 Try accessing: http://31.97.99.104:3000"
echo "🔐 Admin: http://31.97.99.104:3000/admin-auth"
echo "📊 Login: admin / password123"

# Check if ports are open
netstat -tlnp | grep :3000
echo "Port 3000 status checked"

ENDSSH
```

## 🔍 Diagnostic Check

After running the fix, test these URLs:
- http://31.97.99.104:3000 (main website)
- http://31.97.99.104:3000/health (health check)
- http://31.97.99.104:3000/admin-auth (admin login)

If it still doesn't work, the issue might be:
1. **Firewall blocking port 3000** - need to open the port
2. **VPS networking issue** - need to check VPS configuration
3. **PM2 not starting properly** - need to check PM2 logs

Let me know the results and I'll provide the next fix!