import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: Number,
    image: String,
    color: String,
    size: String
  }],
  shippingAddress: {
    addressLine1: { type: String, required: true },
    addressLine2: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' },
    phone: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['COD', 'Card', 'UPI', 'NetBanking', 'Wallet']
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  discountPrice: {
    type: Number,
    default: 0.0
  },
  couponCode: String,
  orderStatus: {
    type: String,
    required: true,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'],
    default: 'Pending'
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  deliveredAt: Date,
  cancelledAt: Date,
  cancellationReason: String,
  trackingNumber: String,
  estimatedDelivery: Date,
  notes: String,
  isGift: {
    type: Boolean,
    default: false
  },
  giftMessage: String
}, {
  timestamps: true
});

// Calculate totals before saving
orderSchema.pre('save', function(next) {
  if (this.orderItems && this.orderItems.length > 0) {
    this.itemsPrice = this.orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);
export default Order;