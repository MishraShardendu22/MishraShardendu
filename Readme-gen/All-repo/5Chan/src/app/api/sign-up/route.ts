/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/database/database.connect";
import UserModel from "@/model/user.model";
import { sendResponse } from "@/util/Response";
import { NextRequest } from "next/server";
import bcrypt from 'bcryptjs';
import { SendEmail } from "@/mail/SendEmail";

async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
}

function generateVerifyCode() {
    return Math.floor(100000 + Math.random() * 900000);
}

function calculateExpiry(hours : any) {
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + hours);
    return expiryDate;
}

export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const { username, email, password } = await req.json();

        const ExistingVerifiedUser = await UserModel.findOne({ username, isVerified: true });
        if (ExistingVerifiedUser) {
            return sendResponse(400, 'User already exists');
        }

        const ExistingUserEmail = await UserModel.findOne({ email });
        const verifyCode = generateVerifyCode();
        const expiryDate = calculateExpiry(1);

        if (ExistingUserEmail) {
            if (ExistingUserEmail.isVerified) {
                return sendResponse(400, 'Email already exists');
            } else {
                ExistingUserEmail.username = username;
                ExistingUserEmail.password = await hashPassword(password);
                ExistingUserEmail.verifyCode = verifyCode.toString();
                ExistingUserEmail.verifyCodeExpiry = calculateExpiry(12);
                await ExistingUserEmail.save();
            }
        } else {
            const newUser = new UserModel({
                username,
                email,
                password: await hashPassword(password),
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: [],
            });

            await newUser.save();
        }

        try {
            await SendEmail({ to_email: email, to_name: username, otp: verifyCode });
            console.log("Email successfully sent!");
            return sendResponse(200, 'Email sent successfully');
        } catch (error) {
            console.error("Error sending email:", error);
            return sendResponse(500, 'Internal Server Error');
        }
    } catch (error) {
        console.error("Error:", error instanceof Error ? error.message : String(error));
        return sendResponse(500, 'Internal Server Error');
    }
}