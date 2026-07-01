import Product from '../models/Product.js';
import InventoryLog from '../models/InventoryLog.js';

/**
 * TANVO Unified Inventory Service
 * ----------------------------------
 * Single source-of-truth for all stock changes across:
 *   - Website orders
 *   - WhatsApp orders
 *   - Offline POS sales
 *
 * All functions are atomic – they check stock, update the product,
 * and write an InventoryLog record in a single operation sequence.
 */

// Statuses that trigger stock deduction for WhatsApp orders
export const WA_DEDUCT_STATUSES = new Set([
  'Customer Confirmed',
  'Advance Received',
  'Processing',
  'Shipped',
  'Delivered',
  'Completed'
]);

// Statuses that do NOT hold inventory (no deduction or restore needed)
export const WA_NEUTRAL_STATUSES = new Set([
  'New Inquiry'
]);

// Statuses that release stock back
export const WA_RESTORE_STATUSES = new Set([
  'Cancelled'
]);

/**
 * Deduct stock for a product.
 * Throws an error if the product has insufficient stock (prevents negative stock).
 *
 * @param {string} productId     - MongoDB ObjectId of the product
 * @param {number} quantity      - Number of units to deduct (must be > 0)
 * @param {'Website'|'WhatsApp'|'Offline'} channel
 * @param {string} orderReference - Human-readable order ID (e.g. WA-1001)
 * @param {string|null} createdBy - Admin user ObjectId (optional)
 * @returns {Object} Updated product document
 */
export const deductStock = async (productId, quantity, channel, orderReference = '', createdBy = null) => {
  // Atomic: find & decrement only if sufficient stock exists
  const product = await Product.findOneAndUpdate(
    { _id: productId, stock: { $gte: quantity } },
    { $inc: { stock: -quantity } },
    { new: true }
  );

  if (!product) {
    // Either product not found or insufficient stock
    const existing = await Product.findById(productId).select('name stock');
    if (!existing) {
      throw new Error(`Product not found: ${productId}`);
    }
    throw new Error(
      `Insufficient stock for "${existing.name}". Available: ${existing.stock}, Requested: ${quantity}`
    );
  }

  // Log the movement
  await InventoryLog.create({
    type: 'SALE',
    channel,
    productId: product._id,
    productName: product.name,
    quantity: -quantity,
    stockBefore: product.stock + quantity,
    stockAfter: product.stock,
    orderReference,
    createdBy
  });

  return product;
};

/**
 * Restore stock for a product (cancel/return scenario).
 *
 * @param {string} productId
 * @param {number} quantity
 * @param {'Website'|'WhatsApp'|'Offline'} channel
 * @param {string} orderReference
 * @param {string|null} createdBy
 * @param {'RESTOCK'|'RETURN'} type - Log entry type
 * @returns {Object} Updated product document
 */
export const restoreStock = async (
  productId,
  quantity,
  channel,
  orderReference = '',
  createdBy = null,
  type = 'RETURN'
) => {
  const product = await Product.findByIdAndUpdate(
    productId,
    { $inc: { stock: quantity } },
    { new: true }
  );

  if (!product) {
    throw new Error(`Product not found: ${productId}`);
  }

  await InventoryLog.create({
    type,
    channel,
    productId: product._id,
    productName: product.name,
    quantity: +quantity,
    stockBefore: product.stock - quantity,
    stockAfter: product.stock,
    orderReference,
    createdBy
  });

  return product;
};

/**
 * Add new stock to a product (restocking / admin adjustment).
 *
 * @param {string} productId
 * @param {number} quantity
 * @param {string} orderReference  - e.g. "Supplier invoice #XYZ"
 * @param {string|null} createdBy
 * @param {'RESTOCK'|'ADJUSTMENT'} type
 */
export const addStock = async (productId, quantity, orderReference = '', createdBy = null, type = 'RESTOCK') => {
  return restoreStock(productId, quantity, 'Offline', orderReference, createdBy, type);
};

/**
 * Deduct stock for a batch of products (used by order controllers).
 * Rolls back all already-processed products on any failure.
 *
 * @param {Array<{productId, quantity}>} items
 * @param {'Website'|'WhatsApp'|'Offline'} channel
 * @param {string} orderReference
 * @param {string|null} createdBy
 */
export const deductStockBatch = async (items, channel, orderReference = '', createdBy = null) => {
  const processed = [];
  try {
    for (const item of items) {
      const product = await deductStock(item.productId, item.quantity, channel, orderReference, createdBy);
      processed.push({ productId: item.productId, quantity: item.quantity, product });
    }
  } catch (err) {
    // Rollback already-processed items
    for (const p of processed) {
      try {
        await restoreStock(p.productId, p.quantity, channel, orderReference, createdBy, 'ADJUSTMENT');
      } catch (rollbackErr) {
        console.error(`[InventoryService] Rollback failed for ${p.productId}:`, rollbackErr.message);
      }
    }
    throw err; // re-throw original error
  }
};

/**
 * Restore stock for a batch of products (used on cancellations).
 *
 * @param {Array<{productId, quantity}>} items
 * @param {'Website'|'WhatsApp'|'Offline'} channel
 * @param {string} orderReference
 * @param {string|null} createdBy
 */
export const restoreStockBatch = async (items, channel, orderReference = '', createdBy = null) => {
  for (const item of items) {
    try {
      await restoreStock(item.productId, item.quantity, channel, orderReference, createdBy, 'RETURN');
    } catch (err) {
      console.error(`[InventoryService] restoreStockBatch failed for ${item.productId}:`, err.message);
    }
  }
};
