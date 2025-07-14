import VideoComponent from './VideoComponent';
import { IVideo } from '@/Model/video.model';
import { Moon } from 'lucide-react';

export default function VideoFeed({ videos }: { videos: IVideo[] }) {
  return (
    <div className="relative w-full">
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
          {videos.map((video, index) => (
            <div 
              key={video._id?.toString()} 
              className="transform transition-all duration-300 hover:scale-[1.02] hover:z-10"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <VideoComponent video={video} />
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-[400px] flex items-center justify-center px-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-1">
            <div className="relative flex flex-col items-center gap-4 rounded-xl bg-gray-950/90 px-8 py-12 backdrop-blur-xl">
              <Moon className="h-12 w-12 text-purple-400/80" />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">No Videos Found</h3>
                <p className="text-gray-400 max-w-sm">
                  There are no videos to display at the moment. Check back later or be the first to share something amazing!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}