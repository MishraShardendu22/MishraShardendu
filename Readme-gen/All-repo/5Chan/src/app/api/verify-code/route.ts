import dbConnect from "@/database/database.connect";
import UserModel from "@/model/user.model";
import { sendResponse } from "@/util/Response";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
    await dbConnect();

    try{
        const { username,code } = await req.json();
        console.log("0")
        console.log(code)

        const user = await UserModel.findOne({
            username
        })
        console.log("1")

        if(!user){
            return sendResponse(404, "User not found");
        }
        console.log("2")

        if (new Date(user.verifyCodeExpiry) < new Date() || user.verifyCode !== code) {
            return sendResponse(403, "Invalid code");
        }
        console.log("3")

        user.isVerified = true;
        await user.save();
        console.log("4")

        return sendResponse(200, "User verified");
    }catch(error){
        console.error(error);
        return sendResponse(500, "Internal server error");
    }
}