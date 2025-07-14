"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function VideoUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const router = useRouter();
    const MAX_FILE_SIZE = 1024 * 1024 * 50; // 50 MB limit

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            toast.error("File size too large");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("originalSize", file.size.toString());

        try {
            const response = await axios.post("/api/video-upload", formData);
            if (response.status === 200) {
                toast.success("Video uploaded successfully!");
                router.push("/home");
            } else {
                toast.error("Video upload failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred during upload. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="container mx-auto p-8 bg-gradient-to-r from-purple-700 to-indigo-600 rounded-lg shadow-lg max-w-2xl">
            <h1 className="text-3xl font-extrabold text-white mb-6 text-center">Upload Video</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="label text-white">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder="Enter video title"
                        required
                    />
                </div>
                <div>
                    <label className="label text-white">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="textarea textarea-bordered w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder="Enter video description"
                    />
                </div>
                <div>
                    <label className="label text-white">
                        <span className="label-text">Video File</span>
                    </label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="file-input file-input-bordered w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow"
                    disabled={isUploading}
                >
                    {isUploading ? "Uploading..." : "Upload Video"}
                </button>
            </form>
        </div>
    );
}

export default VideoUpload;
