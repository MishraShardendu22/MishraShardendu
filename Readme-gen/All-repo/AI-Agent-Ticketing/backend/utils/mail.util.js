import { createTransport } from "nodemailer";
export const SendEmail = async ({ subject, body, to_email }, p0, p1) => {
    try {
      console.log("Checkpoint - 1");
      const transporter = createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.MAIL_PASS,
            },
        });
        console.log("Checkpoint - 2");
        const emailBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>
            ${subject}
          </title>
        </head>
        <body>
          ${body}
        </body>
      </html>
    `;
        const mailOptions = {
            from: process.env.MAIL_ID,
            to: to_email,
            subject: "Mail from AI-Ticketing Platform",
            html: emailBody,
        };
        console.log("Checkpoint - 3");
        const info = await transporter.sendMail(mailOptions);
        console.log("Checkpoint - 4");
        console.log("Email sent: " + info.response);
    }
    catch (error) {
        console.error("Error while sending email: ", error);
    }
};
