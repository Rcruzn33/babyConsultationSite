interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (data: ContactFormData): Promise<void> => {
  // EmailJS configuration
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || process.env.VITE_EMAILJS_SERVICE_ID || "your_service_id";
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || process.env.VITE_EMAILJS_TEMPLATE_ID || "your_template_id";
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || process.env.VITE_EMAILJS_PUBLIC_KEY || "your_public_key";

  // For now, we'll simulate the email sending
  // In production, you would integrate with EmailJS like this:
  /*
  const emailjs = await import('emailjs-com');
  
  const templateParams = {
    from_name: data.name,
    from_email: data.email,
    subject: data.subject,
    message: data.message,
    to_name: 'Sarah',
    to_email: 'sarah@babysleepwhisperer.com',
  };

  await emailjs.send(serviceId, templateId, templateParams, publicKey);
  */

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // For demo purposes, we'll just log the form data
  console.log('Contact form submitted:', data);
  
  // In a real implementation, this would send the email via EmailJS
  // Throw an error occasionally to simulate API failures
  if (Math.random() < 0.1) {
    throw new Error('Failed to send email');
  }
};
