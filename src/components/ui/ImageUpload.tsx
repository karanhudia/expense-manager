"use client";

import { useState } from "react";
import { FiUpload, FiCheck, FiX } from "react-icons/fi";
import Image from "next/image";

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

export function ImageUpload({ onUpload }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setUploadedImage(data.secure_url);
      onUpload(data.secure_url);
    } catch (error) {
      console.error("Failed to upload image:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setUploadedImage(null);
    onUpload("");
  };

  return (
    <div className="mt-1">
      {uploadedImage ? (
        <div className="relative">
          <div className="relative h-32 w-auto max-w-full rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
            <Image
              src={uploadedImage}
              alt="Uploaded receipt"
              fill
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <FiX className="h-4 w-4 text-gray-600" />
          </button>
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full text-xs text-green-600">
            <FiCheck className="h-3 w-3" />
            <span>Uploaded</span>
          </div>
        </div>
      ) : (
        <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <FiUpload className="mx-auto h-8 w-8 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={loading}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
            {error && <p className="text-xs text-red-500">{error}</p>}
            {loading && (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span className="ml-2 text-sm text-gray-500">Uploading...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 