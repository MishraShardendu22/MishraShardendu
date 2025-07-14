import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try{
        const { userId } = await auth();
        if(!userId){
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            )
        }

        const body = await request.json();
        const { imagekit, userId: requestUserId } = body;

        if(!imagekit || !requestUserId){
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        if(requestUserId !== userId){
            return NextResponse.json(
                { error: "User ID mismatch" },
                { status: 403 }
            )
        }

        const fileData = {
            name: imagekit.name || "untitled",
            path: imagekit.path || `/boxit/${userId}/${imagekit.name}`,
            size: imagekit.size,
            type: imagekit.type,
            fileUrl: imagekit.fileUrl,
            thumbnailUrl: imagekit.thumbnailUrl,
            userId: userId,
            parentId: null,
            isTrash: false,
            isFolder: false,
            isStarred: false,
        };

        const [ newfile ] = await db.insert(files).values(fileData).returning();
        return NextResponse.json(
            newfile,
        )
    }catch(error){
        console.error("Error in upload route:", error);
        return NextResponse.json(
            { error: "Failed to process upload request" },
            { status: 500 }
        )
    }
}