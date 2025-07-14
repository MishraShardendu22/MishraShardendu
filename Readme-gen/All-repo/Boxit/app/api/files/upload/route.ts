import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string,
});


export async function POST(request: NextRequest){
    try{
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get("file") as File;
        const parentId = formData.get("parentId") as string | null;
        const formUserId = formData.get("userId") as string;

        if( !file || !(file instanceof File) || file.size === 0){
            return NextResponse.json({ error: "Invalid file" }, { status: 400 });
        }
        if (!formUserId || formUserId !== userId) {
            return NextResponse.json({ error: "User ID mismatch" }, { status: 403 });
        }

        
        if(parentId){
            const [ parentFolder ] = await db.select().from(files).where(
                and(
                    eq(files.id,parentId),
                    eq(files.userId, userId),
                    eq(files.isFolder, true)
                )
            )

            if(!parentFolder){
                return NextResponse.json({ error: "Parent folder not found or unauthorized" }, { status: 404 });
            }
            
            if (!(file.type.startsWith("image/") || file.type === "application/pdf")) {
                return NextResponse.json({ error: "Only images and PDFs are allowed" }, { status: 400 });
            }
        }

    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    const originalFileName = file.name;
    const fileExtension = originalFileName.split('.').pop()?.toLowerCase() || '';
    const uniqueFilename = `{uuidv4()}.${fileExtension}`;

    const folderPath = parentId ? `/boxit/${userId}/folders/${parentId}` : `/boxit/${userId}`;

    const uploadResponse = await imagekit.upload({
        file: fileBuffer,
        fileName: uniqueFilename,
        folder: folderPath,
        useUniqueFileName: false,
    });

        const fileData = {
            name: originalFileName,
            path: uploadResponse.filePath,
            size: file.size,
            type: file.type,
            fileUrl: uploadResponse.url,
            thumbnailUrl: uploadResponse.thumbnailUrl || null,
            userId: userId,
            parentId: parentId,
            isFolder: false,
            isStarred: false,
            isTrash: false,
        };

        const [newFile] = await db.insert(files).values(fileData).returning();

        return NextResponse.json(
            { message: "File uploaded successfully", file: newFile },
            { status: 201 }
        );
    }catch(error){
        console.error("Error in authentication:", error);
        return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
    }
}