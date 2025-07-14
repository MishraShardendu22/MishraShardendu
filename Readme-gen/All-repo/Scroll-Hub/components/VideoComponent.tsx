import React from 'react';
import { IKVideo } from 'imagekitio-next';
import { IVideo } from '@/Model/video.model';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2Icon, PlayCircle, ShieldAlertIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { apiClient } from '@/lib/apiClient';

export default function VideoComponent({ video }: { video: IVideo }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const { data: session } = useSession();
  const videoRef = React.useRef<HTMLDivElement>(null);
  // const [reportedVideo, setReportedVideo] = React.useState<string[] | null>(null);

  // React.useEffect(() => {
  //   const fetchReportedVideos = async () => {
  //     try {
  //       const response = await apiClient.getUsers();
  //       console.log(response);
  //       setReportedVideo((response as { data: string[] }).data);
  //     } catch (error) {
  //       console.error('Failed to get reported videos', error);
  //     }
  //   };
  //   fetchReportedVideos();
  // }, []);
  
  // const exist = video._id ? reportedVideo?.includes(video._id.toString()) : false;

  const handleDelete = async () => {
    try {
      if (video._id) {
        await apiClient.deleteVideo(video._id.toString());
        toast.success('Video deleted successfully');
      } else {
        toast.error('Video ID is missing');
      }
    } catch (error) {
      console.error('Failed to delete video', error);
      toast.error('Failed to delete video');
    }
  };

  const canDelete = session && video.userId?.toString() === session.user.id && video._id;

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleReport = async () => {
    try {
      if (video._id) {
        await apiClient.reportVideo(video._id.toString());
        toast.success('Video reported successfully');
      } else {
        toast.error('Video ID is missing');
      }
    } catch (error) {
      console.error('Failed to report video', error);
      toast.error('Failed to report video');
    }
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  return (
    <Card
      className="group relative overflow-hidden bg-gray-900 border-gray-800/50 rounded-xl transition-all duration-300 w-full max-w-xs mx-auto"
      ref={videoRef}
    >
      {/* {reportedVideo !== null && !exist && ( */}
        <button
          onClick={handleReport}
          className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-gray-800/80 transition-colors"
          aria-label="Report video"
        >
          <ShieldAlertIcon className="w-4 h-4 text-gray-300" />
        </button>
      {/* )} */}

      <div
        className="relative w-full"
        style={{ aspectRatio: '9/16', maxHeight: '360px' }}
      >
        <div className="relative w-full h-full rounded-t-lg overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
              <Skeleton className="w-full h-full bg-gray-800/50 animate-pulse" />
              <PlayCircle className="absolute w-12 h-12 text-purple-400/50 animate-pulse" />
            </div>
          )}

          <div className="video-player relative w-full h-full">
            <IKVideo
              path={video.videoUrl}
              transformation={[
                {
                  height: '640',
                  width: '360',
                },
              ]}
              controls={true}
              className="w-full h-full object-cover"
              onLoad={() => setIsLoading(false)}
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
            />
          </div>

          <div
            className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none ${
              isPlaying ? 'opacity-0' : ''
            }`}
          />
        </div>
      </div>

      <CardContent className="relative p-4 bg-gradient-to-b from-gray-900/0 to-gray-900/80">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 transform transition-transform duration-300 ">
            <h2 className="text-base font-semibold text-white line-clamp-1 transition-colors ">
              {video.title}
            </h2>
            <p className="mt-2 text-sm text-gray-400 line-clamp-2 transition-colors ">
              {video.description}
            </p>
          </div>

          {canDelete && (
            <button
              onClick={handleDelete}
              className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300"
              aria-label="Delete video"
            >
              <Trash2Icon className="w-4 h-4 transition-colors duration-300" />
            </button>
          )}
        </div>
      </CardContent>

      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/30 p-4 rounded-full">
            <PlayCircle className="w-16 h-16 text-purple-400/80" />
          </div>
        </div>
      )}
    </Card>
  );
}
