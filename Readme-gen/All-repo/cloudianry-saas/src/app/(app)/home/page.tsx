"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import { Video } from "../../types/index";

function Home() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchVideos = useCallback(async () => {
        try {
            const response = await axios.get("/api/videos");
            if (Array.isArray(response.data)) {
                setVideos(response.data);
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to fetch videos");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchVideos();
    }, [fetchVideos]);

    const handleDownload = useCallback((url: string, title: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${title}.mp4`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-violet-600">
                <div className="text-indigo-200 text-3xl font-semibold animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="rounded-xl min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-violet-600 text-violet-100">
            <div className="container mx-auto p-6">
                <h1 className="text-5xl font-extrabold text-center mb-10 text-violet-100 shadow-lg">Videos</h1>
                {error && <div className="text-red-400 text-center text-lg mb-6 bg-red-900 bg-opacity-50 p-4 rounded-lg">{error}</div>}
                {videos.length === 0 ? (
                    <div className="text-center text-xl text-gray-300 bg-violet-800 bg-opacity-50 p-8 rounded-lg shadow-lg">
                        No videos available
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videos.map((video) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                                onDownload={handleDownload}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;