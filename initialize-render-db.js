import { db } from './server/db.js';
import { users } from './shared/schema.js';
import { hashPassword } from './server/auth.js';
import { eq } from 'drizzle-orm';

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
      console.log('Username: admin');
      console.log('Password: password123');
    } else {
      console.log('ℹ️  Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    
    // If tables don't exist, create them
    if (error.message.includes('relation') && error.message.includes('does not exist')) {
      console.log('Creating database tables...');
      try {
        // Import drizzle-kit to push schema
        const { execSync } = require('child_process');
        execSync('npx drizzle-kit push --force', { stdio: 'inherit' });
        
        // Try again to create admin user
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
        
        console.log('✅ Database tables created and admin user added!');
      } catch (setupError) {
        console.error('❌ Error setting up database:', setupError);
      }
    }
  }
}

initializeDatabase().catch(console.error);