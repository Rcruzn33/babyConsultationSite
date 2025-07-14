const { db } = require('./dist/server/db.js');
const { users } = require('./dist/shared/schema.js');
const { hashPassword } = require('./dist/server/auth.js');
const { eq } = require('drizzle-orm');

async function initializeDatabase() {
  console.log('Initializing database with admin user...');
  
  try {
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
    process.exit(1);
  }
}

initializeDatabase();
