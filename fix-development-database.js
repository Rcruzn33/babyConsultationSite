const { Pool } = require('pg');

async function fixDevelopmentDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
  });

  try {
    console.log('Fixing development database schema...');
    
    // Add the missing name column to consultations table
    try {
      await pool.query('ALTER TABLE consultations ADD COLUMN name VARCHAR(255)');
      console.log('✓ Added name column to consultations table');
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('✓ Name column already exists');
      } else {
        throw error;
      }
    }
    
    // Update existing records to set name = parent_name
    await pool.query('UPDATE consultations SET name = parent_name WHERE name IS NULL');
    console.log('✓ Updated existing records to set name = parent_name');
    
    // Now make the name column NOT NULL
    await pool.query('ALTER TABLE consultations ALTER COLUMN name SET NOT NULL');
    console.log('✓ Made name column NOT NULL');
    
    // Verify the schema
    const result = await pool.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'consultations' AND column_name IN ('name', 'parent_name')
      ORDER BY column_name
    `);
    
    console.log('\nConsultations table schema:');
    result.rows.forEach(row => {
      console.log(`  ${row.column_name}: ${row.data_type} (nullable: ${row.is_nullable})`);
    });
    
  } catch (error) {
    console.error('Error fixing database:', error);
  } finally {
    await pool.end();
  }
}

fixDevelopmentDatabase();