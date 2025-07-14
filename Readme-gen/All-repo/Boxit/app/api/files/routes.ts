import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try{
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" }, 
                { status: 401 });
        }

        const searchParams = request.nextUrl.searchParams;
        const queryUserId = searchParams.get("userId");
        const parentId = searchParams.get("parentId");

        if (!queryUserId || queryUserId !== userId) {
            return NextResponse.json(
                { error: "Invalid user ID" }, 
                { status: 403 });
        }

        if (parentId && typeof parentId !== 'string') {
            return NextResponse.json(
                { error: "Invalid parent ID" }, 
                { status: 400 });
        }

        let userFiles;
        if(parentId){
            userFiles = await db.select().from(files).where(
                and(
                    eq(files.userId, userId),
                    eq(files.parentId, parentId)
                )
            )
        }else{
            userFiles = await db.select().from(files).where(
                and(
                    eq(files.userId, userId),
                    isNull(files.parentId)
                )
            );
        }

        return NextResponse.json(
            userFiles,
            { status: 200 }
        );
    }catch(error){
        console.error("Error in files route:", error);
        return NextResponse.json(
            { error: "Failed to process files request" },
            { status: 500 }
        )
    }
}