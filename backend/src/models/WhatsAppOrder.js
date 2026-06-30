import mongoose from 'mongoose';

// Auto-increment counter for WA order numbers
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 1000 }
});
const Counter = mongoose.models.WACounter || mongoose.model('WACounter', counterSchema);

const whatsAppOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },

  // ── Customer Details ────────────────────────────
  customer: {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    whatsappNumber: { type: String, trim: true },
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true }
  },

  // ── Products ────────────────────────────────────
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: null
    },
    name: { type: String, required: true },
    image: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    isManual: { type: Boolean, default: false } // true = not linked to catalog
  }],

  // ── Financials ──────────────────────────────────
  totalAmount: { type: Number, required: true, min: 0 },

  // ── Payment ─────────────────────────────────────
  payment: {
    method: {
      type: String,
      enum: ['COD', 'UPI', 'Bank Transfer', 'Cash', 'Partial Advance'],
      default: 'COD'
    },
    status: {
      type: String,
      enum: ['Pending', 'Partial', 'Paid'],
      default: 'Pending'
    },
    advance: { type: Number, default: 0 },
    remaining: { type: Number, default: 0 }, // auto-calculated
    screenshot: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
      uploadedAt: { type: Date }
    }
  },

  // ── Order Meta ──────────────────────────────────
  source: {
    type: String,
    enum: ['WhatsApp', 'Direct WhatsApp', 'Instagram', 'Offline'],
    default: 'WhatsApp'
  },

  status: {
    type: String,
    enum: ['New Inquiry', 'Chat Started', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'New Inquiry'
  },

  trackingNumber: { type: String, trim: true },
  notes: { type: String, trim: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Auto-generate WA order number before save
whatsAppOrderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const counter = await Counter.findByIdAndUpdate(
      'wa_order_seq',
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.orderNumber = `WA-${counter.seq}`;
  }

  // Auto-calculate remaining amount
  if (this.payment) {
    this.payment.remaining = Math.max(0, this.totalAmount - (this.payment.advance || 0));
  }

  next();
});

// Also recalculate remaining on update
whatsAppOrderSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update && update.$set) {
    const total = update.$set.totalAmount;
    const advance = update.$set['payment.advance'];
    if (total !== undefined && advance !== undefined) {
      update.$set['payment.remaining'] = Math.max(0, total - advance);
    }
  }
  next();
});

const WhatsAppOrder = mongoose.model('WhatsAppOrder', whatsAppOrderSchema);
export default WhatsAppOrder;
