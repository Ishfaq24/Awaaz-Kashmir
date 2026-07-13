import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

export const uploadImage = async (file) => {
  if (!file) {
    throw new Error("No image file received.");
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "awaaz-kashmir/reports",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    Readable.from(file.buffer).pipe(uploadStream);
  });
};