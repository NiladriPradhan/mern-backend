import React, { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import axios from "axios";

interface ProductImageUploadProps {
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  uploadImageUrl: string;
  setUploadImageUrl: (url: string) => void;
  imageLoadingState?: boolean;
  setImageLoadingState: (state: boolean) => void;
}

export default function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadImageUrl,
  setUploadImageUrl,
  setImageLoadingState,
}: ProductImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setUploadImageUrl(imageUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
      const imageUrl = URL.createObjectURL(droppedFile);
      setUploadImageUrl(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setUploadImageUrl("");
    if (inputRef.current) inputRef.current.value = "";
  };

  async function uploadImageToCloudinary() {
    if (!imageFile) return;
    try {
      setImageLoadingState(true);
      const data = new FormData();
      data.append("image", imageFile);

      const response = await axios.post(
        "http://localhost:4000/api/admin/products/upload-image",
        data
      );

      if (response.data.success) {
        setUploadImageUrl(response.data.result.secure_url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Label htmlFor="image-upload" className="text-lg font-semibold mb-2 block">
        Upload Image
      </Label>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          imageFile
            ? "border-primary/60 bg-primary/5"
            : "border-muted-foreground/40 hover:border-primary/70"
        }`}
      >
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImageChangeFile}
          className="hidden"
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center text-muted-foreground"
          >
            <UploadCloudIcon className="h-10 w-10 mb-2" />
            <span className="text-sm">Drag & drop or click to upload image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between gap-2 px-2">
            <div className="flex items-center gap-2">
              <FileIcon className="w-6 h-6 text-primary" />
              <p className="text-sm font-medium truncate max-w-[120px]">
                {imageFile?.name}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleRemoveImage}>
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        )}
      </div>

      {/* Image Preview */}
      {uploadImageUrl && (
        <div className="mt-3">
          <img
            src={uploadImageUrl}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-md border"
          />
        </div>
      )}
    </div>
  );
}
