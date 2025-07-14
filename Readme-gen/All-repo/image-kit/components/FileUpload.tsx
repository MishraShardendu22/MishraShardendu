/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IKUpload } from "imagekitio-next";
import { useState } from "react";

interface FileUploadProps {
  onSuccess: (response: any) => void;
}

export default function FileUpload({ onSuccess }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: string) => {
    setError(err);
    setUploading(false);
  };

  const handleSuccess = (response: any) => {
    onSuccess(response);
    setUploading(false);
    setError(null);
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  const validateFile = (file: File): boolean => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      handleError("Only images of type JPEG, PNG, or JPG are allowed.");
      return false;
    }

    const maxFileSize = 10 * 1024 * 1024; 
    if (file.size > maxFileSize) {
      handleError("File size should be less than 10MB.");
      return false;
    }

    return true;
  };

  return (
    <div>
      <IKUpload
        onError={(err: any) => handleError(err?.message || "Upload failed")}
        onSuccess={handleSuccess}
        onUploadStart={handleStartUpload}
        validateFile={validateFile}
      />

      {uploading && <p>Uploading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
