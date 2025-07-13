const { scrypt, randomBytes } = require('crypto');
const { promisify } = require('util');

const scryptAsync = promisify(scrypt);

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

async function testLogin() {
  try {
    // Test the login endpoint
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'password123'
      }),
      credentials: 'include'
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Login successful:', data);
      
      // Extract cookies from response
      const cookies = response.headers.get('set-cookie');
      console.log('Login cookies:', cookies);
      
      // Test the /api/auth/me endpoint immediately
      const meResponse = await fetch('http://localhost:5000/api/auth/me', {
        credentials: 'include',
        headers: {
          'Cookie': cookies || ''
        }
      });
      
      if (meResponse.ok) {
        const meData = await meResponse.json();
        console.log('Current user:', meData);
      } else {
        console.log('Cannot get current user:', await meResponse.text());
      }
    } else {
      console.log('Login failed:', await response.text());
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testLogin();