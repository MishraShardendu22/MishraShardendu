import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { eq, and } from "drizzle-orm";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

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
        const { name, userId: bodyUserId, parentId = null } = body;

        if(!name || !bodyUserId){
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        if(bodyUserId !== userId){
            return NextResponse.json(
                { error: "User ID mismatch" },
                { status: 403 }
            )
        }

        if(typeof name !== 'string' || name.trim() === ''){
            return NextResponse.json(
                { error: "Invalid folder name" },
                { status: 400 }
            )
        }

        if(parentId){
            const [ parentFolder ] = await db.select().from(files).where(
                and(
                    eq(files.id, parentId),
                    eq(files.userId, userId),
                    eq(files.isFolder, true)
                )
            )

            if(!parentFolder){
                return NextResponse.json(
                    { error: "Parent folder not found or not a folder" },
                    { status: 404 }
                )
            }
        }

        const folderData = {
            id: uuidv4(),
            name: name.trim(),
            path: `/folders/${userId}/${uuidv4()}`,
            size: 0,
            type: "folder",
            fileUrl: "",
            thumbnailUrl: null,
            userId: userId,
            parentId: parentId,
            isFolder: true,
            isTrash: false,
            isStarred: false,
        }

        const [ newFolder ] = await db.insert(files).values(folderData).returning();
        return NextResponse.json(
            newFolder,
            { status: 201 }
        );
    }catch(error){
        console.log("Error in create folder route:", error);
        return NextResponse.json(
            { error: "Failed to create folder" },
            { status: 500 }
        )
    }
}