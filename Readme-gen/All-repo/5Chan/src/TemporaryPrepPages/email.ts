import { createTransport } from "nodemailer";

console.log("checkpoint - 1");
const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS
    }
});

console.log("checkpoint - 2");
const mailOptions = {
    from: process.env.MAIL_ID,
    to: "shardendumishra01@gmail.com",
    subject: 'Sending OTP for verification',
    text: `Your OTP is TEST`
};

console.log("checkpoint - 3");
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});