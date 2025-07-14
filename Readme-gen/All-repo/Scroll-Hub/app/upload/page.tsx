'use client';

import { Upload, Video, Sparkles, Shield, Lightbulb, } from 'lucide-react';
import VideoUploadForm from '@/components/VideoUploadForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-indigo-950 flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-center text-4xl font-extrabold text-purple-300 mb-8">
          Upload Your Cosmic Reel
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Upload Form Section */}
          <div className="lg:col-span-7">
            <Card className="bg-black/40 backdrop-blur-sm border-purple-900/50 h-full shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <Video className="h-8 w-8 text-purple-400" />
                  <CardTitle className="text-3xl font-bold text-purple-200">
                    Upload New Reel
                  </CardTitle>
                </div>
                <CardDescription className="text-purple-300">
                  Share your cosmic creation with the universe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black/60 rounded-lg p-6 border border-purple-800/30">
                  <div className="flex items-center justify-center mb-6">
                    <div className="rounded-full bg-purple-900/30 p-4">
                      <Upload className="h-8 w-8 text-purple-400" />
                    </div>
                  </div>
                  <VideoUploadForm />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card className="mb-5 bg-black/40 backdrop-blur-sm border-purple-900/50 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-2">
                <Shield className="h-5 w-5 text-purple-400" />
                <CardTitle className="text-lg text-purple-200">
                  Upload Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="text-purple-300">
                <ul className="list-disc list-inside space-y-2">
                  <li className="py-2">Maximum file size: 100MB</li>
                  <li className="py-2">Supported formats: MP4, MOV</li>
                  <li className="py-2">Maximum duration: 3 minutes</li>
                  <li className="py-2">Minimum duration: 1 minute</li>
                </ul>
              </CardContent>
            </Card>

            {/* Tips Section */}
            <Card className="mb-5 bg-black/40 backdrop-blur-sm border-purple-900/50 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-2">
                <Lightbulb className="h-5 w-5 text-purple-400" />
                <CardTitle className="text-lg text-purple-200">
                  Tips for Better Reels
                </CardTitle>
              </CardHeader>
              <CardContent className="text-purple-300">
                <ul className="list-disc list-inside space-y-2">
                  <li className="py-2">Use high-quality lighting</li>
                  <li className="py-2">Use proper tags</li>
                  <li className="py-2">Keep content engaging and concise</li>
                  <li className="py-2">Add relevant tags for better reach</li>
                </ul>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card className="bg-black/40 backdrop-blur-sm border-purple-900/50 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <CardTitle className="text-lg text-purple-200">
                  Community Standards
                </CardTitle>
              </CardHeader>
              <CardContent className="text-purple-300">
                <ul className="list-disc list-inside space-y-2">
                  <li className="py-2">Respect intellectual property rights</li>
                  <li className="py-2">Fully secure database for videos and information</li>
                  <li className="py-2">No explicit or harmful content</li>
                  <li className="py-2">Be mindful of community guidelines</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
