import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactData {
 name: string;
 email: string;
 subject: string;
 message: string;
}

export async function POST(request: Request) {
 try {
  console.log('CP - 1');
  const body = await request.json();
  const { name, email, subject, message } = body as ContactData;

  console.log('CP - 2');

  // Ensure environment variables are set
  if (!process.env.MAIL_ID || !process.env.MAIL_PASS) {
   console.error(
    'Error: MAIL_ID or MAIL_PASS is not defined in environment variables.'
   );
   return NextResponse.json(
    { error: 'Server email configuration error.' },
    { status: 500 }
   );
  }

  // Create the transporter using Gmail service
  const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
   },
  });

  console.log('CP - 3');

  // Construct HTML email
  const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333;">New Contact Message</h2>
            <p style="font-size: 16px;"><strong>Name:</strong> ${name}</p>
            <p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
            <p style="font-size: 16px;"><strong>Subject:</strong> ${subject}</p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
            <p style="font-size: 16px; line-height: 1.5;"><strong>Message:</strong></p>
            <p style="font-size: 16px; line-height: 1.5;">${message}</p>
          </div>
        </body>
      </html>
    `;

  console.log('CP - 4');

  const mailOptions = {
   from: process.env.MAIL_ID,
   to: process.env.MAIL_ID, // Change to another email to avoid Gmail blocks
   subject: `New Contact Message: ${subject}`,
   html: htmlContent,
  };

  console.log('CP - 5');
  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info.response);

  console.log('CP - 6');
  return NextResponse.json(
   { message: 'Email sent successfully!' },
   { status: 200 }
  );
 } catch (error) {
  console.error('Error sending email:', error);
  return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
 }
}
