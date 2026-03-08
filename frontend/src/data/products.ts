// src/data/products.ts

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: string;
    images: string[];
    fabric: string;
    weave: string;
    length: string;
    blousePiece: boolean;
    stock: number;
    rating: number;
    reviews: number;
    isBestSeller?: boolean;
    isHot?: boolean;
    careInstructions: string;
    colors?: string[];
  }
  
  export const MOCK_PRODUCTS: Product[] = [
    {
      id: '1',
      name: 'Royal Maroon Sambalpuri Silk',
      description: 'A masterpiece of Sambalpuri ikat weaving featuring traditional conch motifs and intricate border work. This exquisite piece showcases the finest craftsmanship of Odisha\'s master weavers.',
      price: 12500,
      originalPrice: 15000,
      category: 'Sambalpuri',
      images: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800',
        'https://images.unsplash.com/photo-1610030469668-935142b9cdd0?w=800'
      ],
      fabric: 'Pure Mulberry Silk',
      weave: 'Double Ikat',
      length: '6.2 Meters',
      blousePiece: true,
      stock: 5,
      rating: 4.8,
      reviews: 24,
      isBestSeller: true,
      isHot: true,
      careInstructions: 'Dry clean only. Store in muslin cloth. Keep away from direct sunlight.',
      colors: ['Maroon', 'Gold', 'Cream']
    },
    {
      id: '2',
      name: 'Indigo Blue Pasapalli Cotton',
      description: 'Classic checkered Pasapalli pattern rendered in deep indigo. Each square tells a story of traditional Odisha gaming boards transformed into wearable art.',
      price: 4500,
      originalPrice: 5200,
      category: 'Cotton',
      images: [
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800'
      ],
      fabric: 'Mercerized Cotton',
      weave: 'Single Ikat Pasapalli',
      length: '5.5 Meters',
      blousePiece: true,
      stock: 12,
      rating: 4.5,
      reviews: 15,
      isHot: true,
      careInstructions: 'Hand wash separately with mild detergent. Dry in shade.',
      colors: ['Indigo', 'White']
    },
    {
      id: '3',
      name: 'Golden Yellow Bomkai Silk',
      description: 'Intricate thread work and Jala patterns from Ganjam. This traditional Bomkai features exquisite temple borders and fish motifs that symbolize prosperity.',
      price: 18000,
      originalPrice: 22000,
      category: 'Silk',
      images: [
        'https://images.unsplash.com/photo-1583391733975-ac9d9c240995?w=800',
        'https://images.unsplash.com/photo-1610030469668-935142b9cdd0?w=800'
      ],
      fabric: 'Tussar Silk',
      weave: 'Bomkai Extra Weft',
      length: '6.3 Meters',
      blousePiece: true,
      stock: 3,
      rating: 4.9,
      reviews: 10,
      isHot: true,
      careInstructions: 'Dry clean only. Store in cotton wrap.',
      colors: ['Golden Yellow', 'Red', 'Green']
    },
    {
      id: '4',
      name: 'Emerald Green Khandua Silk',
      description: 'The sacred fabric of Lord Jagannath, traditionally woven in Nuapatna. Features the famous "Gita Govinda" inscriptions on the border.',
      price: 9800,
      originalPrice: 11500,
      category: 'Traditional',
      images: [
        'https://images.unsplash.com/photo-1610030469668-935142b9cdd0?w=800',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800'
      ],
      fabric: 'Nuapatna Silk',
      weave: 'Khandua Ikat',
      length: '5.8 Meters',
      blousePiece: false,
      stock: 8,
      rating: 4.7,
      reviews: 32,
      careInstructions: 'Dry clean recommended. Do not wring.',
      colors: ['Emerald Green', 'Gold']
    },
    {
      id: '5',
      name: 'Peacock Blue Sambalpuri Silk',
      description: 'Vibrant peacock blue silk saree with traditional sankha (conch) and chakra (wheel) motifs. Handwoven by master artisans from Bargarh.',
      price: 14500,
      originalPrice: 16500,
      category: 'Sambalpuri',
      images: [
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800'
      ],
      fabric: 'Pure Silk',
      weave: 'Double Ikat',
      length: '6.5 Meters',
      blousePiece: true,
      stock: 7,
      rating: 4.6,
      reviews: 18,
      isBestSeller: true,
      careInstructions: 'Dry clean only.',
      colors: ['Peacock Blue', 'Gold', 'Silver']
    },
    {
      id: '6',
      name: 'Rustic Red Bomkai Cotton',
      description: 'Traditional Bomkai cotton saree in earthy red tones. Features the classic fish motif (machha kani) and temple border.',
      price: 5200,
      originalPrice: 6200,
      category: 'Cotton',
      images: [
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800',
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800'
      ],
      fabric: 'Handloom Cotton',
      weave: 'Bomkai',
      length: '5.5 Meters',
      blousePiece: true,
      stock: 20,
      rating: 4.4,
      reviews: 27,
      careInstructions: 'Hand wash with mild soap.',
      colors: ['Rustic Red', 'Cream']
    }
  ];