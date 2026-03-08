// src/types.ts
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