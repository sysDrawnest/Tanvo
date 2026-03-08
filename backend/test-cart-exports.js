import * as cartController from './src/controllers/cartController.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 CHECKING CART CONTROLLER EXPORTS');
console.log('====================================');

// Check what's exported
const exports = Object.keys(cartController);
console.log('✅ Available exports:', exports);

if (exports.includes('applyCoupon')) {
  console.log('✅ applyCoupon is exported!');
} else {
  console.log('❌ applyCoupon is NOT exported!');
}

// Also check the file content
const controllerPath = path.join(__dirname, 'src/controllers/cartController.js');
console.log(`\n📁 Checking file: ${controllerPath}`);

if (fs.existsSync(controllerPath)) {
  const content = fs.readFileSync(controllerPath, 'utf8');
  
  // Look for applyCoupon function
  const hasApplyCoupon = content.includes('export const applyCoupon') || 
                         content.includes('exports.applyCoupon') ||
                         content.includes('applyCoupon');
  
  console.log(`📄 File exists: YES`);
  console.log(`📄 Contains applyCoupon: ${hasApplyCoupon ? 'YES' : 'NO'}`);
  
  // Show the last 20 lines to see exports
  const lines = content.split('\n');
  const lastLines = lines.slice(-20);
  console.log('\n📄 Last 20 lines of file:');
  lastLines.forEach((line, i) => {
    console.log(`   ${line}`);
  });
  
} else {
  console.log('❌ File does not exist!');
}