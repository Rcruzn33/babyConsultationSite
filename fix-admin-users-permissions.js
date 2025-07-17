const { db } = require('./server/db');
const { users } = require('./shared/schema');
const { eq } = require('drizzle-orm');

async function fixAdminUserPermissions() {
  try {
    console.log('Fixing admin user permissions...');
    
    // Update admin user to have canManageUsers = true
    await db.update(users)
      .set({ canManageUsers: true })
      .where(eq(users.username, 'admin'));
    
    console.log('Admin user permissions updated successfully');
    
    // Get all users to verify
    const allUsers = await db.select().from(users);
    console.log('All users:', allUsers.map(u => ({
      id: u.id,
      username: u.username,
      canManageUsers: u.canManageUsers,
      canManageContacts: u.canManageContacts,
      canManageBlog: u.canManageBlog,
      canManageTestimonials: u.canManageTestimonials,
      canManageConsultations: u.canManageConsultations
    })));
    
    process.exit(0);
  } catch (error) {
    console.error('Error fixing admin permissions:', error);
    process.exit(1);
  }
}

fixAdminUserPermissions();