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
        phone: '9876543210',
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
        phone: '9876543211',
        isDefault: true
      }
    ]
  }
];

const seedProducts = [
  {
    name: 'Sambalpuri Silk Saree – Royal Ikat',
    description: 'Handwoven pure silk saree with traditional Sambalpuri ikat patterns. Features intricate design work on the body and a wide pallu. Perfect for weddings and festive occasions.',
    shortDescription: 'Pure silk saree with traditional ikat patterns',
    price: 8999,
    originalPrice: 12999,
    category: 'Women',
    subCategory: 'Sarees',
    weave: 'Sambalpuri',
    fabric: 'Silk',
    images: [
      { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800' }
    ],
    stock: 15,
    colors: ['Red', 'Green', 'Blue'],
    length: '6.3 meters',
    blousePiece: true,
    careInstructions: 'Dry clean only. Store in muslin cloth.',
    isFeatured: true,
    isBestSeller: true,
    ratings: 4.8,
    numReviews: 124,
    tags: ['wedding', 'festival', 'traditional'],
    weaverInfo: { name: 'Meher Weavers Cooperative', generation: '4th Generation', location: 'Bargarh, Odisha', story: 'Family preserving Sambalpuri tradition for over 80 years.' }
  },
  {
    name: 'Bomkai Cotton Saree – Temple Border',
    description: 'Lightweight cotton saree with traditional Bomkai temple border. Handwoven by master artisans from Ganjam. Comfortable for daily wear yet elegant for special occasions.',
    shortDescription: 'Cotton saree with temple border design',
    price: 3499,
    originalPrice: 4999,
    category: 'Women',
    subCategory: 'Sarees',
    weave: 'Bomkai',
    fabric: 'Cotton',
    images: [{ url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800', isPrimary: true }],
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
    weaverInfo: { name: 'Ganjam Handloom Cluster', generation: '3rd Generation', location: 'Ganjam, Odisha', story: 'Collective of 50+ weavers preserving Bomkai tradition.' }
  },
  {
    name: 'Ikat Silk Kurta for Men',
    description: 'Premium silk kurta with contemporary ikat design. Handwoven in Nuapatna, featuring traditional motifs with modern color palette.',
    shortDescription: 'Handwoven silk kurta with ikat design',
    price: 4999,
    originalPrice: 6999,
    category: 'Men',
    subCategory: 'Kurta',
    weave: 'Ikat',
    fabric: 'Silk',
    images: [{ url: 'https://images.unsplash.com/photo-1593032469175-73e119128621?w=800', isPrimary: true }],
    stock: 10,
    colors: ['Blue', 'Brown', 'Maroon'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    blousePiece: false,
    careInstructions: 'Dry clean only.',
    isBestSeller: true,
    ratings: 4.7,
    numReviews: 42,
    tags: ['festival', 'wedding', 'ethnic'],
    weaverInfo: { name: 'Nuapatna Weavers Society', generation: '5th Generation', location: 'Nuapatna, Odisha', story: 'Specializing in ikat weaving for over a century.' }
  },
  {
    name: 'Pasapalli Silk Saree – Heritage Check',
    description: 'The iconic Pasapalli saree, named after the chess-board-like pattern. Woven in pure mulberry silk with signature geometric checks that carry a 500-year legacy.',
    shortDescription: 'Classic chess-board pattern silk saree',
    price: 11999,
    originalPrice: 16499,
    category: 'Women',
    subCategory: 'Sarees',
    weave: 'Sambalpuri',
    fabric: 'Silk',
    images: [{ url: 'https://images.unsplash.com/photo-1610189079681-3f43d8e40c52?w=800', isPrimary: true }],
    stock: 8,
    colors: ['Black & Gold', 'Red & Gold', 'Navy & Silver'],
    length: '6.3 meters',
    blousePiece: true,
    careInstructions: 'Dry clean only.',
    isFeatured: true,
    isBestSeller: true,
    ratings: 4.9,
    numReviews: 89,
    tags: ['wedding', 'luxury', 'heritage'],
    weaverInfo: { name: 'Sonepur Silk Cooperative', generation: '6th Generation', location: 'Sonepur, Odisha', story: 'Masters of the Pasapalli weave, recognized by the GI tag.' }
  },
  {
    name: 'Tussar Silk Saree – Natural Motifs',
    description: 'Luxurious tussar silk saree with hand-painted tribal motifs inspired by Odisha\'s Pattachitra art. Each piece is unique, making it a wearable artwork.',
    shortDescription: 'Hand-painted Pattachitra motif tussar saree',
    price: 6499,
    originalPrice: 8999,
    category: 'Women',
    subCategory: 'Sarees',
    weave: 'Ikat',
    fabric: 'Tussar',
    images: [{ url: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800', isPrimary: true }],
    stock: 12,
    colors: ['Ivory', 'Champagne', 'Saffron'],
    length: '6.3 meters',
    blousePiece: false,
    careInstructions: 'Dry clean recommended. Avoid wringing.',
    isNewArrival: true,
    ratings: 4.6,
    numReviews: 33,
    tags: ['artisan', 'unique', 'pattachitra'],
    weaverInfo: { name: 'Raghurajpur Artisan Village', generation: 'Multi-generational', location: 'Raghurajpur, Odisha', story: 'UNESCO-recognized heritage craft village.' }
  },
  {
    name: 'Sambalpuri Cotton Salwar Kameez Set',
    description: 'Comfortable three-piece salwar kameez in handwoven Sambalpuri cotton. Features subtle ikat patterns on the dupatta and kurta hem. Ideal for office and casual outings.',
    shortDescription: 'Ikat cotton salwar kameez with dupatta',
    price: 2899,
    originalPrice: 3999,
    category: 'Women',
    subCategory: 'Salwar Kameez',
    weave: 'Sambalpuri',
    fabric: 'Cotton',
    images: [{ url: 'https://images.unsplash.com/photo-1594938298603-c8148f4e919e?w=800', isPrimary: true }],
    stock: 30,
    colors: ['Teal', 'Lavender', 'Coral'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    blousePiece: false,
    careInstructions: 'Machine wash cold, gentle cycle.',
    isNewArrival: true,
    ratings: 4.3,
    numReviews: 55,
    tags: ['casual', 'office', 'daily wear'],
    weaverInfo: { name: 'Bargarh Women Cooperative', generation: '2nd Generation', location: 'Bargarh, Odisha', story: 'Women-led cooperative empowering local weavers.' }
  },
  {
    name: 'Handloom Silk Dupatta – Ikat Borders',
    description: 'Statement silk dupatta with bold ikat borders in contrasting colors. Can be paired with both ethnic and fusion outfits. A must-have accessory for every wardrobe.',
    shortDescription: 'Silk dupatta with bold ikat borders',
    price: 1499,
    originalPrice: 2199,
    category: 'Accessories',
    subCategory: 'Dupatta',
    weave: 'Ikat',
    fabric: 'Silk',
    images: [{ url: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=800', isPrimary: true }],
    stock: 40,
    colors: ['Magenta', 'Royal Blue', 'Emerald'],
    length: '2.5 meters',
    blousePiece: false,
    careInstructions: 'Dry clean or gentle hand wash.',
    isFeatured: true,
    ratings: 4.4,
    numReviews: 28,
    tags: ['accessory', 'fusion', 'gift'],
    weaverInfo: { name: 'Nuapatna Weavers Society', generation: '5th Generation', location: 'Nuapatna, Odisha', story: 'Specializing in ikat weaving for over a century.' }
  },
  {
    name: 'Bomkai Silk Saree – Festive Edition',
    description: 'A premium Bomkai silk saree in festive colors with a heavily embroidered zari border. The intricate threadwork on the pallu depicts scenes from Odisha\'s mythology.',
    shortDescription: 'Zari-bordered Bomkai silk for festive wear',
    price: 14500,
    originalPrice: 19999,
    category: 'Women',
    subCategory: 'Sarees',
    weave: 'Bomkai',
    fabric: 'Silk',
    images: [{ url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', isPrimary: true }],
    stock: 6,
    colors: ['Deep Red', 'Peacock Green'],
    length: '6.3 meters',
    blousePiece: true,
    careInstructions: 'Dry clean only. Preserve zari with camphor.',
    isFeatured: true,
    isBestSeller: true,
    ratings: 5.0,
    numReviews: 18,
    tags: ['bridal', 'wedding', 'luxury'],
    weaverInfo: { name: 'Ganjam Master Weavers Guild', generation: '7th Generation', location: 'Ganjam, Odisha', story: 'Guild members hold National Award recognition for master craftsmanship.' }
  },
  {
    name: 'Ikat Cotton Stole – Block Print Fusion',
    description: 'A lightweight cotton stole with fusion block print and ikat borders. Perfect for summers and travel. Can be used as a wrap, scarf, or beach cover-up.',
    shortDescription: 'Lightweight fusion cotton stole',
    price: 799,
    originalPrice: 1199,
    category: 'Accessories',
    subCategory: 'Stole',
    weave: 'Ikat',
    fabric: 'Cotton',
    images: [{ url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800', isPrimary: true }],
    stock: 60,
    colors: ['Indigo', 'Rust', 'Sage'],
    length: '2 meters',
    blousePiece: false,
    careInstructions: 'Machine washable.',
    isNewArrival: true,
    ratings: 4.2,
    numReviews: 71,
    tags: ['summer', 'travel', 'casual'],
    weaverInfo: { name: 'Nuapatna Young Weavers', generation: '1st Generation', location: 'Nuapatna, Odisha', story: 'Young artisans bringing ikat to contemporary lifestyles.' }
  },
  {
    name: 'Sambalpuri Silk Shirt for Men',
    description: 'A conversation-starter slim-fit shirt in authentic Sambalpuri silk. Features subtle ikat patterns woven into the fabric, giving it a sophisticated ethnic-modern appeal.',
    shortDescription: 'Slim-fit Sambalpuri silk shirt for men',
    price: 3999,
    originalPrice: 5499,
    category: 'Men',
    subCategory: "Men's Shirts",
    weave: 'Sambalpuri',
    fabric: 'Silk',
    images: [{ url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800', isPrimary: true }],
    stock: 18,
    colors: ['Ivory', 'Sky Blue', 'Dusty Rose'],
    sizes: ['S', 'M', 'L', 'XL'],
    blousePiece: false,
    careInstructions: 'Hand wash cold or dry clean.',
    isBestSeller: true,
    ratings: 4.6,
    numReviews: 37,
    tags: ['ethnic', 'office', 'smart casual'],
    weaverInfo: { name: 'Meher Weavers Cooperative', generation: '4th Generation', location: 'Bargarh, Odisha', story: 'Family preserving Sambalpuri tradition for over 80 years.' }
  },
  {
    name: 'Tussar Silk Kurta Set for Women',
    description: 'Elegant kurta and palazzo set in natural tussar silk with hand-block printed motifs. Light as a feather, drapes beautifully for formal and semi-formal events.',
    shortDescription: 'Natural tussar silk kurta and palazzo set',
    price: 5499,
    originalPrice: 7499,
    category: 'Women',
    subCategory: 'Kurta Set',
    weave: 'Ikat',
    fabric: 'Tussar',
    images: [{ url: 'https://images.unsplash.com/photo-1619761013882-ee0e20baaa46?w=800', isPrimary: true }],
    stock: 20,
    colors: ['Natural', 'Mustard', 'Dusty Pink'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    blousePiece: false,
    careInstructions: 'Dry clean recommended.',
    isNewArrival: true,
    isFeatured: true,
    ratings: 4.7,
    numReviews: 29,
    tags: ['formal', 'gift', 'ethnic chic'],
    weaverInfo: { name: 'Raghurajpur Artisan Village', generation: 'Multi-generational', location: 'Raghurajpur, Odisha', story: 'UNESCO-recognized heritage craft village.' }
  },
  {
    name: 'Handloom Cotton Dhoti for Men',
    description: 'Crisp, comfortable handloom cotton dhoti in traditional off-white with a golden silk border. Ideal for pujas, religious ceremonies, and cultural events.',
    shortDescription: 'Traditional handloom dhoti with golden border',
    price: 1299,
    originalPrice: 1799,
    category: 'Men',
    subCategory: 'Dhoti',
    weave: 'Bomkai',
    fabric: 'Cotton',
    images: [{ url: 'https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?w=800', isPrimary: true }],
    stock: 35,
    colors: ['White & Gold', 'Cream & Gold'],
    sizes: ['S', 'M', 'L', 'XL'],
    blousePiece: false,
    careInstructions: 'Hand wash with starch. Iron while damp.',
    ratings: 4.4,
    numReviews: 48,
    tags: ['puja', 'ethnic', 'ceremony'],
    weaverInfo: { name: 'Ganjam Handloom Cluster', generation: '3rd Generation', location: 'Ganjam, Odisha', story: 'Collective of 50+ weavers preserving Bomkai tradition.' }
  },
  {
    name: 'Ikat Cotton Dupatta – Everyday Elegance',
    description: 'A versatile handwoven ikat cotton dupatta with subtle geometric patterns. Perfect for regular office wear or casual outings.',
    shortDescription: 'Ikat cotton dupatta for daily wear',
    price: 1499,
    originalPrice: 1999,
    category: 'Accessories',
    subCategory: 'Dupatta',
    weave: 'Ikat',
    fabric: 'Cotton',
    images: [{ url: 'https://images.unsplash.com/photo-1621285853634-713b8dd6b5ee?w=800', isPrimary: true }],
    stock: 50,
    colors: ['Maroon', 'Beige', 'Black'],
    length: '2.5 meters',
    blousePiece: false,
    careInstructions: 'Hand wash cold.',
    isFeatured: true,
    ratings: 4.5,
    numReviews: 42,
    tags: ['affordable', 'daily wear', 'office'],
    weaverInfo: { name: 'Nuapatna Handloom Society', generation: '4th Generation', location: 'Nuapatna, Odisha', story: 'Preserving the art of single ikat for everyday use.' }
  },
  {
    name: 'Simple Sambalpuri Cotton Saree – Basic Ikat',
    description: 'Lightweight and breathable Sambalpuri cotton saree with minimalist ikat borders. An ideal entry point for those new to handloom.',
    shortDescription: 'Classic Sambalpuri cotton for beginners',
    price: 2499,
    originalPrice: 3299,
    category: 'Women',
    subCategory: 'Sarees',
    weave: 'Sambalpuri',
    fabric: 'Cotton',
    images: [{ url: 'https://images.unsplash.com/photo-1610030469668-935142b9cdd0?w=800', isPrimary: true }],
    stock: 30,
    colors: ['Green', 'Blue', 'Yellow'],
    length: '6.3 meters',
    blousePiece: true,
    careInstructions: 'Hand wash with mild detergent. Dry in shade.',
    isFeatured: true,
    ratings: 4.6,
    numReviews: 28,
    tags: ['starter', 'cotton', 'sambalpuri'],
    weaverInfo: { name: 'Bargarh Weaver Cluster', generation: '3rd Generation', location: 'Bargarh, Odisha', story: 'Making traditional weaves accessible to everyone.' }
  },
  {
    name: 'Silk Blend Ethnic Kurta – Soft Finish',
    description: 'A luxurious silk-blend kurta featuring subtle handloom textures. Perfect for semi-formal gatherings and testing our fabric quality.',
    shortDescription: 'Silk blend kurta for versatile styling',
    price: 3999,
    originalPrice: 5499,
    category: 'Men',
    subCategory: 'Kurta',
    weave: 'Ikat',
    fabric: 'Silk',
    images: [{ url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800', isPrimary: true }],
    stock: 20,
    colors: ['Ivory', 'Navy', 'Maroon'],
    sizes: ['M', 'L', 'XL'],
    blousePiece: false,
    careInstructions: 'Dry clean recommended.',
    isFeatured: true,
    ratings: 4.7,
    numReviews: 15,
    tags: ['affordable luxury', 'men ethnic', 'silk blend'],
    weaverInfo: { name: 'Nuapatna Master Weavers', generation: '5th Generation', location: 'Nuapatna, Odisha', story: 'Specializing in contemporary blends with traditional soul.' }
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