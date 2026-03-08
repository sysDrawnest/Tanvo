import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Women', 'Men', 'Accessories', 'Home Decor']
  },
  subCategory: {
    type: String,
    enum: ['Sarees', 'Kurtis', 'Dhoti', 'Kurta', 'Silk', 'Cotton', 'Jewelry', 'Bags']
  },
  weave: {
    type: String,
    enum: ['Sambalpuri', 'Bomkai', 'Ikat', 'Khandua', 'Pasapali', 'Sonepuri']
  },
  fabric: {
    type: String,
    enum: ['Silk', 'Cotton', 'Tussar', 'Matka', 'Linen', 'Muslin']
  },
  images: [{
    url: { type: String, required: true },
    publicId: String,
    isPrimary: { type: Boolean, default: false }
  }],
  stock: {
    type: Number,
    required: true,
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  colors: [String],
  sizes: [String],
  length: String,
  blousePiece: {
    type: Boolean,
    default: true
  },
  careInstructions: String,
  isFeatured: {
    type: Boolean,
    default: false
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  isNewArrival: {
    type: Boolean,
    default: false
  },
  ratings: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  tags: [String],
  weight: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  metaTitle: String,
  metaDescription: String,
  metaKeywords: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  weaverInfo: {
    name: String,
    generation: String,
    location: String,
    story: String
  }
}, {
  timestamps: true
});

// Create slug from name
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
  }
  next();
});

// Calculate discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Set as JSON virtuals true
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.model('Product', productSchema);
export default Product;