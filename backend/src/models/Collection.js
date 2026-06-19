import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Collection name is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Collection slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Collection description is required']
  },
  bannerImage: {
    type: String,
    required: [true, 'Banner image url is required']
  },
  type: {
    type: String,
    enum: ['manual', 'automatic'],
    default: 'manual'
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  rules: {
    weave: { type: String, default: '' },
    fabric: { type: String, default: '' },
    category: { type: String, default: '' },
    priceRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 1000000 }
    }
  },
  seo: {
    title: { type: String, default: '' },
    description: { type: String, default: '' }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Pre-save slug generation if not provided
collectionSchema.pre('validate', function(next) {
  if (this.name && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

const Collection = mongoose.model('Collection', collectionSchema);
export default Collection;
