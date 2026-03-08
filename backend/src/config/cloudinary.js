import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Test the connection (but don't block startup)
const initCloudinary = async () => {
  try {
    await cloudinary.api.ping();
    console.log('✅ Cloudinary connected successfully!');
  } catch (error) {
    console.error('❌ Cloudinary connection failed:', error.message);
    console.log('⚠️ Image uploads will not work until Cloudinary is configured.');
  }
};

// Run the test but don't await it
initCloudinary();

export default cloudinary;