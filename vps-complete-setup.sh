#!/bin/bash

# Complete VPS Setup Script
# This creates all missing files for the baby sleep consulting website

cd /var/www/baby-sleep-app

echo "Creating missing React components..."

# Create client/src/main.tsx
cat > client/src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

# Create client/src/App.tsx
cat > client/src/App.tsx << 'EOF'
import React from 'react'
import { Router, Route, Switch } from 'wouter'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-baby-blue to-soft-pink">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/admin" component={Admin} />
          <Route>
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
                <p className="text-gray-600">The page you're looking for doesn't exist.</p>
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
EOF

# Create client/src/App.css
cat > client/src/App.css << 'EOF'
.hero-bg {
  background: linear-gradient(135deg, var(--baby-blue) 0%, var(--soft-pink) 100%);
}

.service-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
EOF

# Create pages directory and components
mkdir -p client/src/pages

# Create Home page
cat > client/src/pages/Home.tsx << 'EOF'
import React from 'react'
import { Link } from 'wouter'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600">Happy Baby Sleeping</h1>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-purple-600">Home</Link>
              <Link href="/services" className="text-gray-700 hover:text-purple-600">Services</Link>
              <Link href="/about" className="text-gray-700 hover:text-purple-600">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-purple-600">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Sweet Dreams Start Here
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Professional sleep consulting services to help your little one sleep better. 
            Expert guidance for peaceful nights and happier days.
          </p>
          <div className="space-x-4">
            <Link href="/services" className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              Our Services
            </Link>
            <Link href="/contact" className="bg-white text-purple-600 px-8 py-3 rounded-lg border-2 border-purple-600 hover:bg-purple-50 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
            <p className="text-lg text-gray-600">Professional, personalized, and proven sleep solutions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-baby-blue p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👶</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
              <p className="text-gray-600">Certified sleep consultants with years of experience</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-soft-pink p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🌙</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Plans</h3>
              <p className="text-gray-600">Customized sleep solutions for your family's needs</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-mint-green p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ongoing Support</h3>
              <p className="text-gray-600">Continuous support throughout your journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Happy Baby Sleeping. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
EOF

# Create other page components
cat > client/src/pages/Services.tsx << 'EOF'
import React from 'react'
import { Link } from 'wouter'

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h1>
          <p className="text-lg text-gray-600">Professional sleep consulting tailored to your needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">Free Consultation</h3>
            <p className="text-gray-600 mb-6">Initial assessment and personalized recommendations</p>
            <Link href="/contact" className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
              Book Now
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">Complete Sleep Package</h3>
            <p className="text-gray-600 mb-6">Comprehensive sleep training and ongoing support</p>
            <Link href="/contact" className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
              Learn More
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">Newborn Care</h3>
            <p className="text-gray-600 mb-6">Specialized care for newborns and infants</p>
            <Link href="/contact" className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
EOF

# Create other pages
cat > client/src/pages/About.tsx << 'EOF'
import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-lg text-gray-600">Professional sleep consulting with a personal touch</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to Happy Baby Sleeping, where we believe every family deserves peaceful nights and well-rested days. 
            Our certified sleep consultants bring years of experience and a gentle, personalized approach to help your 
            little one develop healthy sleep habits.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
EOF

cat > client/src/pages/Contact.tsx << 'EOF'
import React from 'react'

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">Ready to start your journey to better sleep?</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
            </div>
            <button type="submit" className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
EOF

cat > client/src/pages/Admin.tsx << 'EOF'
import React from 'react'

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
          <p className="text-lg text-gray-600">Manage your baby sleep consulting business</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-gray-700 text-lg">
            Admin functionality will be available once the backend is fully connected.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Admin
EOF

echo "All React components created successfully!"
echo "Now running build..."

# Install wouter for routing
npm install wouter

# Try build again
npm run build

echo "Setup complete! Starting application..."
pm2 delete baby-sleep-app 2>/dev/null || true
pm2 start npm --name baby-sleep-app -- start
pm2 save

echo "Baby sleep consulting website is now running at http://31.97.99.104"