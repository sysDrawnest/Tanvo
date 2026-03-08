// backend/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js';
import Product from './src/models/Product.js';
import connectDB from './src/config/database.js';

dotenv.config();

// Connect to database
connectDB();

const seedUsers = [
  {
    name: 'Admin User',
    email: 'admin@yobazar.com',
    password: 'Admin@123',
    role: 'admin',
    phone: '9876543210',
    addresses: [
      {
        type: 'home',
        addressLine1: '123 Admin Street',
        city: 'Bhubaneswar',
        state: 'Odisha',
        pincode: '751012',
        isDefault: true
      }
    ]
  },
  {
    name: 'Test User',
    email: 'user@example.com',
    password: 'User@123',
    role: 'user',
    phone: '9876543211',
    addresses: [
      {
        type: 'home',
        addressLine1: '456 User Colony',
        city: 'Cuttack',
        state: 'Odisha',
        pincode: '753001',
        isDefault: true
      }
    ]
  }
];

const seedProducts = [
  {
    name: 'Sambalpuri Silk Saree - Traditional Ikat',
    description: 'Handwoven pure silk saree with traditional Sambalpuri ikat patterns. Features intricate design work on the body and pallu. Perfect for weddings and festive occasions.',
    shortDescription: 'Pure silk saree with traditional ikat patterns',
    price: 8999,
    originalPrice: 12999,
    category: 'Women',
    subCategory: 'Sarees',
    weave: 'Sambalpuri',
    fabric: 'Silk',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
        isPrimary: true
      },
      {
        url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800'
      }
    ],
    stock: 15,
    colors: ['Red', 'Green', 'Blue'],
    length: '6.3 meters',
    blousePiece: true,
    careInstructions: 'Dry clean only. Store in muslin cloth. Keep away from direct sunlight.',
    isFeatured: true,
    isBestSeller: true,
    ratings: 4.8,
    numReviews: 124,
    tags: ['wedding', 'festival', 'traditional'],
    weaverInfo: {
      name: 'Meher Weavers Cooperative',
      generation: '4th Generation',
      location: 'Bargarh, Odisha',
      story: 'Family of weavers preserving Sambalpuri tradition for over 80 years.'
    }
  },
  {
    name: 'Bomkai Cotton Saree - Temple Design',
    description: 'Lightweight cotton saree with traditional Bomkai temple border. Handwoven by master artisans from Ganjam. Comfortable for daily wear yet elegant enough for special occasions.',
    shortDescription: 'Cotton saree with temple border design',
    price: 3499,
    originalPrice: 4999,
    category: 'Women',
    subCategory: 'Sarees',
    weave: 'Bomkai',
    fabric: 'Cotton',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800',
        isPrimary: true
      }
    ],
    stock: 25,
    colors: ['Yellow', 'Green', 'Orange'],
    length: '6.3 meters',
    blousePiece: true,
    careInstructions: 'Hand wash with mild detergent. Dry in shade.',
    isFeatured: true,
    isNewArrival: true,
    ratings: 4.5,
    numReviews: 67,
    tags: ['daily wear', 'casual', 'comfortable'],
    weaverInfo: {
      name: 'Ganjam Handloom Cluster',
      generation: '3rd Generation',
      location: 'Ganjam, Odisha',
      story: 'Collective of 50+ weavers preserving Bomkai tradition.'
    }
  },
  {
    name: 'Ikat Silk Kurta for Men',
    description: 'Premium silk kurta with contemporary ikat design. Handwoven in Nuapatna, featuring traditional motifs with modern color palette. Perfect for festive occasions.',
    shortDescription: 'Handwoven silk kurta with ikat design',
    price: 4999,
    originalPrice: 6999,
    category: 'Men',
    subCategory: 'Kurta',
    weave: 'Ikat',
    fabric: 'Silk',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1593032469175-73e119128621?w=800',
        isPrimary: true
      }
    ],
    stock: 10,
    colors: ['Blue', 'Brown', 'Maroon'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    careInstructions: 'Dry clean only.',
    isBestSeller: true,
    ratings: 4.7,
    numReviews: 42,
    tags: ['festival', 'wedding', 'ethnic'],
    weaverInfo: {
      name: 'Nuapatna Weavers Society',
      generation: '5th Generation',
      location: 'Nuapatna, Odisha',
      story: 'Specializing in ikat weaving for over a century.'
    }
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();

    console.log('Data cleared...'.red);

    // Hash passwords and create users
    const createdUsers = await User.create(seedUsers);
    console.log(`${createdUsers.length} users created`.green);

    // Create products
    const createdProducts = await Product.create(seedProducts);
    console.log(`${createdProducts.length} products created`.green);

    console.log('Database seeded successfully!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

seedDatabase();