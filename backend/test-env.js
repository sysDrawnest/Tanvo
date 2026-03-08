import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📁 Current directory:', __dirname);

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('✅ .env file found');
  console.log('📄 File content preview:');
  const content = fs.readFileSync(envPath, 'utf8');
  console.log(content.split('\n').map(line => {
    if (line.includes('SECRET') || line.includes('PASSWORD')) {
      return line.split('=')[0] + '=********';
    }
    return line;
  }).join('\n'));
} else {
  console.log('❌ .env file NOT found at:', envPath);
}

// Load and check environment
dotenv.config();
console.log('\n🔧 Environment variables loaded:');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME || '❌ Missing');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing');