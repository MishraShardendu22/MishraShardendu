/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

interface CloudinaryUploadResult {
    public_id: string;
    [key: string]: any;
}

export async function POST(req: NextRequest) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json(
            { message: "This route requires authentication" },
            { status: 401 }
        );
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (file && file instanceof File) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "next-cloudinary-image" },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result as CloudinaryUploadResult);
                        }
                    }
                );
                uploadStream.end(buffer);
            });

            return NextResponse.json(
                {
                    publicId: result.public_id
                },
                {
                    status: 200
                }
            );
        } else {
            return NextResponse.json(
                { error: "File not provided or invalid" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.log("Upload image failed", error);
        return NextResponse.json({ error: "Upload image failed" }, { status: 500 });
    }
}
