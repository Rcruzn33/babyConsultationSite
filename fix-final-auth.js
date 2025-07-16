/**
 * Fix authentication for both development and production environments
 */

const crypto = require('crypto');
const { promisify } = require('util');

// Development password hashing (scrypt with hash.salt format)
async function hashPasswordDev(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const scryptAsync = promisify(crypto.scrypt);
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString('hex')}.${salt}`;
}

// Production password hashing (pbkdf2 with salt:hash format)
function hashPasswordProd(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

async function main() {
  console.log('🔧 Creating correct password formats...');
  
  const password = 'password123';
  const devHash = await hashPasswordDev(password);
  const prodHash = hashPasswordProd(password);
  
  console.log('Development hash (hash.salt):', devHash);
  console.log('Production hash (salt:hash):', prodHash);
  
  // Test the development format
  console.log('\n🧪 Testing development format...');
  const [devHashPart, devSalt] = devHash.split('.');
  const scryptAsync = promisify(crypto.scrypt);
  const testBuf = await scryptAsync(password, devSalt, 64);
  const testHash = testBuf.toString('hex');
  console.log('Development test result:', testHash === devHashPart ? '✅ PASS' : '❌ FAIL');
  
  // Test the production format
  console.log('\n🧪 Testing production format...');
  const [prodSalt, prodHashPart] = prodHash.split(':');
  const testProdHash = crypto.pbkdf2Sync(password, prodSalt, 1000, 64, 'sha512').toString('hex');
  console.log('Production test result:', testProdHash === prodHashPart ? '✅ PASS' : '❌ FAIL');
}

main().catch(console.error);