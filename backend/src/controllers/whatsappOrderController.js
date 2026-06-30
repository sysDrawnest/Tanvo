import WhatsAppOrder from '../models/WhatsAppOrder.js';
import { v2 as cloudinary } from 'cloudinary';
import { uploadToCloudinary } from '../middleware/upload.js';
import { findOrCreateCustomer, syncCustomerStats } from './waCustomerController.js';
import WACustomer from '../models/WACustomer.js';

// ── List all WA orders ───────────────────────────────────────────────────────
export const getWhatsAppOrders = async (req, res) => {
  try {
    const { status, source, page = 1, limit = 20, search } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (source) filter.source = source;
    if (search) {
      filter.$or = [
        { 'customer.name': { $regex: search, $options: 'i' } },
        { 'customer.phone': { $regex: search, $options: 'i' } },
        { orderNumber: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [orders, total] = await Promise.all([
      WhatsAppOrder.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('products.productId', 'name images price')
        .populate('createdBy', 'name')
        .populate('customerId', 'totalOrders tags'),
      WhatsAppOrder.countDocuments(filter)
    ]);

    res.json({
      success: true,
      orders,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Get single WA order ──────────────────────────────────────────────────────
export const getWhatsAppOrderById = async (req, res) => {
  try {
    const order = await WhatsAppOrder.findById(req.params.id)
      .populate('products.productId', 'name images price category')
      .populate('createdBy', 'name email')
      .populate('customerId', 'name phone totalOrders totalSpent tags');

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Create WA order (with CRM customer linking) ──────────────────────────────
export const createWhatsAppOrder = async (req, res) => {
  try {
    // Check for returning customer by phone
    const phone = req.body.customer?.phone?.trim();
    let existingCustomer = null;
    let isReturning = false;

    if (phone) {
      existingCustomer = await WACustomer.findOne({ phone }).select('_id name totalOrders');
      if (existingCustomer) {
        isReturning = true;
      }
    }

    const orderData = {
      ...req.body,
      createdBy: req.user._id
    };

    // If returning customer confirmed linking (sent customerId in body), use it
    // Otherwise create/find customer
    let customer = null;
    if (req.body.customerId) {
      customer = await WACustomer.findById(req.body.customerId);
    } else if (req.body.customer) {
      customer = await findOrCreateCustomer(req.body.customer, req.user._id);
    }

    if (customer) {
      orderData.customerId = customer._id;
      // If no source set and returning customer, tag as Returning
      if (isReturning && !req.body.source) {
        orderData.source = 'Returning Customer';
      }
    }

    const order = new WhatsAppOrder(orderData);
    await order.save();

    // Link order to customer and sync stats
    if (customer) {
      await WACustomer.findByIdAndUpdate(customer._id, {
        $addToSet: { orders: order._id }
      });
      await syncCustomerStats(customer._id);
    }

    res.status(201).json({
      success: true,
      order,
      returningCustomer: isReturning ? existingCustomer : null
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ── Check if customer exists by phone (for returning customer prompt) ─────────
export const checkCustomerByPhone = async (req, res) => {
  try {
    const { phone } = req.params;
    const customer = await WACustomer.findOne({ phone: phone.trim() })
      .select('name phone totalOrders totalSpent lastPurchaseDate tags city');

    res.json({ success: true, customer: customer || null });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Update WA order ──────────────────────────────────────────────────────────
export const updateWhatsAppOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const order = await WhatsAppOrder.findById(id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    // Handle payment updates carefully to not overwrite screenshot
    if (updates.payment) {
      if (updates.payment.method) order.payment.method = updates.payment.method;
      if (updates.payment.status) order.payment.status = updates.payment.status;
      if (updates.payment.advance !== undefined) order.payment.advance = updates.payment.advance;
    }

    if (updates.totalAmount !== undefined) order.totalAmount = updates.totalAmount;

    // Handle tracking info safely
    if (updates.trackingInfo) {
      if (!order.trackingInfo) order.trackingInfo = {};
      if (updates.trackingInfo.courierName  !== undefined) order.trackingInfo.courierName  = updates.trackingInfo.courierName;
      if (updates.trackingInfo.trackingNumber !== undefined) order.trackingInfo.trackingNumber = updates.trackingInfo.trackingNumber;
      if (updates.trackingInfo.trackingUrl  !== undefined) order.trackingInfo.trackingUrl  = updates.trackingInfo.trackingUrl;
      if (updates.trackingInfo.shippingDate !== undefined) order.trackingInfo.shippingDate = updates.trackingInfo.shippingDate || null;
    }

    // Handle cost updates
    if (updates.costs) {
      if (!order.costs) order.costs = {};
      if (updates.costs.shipping  !== undefined) order.costs.shipping  = updates.costs.shipping;
      if (updates.costs.packaging !== undefined) order.costs.packaging = updates.costs.packaging;
      if (updates.costs.other     !== undefined) order.costs.other     = updates.costs.other;
    }

    // Handle other scalar updates (NOT status - use updateOrderStatus for that)
    if (updates.source) order.source = updates.source;
    if (updates.notes  !== undefined) order.notes = updates.notes;

    // Handle customer info safely
    if (updates.customer) {
      if (!order.customer) order.customer = {};
      ['name','phone','address','city','state','pincode'].forEach(f => {
        if (updates.customer[f] !== undefined) order.customer[f] = updates.customer[f];
      });
    }

    if (updates.products) order.products = updates.products;

    await order.save(); // triggers pre-save: recalculates profit + remaining

    // Sync customer stats if cost/total changed
    if (order.customerId && (updates.totalAmount !== undefined || updates.costs)) {
      await syncCustomerStats(order.customerId);
    }

    await order.populate('products.productId', 'name images price');
    res.json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ── Update order status WITH history append ──────────────────────────────────
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const order = await WhatsAppOrder.findById(id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    const oldStatus = order.status;
    order.status = status;

    // Append to history timeline
    if (!order.statusHistory) order.statusHistory = [];
    order.statusHistory.push({
      status,
      changedAt: new Date(),
      note: note || `Status changed from ${oldStatus} to ${status}`
    });

    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ── Delete WA order ──────────────────────────────────────────────────────────
export const deleteWhatsAppOrder = async (req, res) => {
  try {
    const order = await WhatsAppOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    if (order.payment?.screenshot?.publicId) {
      await cloudinary.uploader.destroy(order.payment.screenshot.publicId);
    }

    // Unlink from customer and re-sync stats
    if (order.customerId) {
      await WACustomer.findByIdAndUpdate(order.customerId, {
        $pull: { orders: order._id }
      });
      await syncCustomerStats(order.customerId);
    }

    await order.deleteOne();
    res.json({ success: true, message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Upload payment screenshot ────────────────────────────────────────────────
export const uploadPaymentScreenshot = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    const order = await WhatsAppOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    if (order.payment?.screenshot?.publicId) {
      await cloudinary.uploader.destroy(order.payment.screenshot.publicId);
    }

    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'tanvo/payment-proofs',
      resource_type: 'image',
      quality: 'auto',
      format: 'auto'
    });

    order.payment.screenshot = {
      url: result.secure_url,
      publicId: result.public_id,
      uploadedAt: new Date()
    };
    await order.save();
    res.json({ success: true, screenshot: order.payment.screenshot });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Delete payment screenshot ────────────────────────────────────────────────
export const deletePaymentScreenshot = async (req, res) => {
  try {
    const order = await WhatsAppOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    if (order.payment?.screenshot?.publicId) {
      await cloudinary.uploader.destroy(order.payment.screenshot.publicId);
    }
    order.payment.screenshot = { url: '', publicId: '', uploadedAt: undefined };
    await order.save();
    res.json({ success: true, message: 'Screenshot deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Analytics / Stats (with profit) ─────────────────────────────────────────
export const getWhatsAppOrderStats = async (req, res) => {
  try {
    const { range = 'all' } = req.query;

    let dateFilter = {};
    const now = new Date();
    if (range === 'today') {
      dateFilter = { createdAt: { $gte: new Date(now.setHours(0,0,0,0)) } };
    } else if (range === 'week') {
      const w = new Date(); w.setDate(w.getDate() - 7);
      dateFilter = { createdAt: { $gte: w } };
    } else if (range === 'month') {
      const m = new Date(); m.setMonth(m.getMonth() - 1);
      dateFilter = { createdAt: { $gte: m } };
    } else if (range === 'year') {
      const y = new Date(); y.setFullYear(y.getFullYear() - 1);
      dateFilter = { createdAt: { $gte: y } };
    }

    const activeFilter = { ...dateFilter, status: { $nin: ['Cancelled'] } };

    const [overview, byStatus, bySource, monthly, topProducts] = await Promise.all([
      // Overview with profit
      WhatsAppOrder.aggregate([
        { $match: activeFilter },
        {
          $group: {
            _id: null,
            totalRevenue:   { $sum: '$totalAmount' },
            totalProfit:    { $sum: '$profit.netProfit' },
            totalCost:      { $sum: '$profit.totalCost' },
            totalOrders:    { $sum: 1 },
            avgOrderValue:  { $avg: '$totalAmount' },
            avgProfit:      { $avg: '$profit.netProfit' },
            totalAdvance:   { $sum: '$payment.advance' },
            totalPending:   { $sum: '$payment.remaining' },
          }
        }
      ]),

      // Orders by status
      WhatsAppOrder.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),

      // Orders by source (with revenue)
      WhatsAppOrder.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$source', count: { $sum: 1 }, revenue: { $sum: '$totalAmount' }, profit: { $sum: '$profit.netProfit' } } },
        { $sort: { revenue: -1 } }
      ]),

      // Monthly revenue + profit (last 6 months)
      WhatsAppOrder.aggregate([
        {
          $match: {
            status: { $nin: ['Cancelled'] },
            createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) }
          }
        },
        {
          $group: {
            _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
            revenue: { $sum: '$totalAmount' },
            profit:  { $sum: '$profit.netProfit' },
            orders:  { $sum: 1 }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } }
      ]),

      // Top products by sales
      WhatsAppOrder.aggregate([
        { $match: activeFilter },
        { $unwind: '$products' },
        {
          $group: {
            _id: '$products.name',
            totalQuantity: { $sum: '$products.quantity' },
            totalRevenue:  { $sum: { $multiply: ['$products.price', '$products.quantity'] } }
          }
        },
        { $sort: { totalRevenue: -1 } },
        { $limit: 5 }
      ])
    ]);

    const stats = overview[0] || {
      totalRevenue: 0, totalProfit: 0, totalCost: 0, totalOrders: 0,
      avgOrderValue: 0, avgProfit: 0, totalAdvance: 0, totalPending: 0
    };

    // Add profit margin %
    stats.profitMargin = stats.totalRevenue > 0
      ? Math.round((stats.totalProfit / stats.totalRevenue) * 100 * 100) / 100
      : 0;

    res.json({
      success: true,
      stats: { overview: stats, byStatus, bySource, monthly, topProducts }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
