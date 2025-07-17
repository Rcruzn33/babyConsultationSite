const { Pool } = require('pg');

async function testAllFixes() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
  });

  console.log('=== Testing All Fixes ===\n');

  try {
    // Test 1: Check newadmin login status
    console.log('1. Testing newadmin login status...');
    const adminResult = await pool.query('SELECT id, username, email, approved FROM users WHERE username = $1', ['newadmin']);
    if (adminResult.rows.length > 0) {
      console.log('✓ newadmin user found:', adminResult.rows[0]);
    } else {
      console.log('✗ newadmin user not found');
    }

    // Test 2: Test consultation booking with correct field mapping
    console.log('\n2. Testing consultation booking...');
    const testConsultation = {
      parentName: 'Test Parent',
      email: 'test@example.com',
      phone: '555-1234',
      childAge: '6 months',
      sleepChallenges: 'Baby wakes up every 2 hours',
      consultationType: 'Free Consultation',
      preferredDate: new Date().toISOString()
    };
    
    const consultationResult = await pool.query(
      'INSERT INTO consultations (name, parent_name, email, phone, child_age, sleep_challenges, consultation_type, preferred_date, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) RETURNING *',
      [testConsultation.parentName, testConsultation.parentName, testConsultation.email, testConsultation.phone, testConsultation.childAge, testConsultation.sleepChallenges, testConsultation.consultationType, testConsultation.preferredDate, 'pending']
    );
    
    console.log('✓ Consultation booking test successful:', consultationResult.rows[0]);
    
    // Clean up test data
    await pool.query('DELETE FROM consultations WHERE email = $1', [testConsultation.email]);
    console.log('✓ Test data cleaned up');

    // Test 3: Check all users
    console.log('\n3. All users in database:');
    const allUsers = await pool.query('SELECT id, username, email, approved FROM users ORDER BY id');
    allUsers.rows.forEach(user => {
      console.log(`  ${user.id}: ${user.username} (${user.email}) - ${user.approved ? 'APPROVED' : 'PENDING'}`);
    });

    // Test 4: Check contacts table
    console.log('\n4. Contact submissions:');
    const contacts = await pool.query('SELECT id, name, email, responded FROM contacts ORDER BY created_at DESC LIMIT 5');
    if (contacts.rows.length > 0) {
      console.log('✓ Recent contacts found:', contacts.rows.length);
      contacts.rows.forEach(contact => {
        console.log(`  ${contact.id}: ${contact.name} (${contact.email}) - ${contact.responded ? 'RESPONDED' : 'NEW'}`);
      });
    } else {
      console.log('  No contacts found');
    }

    console.log('\n=== All Tests Complete ===');
    
  } catch (error) {
    console.error('Error during testing:', error);
  } finally {
    await pool.end();
  }
}

testAllFixes();