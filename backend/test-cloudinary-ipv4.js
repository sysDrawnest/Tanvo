// test-cloudinary-ipv4.js
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import dns from 'dns';

// Force IPv4
dns.setDefaultResultOrder('ipv4first');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const testUpload = async () => {
    try {
        console.log('Testing Cloudinary with IPv4...');

        // Simple ping test
        const result = await cloudinary.api.ping();
        console.log('✅ Connection successful:', result);

    } catch (error) {
        console.error('❌ Connection failed:', error);
    }
};

testUpload();