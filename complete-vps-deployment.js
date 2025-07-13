const express = require('express');
const path = require('path');
const app = express();

// Serve static files from attached_assets
app.use('/attached_assets', express.static('/var/www/attached_assets'));

// Serve React build files
app.use(express.static(path.join(__dirname, 'dist', 'public')));

// API routes
app.use(express.json());

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Baby Sleep Consulting app running on port ${PORT}`);
  console.log(`Visit: http://31.97.99.104:${PORT}`);
});