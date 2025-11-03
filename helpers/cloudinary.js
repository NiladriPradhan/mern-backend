import cloudinary from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Keep uploaded file in memory as Buffer
const storage = multer.memoryStorage();

// Multer middleware for single file
export const upload = multer({ storage });

// Upload to Cloudinary
export async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}
