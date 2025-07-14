import { db } from './dist/server/db-production.js';
import { users } from './dist/shared/schema.js';
import { eq } from 'drizzle-orm';

async function initDB() {
  try {
    console.log('🔄 Initializing database...');
    
    // Check if admin exists
    const [existing] = await db.select().from(users).where(eq(users.username, 'admin')).limit(1);
    
    if (!existing) {
      // Create admin user with the same hash as your Replit version
      await db.insert(users).values({
        username: 'admin',
        email: 'admin@babysleep.com',
        password: '2d7e3474f48f35c765ff57ec4afd6fa3c8f77362e97051f0b1d95694760cc000ee10d3031384fe9a83b21df6e70e0811f0f1f450515e2aef701032ec3fcf87d3.b87302cfeb9918193bef00c80b05345f',
        firstName: 'Admin',
        lastName: 'User',
        isApproved: true,
        approvedBy: 1,
        approvedAt: new Date()
      });
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️ Admin user already exists');
    }
    
    console.log('✅ Database initialization complete');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    process.exit(1);
  }
}

initDB();