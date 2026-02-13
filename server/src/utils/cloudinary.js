import {v2 as cloudinary} from "cloudinary";
import { ApiError } from "./api-error.js";
import fs from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadOnCloudinary = async(localFilePath, folder = "public/images")=>{

    try {
        if(!localFilePath){
            throw new ApiError(400, "File path is required");
        }
    
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            folder,
            resource_type: "image",
            use_filename: true,
            unique_filename: false
        })
    
        await fs.unlink(localFilePath);
        return {
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id
        }
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Cloudinary upload failed");
    }

}

export default cloudinary;