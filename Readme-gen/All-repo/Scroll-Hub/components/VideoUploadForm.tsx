'use client';

import { useState } from 'react';
import { IKUploadResponse } from 'imagekitio-next/dist/types/components/IKUpload/props';
import FileUpload from '@/app/component/FileUpload';
import { apiClient } from '@/lib/apiClient';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { VideoTag } from '@/TempFiles/video.tag';

export default function VideoUploadForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [tags, setTags] = useState<VideoTag[]>([]);
  const [errors, setErrors] = useState<{ title?: string; description?: string; tags?: string }>({});

  const availableTags = Object.values(VideoTag);

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setVideoUrl(response.filePath);
    setThumbnailUrl(response.thumbnailUrl || response.filePath);
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const toggleTag = (tag: VideoTag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const validateForm = () => {
    const newErrors: { title?: string; description?: string; tags?: string } = {};
    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Description is required';
    if (tags.length === 0) newErrors.tags = 'At least one tag is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !videoUrl) return;
    setLoading(true);
    try {
      await apiClient.createVideo({
        title,
        description,
        videoUrl,
        thumbnailUrl,
        tags,
        report: 0,
      });
      setTitle('');
      setDescription('');
      setVideoUrl('');
      setThumbnailUrl('');
      setTags([]);
      setUploadProgress(0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-purple-200">
          Title
        </Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`bg-purple-900/20 border-purple-700/50 text-purple-100 placeholder:text-purple-400/50 focus:ring-purple-500/50 ${
            errors.title ? 'border-red-500/50 focus:ring-red-500/50' : ''
          }`}
          placeholder="Enter video title"
        />
        {errors.title && <p className="text-red-400 text-sm">{errors.title}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-purple-200">
          Description
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`bg-purple-900/20 border-purple-700/50 text-purple-100 placeholder:text-purple-400/50 focus:ring-purple-500/50 min-h-[100px] ${
            errors.description ? 'border-red-500/50 focus:ring-red-500/50' : ''
          }`}
          placeholder="Enter video description"
        />
        {errors.description && <p className="text-red-400 text-sm">{errors.description}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-purple-200">Tags</Label>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag, index) => (
            <button
              type="button"
              key={index}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full border ${
                tags.includes(tag)
                  ? 'bg-purple-600 text-purple-100 border-purple-600'
                  : 'bg-transparent text-purple-200 border-purple-700/50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        {errors.tags && <p className="text-red-400 text-sm">{errors.tags}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-purple-200">Upload Video</Label>
        <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
          <FileUpload fileType="video" onSuccess={handleUploadSuccess} onProgress={handleUploadProgress} />
          {uploadProgress > 0 && (
            <div className="mt-4">
              <Progress value={uploadProgress} className="h-2 bg-purple-900/40" />
              <p className="text-purple-200 text-sm mt-2">Upload progress: {Math.round(uploadProgress)}%</p>
            </div>
          )}
        </div>
      </div>

      <Button type="submit" disabled={loading || !videoUrl} className="w-full bg-purple-600 hover:bg-purple-500 text-purple-100 transition-colors">
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          'Publish Video'
        )}
      </Button>
    </form>
  );
}
