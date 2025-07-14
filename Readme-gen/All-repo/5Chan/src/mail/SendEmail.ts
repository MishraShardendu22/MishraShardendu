import { createTransport } from "nodemailer";
import { EmailTemplate } from "./EmailFormat";  // Import the EmailTemplate component

export const SendEmail = async ({ to_email, to_name, otp }: { to_email: string; to_name: string; otp: number }) => {
  try {
    console.log("Checkpoint - 1");

    // Nodemailer transporter setup
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
      },
    });

    console.log("Checkpoint - 2");

    // Directly use EmailTemplate as part of the HTML string, no need for react-dom/server
    const emailBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>OTP Verification</title>
        </head>
        <body>
          ${EmailTemplate({ to_name, otp })}
        </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.MAIL_ID,
      to: to_email,
      subject: `Verification Code for ${to_name}`,
      html: emailBody,
    };

    console.log("Checkpoint - 3");

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error while sending email: ", error);
  }
};
