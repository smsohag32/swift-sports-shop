import cloudinary from "cloudinary";
import fs from "fs";

cloudinary.v2.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.CLOUD_API_KEY,
   api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadImageToCloud = async (files) => {
   try {
      const uploadPromises = files.map((file) => cloudinary.v2.uploader.upload(file.path));
      const results = await Promise.all(uploadPromises);

      files.forEach((file) => fs.unlinkSync(file.path));

      return results.map((result) => result.secure_url);
   } catch (error) {
      throw new Error("Image upload failed");
   }
};

export const deleteImageFromCloud = async (imageUrls) => {
   try {
      const deletePromises = imageUrls.map((url) => {
         const publicId = url.split("/").pop().split(".")[0];
         return cloudinary.v2.uploader.destroy(publicId);
      });
      await Promise.all(deletePromises);
   } catch (error) {
      console.error("Failed to delete images from Cloudinary", error);
   }
};
