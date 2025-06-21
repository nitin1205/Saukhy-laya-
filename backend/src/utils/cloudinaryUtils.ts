import { v2 as cloudinary } from "cloudinary";
import stream from "stream";

import env from "./env.utils";
import logger from "./logger";

export const cloudinaryConfig = () => {
  if (
    !env.CLOUDINARY_CLOUD_NAME ||
    !env.CLOUDINARY_API_KEY ||
    !env.CLOUDINARY_API_SECRET
  ) {
    throw new Error(
      "Cloudinary configuration is missing required environment variables."
    );
  }
  return cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  });
};

// export const uploadImageToCloudinary = async (
//   files: Express.Multer.File[]
// ): Promise<string[]> => {
//   const uploadImagePromises = files.map(async (image) => {
//     const b64 = Buffer.from(image.buffer).toString("base64");
//     let dataURI = "data:" + image.mimetype + ";base64," + b64;
//     const res = await cloudinary.uploader.upload(dataURI);
//     return res.url;
//   });

//   const imageUrls = await Promise.all(uploadImagePromises);
//   return imageUrls;
// };

export const uploadImageToCloudinary = async (
  files: Express.Multer.File[]
): Promise<string[]> => {
  try {
    const uploadPromises = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        // Create a stream-based upload pipeline
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "hotel-booking", // Optional: Organize in Cloudinary
            allowed_formats: ["jpg", "jpeg", "png", "webp"], // Restrict formats
            // transformation: { width: 1280, crop: "limit" }, // Optional: Resize
          },
          (error, result) => {
            if (error) {
              logger.error(`Upload failed for ${file.originalname}:`, error);
              return reject(
                new Error(
                  `Failed to upload ${file.originalname}: ${error.message}`
                )
              );
            }
            if (!result?.secure_url) {
              return reject(
                new Error(`No URL returned for ${file.originalname}`)
              );
            }
            resolve(result.secure_url); // Always use HTTPS
          }
        );

        // Create buffer stream
        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);
        bufferStream.pipe(uploadStream);
      });
    });

    return await Promise.all(uploadPromises);
  } catch (error) {
    logger.error("Cloudinary upload error:", error);
    throw new Error("Image upload failed. Please try again.");
  }
};

export const deleteUploadedImagesToCloudinaryOnError = (urls: string[]) => {
  urls.forEach((url) => {
    const publicId = url.split("/").pop()?.split(".")[0];
    if (publicId) cloudinary.uploader.destroy(publicId);
  });
};
