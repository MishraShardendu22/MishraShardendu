import User from '../schema/user.schema.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

const otpStore = new Map();

const reset = async (req, res) => {
    try{
        const { email } = req.body;

        const otp1 = Math.floor(100000 + Math.random() * 900000);
        console.log("checkpoint - 2");

        otpStore.set(email, otp1);
        console.log("OTP saved for email:", email);

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

        console.log(otp1)
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

    }catch(error){
        console.log(error);
        console.log("Error in sending OTP");
        return res.status(500).send({
            success: false,
            message: "Error in sending OTP"
        });
    }
}

const resetPassword = async (req, res) => {
    console.log("checkpoint - 0");
    try {
        console.log("checkpoint - 1");
        const { email, otp, password } = req.body;
        
        console.log("checkpoint - 2");
        console.log(otpStore.get(email));
        console.log(otp);

        if (otpStore.get(email) == otp) {
            // Create a new variable to store the hashed password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Update the user password in the database
            const user = await User.findOneAndUpdate({ email }, { password: hashedPassword });
            return res.status(200).send({
                success: true,
                message: "Password reset successfully"
            });    
        }
        console.log("checkpoint - 3");
        return res.status(400).send({
            success: false,
            message: "Incorrect OTP"
        }); 
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).send({
            success: false,
            message: "Error in resetting password"
        });
    }
};

export { reset, resetPassword };