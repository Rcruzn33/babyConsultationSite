import { MailService } from '@sendgrid/mail';

let mailService: MailService | null = null;

// Initialize SendGrid only if API key is available
if (process.env.SENDGRID_API_KEY) {
  mailService = new MailService();
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  if (!mailService) {
    console.log('SendGrid not configured, email would be sent to:', params.to);
    console.log('Subject:', params.subject);
    return false;
  }

  try {
    await mailService.send({
      to: params.to,
      from: params.from || 'admin@happybabysleeping.com',
      subject: params.subject,
      html: params.html,
    });
    console.log(`Email sent successfully to ${params.to}`);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export function sendUserApprovedEmail(email: string, username: string): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #4F46E5; margin: 0;">Happy Baby Sleeping</h1>
        <p style="color: #6B7280; margin: 5px 0;">Admin Dashboard Access</p>
      </div>
      
      <div style="background: #F8FAFC; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #1F2937; margin-top: 0;">Welcome to the Admin Team!</h2>
        <p style="color: #374151; line-height: 1.6;">
          Congratulations! Your admin account has been approved and you now have access to the Happy Baby Sleeping admin dashboard.
        </p>
        
        <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #10B981;">
          <h3 style="color: #065F46; margin-top: 0;">Your Login Credentials:</h3>
          <p style="margin: 8px 0;"><strong>Username:</strong> ${username}</p>
          <p style="margin: 8px 0;"><strong>Admin Panel:</strong> <a href="https://happybabysleeping.com/admin" style="color: #4F46E5;">happybabysleeping.com/admin</a></p>
        </div>
        
        <p style="color: #374151; line-height: 1.6;">
          You can now log in to manage various aspects of the baby sleep consulting platform. Your specific permissions will determine which sections you can access.
        </p>
        
        <p style="color: #374151; line-height: 1.6;">
          If you have any questions or need assistance, please don't hesitate to reach out to the main administrator.
        </p>
      </div>
      
      <div style="text-align: center; color: #6B7280; font-size: 14px;">
        <p>This is an automated message from Happy Baby Sleeping Admin System.</p>
        <p>© ${new Date().getFullYear()} Happy Baby Sleeping. All rights reserved.</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'Admin Account Approved - Happy Baby Sleeping',
    html,
  });
}

export function sendContactNotificationEmail(adminEmail: string, contactName: string, contactEmail: string, subject: string): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #4F46E5; margin: 0;">Happy Baby Sleeping</h1>
        <p style="color: #6B7280; margin: 5px 0;">New Contact Form Submission</p>
      </div>
      
      <div style="background: #FEF3C7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #F59E0B;">
        <h2 style="color: #92400E; margin-top: 0;">New Contact Submission</h2>
        <p style="color: #92400E;"><strong>From:</strong> ${contactName} (${contactEmail})</p>
        <p style="color: #92400E;"><strong>Subject:</strong> ${subject}</p>
      </div>
      
      <p style="color: #374151; line-height: 1.6;">
        A new contact form has been submitted on your website. Please log in to the admin dashboard to view the full message and respond.
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://happybabysleeping.com/admin" 
           style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          View in Admin Dashboard
        </a>
      </div>
    </div>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `New Contact: ${subject}`,
    html,
  });
}