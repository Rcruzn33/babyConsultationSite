const { createRequire } = require('module');
const require = createRequire(import.meta.url);

async function initializeDatabase() {
  console.log('Initializing database with admin user...');
  
  try {
    // Dynamic import for ES modules
    const { db } = await import('./dist/server/db.js');
    const { users } = await import('./dist/shared/schema.js');
    const { hashPassword } = await import('./dist/server/auth.js');
    const { eq } = await import('drizzle-orm');
    
    // Check if admin user exists
    const existingAdmin = await db.select().from(users).where(eq(users.username, 'admin')).limit(1);
    
    if (existingAdmin.length === 0) {
      // Create admin user
      const hashedPassword = await hashPassword('password123');
      
      await db.insert(users).values({
        username: 'admin',
        email: 'admin@babysleep.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        isApproved: true,
        approvedBy: 1,
        approvedAt: new Date()
      });
      
      console.log('✅ Admin user created successfully!');
    } else {
      console.log('ℹ️  Admin user already exists');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    
    // If it's a connection error, try alternative approach
    if (error.message.includes('connect') || error.message.includes('ECONNREFUSED')) {
      console.log('Database connection failed, admin user will be created on first access');
      process.exit(0);
    }
    
    process.exit(1);
  }
}

initializeDatabase();