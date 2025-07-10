#!/usr/bin/env node

/**
 * A2 Hosting Shared Hosting Entry Point
 * Baby Sleep Consulting Website
 */

const path = require('path');
const { spawn } = require('child_process');

// Set NODE_ENV if not already set
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
}

// Set the correct path for the application
const appPath = path.join(__dirname, 'dist', 'index.js');

// Start the application
const app = spawn('node', [appPath], {
    stdio: 'inherit',
    env: process.env
});

app.on('error', (error) => {
    console.error('Failed to start application:', error);
    process.exit(1);
});

app.on('exit', (code) => {
    console.log(`Application exited with code ${code}`);
    process.exit(code);
});

// Handle process termination
process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down gracefully...');
    app.kill('SIGINT');
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully...');
    app.kill('SIGTERM');
});
