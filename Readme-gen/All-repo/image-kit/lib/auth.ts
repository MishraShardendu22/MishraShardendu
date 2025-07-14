import { ConnectToDatabase } from "@/DataBase/database.connect";
import User from "@/Models/User.model";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOption : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials:{
                email : {
                    label: "Email",
                    type: "text",
                    placeholder: "Give Your Email"
                },
                password : {
                    label: "Password",
                    type: "password",
                    placeholder: "Give Your Password"
                }
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Missing credentials");
                }
                try{
                    await ConnectToDatabase();
                    const user = await User.findOne(
                        {
                            email: credentials.email,
                        }
                    )
                    if(!user){
                        throw new Error("Invalid credentials");
                    }
                    
                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    if(!isValid){
                        throw new Error("Invalid credentials");
                    }
                    return {
                        id: user._id.toString(),
                        email: user.email, 
                        role: user.role
                    };
                }catch(err){
                    if (err instanceof Error) {
                        throw new Error(err.message);
                    } else {
                        throw new Error("An unknown error occurred");
                    }
                }
            },
        })
    ],
    callbacks: {
        async session({session,token}){
            session.user.id = token.id as string;
            session.user.role = token.role as string;
            return session;
        },
        async jwt({token, user}){
            token.id = user.id
            token.role = user.role
            return token;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
}