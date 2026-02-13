import { v2 as cloudinary } from "cloudinary";

export const uploadOnCloudinary = async (fileBuffer, folder = "course-images") => {
  try {
    // 🔥 configure inside function
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: "image" },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

      stream.end(fileBuffer);
    });
  } catch (error) {
    console.log("Cloudinary Error:", error);
    throw new Error("Cloudinary upload failed");
  }
};

export default cloudinary;
