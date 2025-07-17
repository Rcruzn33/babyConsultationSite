const { Pool } = require('pg');

// Fix consultation booking by testing the form submission
async function testConsultationBooking() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
  });

  try {
    // First, check if the table exists and get its structure
    const result = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'consultations'
      ORDER BY ordinal_position;
    `);
    
    console.log('Consultations table structure:');
    result.rows.forEach(row => {
      console.log(`  ${row.column_name}: ${row.data_type}`);
    });
    
    // Test data that matches our form
    const testData = {
      parentName: 'Test Parent',
      email: 'test@example.com',
      phone: '555-1234',
      childAge: '6 months',
      sleepChallenges: 'Baby wakes up every 2 hours',
      consultationType: 'Free Consultation',
      preferredDate: new Date().toISOString()
    };
    
    console.log('\nTesting consultation insertion with data:', testData);
    
    // Try to insert the test data
    const insertResult = await pool.query(
      'INSERT INTO consultations (parent_name, email, phone, child_age, sleep_challenges, consultation_type, preferred_date, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING *',
      [testData.parentName, testData.email, testData.phone, testData.childAge, testData.sleepChallenges, testData.consultationType, testData.preferredDate, 'pending']
    );
    
    console.log('\nSuccessfully inserted consultation:', insertResult.rows[0]);
    
    // Clean up test data
    await pool.query('DELETE FROM consultations WHERE email = $1', [testData.email]);
    console.log('\nTest data cleaned up');
    
  } catch (error) {
    console.error('Error testing consultation booking:', error);
    console.error('Error details:', error.message);
  } finally {
    await pool.end();
  }
}

testConsultationBooking();