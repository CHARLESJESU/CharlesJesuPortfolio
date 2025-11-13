import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create and configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSKEY,
  },
});

// HTML email template
const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
    </div>
  </div>
`;

// Helper function to send an email via Nodemailer
async function sendEmail(payload, message) {
  const { name, email, message: userMessage } = payload;

  const mailOptions = {
    from: `Portfolio <${process.env.EMAIL_ADDRESS}>`,
    to: 'charlesjmng@gmail.com', // deliver all contact form messages here
    subject: `New Message From ${name}`,
    text: message,
    html: generateEmailTemplate(name, email, userMessage),
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    // Log full error for debugging
    console.error('Error while sending email:', error);
    // Return the error object so callers can surface the message in dev
    return { ok: false, error };
  }
}

export async function POST(request) {
  try {
    // Quick env check to help debugging SMTP issues
    if (!process.env.EMAIL_ADDRESS || !process.env.GMAIL_PASSKEY) {
      console.error('Missing SMTP env vars:', {
        EMAIL_ADDRESS: Boolean(process.env.EMAIL_ADDRESS),
        GMAIL_PASSKEY: Boolean(process.env.GMAIL_PASSKEY),
      });
      return NextResponse.json({ success: false, message: 'SMTP credentials not configured on server.', error: 'Missing EMAIL_ADDRESS or GMAIL_PASSKEY' }, { status: 500 });
    }

    const payload = await request.json();
    const { name, email, message: userMessage } = payload;
    // Basic validation
    if (!name || !email || !userMessage) {
      return NextResponse.json({ success: false, message: 'Name, email and message are required.' }, { status: 400 });
    }

    const message = `New message from ${name}\n\nEmail: ${email}\n\nMessage:\n\n${userMessage}\n\n`;

    // Send email only to the configured recipient
    const result = await sendEmail(payload, message);

    if (result === true) {
      return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 });
    }

    // If result is an object, include the SMTP error message in the response when available
    const smtpMessage = result && result.error ? result.error.message || String(result.error) : 'Unknown SMTP error';
    console.error('SMTP send failed:', smtpMessage);
    return NextResponse.json({ success: false, message: 'Failed to send email.', error: smtpMessage }, { status: 500 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error occurred.',
      error: error.message || String(error),
    }, { status: 500 });
  }
};

// Optional GET handler for quick health checks while testing locally
export async function GET() {
  return NextResponse.json({ ok: true, message: 'Contact API is up' });
}