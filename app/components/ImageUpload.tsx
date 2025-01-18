"use client";

import { useState } from "react";

interface ImageUploadProps {
  productId: number;
  onUploadComplete?: (image: any) => void;
}

export function ImageUpload({ productId, onUploadComplete }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    setUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`/api/products/${productId}/images`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const image = await response.json();
      onUploadComplete?.(image);
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error (show toast, etc.)
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
