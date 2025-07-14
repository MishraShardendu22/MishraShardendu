import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, props: { params: Promise<{ fileId: string }> }){
    try{
        const { userId } = await auth();
        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { fileId } = await props.params;

        if(!fileId){
            return NextResponse.json(
                { error: "File ID is required" },
                { status: 400 }
            );
        }
        const [ starredFile ] = await db.select().from(files).where(
            and(
                eq(files.id, fileId),
                eq(files.userId, userId)
            )
        )

        if(!starredFile){
            return new NextResponse("File not found", { status: 404 });
        }
        const updatedFile = await db.update(files)
            .set({ isStarred: !starredFile.isTrash })
            .where(
                and(
                    eq(files.id, fileId),
                    eq(files.userId, userId)
                )
            )
            .returning();
            
        if(updatedFile.length === 0){
            return new NextResponse("File not found or update failed", { status: 404 });
        }
        return NextResponse.json(updatedFile[0]);
    }catch(error){
        console.error("Error in PATCH request:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}