import { auth } from "@clerk/nextjs/server";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string,
});

export async function GET(){
    try{
        const { userId } = await auth();
        if(!userId){
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            );
        }

        const authenticationParameters = imagekit.getAuthenticationParameters();
        return NextResponse.json(authenticationParameters);
    }catch(error){
        console.error("Error in ImageKit auth route:", error);
        return NextResponse.json(
            { error: "Failed to authenticate with ImageKit" },
            { status: 500 }
        )
    }
}