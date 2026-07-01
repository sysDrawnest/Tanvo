import mongoose from 'mongoose';

/**
 * InventoryLog – records every stock movement across all sales channels.
 *
 * type      : SALE | RESTOCK | RETURN | ADJUSTMENT
 * channel   : Website | WhatsApp | Offline
 * quantity  : negative for deductions, positive for restores/restocks
 */
const inventoryLogSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['SALE', 'RESTOCK', 'RETURN', 'ADJUSTMENT'],
    required: true
  },
  channel: {
    type: String,
    enum: ['Website', 'WhatsApp', 'Offline'],
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: { type: String, default: '' },
  quantity: { type: Number, required: true }, // negative = deduction, positive = restock
  stockBefore: { type: Number, default: 0 },
  stockAfter: { type: Number, default: 0 },
  orderReference: { type: String, default: '' }, // e.g. WA-1001 or website order _id
  note: { type: String, default: '' },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, { timestamps: true });

inventoryLogSchema.index({ productId: 1, createdAt: -1 });
inventoryLogSchema.index({ channel: 1, createdAt: -1 });
inventoryLogSchema.index({ orderReference: 1 });

const InventoryLog = mongoose.model('InventoryLog', inventoryLogSchema);
export default InventoryLog;
