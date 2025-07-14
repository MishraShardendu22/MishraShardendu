import cron from 'node-cron';
import nodemailer from 'nodemailer';
import { Donor } from '../model/model';

cron.schedule("0 11 1 * *", async () => {
  try {
    const donors = await Donor.find({}, "email name");

    if (donors.length === 0) {
      console.log("No donors found.");
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS
      }
    });

    for (const donor of donors) {
      const mailOptions = {
        from: process.env.MAIL_ID,
        to: donor.email,
        subject: '🩸 Your Blood Can Save Lives 🩸',
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Donate Blood, Save Lives</title>
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: white;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
              }
              .email-header {
                background: linear-gradient(135deg, #d9534f 0%, #c9302c 100%);
                color: white;
                text-align: center;
                padding: 20px;
              }
              .email-header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: bold;
              }
              .email-body {
                padding: 30px;
                background-color: white;
              }
              .email-body p {
                margin-bottom: 20px;
              }
              .cta-button {
                display: block;
                width: 250px;
                margin: 25px auto;
                padding: 12px 20px;
                background-color: #5cb85c;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                text-align: center;
                font-weight: bold;
                transition: background-color 0.3s ease;
              }
              .cta-button:hover {
                background-color: #4cae4c;
              }
              .impact-stats {
                display: flex;
                justify-content: space-around;
                background-color: #f9f9f9;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
              }
              .impact-stat {
                text-align: center;
                flex: 1;
              }
              .impact-stat strong {
                display: block;
                font-size: 24px;
                color: #d9534f;
              }
              .email-footer {
                background-color: #f1f1f1;
                color: #777;
                text-align: center;
                padding: 15px;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="email-header">
                <h1>🩸 Your Blood Can Save Lives 🩸</h1>
              </div>
              <div class="email-body">
                <p>Dear <strong>${donor.name}</strong>,</p>
                
                <p>Every drop of blood you donate has the power to make a profound difference. Your generosity can help save up to three lives with a single donation.</p>
                
                <div class="impact-stats">
                  <div class="impact-stat">
                    <strong>3</strong>
                    Lives Saved
                  </div>
                  <div class="impact-stat">
                    <strong>1</strong>
                    Hour of Your Time
                  </div>
                  <div class="impact-stat">
                    <strong>∞</strong>
                    Hope Shared
                  </div>
                </div>
                <p>Blood donation is a simple yet powerful act of kindness. Your contribution can help patients in emergency situations, support medical treatments, and bring hope to those in need.</p>
                
                <p>Thank you for being a hero and making a difference in someone's life! 🙏</p>
              </div>
              <div class="email-footer">
                This is an automated email. Please do not reply.
                <br>
                © 2025 Our Blood Bank. All rights reserved.
              </div>
            </div>
          </body>
          </html>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email sent to: ${donor.email}`);
    }
  } catch (error) {
    console.error("Error sending emails:", error);
  }
});
