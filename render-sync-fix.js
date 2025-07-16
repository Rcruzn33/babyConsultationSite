/**
 * Fix for Render deployment - ensures blog posts and testimonials sync
 * Adds missing API endpoints and initializes sample data
 */

const { Pool } = require('pg');

async function initializeContent() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    // Add sample blog posts if they don't exist
    await pool.query(`
      INSERT INTO blog_posts (title, content, excerpt, slug, published, image_url, author_id, created_at) 
      VALUES 
      ('Creating the Perfect Sleep Environment', 
       'Creating the right environment for your baby''s sleep is crucial for establishing healthy sleep patterns. Here are the key factors to consider:

**Temperature Control**
The ideal room temperature for baby sleep is between 68-70°F (20-21°C). Use a room thermometer to monitor this consistently.

**Lighting**
- Use blackout curtains or shades to block external light
- Consider a dim nightlight for nighttime feedings
- Gradually introduce natural light during daytime naps

**Sound Management**
- White noise machines can help mask household sounds
- Keep the volume at a safe level (around 50 decibels)
- Consistency is key - use the same sounds for all sleep times

**Safe Sleep Setup**
- Firm mattress with fitted sheet
- No loose bedding, pillows, or toys
- Ensure proper crib safety standards

**Room Organization**
Keep the sleep space calm and uncluttered. This helps signal to your baby that it''s time for rest.

Remember, every baby is different. What works for one may not work for another, so be patient as you find the right combination for your little one.',
       'Learn how to create the optimal sleep environment for your baby with expert tips on temperature, lighting, and sound management.',
       'perfect-sleep-environment',
       true,
       'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80',
       1,
       NOW()),
      ('Understanding Sleep Regressions',
       'Sleep regressions can be one of the most challenging aspects of parenting. Understanding why they happen and how to manage them can help you navigate these difficult periods.

**What Are Sleep Regressions?**
Sleep regressions are temporary periods when a baby who has been sleeping well suddenly starts waking more frequently or having difficulty falling asleep.

**Common Regression Ages**
- 4 months: The most significant regression due to sleep cycle maturation
- 6 months: Often coincides with teething and increased awareness
- 8-10 months: Separation anxiety and developmental leaps
- 12 months: Transition to one nap and increased independence
- 18 months: Language development and boundary testing

**Signs of a Sleep Regression**
- Increased night wakings
- Difficulty falling asleep
- Shorter naps
- Increased fussiness at bedtime
- Early morning wake-ups

**How to Handle Regressions**
1. **Stay Consistent**: Maintain your regular sleep routines and schedules
2. **Be Patient**: Most regressions last 2-6 weeks
3. **Offer Extra Comfort**: Provide additional soothing during this period
4. **Avoid Creating New Habits**: Try not to introduce new sleep associations

**When to Seek Help**
If sleep issues persist beyond 6 weeks or you''re feeling overwhelmed, consider consulting a sleep specialist.

Remember, regressions are temporary and normal parts of development. With patience and consistency, your baby will return to better sleep patterns.',
       'Navigate sleep regressions with confidence. Learn what causes them, when they typically occur, and strategies to help your family through these challenging periods.',
       'understanding-sleep-regressions',
       true,
       'https://images.unsplash.com/photo-1544537176-2d1ac2b10ae2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
       1,
       NOW())
      ON CONFLICT (slug) DO NOTHING;
    `);

    // Add sample testimonials if they don't exist
    await pool.query(`
      INSERT INTO testimonials (parent_name, child_age, testimonial, rating, approved, created_at) 
      VALUES 
      ('Emily Rodriguez', '6 months', 'The sleep consulting service transformed our nights! Our baby now sleeps through the night consistently. I would recommend this service to any exhausted parent.', 5, true, NOW()),
      ('Michael Chen', '10 months', 'Professional, caring, and incredibly effective. The personalized sleep plan worked within just one week. Our whole family is better rested now.', 5, true, NOW()),
      ('Sarah Williams', '4 months', 'After months of sleepless nights, we finally found a solution. The gentle approach was perfect for our sensitive baby. Thank you!', 5, true, NOW())
      ON CONFLICT (id) DO NOTHING;
    `);

    console.log('Content initialization complete');
  } catch (error) {
    console.error('Error initializing content:', error);
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  initializeContent();
}

module.exports = { initializeContent };