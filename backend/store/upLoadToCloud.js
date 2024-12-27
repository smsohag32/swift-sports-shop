import  cloudinary  from ('cloudinary').v2;

cloudinary.config({
  cloud_name:  process.env.CLOUD_NAME,
  api_key:  process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

export const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    console.log(result.url);
    return result.url;
  } catch (error) {
    console.error('Upload failed', error);
  }
};
