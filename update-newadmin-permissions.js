const { Pool } = require('pg');

async function updateNewadminPermissions() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
  });

  try {
    console.log('Updating newadmin permissions...');
    
    // Set newadmin to have limited permissions (no user management)
    await pool.query(`
      UPDATE users 
      SET can_manage_users = false,
          can_manage_contacts = true,
          can_manage_consultations = true,
          can_manage_blog = true,
          can_manage_testimonials = true
      WHERE username = 'newadmin'
    `);
    
    console.log('✓ newadmin permissions updated - removed user management access');
    
    // Verify the changes
    const result = await pool.query(`
      SELECT username, can_manage_users, can_manage_contacts, 
             can_manage_consultations, can_manage_blog, can_manage_testimonials
      FROM users 
      WHERE username IN ('admin', 'newadmin')
      ORDER BY username
    `);
    
    console.log('\nCurrent user permissions:');
    result.rows.forEach(user => {
      console.log(`${user.username}:`);
      console.log(`  - Users: ${user.can_manage_users ? 'YES' : 'NO'}`);
      console.log(`  - Contacts: ${user.can_manage_contacts ? 'YES' : 'NO'}`);
      console.log(`  - Consultations: ${user.can_manage_consultations ? 'YES' : 'NO'}`);
      console.log(`  - Blog: ${user.can_manage_blog ? 'YES' : 'NO'}`);
      console.log(`  - Testimonials: ${user.can_manage_testimonials ? 'YES' : 'NO'}`);
    });
    
  } catch (error) {
    console.error('Error updating permissions:', error);
  } finally {
    await pool.end();
  }
}

updateNewadminPermissions();