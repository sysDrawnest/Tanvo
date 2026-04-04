// import { Category, Product } from './types';

// export const HERO_IMAGES = [
//   'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=2000',
//   'https://images.unsplash.com/photo-1610030469668-935142b9cdd0?auto=format&fit=crop&q=80&w=2000',
//   'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=2000',
//   'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=2000',
//   'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=2000'
// ];

// export const STORIES = [
//   { 
//     id: 1,
//     title: "A Piece of Heritage in Paris", 
//     img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200", 
//     name: "Claire Bonnet", 
//     cat: "Silk Heritage",
//     excerpt: "Wearing my Sambalpuri silk at a gala in Paris felt like carrying a piece of home. Everyone was mesmerized by the mathematical precision of the Ikat patterns."
//   },
//   { 
//     id: 2,
//     title: "Reviving Ikat for Modern Work", 
//     img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1200", 
//     name: "Anjali Patnaik", 
//     cat: "Ikat Cotton",
//     excerpt: "I've transitioned my entire work wardrobe to handloom cotton. It's breathable, sustainable, and tells a story of an artisan's labor."
//   },
//   { 
//     id: 3,
//     title: "The Wedding Trousseau of Dreams", 
//     img: "https://images.unsplash.com/photo-1610030469668-935142b9cdd0?q=80&w=1200", 
//     name: "Sneha Mohanty", 
//     cat: "Traditional Silk",
//     excerpt: "Choosing Utkal Heritage for my wedding was the best decision. The Khandua silk saree was radiant and felt sacred."
//   },
//   { 
//     id: 4,
//     title: "Men's Style: The Handloom Shift", 
//     img: "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?q=80&w=1200", 
//     name: "Rajesh Meher", 
//     cat: "Menswear",
//     excerpt: "Finally, a place that treats men's handloom with the same dignity as sarees. The fit and the weave quality are unmatched."
//   }
// ];

// export const MOCK_PRODUCTS: Product[] = [
//   // Original Products (1-6)
//   {
//     id: '1',
//     name: 'Royal Maroon Sambalpuri Silk',
//     description: 'A masterpiece of Sambalpuri ikat weaving featuring traditional conch motifs and intricate border work. This exquisite piece showcases the finest craftsmanship of Odisha\'s master weavers.',
//     price: 12500,
//     originalPrice: 15000,
//     category: Category.SAMBALPURI,
//     images: [
//       'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800',
//       'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800',
//       'https://images.unsplash.com/photo-1610030469668-935142b9cdd0?q=80&w=800'
//     ],
//     fabric: 'Pure Mulberry Silk',
//     weave: 'Hand-woven Double Ikat',
//     length: '6.2 Meters',
//     blousePiece: true,
//     stock: 5,
//     rating: 4.8,
//     reviews: 24,
//     isBestSeller: true,
//     isHot: true,
//     careInstructions: 'Dry clean only. Store in muslin cloth.',
//     colors: ['Maroon', 'Gold', 'Cream']
//   },
//   {
//     id: '2',
//     name: 'Indigo Blue Pasapalli Cotton',
//     description: 'Classic checkered Pasapalli pattern rendered in deep indigo. Each square tells a story of traditional Odisha gaming boards transformed into wearable art.',
//     price: 4500,
//     originalPrice: 5200,
//     category: Category.COTTON,
//     images: [
//       'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800',
//       'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800'
//     ],
//     fabric: 'Mercerized Cotton',
//     weave: 'Single Ikat Pasapalli',
//     length: '5.5 Meters',
//     blousePiece: true,
//     stock: 12,
//     rating: 4.5,
//     reviews: 15,
//     isHot: true,
//     careInstructions: 'Hand wash separately with mild detergent.',
//     colors: ['Indigo', 'White']
//   },
//   {
//     id: '3',
//     name: 'Golden Yellow Bomkai Silk',
//     description: 'Intricate thread work and Jala patterns from Ganjam. This traditional Bomkai features exquisite temple borders and fish motifs that symbolize prosperity.',
//     price: 18000,
//     originalPrice: 22000,
//     category: Category.SILK,
//     images: [
//       'https://images.unsplash.com/photo-1583391733975-ac9d9c240995?q=80&w=800',
//       'https://images.unsplash.com/photo-1610030469668-935142b9cdd0?q=80&w=800'
//     ],
//     fabric: 'Tussar Silk',
//     weave: 'Bomkai Extra Weft',
//     length: '6.3 Meters',
//     blousePiece: true,
//     stock: 3,
//     rating: 4.9,
//     reviews: 10,
//     isHot: false,
//     careInstructions: 'Dry clean only.',
//     colors: ['Golden Yellow', 'Red', 'Green']
//   },
//   {
//     id: '4',
//     name: 'Emerald Green Khandua Silk',
//     description: 'The sacred fabric of Lord Jagannath, traditionally woven in Nuapatna. Features the famous "Gita Govinda" inscriptions on the border.',
//     price: 9800,
//     originalPrice: 11500,
//     category: Category.TRADITIONAL,
//     images: [
//       'https://images.unsplash.com/photo-1610030469668-935142b9cdd0?q=80&w=800',
//       'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800'
//     ],
//     fabric: 'Nuapatna Silk',
//     weave: 'Khandua Ikat',
//     length: '5.8 Meters',
//     blousePiece: false,
//     stock: 8,
//     rating: 4.7,
//     reviews: 32,
//     careInstructions: 'Dry clean only.',
//     colors: ['Emerald Green', 'Gold']
//   },
//   {
//     id: '5',
//     name: 'Signature Ikat Handloom Shirt',
//     description: 'Men\'s slim-fit shirt featuring authentic hand-woven Ikat patterns. Perfect for casual elegance and heritage-inspired modern fashion.',
//     price: 2800,
//     originalPrice: 3500,
//     category: Category.MENS_SHIRTS,
//     images: [
//       'https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?q=80&w=800',
//       'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800'
//     ],
//     fabric: 'Mercerized Cotton',
//     weave: 'Single Ikat',
//     length: 'N/A',
//     blousePiece: false,
//     stock: 15,
//     rating: 4.7,
//     reviews: 12,
//     isBestSeller: true,
//     careInstructions: 'Machine wash cold. Tumble dry low.',
//     colors: ['Blue', 'Brown', 'Black']
//   },
//   {
//     id: '6',
//     name: 'Onyx Black Ikat Formal Shirt',
//     description: 'Premium handloom cotton shirt for a sophisticated heritage look. Features subtle ikat patterns that add depth to formal attire.',
//     price: 3200,
//     originalPrice: 3200,
//     category: Category.MENS_SHIRTS,
//     images: [
//       'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800',
//       'https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?q=80&w=800'
//     ],
//     fabric: '100% Handloom Cotton',
//     weave: 'Ikat Extra Weft',
//     length: 'N/A',
//     blousePiece: false,
//     stock: 8,
//     rating: 4.9,
//     reviews: 6,
//     isHot: true,
//     careInstructions: 'Dry clean recommended.',
//     colors: ['Black', 'Silver']
//   },

//   // New Products (7-26) - 20 additional products
//   {
//     id: '7',
//     name: 'Peacock Blue Sambalpuri Silk',
//     description: 'Vibrant peacock blue silk saree with traditional sankha (conch) and chakra (wheel) motifs. Handwoven by master artisans from Bargarh.',
//     price: 14500,
//     originalPrice: 16500,
//     category: Category.SAMBALPURI,
//     images: [
//       'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800',
//       'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800'
//     ],
//     fabric: 'Pure Silk',
//     weave: 'Double Ikat',
//     length: '6.5 Meters',
//     blousePiece: true,
//     stock: 7,
//     rating: 4.6,
//     reviews: 18,
//     isBestSeller: false,
//     isHot: true,
//     careInstructions: 'Dry clean only.',
//     colors: ['Peacock Blue', 'Gold', 'Silver']
//   },
//   {
//     id: '8',
//     name: 'Rustic Red Bomkai Cotton',
//     description: 'Traditional Bomkai cotton saree in earthy red tones. Features the classic fish motif (machha kani) and temple border.',
//     price: 5200,
//     originalPrice: 6200,
//     category: Category.COTTON,
//     images: [
//       'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800',
//       'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800'
//     ],
//     fabric: 'Handloom Cotton',
//     weave: 'Bomkai',
//     length: '5.5 Meters',
//     blousePiece: true,
//     stock: 20,
//     rating: 4.4,
//     reviews: 27,
//     isBestSeller: false,
//     careInstructions: 'Hand wash with mild soap.',
//     colors: ['Rustic Red', 'Cream']
//   },
//   {
//     id: '9',
//     name: 'Midnight Black Ikat Silk',
//     description: 'Elegant black silk saree with silver-grey ikat patterns. Perfect for evening events and formal gatherings.',
//     price: 15800,
//     originalPrice: 18500,
//     category: Category.SILK,
//     images: [
//       'https://images.unsplash.com/photo-1610030469668-935142b9cdd0?q=80&w=800',
//       'https://images.unsplash.com/photo-1583391733975-ac9d9c240995?q=80&w=800'
//     ],
//     fabric: 'Pure Tussar Silk',
//     weave: 'Double Ikat',
//     length: '6.2 Meters',
//     blousePiece: true,
//     stock: 4,
//     rating: 4.8,
//     reviews: 14,
//     isHot: true,
//     careInstructions: 'Dry clean recommended.',
//     colors: ['Black', 'Silver']
//   },
//   {
//     id: '10',
//     name: 'Sunflower Yellow Cotton Ikat',
//     description: 'Bright and cheerful cotton saree with sunflower-inspired ikat patterns. Lightweight and perfect for summer days.',
//     price: 3800,
//     originalPrice: 4200,
//     category: Category.COTTON,
//     images: [
//       'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800',
//       'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800'
//     ],
//     fabric: 'Fine Cotton',
//     weave: 'Single Ikat',
//     length: '5.5 Meters',
//     blousePiece: true,
//     stock: 25,
//     rating: 4.3,
//     reviews: 21,
//     careInstructions: 'Machine wash gentle cycle.',
//     colors: ['Yellow', 'White']
//   },
//   {
//     id: '11',
//     name: 'Teal Green Khandua Silk',
//     description: 'Rich teal green Khandua silk with traditional bandha patterns. Features the famous conch and wheel motifs.',
//     price: 11200,
//     originalPrice: 12800,
//     category: Category.TRADITIONAL,
//     images: [
//       'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800',
//       'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800'
//     ],
//     fabric: 'Nuapatna Silk',
//     weave: 'Khandua',
//     length: '6.0 Meters',
//     blousePiece: true,
//     stock: 6,
//     rating: 4.7,
//     reviews: 9,
//     isBestSeller: true,
//     careInstructions: 'Dry clean only.',
//     colors: ['Teal', 'Gold']
//   },
//   {
//     id: '12',
//     name: 'Burgundy Wine Sambalpuri Silk',
//     description: 'Deep burgundy silk saree with gold zari work. Traditional shankha (conch) and phula (flower) motifs adorn the border.',
//     price: 16500,
//     originalPrice: 19000,
//     category: Category.SAMBALPURI,
//     images: [
//       'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800',
//       'https://images.unsplash.com/photo-1610030469668-935142b9cdd0?q=80&w=800'
//     ],
//     fabric: 'Pure Mulberry Silk',
//     weave: 'Double Ikat',
//     length: '6.3 Meters',
//     blousePiece: true,
//     stock: 3,
//     rating: 4.9,
//     reviews: 16,
//     isHot: true,
//     careInstructions: 'Dry clean only.',
//     colors: ['Burgundy', 'Gold']
//   },
//   {
//     id: '13',
//     name: 'Ocean Blue Cotton Ikat',
//     description: 'Cool ocean blue cotton saree with wave-like ikat patterns. Breathable and comfortable for daily wear.',
//     price: 4200,
//     originalPrice: 4800,
//     category: Category.COTTON,
//     images: [
//       'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800',
//       'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800'
//     ],
//     fabric: 'Handloom Cotton',
//     weave: 'Single Ikat',
//     length: '5.5 Meters',
//     blousePiece: true,
//     stock: 18,
//     rating: 4.5,
//     reviews: 22,
//     careInstructions: 'Machine wash cold.',
//     colors: ['Ocean Blue', 'White']
//   },
//   {
//     id: '14',
//     name: 'Crimson Red Bomkai Silk',
//     description: 'Traditional Bomkai silk in vibrant crimson. Features intricate thread work and the classic temple border design.',
//     price: 19500,
//     originalPrice: 22500,
//     category: Category.SILK,
//     images: [
//       'https://images.unsplash.com/photo-1610030469668-935142b9cdd0?q=80&w=800',
//       'https://images.unsplash.com/photo-1583391733975-ac9d9c240995?q=80&w=800'
//     ],
//     fabric: 'Tussar Silk',
//     weave: 'Bomkai Extra Weft',
//     length: '6.4 Meters',
//     blousePiece: true,
//     stock: 4,
//     rating: 4.8,
//     reviews: 11,
//     isBestSeller: true,
//     careInstructions: 'Dry clean only.',
//     colors: ['Crimson Red', 'Gold']
//   },
//   {
//     id: '15',
//     name: 'Forest Green Men\'s Ikat Kurta',
//     description: 'Traditional handloom cotton kurta with forest green ikat patterns. Perfect for festivals and cultural events.',
//     price: 3500,
//     originalPrice: 4000,
//     category: Category.MENS_SHIRTS,
//     images: [
//       'https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?q=80&w=800',
//       'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800'
//     ],
//     fabric: 'Handloom Cotton',
//     weave: 'Ikat',
//     length: 'N/A',
//     blousePiece: false,
//     stock: 12,
//     rating: 4.6,
//     reviews: 8,
//     isHot: true,
//     careInstructions: 'Dry clean recommended.',
//     colors: ['Forest Green', 'Cream']
//   },
//   {
//     id: '16',
//     name: 'Mauve Pink Sambalpuri Silk',
//     description: 'Delicate mauve pink silk saree with traditional ikat patterns. Lightweight and perfect for daytime events.',
//     price: 13500,
//     originalPrice: 15500,
//     category: Category.SAMBALPURI,
//     images: [
//       'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800',
//       'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800'
//     ],
//     fabric: 'Pure Silk',
//     weave: 'Double Ikat',
//     length: '6.2 Meters',
//     blousePiece: true,
//     stock: 9,
//     rating: 4.7,
//     reviews: 13,
//     careInstructions: 'Dry clean only.',
//     colors: ['Mauve Pink', 'Silver']
//   },
//   {
//     id: '17',
//     name: 'Saffron Orange Khandua Silk',
//     description: 'Sacred saffron orange Khandua silk, traditionally offered at the Jagannath temple. Features the famous Gita Govinda inscriptions.',
//     price: 10500,
//     originalPrice: 12000,
//     category: Category.TRADITIONAL,
//     images: [
//       'https://images.unsplash.com/photo-1610030469668-935142b9cdd0?q=80&w=800',
//       'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800'
//     ],
//     fabric: 'Nuapatna Silk',
//     weave: 'Khandua',
//     length: '5.8 Meters',
//     blousePiece: true,
//     stock: 7,
//     rating: 4.8,
//     reviews: 19,
//     isBestSeller: true,
//     careInstructions: 'Dry clean only.',
//     colors: ['Saffron', 'Gold']
//   },
//   {
//     id: '18',
//     name: 'Turquoise Blue Cotton Ikat',
//     description: 'Refreshing turquoise blue cotton saree with geometric ikat patterns. Perfect for casual wear and office.',
//     price: 3900,
//     originalPrice: 4500,
//     category: Category.COTTON,
//     images: [
//       'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800',
//       'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800'
//     ],
//     fabric: 'Handloom Cotton',
//     weave: 'Single Ikat',
//     length: '5.5 Meters',
//     blousePiece: true,
//     stock: 22,
//     rating: 4.4,
//     reviews: 25,
//     careInstructions: 'Machine wash gentle.',
//     colors: ['Turquoise', 'White']
//   },
//   {
//     id: '19',
//     name: 'Charcoal Grey Ikat Silk',
//     description: 'Sophisticated charcoal grey silk saree with subtle ikat patterns. Contemporary design with traditional weaving techniques.',
//     price: 14800,
//     originalPrice: 17000,
//     category: Category.SILK,
//     images: [
//       'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800',
//       'https://images.unsplash.com/photo-1610030469668-935142b9cdd0?q=80&w=800'
//     ],
//     fabric: 'Tussar Silk',
//     weave: 'Single Ikat',
//     length: '6.2 Meters',
//     blousePiece: true,
//     stock: 5,
//     rating: 4.6,
//     reviews: 7,
//     isHot: true,
//     careInstructions: 'Dry clean only.',
//     colors: ['Charcoal Grey', 'Silver']
//   },
//   {
//     id: '20',
//     name: 'Lavender Purple Sambalpuri Silk',
//     description: 'Soft lavender purple silk saree with traditional bandha patterns. Elegant and unique for special occasions.',
//     price: 14200,
//     originalPrice: 16000,
//     category: Category.SAMBALPURI,
//     images: [
//       'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800',
//       'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800'
//     ],
//     fabric: 'Pure Silk',
//     weave: 'Double Ikat',
//     length: '6.2 Meters',
//     blousePiece: true,
//     stock: 6,
//     rating: 4.7,
//     reviews: 11,
//     careInstructions: 'Dry clean only.',
//     colors: ['Lavender', 'Gold']
//   },
//   {
//     id: '21',
//     name: 'Terracotta Red Bomkai Cotton',
//     description: 'Traditional Bomkai cotton in earthy terracotta red. Features the classic fish motif and temple border.',
//     price: 4800,
//     originalPrice: 5500,
//     category: Category.COTTON,
//     images: [
//       'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800',
//       'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800'
//     ],
//     fabric: 'Handloom Cotton',
//     weave: 'Bomkai',
//     length: '5.5 Meters',
//     blousePiece: true,
//     stock: 16,
//     rating: 4.5,
//     reviews: 18,
//     careInstructions: 'Hand wash cold.',
//     colors: ['Terracotta', 'Cream']
//   },
//   {
//     id: '22',
//     name: 'Navy Blue Ikat Formal Shirt',
//     description: 'Premium navy blue handloom shirt with subtle ikat patterns. Perfect for formal occasions and office wear.',
//     price: 3400,
//     originalPrice: 3800,
//     category: Category.MENS_SHIRTS,
//     images: [
//       'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800',
//       'https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?q=80&w=800'
//     ],
//     fabric: 'Handloom Cotton',
//     weave: 'Ikat',
//     length: 'N/A',
//     blousePiece: false,
//     stock: 14,
//     rating: 4.8,
//     reviews: 9,
//     isBestSeller: true,
//     careInstructions: 'Machine wash cold.',
//     colors: ['Navy Blue', 'White']
//   },
//   {
//     id: '23',
//     name: 'Copper Bronze Silk Ikat',
//     description: 'Unique copper bronze silk saree with contemporary ikat patterns. A fusion of tradition and modern design.',
//     price: 16800,
//     originalPrice: 19200,
//     category: Category.SILK,
//     images: [
//       'https://images.unsplash.com/photo-1610030469668-935142b9cdd0?q=80&w=800',
//       'https://images.unsplash.com/photo-1583391733975-ac9d9c240995?q=80&w=800'
//     ],
//     fabric: 'Mulberry Silk',
//     weave: 'Double Ikat',
//     length: '6.2 Meters',
//     blousePiece: true,
//     stock: 4,
//     rating: 4.9,
//     reviews: 6,
//     isHot: true,
//     careInstructions: 'Dry clean only.',
//     colors: ['Copper', 'Gold']
//   },
//   {
//     id: '24',
//     name: 'Ivory White Cotton Ikat',
//     description: 'Elegant ivory white cotton saree with minimal ikat border. Lightweight and perfect for summer.',
//     price: 3600,
//     originalPrice: 4100,
//     category: Category.COTTON,
//     images: [
//       'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800',
//       'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800'
//     ],
//     fabric: 'Fine Cotton',
//     weave: 'Single Ikat',
//     length: '5.5 Meters',
//     blousePiece: true,
//     stock: 28,
//     rating: 4.3,
//     reviews: 24,
//     careInstructions: 'Machine wash gentle.',
//     colors: ['Ivory', 'Gold']
//   },
//   {
//     id: '25',
//     name: 'Plum Purple Khandua Silk',
//     description: 'Rich plum purple Khandua silk with traditional bandha patterns. Features intricate conch and wheel motifs.',
//     price: 11800,
//     originalPrice: 13500,
//     category: Category.TRADITIONAL,
//     images: [
//       'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800',
//       'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800'
//     ],
//     fabric: 'Nuapatna Silk',
//     weave: 'Khandua',
//     length: '6.0 Meters',
//     blousePiece: true,
//     stock: 5,
//     rating: 4.7,
//     reviews: 12,
//     careInstructions: 'Dry clean only.',
//     colors: ['Plum', 'Gold']
//   },
//   {
//     id: '26',
//     name: 'Sage Green Cotton Ikat',
//     description: 'Calming sage green cotton saree with delicate ikat patterns. Perfect for daily wear and casual occasions.',
//     price: 4100,
//     originalPrice: 4700,
//     category: Category.COTTON,
//     images: [
//       'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800',
//       'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800'
//     ],
//     fabric: 'Handloom Cotton',
//     weave: 'Single Ikat',
//     length: '5.5 Meters',
//     blousePiece: true,
//     stock: 19,
//     rating: 4.5,
//     reviews: 16,
//     careInstructions: 'Machine wash cold.',
//     colors: ['Sage Green', 'Cream']
//   }
// ];
// constants.tsx - Simplified version
export const HERO_IMAGES = [
  '/images/hero section 1.webp',
  '/images/hero section 2.webp',
  '/images/hero section  3.webp',
  '/images/hero section  4.webp',
  '/images/hero section  5.webp'
];

// Keep only static data that won't come from database
export const STORIES = [
  {
    id: 1,
    title: "A Piece of Heritage in Paris",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200",
    name: "Claire Bonnet",
    cat: "Silk Heritage",
    excerpt: "Wearing my Sambalpuri silk at a gala in Paris felt like carrying a piece of home. Everyone was mesmerized by the mathematical precision of the Ikat patterns."
  },
  {
    id: 2,
    title: "Reviving Ikat for Modern Work",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1200",
    name: "Anjali Patnaik",
    cat: "Ikat Cotton",
    excerpt: "I've transitioned my entire work wardrobe to handloom cotton. It's breathable, sustainable, and tells a story of an artisan's labor."
  },
  {
    id: 3,
    title: "The Wedding Trousseau of Dreams",
    img: "https://images.unsplash.com/photo-1610030469668-935142b9cdd0?q=80&w=1200",
    name: "Sneha Mohanty",
    cat: "Traditional Silk",
    excerpt: "Choosing Utkal Heritage for my wedding was the best decision. The Khandua silk saree was radiant and felt sacred."
  },
  {
    id: 4,
    title: "Men's Style: The Handloom Shift",
    img: "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?q=80&w=1200",
    name: "Rajesh Meher",
    cat: "Menswear",
    excerpt: "Finally, a place that treats men's handloom with the same dignity as sarees. The fit and the weave quality are unmatched."
  }
];

// Delete MOCK_PRODUCTS entirely - you'll fetch from API
// export const MOCK_PRODUCTS... (DELETE THIS)