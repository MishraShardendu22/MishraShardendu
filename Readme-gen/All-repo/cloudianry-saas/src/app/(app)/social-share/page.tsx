"use client";

import React, { useState, useEffect, useRef } from "react";
import { CldImage } from "next-cloudinary";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socialFormats = {
    "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
    "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
    "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
    "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
    "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
    "Instagram Story (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },
    "Facebook Post (1.91:1)": { width: 1200, height: 630, aspectRatio: "1.91:1" },
    "YouTube Thumbnail (16:9)": { width: 1280, height: 720, aspectRatio: "16:9" },
    "LinkedIn Post (1.91:1)": { width: 1200, height: 1200, aspectRatio: "1:1" },
    "Pinterest Pin (2:3)": { width: 1000, height: 1500, aspectRatio: "2:3" },
    "TikTok Video (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },
    "Snapchat Story (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },
    "Reddit Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
    "YouTube Banner (16:9)": { width: 2560, height: 1440, aspectRatio: "16:9" },
    "Tumblr Post (500:750)": { width: 500, height: 750, aspectRatio: "2:3" },
};

type SocialFormat = keyof typeof socialFormats;

export default function SocialShare() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
    const [isUploading, setIsUploading] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (uploadedImage) {
            setIsTransforming(true);
        }
    }, [selectedFormat, uploadedImage]);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/image-upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to upload image");

            const data = await response.json();
            setUploadedImage(data.publicId);
            toast.success("Image uploaded successfully!");

        } catch (error) {
            console.log(error);
            toast.error("Failed to upload image");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDownload = () => {
        if (!imageRef.current) return;

        fetch(imageRef.current.src)
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
                toast.success("Download started!");
            });
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl bg-gradient-to-r from-indigo-900 to-purple-800 rounded-lg shadow-lg">
            <ToastContainer />
            <h1 className="text-5xl font-extrabold mb-8 text-center text-white shadow-lg">
                Social Media Image Creator
            </h1>

            <div className="bg-gray-900 text-white rounded-lg p-6 shadow-md">
                <h2 className="text-3xl font-bold mb-4">Upload an Image</h2>
                <div className="form-control mb-4">
                    <label className="label text-lg">
                        <span className="label-text">Choose an image file</span>
                    </label>
                    <input
                        type="file"
                        onChange={handleFileUpload}
                        className="file-input file-input-bordered file-input-violet w-full"
                    />
                </div>

                {isUploading && (
                    <div className="mt-4">
                        <progress className="progress progress-purple w-full"></progress>
                    </div>
                )}

                {uploadedImage && (
                    <div className="mt-6">
                        <h2 className="text-3xl font-bold mb-4">Select Social Media Format</h2>
                        <div className="form-control mb-4">
                            <select
                                className="select select-bordered select-purple w-full"
                                value={selectedFormat}
                                onChange={(e) => setSelectedFormat(e.target.value as SocialFormat)}
                            >
                                {Object.keys(socialFormats).map((format) => (
                                    <option key={format} value={format}>
                                        {format}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="relative mb-6">
                            <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                            <div className="flex justify-center">
                                {isTransforming && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-10">
                                        <span className="loading loading-spinner loading-lg"></span>
                                    </div>
                                )}
                                <CldImage
                                    width={socialFormats[selectedFormat].width}
                                    height={socialFormats[selectedFormat].height}
                                    src={uploadedImage}
                                    sizes="100vw"
                                    alt="transformed image"
                                    crop="fill"
                                    aspectRatio={socialFormats[selectedFormat].aspectRatio}
                                    gravity="auto"
                                    ref={imageRef}
                                    onLoad={() => setIsTransforming(false)}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button className="btn btn-purple" onClick={handleDownload}>
                                Download for {selectedFormat}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
