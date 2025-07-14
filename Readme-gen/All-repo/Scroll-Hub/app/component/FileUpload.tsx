/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { IKUpload } from 'imagekitio-next';
import { IKUploadResponse } from 'imagekitio-next/dist/types/components/IKUpload/props';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress: (progress: number) => void;
  fileType?: 'image' | 'video';
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = 'image',
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const onError = (err: { message: string }) => {
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (res: IKUploadResponse) => {
    setError(null);
    onSuccess(res);
    setUploading(false);
    setProgress(0);
  };

  const handleStartUpload = () => {
    setError(null);
    setUploading(true);
    setProgress(0);
  };

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable) {
      const percent = Math.round((evt.loaded / evt.total) * 100);
      setProgress(percent);
      onProgress(percent);
    }
  };

  const validateFile = (file: File) => {
    if (fileType === 'video') {
      if (!file.type.startsWith('video/')) {
        setError('Please upload a video file');
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError('File size should be less than 100MB');
        return false;
      }
    } else {
      const acceptedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
      ];
      if (!acceptedTypes.includes(file.type)) {
        setError('Please upload an image file');
        return false;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError('File size should be less than 10MB');
        return false;
      }
    }
    return true;
  };

  return (
    <div>
      <IKUpload
        fileName={fileType === 'video' ? 'video' : 'image'}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadProgress={handleProgress}
        onUploadStart={handleStartUpload}
        accept={fileType === 'video' ? 'video/*' : 'image/*'}
        className="file-input file-input-bordered w-full"
        validateFile={validateFile}
        useUniqueFileName={true}
        folder={fileType === 'video' ? '/videos' : '/images'}
      />

      {uploading && (
        <div className="mt-2">
          <Loader2 className="animate-spin mt-2 mx-auto" />
        </div>
      )}

      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
