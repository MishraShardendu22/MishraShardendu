import {connect} from "@/dbConfig/dbConfig"
import User from "@/app/models/userModel"
import { NextRequest,NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { sendMail } from "@/helpers/mailer"


connect();

export async function POST(request : NextRequest){
    try{
        const reqBody = await request.json()
        const {username ,email, password} = reqBody;

        // validate the request

        const user = await User.findOne({email});
        if(user){
            console.log("User already exists");
            return NextResponse.json({message : "User already exists"},{status : 400});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            username,
            email,
            password : hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);
        // console.log("Hi CheckPoint");

        // send verification email
        // here we have an error when trying from front end
        await sendMail(
            {
                email : savedUser.email, 
                emailType : "VERIFY", 
                userId : savedUser._id
            }
        );
        console.log("Hi CheckPoint 2");


        return NextResponse.json(
            {
                message : "User created successfully",
                success : true,
                savedUser
            }
        );

    }catch(err){
        return NextResponse.json({message : (err as Error).message},{status : 500});
    }
}