/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import User from '@/app/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';



export const sendMail = async ({email, emailType, userId} : any) => {
    try{
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{ 
                $set : {
                    verifyToken : hashedToken,
                    verifyTokenExpiry : Date.now() + 3600000
                }
            });
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{
                $set : {
                    forgotPasswordToken : hashedToken,
                    forgotPasswordTokenExpiry : Date.now() + 3600000
                }
            });
        }


        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "59258b25892502",
              pass: "8bda672815a247"
            }
        });
        console.log(transport);

        const mailOption = {
            from : "shardendumishra02@gmail.com",
            //if the email is not a valid email the line below will cause an error 
            to : email,
            subject : emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html:   `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                    or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                    </p>`
        }

        const mailResponse = await transport.sendMail(mailOption);
        return mailResponse;
    }catch(err : any){
        console.log("SomeThing Went wrong !!");
        console.log(err)
        throw new Error(err.message);;
    }
}