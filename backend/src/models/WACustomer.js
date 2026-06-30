import mongoose from 'mongoose';

const waCustomerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true, unique: true },
  whatsappNumber: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },

  address: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  pincode: { type: String, trim: true },

  // CRM tags
  tags: [{
    type: String,
    enum: ['VIP', 'Regular', 'New', 'Wholesale', 'Exhibition', 'Referral', 'Blocked']
  }],

  // Auto-calculated stats (updated on each order link)
  totalOrders: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  lastPurchaseDate: { type: Date },

  // All linked WA orders
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WhatsAppOrder' }],

  notes: { type: String, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Index for fast phone lookups (CRM dedup key)
waCustomerSchema.index({ phone: 1 });
waCustomerSchema.index({ name: 'text', phone: 'text' });

const WACustomer = mongoose.model('WACustomer', waCustomerSchema);
export default WACustomer;
