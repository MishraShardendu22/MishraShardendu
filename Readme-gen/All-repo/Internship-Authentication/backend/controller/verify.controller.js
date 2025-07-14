import nodemailer from 'nodemailer';
import User from '../schema/user.schema.js';

const otpStore = new Map();

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("checkpoint - 1");

        const otp1 = Math.floor(100000 + Math.random() * 900000);
        console.log("checkpoint - 2");

        otpStore.set(email, otp1);
        console.log("OTP saved for email:", email);
        console.log("OTP saved for email:", otp1);


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.MAIL_PASS
            }
        });

        console.log("checkpoint - 3");
        const mailOptions = {
            from: process.env.MAIL_ID,
            to: email,
            subject: 'Sending OTP for verification',
            text: `Your OTP is ${otp1}`
        };

        console.log("checkpoint - 4");
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return res.status(200).send({
            success: true,
            message: "OTP sent successfully"
        });
    } catch (error) {
        console.log(error);
        console.log("Error in sending OTP");
        return res.status(500).send({
            success: false,
            message: "Error in sending OTP"
        });
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        console.log(otp);
        
        // Retrieve OTP from the store using the email
        const storedOtp = otpStore.get(email);
        console.log("Stored OTP for email:", storedOtp);

        console.log("checkpoint - 1");
        if (otp == storedOtp) {

            await User.findOneAndUpdate({ email: email }, { verified: true });
            otpStore.delete(email);

            return res.status(200).send({
                success: true,
                message: "OTP Verified"
            });
        }

        console.log("checkpoint - 2");
        return res.status(400).send({
            success: false,
            message: "OTP is incorrect"
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in verifying the OTP"
        });
        console.log(error);
        console.log("Error in verifying the OTP");
    }
}

export {
    sendOtp,
    verifyOtp,
}
