import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    color: String,
    size: String,
    price: Number
  }],
  totalPrice: {
    type: Number,
    default: 0
  },
  totalItems: {
    type: Number,
    default: 0
  },
  couponCode: String,
  discountAmount: {
    type: Number,
    default: 0
  },
  expiresAt: {
    type: Date,
    default: () => new Date(+new Date() + 7*24*60*60*1000) // 7 days
  }
}, {
  timestamps: true
});

// Calculate totals before saving
cartSchema.pre('save', async function(next) {
  if (this.items && this.items.length > 0) {
    this.totalItems = this.items.reduce((acc, item) => acc + item.quantity, 0);
    
    // Populate product prices
    await this.populate('items.product');
    this.totalPrice = this.items.reduce(
      (acc, item) => acc + (item.product.price * item.quantity),
      0
    );
  } else {
    this.totalItems = 0;
    this.totalPrice = 0;
  }
  next();
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;