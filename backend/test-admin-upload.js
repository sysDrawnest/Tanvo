import fs from 'fs';
import path from 'path';
import axios from 'axios';
import FormData from 'form-data';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testAdminUpload = async () => {
    try {
        console.log('🔍 Testing admin product upload...\n');

        // Step 1: Login with correct credentials from your .env
        console.log('1️⃣ Logging in as admin...');
        console.log('   Using: admin@yobazar.com / Admin@123');

        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'admin@yobazar.com',  // Changed from tanvo to yobazar
            password: 'Admin@123'
        }, {
            timeout: 5000
        });

        const token = loginRes.data.token;
        console.log('✅ Login successful, token received\n');
        console.log('Token:', token.substring(0, 20) + '...\n');

        // Step 2: Create test image if it doesn't exist
        const testImagePath = path.join(__dirname, 'test-image.png');

        if (!fs.existsSync(testImagePath)) {
            console.log('2️⃣ Creating test image...');
            // Create a simple 1x1 pixel PNG (base64 decoded)
            const base64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
            const imageBuffer = Buffer.from(base64Data, 'base64');
            fs.writeFileSync(testImagePath, imageBuffer);
            console.log('✅ Test image created\n');
        } else {
            console.log('2️⃣ Test image already exists\n');
        }

        // Step 3: Prepare form data
        console.log('3️⃣ Preparing product data...');
        const form = new FormData();
        form.append('images', fs.createReadStream(testImagePath));
        form.append('name', 'Test Product from Script');
        form.append('description', 'This is a test product created by automated script');
        form.append('shortDescription', 'Test product short description');
        form.append('price', '1999');
        form.append('originalPrice', '2499');
        form.append('category', 'Women');
        form.append('subCategory', 'Sarees');
        form.append('weave', 'Sambalpuri');
        form.append('fabric', 'Silk');
        form.append('stock', '5');
        form.append('colors', 'Red, Blue');
        form.append('length', '6.3 meters');
        form.append('blousePiece', 'true');
        form.append('careInstructions', 'Dry clean only');
        form.append('isFeatured', 'false');
        form.append('isBestSeller', 'true');
        form.append('isNewArrival', 'false');

        console.log('✅ Form data prepared\n');

        // Step 4: Upload to admin endpoint
        console.log('4️⃣ Sending request to admin/products...');
        const uploadRes = await axios.post(
            'http://localhost:5000/api/admin/products',
            form,
            {
                headers: {
                    ...form.getHeaders(),
                    Authorization: `Bearer ${token}`,
                },
                timeout: 30000,
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );

        console.log('\n✅ Admin upload successful!');
        console.log('📦 Response:', JSON.stringify(uploadRes.data, null, 2));

        // Step 5: Clean up
        console.log('\n5️⃣ Test completed, you can delete test-image.png if desired');

    } catch (error) {
        console.error('\n❌ Admin upload failed:');

        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('📡 Server responded with:');
            console.error('   Status:', error.response.status);
            console.error('   Data:', error.response.data);

            if (error.response.status === 401) {
                console.error('\n🔐 Authentication failed!');
                console.error('   Make sure you have an admin user in your database.');
                console.error('   Try running: node seed.js to create default admin');
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('📡 No response received from server');
            console.error('   Is your backend running on port 5000?');
            console.error('   Request URL:', error.request._currentUrl || error.request.path || 'unknown');
        } else {
            // Something happened in setting up the request
            console.error('❌ Request setup error:', error.message);
        }

        if (error.code === 'ECONNREFUSED') {
            console.error('\n🚨 Make sure your backend server is running on port 5000!');
            console.error('   Run: npm run dev in the backend folder');
        }
    }
};

testAdminUpload();