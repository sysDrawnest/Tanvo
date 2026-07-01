import mongoose from 'mongoose';

// Auto-increment counter for WA order numbers
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 1000 }
});
const Counter = mongoose.models.WACounter || mongoose.model('WACounter', counterSchema);

const whatsAppOrderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },

  // ── Customer Reference (CRM link) ────────────────
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WACustomer',
    default: null
  },

  // ── Customer Details (snapshot at order time) ────
  customer: {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    whatsappNumber: { type: String, trim: true },
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true }
  },

  // ── Products ─────────────────────────────────────
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: null
    },
    name: { type: String, required: true },
    image: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },     // selling price
    costPrice: { type: Number, default: 0, min: 0 },     // cost / purchase price
    quantity: { type: Number, required: true, min: 1, default: 1 },
    isManual: { type: Boolean, default: false }
  }],

  // ── Financials ────────────────────────────────────
  totalAmount: { type: Number, required: true, min: 0 },

  // ── Cost Breakdown (for profit tracking) ─────────
  costs: {
    shipping:  { type: Number, default: 0 },
    packaging: { type: Number, default: 0 },
    other:     { type: Number, default: 0 }
  },

  // ── Auto-calculated Profit ───────────────────────
  profit: {
    totalCost:  { type: Number, default: 0 },  // sum of all costs
    netProfit:  { type: Number, default: 0 },  // revenue - totalCost
    margin:     { type: Number, default: 0 }   // (netProfit / totalAmount) * 100
  },

  // ── Payment ──────────────────────────────────────
  payment: {
    method: {
      type: String,
      enum: ['COD', 'UPI', 'Bank Transfer', 'Cash', 'Partial Advance'],
      default: 'UPI'
    },
    status: {
      type: String,
      enum: ['Pending', 'Advance Paid', 'Partially Paid', 'Paid', 'Refunded'],
      default: 'Pending'
    },
    advance:   { type: Number, default: 0 },
    remaining: { type: Number, default: 0 }, // auto-calculated
    screenshot: {
      url:        { type: String, default: '' },
      publicId:   { type: String, default: '' },
      uploadedAt: { type: Date }
    }
  },

  // ── Order Meta ────────────────────────────────────
  source: {
    type: String,
    enum: ['WhatsApp', 'Direct WhatsApp', 'Instagram DM', 'Facebook', 'Offline Store', 'Exhibition', 'Referral', 'Returning Customer'],
    default: 'WhatsApp'
  },

  status: {
    type: String,
    enum: ['New Inquiry', 'Customer Confirmed', 'Advance Received', 'Processing', 'Shipped', 'Delivered', 'Completed', 'Cancelled'],
    default: 'New Inquiry'
  },

  // ── Status History Timeline ───────────────────────
  statusHistory: [{
    status:    { type: String },
    changedAt: { type: Date, default: Date.now },
    note:      { type: String, default: '' }
  }],

  // ── Tracking ──────────────────────────────────────
  trackingInfo: {
    courierName:    { type: String, trim: true },
    trackingNumber: { type: String, trim: true },
    trackingUrl:    { type: String, trim: true },
    shippingDate:   { type: Date }
  },

  notes: { type: String, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// ── Pre-save: order number + profit + remaining ───────────────────────────────
whatsAppOrderSchema.pre('save', async function (next) {
  // Auto-generate WA order number
  if (!this.orderNumber) {
    const counter = await Counter.findByIdAndUpdate(
      'wa_order_seq',
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const seqNum = counter.seq < 1000 ? counter.seq + 1000 : counter.seq;
    this.orderNumber = `WA-${seqNum}`;
  }

  // Auto-set initial status history
  if (this.isNew && (!this.statusHistory || this.statusHistory.length === 0)) {
    this.statusHistory = [{ status: this.status, changedAt: new Date(), note: 'Order created' }];
  }

  // Auto-calculate remaining payment
  if (this.payment) {
    this.payment.remaining = Math.max(0, this.totalAmount - (this.payment.advance || 0));
  }

  // Auto-calculate profit
  const productCost = (this.products || []).reduce(
    (sum, p) => sum + ((p.costPrice || 0) * (p.quantity || 1)), 0
  );
  const extraCosts = (this.costs?.shipping || 0) + (this.costs?.packaging || 0) + (this.costs?.other || 0);
  const totalCost = productCost + extraCosts;
  const netProfit = this.totalAmount - totalCost;
  const margin = this.totalAmount > 0 ? (netProfit / this.totalAmount) * 100 : 0;

  this.profit = {
    totalCost: Math.round(totalCost),
    netProfit:  Math.round(netProfit),
    margin:     Math.round(margin * 100) / 100
  };

  next();
});

const WhatsAppOrder = mongoose.model('WhatsAppOrder', whatsAppOrderSchema);
export default WhatsAppOrder;
