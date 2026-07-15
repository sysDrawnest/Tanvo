import { z } from 'zod';

// ===========================================
// Auth Schemas
// ===========================================
export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Please provide a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Please provide a valid email'),
  password: z.string().min(1, 'Password is required'),
});

// ===========================================
// Product Schemas
// ===========================================
export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(200),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  stock: z.coerce.number().int().min(0, 'Stock must be a non-negative integer'),
  category: z.string().min(1, 'Category is required'),
  weave: z.string().optional(),
  fabric: z.string().optional(),
  colors: z.union([z.array(z.string()), z.string()]).transform(val => {
    if (typeof val === 'string') {
      try {
        return JSON.parse(val);
      } catch {
        return [val];
      }
    }
    return val;
  }).optional(),
  sizes: z.union([z.array(z.string()), z.string()]).transform(val => {
    if (typeof val === 'string') {
      try {
        return JSON.parse(val);
      } catch {
        return [val];
      }
    }
    return val;
  }).optional(),
  featured: z.preprocess(val => val === 'true' || val === true, z.boolean()).optional(),
  discount: z.coerce.number().min(0).max(100).optional(),
});

export const updateProductSchema = createProductSchema.partial();

// ===========================================
// Order Schemas
// ===========================================
export const createOrderSchema = z.object({
  orderItems: z.array(
    z.object({
      product: z.string().min(1, 'Product ID is required'),
      name: z.string().min(1, 'Product name is required'),
      quantity: z.coerce.number().int().min(1, 'Quantity must be at least 1'),
      image: z.string().optional(),
      price: z.coerce.number().min(0),
      color: z.string().optional(),
      size: z.string().optional(),
    })
  ).min(1, 'Order must contain at least one item'),
  shippingAddress: z.object({
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    pincode: z.string().min(1, 'Pincode is required'),
    state: z.string().min(1, 'State is required'),
    country: z.string().default('India'),
    phone: z.string().min(1, 'Phone number is required'),
  }),
  paymentMethod: z.enum(['COD', 'Prepaid', 'Razorpay', 'Stripe']),
  itemsPrice: z.coerce.number().min(0).optional(),
  shippingPrice: z.coerce.number().min(0).optional(),
  taxPrice: z.coerce.number().min(0).optional(),
  totalPrice: z.coerce.number().min(0),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['Pending', 'Payment Pending', 'Payment Verified', 'Processing', 'Shipped', 'Delivered', 'Cancelled']),
});
