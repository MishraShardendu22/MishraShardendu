import React from "react";
import axios from "axios";

const CloudinaryUpload = ({ onUpload }: { onUpload: (url: string) => void }) => {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tempppp"); // should match your Cloudinary unsigned preset

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dkxw15and/image/upload",
      formData
    );

    onUpload(res.data.secure_url);
  };

  return <input type="file" onChange={handleUpload} />;
};

export default CloudinaryUpload;
