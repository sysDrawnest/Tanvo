import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 ENVIRONMENT VARIABLE TEST');
console.log('=' .repeat(50));

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
console.log(`📁 Looking for .env at: ${envPath}`);

if (fs.existsSync(envPath)) {
  console.log('✅ .env file found');
  
  // Read file content (masking sensitive data)
  const content = fs.readFileSync(envPath, 'utf8');
  console.log('\n📄 .env file content (masked):');
  content.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      if (key.includes('SECRET') || key.includes('PASSWORD') || key.includes('KEY')) {
        console.log(`   ${key}=********`);
      } else {
        console.log(`   ${line}`);
      }
    }
  });
} else {
  console.log('❌ .env file NOT found!');
}

// Load environment variables
console.log('\n🔄 Loading environment variables...');
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.log('❌ dotenv error:', result.error.message);
} else {
  console.log('✅ dotenv loaded successfully');
}

// Check each required variable
console.log('\n📊 Environment variables status:');
const requiredVars = [
  'PORT',
  'NODE_ENV',
  'MONGODB_URI',
  'JWT_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    if (varName.includes('SECRET') || varName.includes('KEY') || varName === 'MONGODB_URI') {
      console.log(`   ✅ ${varName}: [HIDDEN]`);
    } else {
      console.log(`   ✅ ${varName}: ${value}`);
    }
  } else {
    console.log(`   ❌ ${varName}: MISSING`);
  }
});

// Test Cloudinary specifically
console.log('\n☁️ Testing Cloudinary variables:');
console.log(`   CLOUDINARY_CLOUD_NAME: ${process.env.CLOUDINARY_CLOUD_NAME || '❌ MISSING'}`);
console.log(`   CLOUDINARY_API_KEY: ${process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ MISSING'}`);
console.log(`   CLOUDINARY_API_SECRET: ${process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ MISSING'}`);

// Test MongoDB URI specifically
console.log('\n🗄️ Testing MongoDB URI:');
const mongoUri = process.env.MONGODB_URI;
if (mongoUri) {
  // Mask password in URI for display
  const maskedUri = mongoUri.replace(/:[^:@]+@/, ':****@');
  console.log(`   ✅ MONGODB_URI: ${maskedUri}`);
} else {
  console.log('   ❌ MONGODB_URI: MISSING');
}