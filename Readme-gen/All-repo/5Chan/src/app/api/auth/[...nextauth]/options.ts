import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/database/database.connect";
import { NextAuthOptions, User } from "next-auth";
import UserModel from "@/model/user.model";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
                identifier: { label: "Username or Email", type: "text", placeholder: "ShardenduMishra22" },  // Changed 'email' to 'identifier'
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await dbConnect();
                try {
                    // Check if credentials.identifier is email or username
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials?.identifier },   // Explicitly check for email
                            { username: credentials?.identifier }  // Explicitly check for username
                        ]
                    });
                    if (!user) {
                        throw new Error("User not found");
                    }
                    if (!user.isVerified) {
                        throw new Error("User not verified");
                    }
                    const isValid = await bcrypt.compare(credentials?.password || "", user.password);
                    if (!isValid) {
                        throw new Error("Invalid password");
                    }
                    return user as unknown as User;
                } catch (e) {
                    console.error(e);
                    throw new Error("Something went wrong");
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id;
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username;
            }
            // console.log("token-",token);
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.username = token.username;
            }
            // console.log("session",session);
            return session;
        },
    },
    pages: {
        signIn: "/sign-in", 
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.SECRET,
};
