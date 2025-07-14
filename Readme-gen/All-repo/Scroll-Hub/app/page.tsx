/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import VideoFeed from '@/components/VideoFeed';
import { apiClient } from '@/lib/apiClient';
import { Alert, AlertDescription } from '@/components/ui/alert';
import CosmicLoader from '@/components/Loader';
import Header from '@/components/Header';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const VIDEOS_PER_PAGE = 10;

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await apiClient.getVideos() as { data: any[] };
        setVideos(res.data);
        setTotalPages(Math.ceil(res.data.length / VIDEOS_PER_PAGE));
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const getCurrentVideos = () => {
    const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
    const endIndex = startIndex + VIDEOS_PER_PAGE;
    return videos.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const PaginationControls = () => (
    <div className="flex justify-center items-center gap-4 mt-12 mb-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-black/40 text-purple-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-900/30 transition-colors border border-purple-900/30"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`w-10 h-10 rounded-lg transition-colors border ${
              currentPage === pageNum
                ? 'bg-purple-900/60 text-purple-200 border-purple-700/50'
                : 'bg-black/40 text-purple-300 border-purple-900/30 hover:bg-purple-900/30'
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-black/40 text-purple-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-900/30 transition-colors border border-purple-900/30"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-black to-indigo-950">
        <main className="container mx-auto px-4 py-8">
          <section className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-purple-200 md:text-5xl lg:text-6xl">
              Discover Amazing Videos
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-purple-300">
              Explore a universe of creative content shared by our community
            </p>
          </section>

          <div className="mx-auto max-w-8xl">
            {isLoading && (
              <div className="flex min-h-[400px] items-center justify-center">
                <CosmicLoader />
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="mb-8 bg-red-900/20 border-red-700/50">
                <AlertDescription className="text-red-200">{error}</AlertDescription>
              </Alert>
            )}

            {!isLoading && !error && videos.length > 0 && (
              <>
                <VideoFeed videos={getCurrentVideos()} />
                {totalPages > 1 && <PaginationControls />}
              </>
            )}

            {!isLoading && !error && videos.length === 0 && (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-purple-900/30 bg-black/40 backdrop-blur-sm p-8 text-center">
                <div className="mb-4 rounded-full bg-purple-900/30 p-4">
                  <svg
                    className="h-8 w-8 text-purple-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-purple-200">No Videos Yet</h3>
                <p className="text-purple-300">
                  Be the first to share an amazing video with the community!
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}