// types.ts

export enum Category {
  SAMBALPURI = 'SAMBALPURI',
  COTTON = 'COTTON',
  SILK = 'SILK',
  TRADITIONAL = 'TRADITIONAL',
  MENS_SHIRTS = 'MENS_SHIRTS',
  WOMENS_WEAR = 'WOMENS_WEAR',
  ACCESSORIES = 'ACCESSORIES'
}

// Add this new interface for product images
export interface ProductImage {
  url: string;
  publicId: string;
  isPrimary: boolean;
}

export interface Product {
  _id: string;                    // Changed from 'id' to '_id' to match MongoDB
  id?: string;                     // Keep for backward compatibility if needed
  name: string;
  description: string;
  shortDescription?: string;       // Add this field
  price: number;
  originalPrice?: number;
  category: string;                // Changed from Category enum to string for flexibility
  subCategory?: string;            // Add this field
  weave: string;
  fabric: string;
  images: ProductImage[];          // Changed from string[] to ProductImage[]
  stock: number;
  colors?: string[];
  sizes?: string[];
  length?: string;
  blousePiece: boolean;
  careInstructions?: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  ratings: number;
  numReviews: number;              // Changed from 'reviews' to 'numReviews' to match DB
  tags?: string[];
  weaverInfo?: {
    name: string;
    generation: string;
    location: string;
    story: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phone?: string;
  profileImage?: string;
  addresses?: Address[];
  wishlist?: string[];             // Array of product IDs
  createdAt?: string;  
  updatedAt?: string;  
}

export interface Address {
  _id?: string;
  type: 'home' | 'work' | 'other';
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;                // Made optional with default 'India'
  phone?: string;                  // Add phone field
  isDefault: boolean;
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
  price: number;                   // Price at time of adding to cart
}

export interface Cart {
  _id: string;
  user: string;                     // User ID
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  couponCode?: string;
  discountAmount?: number;
  expiresAt?: Date;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderItem {
  product: Product | string;        // Can be populated or just ID
  name: string;
  quantity: number;
  price: number;
  image: string;
  color?: string;
  size?: string;
}

export interface Order {
  _id: string;
  user: User | string;              // Can be populated or just ID
  orderItems: OrderItem[];
  shippingAddress: Address;
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  discountPrice?: number;
  couponCode?: string;
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  deliveredAt?: Date;
  cancelledAt?: Date;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  notes?: string;
  isGift?: boolean;
  giftMessage?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Review {
  _id: string;
  user: User | string;              // Can be populated or just ID
  product: Product | string;         // Can be populated or just ID
  order?: string;                    // Order ID if verified purchase
  rating: number;
  title?: string;
  comment: string;
  images?: Array<{ url: string; publicId: string }>;
  isVerifiedPurchase: boolean;
  helpful: string[];                 // Array of user IDs who found this helpful
  status?: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
  token?: string;
  page?: number;
  pages?: number;
  total?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

// Helper type for product image URL extraction
export const getProductImageUrl = (product: Product): string => {
  if (product.images && product.images.length > 0) {
    const firstImage = product.images[0];
    if (typeof firstImage === 'string') {
      return firstImage;
    }
    return firstImage.url || '';
  }
  return '/placeholder.png';
};