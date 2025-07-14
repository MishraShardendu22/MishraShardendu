/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { apiClient } from '@/lib/apiClient';
import CosmicLoader from '@/components/Loader';
import { IKVideo } from 'imagekitio-next';

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res: any = await apiClient.getVideos();
        console.log("Fetched Videos:", res.data);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setVideos([...res.data, ...res.data, ...res.data]); // Tripling videos for smooth looping
        } else {
          setError('No videos available.');
        }
      } catch (error) {
        console.error('Error fetching videos:', error); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        containerRef.current.scrollTo({ top: 0, behavior: 'instant' }); // Instantly jump to first video
      }
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-black text-white">
      
      {isLoading && (
        <div className="flex items-center justify-center min-h-screen">
          <CosmicLoader />
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 text-lg mt-10">{error}</div>
      )}

      {!isLoading && !error && videos.length > 0 && (
        <div
          ref={containerRef}
          className="h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videos.map((video, index) => (
            <div key={index} className="h-screen flex snap-center justify-center items-center">
              <div className="w-full h-full flex justify-center items-center p-4">
                <IKVideo
                  path={video.videoUrl}
                  transformation={[{ height: '720', width: '480' }]}
                  controls
                  autoPlay
                  loop
                  muted
                  className="w-3/4 h-3/4 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
