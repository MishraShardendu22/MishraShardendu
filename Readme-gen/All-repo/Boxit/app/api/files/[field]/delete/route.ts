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

export async function DELETE(request: NextRequest, props: { params: Promise<{ fileId: string }> }){
    try{
        const { userId } = await auth();
        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { fileId } = await props.params;
        if (!fileId) {
            return NextResponse.json(
                { error: "File ID is required" },
                { status: 400 }
            );
        }

        const [ file ] = await db.select().from(files).where(
            and(
                eq(files.id, fileId),
                eq(files.userId, userId)
            )
        )

        if(!file){
            return new NextResponse("File not found", { status: 404 });
        }

        if(!file.isFolder){
            try{
                let imagekitFileId = null;
                if(file.fileUrl){
                    const urlWithoutQuery = file.fileUrl.split("?")[0];
                    imagekitFileId = urlWithoutQuery.split("/").pop();
                }
                
                if (!imagekitFileId && file.path) {
                    imagekitFileId = file.path.split("/").pop();
                }

                if(imagekitFileId){
                    try{
                        const searchResults = await imagekit.listFiles({
                            name: imagekitFileId,
                            limit: 1,
                        });

                        if(searchResults){
                            await imagekit.deleteFile(imagekitFileId);
                        }

                    }catch(error){
                        console.error("Error retrieving file from ImageKit:", error);
                        return new NextResponse("Internal Server Error", { status: 500 });
                    }
                }

                const [ deleteFile ] = await db.delete(files).where(
                    and(
                        eq(files.id, fileId),
                        eq(files.userId, userId)
                    )
                ).returning();

                return NextResponse.json(deleteFile, { status: 200 });
            }catch(error){
                console.error("Error deleting file from ImageKit:", error);
                return new NextResponse("Internal Server Error", { status: 500 });
            }
        }
    }catch(error){
        console.error("Error in DELETE request:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}