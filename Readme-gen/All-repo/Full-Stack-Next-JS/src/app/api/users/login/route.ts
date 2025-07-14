import {connect} from "@/dbConfig/dbConfig"
import User from "@/app/models/userModel"
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect();

export async function POST(request : NextRequest){
    try{
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log("CheckPoint 2 Login")

        console.log(reqBody.email);
        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error : "User not found"},{status : 404});
        }
        console.log("CheckPoint 3 Login")
        console.log(user.email);

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return NextResponse.json({error : "Invalid Credentials"},{status : 401});
        }

        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        }
        
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" });
        const response = NextResponse.json({
            message : "Login Successful",
            success : true,
        });

        response.cookies.set("token", token, 
            {
                httpOnly : true,
                // user cant edit 
            }
        );

        return response;

    }catch(error){
        return NextResponse.json({message : (error as Error).message},{status : 500});
    }
}
