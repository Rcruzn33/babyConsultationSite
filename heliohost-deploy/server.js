/**
 * HelioHost Server Entry Point
 * Baby Sleep Consulting Website
 */

const express = require('express');
const path = require('path');
const session = require('express-session');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Serve static assets
app.use('/attached_assets', express.static(path.join(__dirname, 'attached_assets')));

// Basic routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API routes would go here
// (You'll need to convert the TypeScript API routes to JavaScript)

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Baby Sleep Consulting Website running on port ${PORT}`);
});

module.exports = app;
