import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

console.log('☁️ CLOUDINARY SIMPLE TEST');
console.log('=' .repeat(50));

// Get credentials
const config = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
};

console.log('Configuration:');
console.log(`   Cloud Name: ${config.cloud_name || '❌ Missing'}`);
console.log(`   API Key: ${config.api_key ? '✅ Set' : '❌ Missing'}`);
console.log(`   API Secret: ${config.api_secret ? '✅ Set' : '❌ Missing'}`);

if (!config.cloud_name || !config.api_key || !config.api_secret) {
  console.log('\n❌ Missing Cloudinary credentials. Please check your .env file');
  process.exit(1);
}

// Configure Cloudinary
cloudinary.config(config);

// Test connection
try {
  const result = await cloudinary.api.ping();
  console.log('\n✅ Successfully connected to Cloudinary!');
  console.log('   Response:', result);
  
  // Try to upload a test image
  console.log('\n📤 Testing upload...');
  const uploadResult = await cloudinary.uploader.upload(
    'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    {
      folder: 'syssaree-test',
      public_id: 'test-connection'
    }
  );
  
  console.log('✅ Test upload successful!');
  console.log(`   Image URL: ${uploadResult.secure_url}`);
  
  // Clean up
  console.log('\n🗑️ Cleaning up...');
  await cloudinary.uploader.destroy('syssaree-test/test-connection');
  console.log('✅ Test cleanup successful');
  
} catch (error) {
  console.log('\n❌ Connection failed!');
  console.log('   Error:', error.message);
  if (error.http_code) {
    console.log('   HTTP Code:', error.http_code);
  }
}