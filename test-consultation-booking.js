const fetch = require('node-fetch');

async function testConsultationBooking() {
  const testData = {
    parentName: 'Test Parent',
    email: 'test@example.com',
    phone: '555-1234',
    childAge: '8 months',
    sleepChallenges: 'Baby wakes up frequently during the night',
    consultationType: 'Free Consultation',
    preferredDate: '2025-08-01'
  };

  try {
    console.log('Testing consultation booking...');
    console.log('Data being sent:', testData);
    
    const response = await fetch('http://localhost:5000/api/consultations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✓ Consultation booking successful!');
      console.log('Response:', result);
    } else {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.log('✗ Consultation booking failed');
      console.log('Error:', error);
    }
    
  } catch (error) {
    console.error('Request failed:', error);
  }
}

testConsultationBooking();