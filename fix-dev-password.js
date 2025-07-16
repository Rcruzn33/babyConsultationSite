/**
 * Fix development password to use scrypt format properly
 */
const { scrypt, randomBytes } = require('crypto');
const { promisify } = require('util');
const { storage } = require('./server/storage');

const scryptAsync = promisify(scrypt);

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64));
  return `${buf.toString("hex")}.${salt}`;
}

async function fixDevPassword() {
  try {
    console.log('🔧 Fixing development password...');
    
    // Hash password123 with scrypt
    const newHash = await hashPassword('password123');
    console.log('Generated new scrypt hash:', newHash);
    
    // Update user record
    await storage.updateUser(1, { passwordHash: newHash });
    console.log('✅ Development password updated successfully!');
    
  } catch (error) {
    console.error('❌ Error fixing development password:', error);
  }
}

fixDevPassword();