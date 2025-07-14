import { ConnectToDatabase } from "@/DataBase/database.connect";
import User from "@/Models/User.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try{
        const { email,password } = await request.json();

        if(!email || !password){
            return NextResponse.json(
                {
                    status : 400,
                    message : "Missing credentials"
                }
            )
        }

        await ConnectToDatabase();
        const user = await User.findOne(
            {
                email:email
            }
        )
        if(user){
            return NextResponse.json(
                {
                    status : 400,
                    message : "User already exists"
                }
            )
        }
        const newUser = new User(
            {
                email: email,
                password: password,
            }
        )
        await newUser.save();
        return NextResponse.json(
            {
                status : 200,
                message : "User created successfully",
                data : newUser
            }
        )
    }catch(error){
        console.log(error);
        return NextResponse.json(
            {
                status : 500,
                message : "Internal Server Error"
            }
        )
    }
}