import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log({ token });

        const user = await User.findOneAndUpdate(
            {
                verifyToken: token,
                verifyTokenExpiry: { $gt: new Date() }
            },
            { 
                new: true 
            }
        );

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 500 });
        }

        console.log(user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        const saved = await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
            saved
        });
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}
