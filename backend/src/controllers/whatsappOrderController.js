import WhatsAppOrder from '../models/WhatsAppOrder.js';
import { v2 as cloudinary } from 'cloudinary';
import { uploadToCloudinary } from '../middleware/upload.js';

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
        .populate('createdBy', 'name'),
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
      .populate('createdBy', 'name email');

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Create WA order ──────────────────────────────────────────────────────────
export const createWhatsAppOrder = async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      createdBy: req.user._id
    };

    const order = new WhatsAppOrder(orderData);
    await order.save();

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
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
      if (updates.payment.advance !== undefined) {
        order.payment.advance = updates.payment.advance;
      }
    }

    // Handle totalAmount
    if (updates.totalAmount !== undefined) {
      order.totalAmount = updates.totalAmount;
    }

    // Handle tracking info
    if (updates.trackingInfo) {
      order.trackingInfo = {
        ...order.trackingInfo,
        ...updates.trackingInfo
      };
    }

    // Handle other scalar updates
    if (updates.status) order.status = updates.status;
    if (updates.source) order.source = updates.source;
    if (updates.notes !== undefined) order.notes = updates.notes;
    if (updates.customer) order.customer = { ...order.customer, ...updates.customer };
    if (updates.products) order.products = updates.products;

    await order.save(); // This triggers the pre('save') middleware to calc remaining

    await order.populate('products.productId', 'name images price');

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

    // Delete payment screenshot from Cloudinary if exists
    if (order.payment?.screenshot?.publicId) {
      await cloudinary.uploader.destroy(order.payment.screenshot.publicId);
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

    // Delete old screenshot from Cloudinary if exists
    if (order.payment?.screenshot?.publicId) {
      await cloudinary.uploader.destroy(order.payment.screenshot.publicId);
    }

    // Upload new screenshot to Cloudinary
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

// ── Analytics / Stats ────────────────────────────────────────────────────────
export const getWhatsAppOrderStats = async (req, res) => {
  try {
    const { range = 'all' } = req.query;

    let dateFilter = {};
    const now = new Date();
    if (range === 'today') {
      dateFilter = { createdAt: { $gte: new Date(now.setHours(0, 0, 0, 0)) } };
    } else if (range === 'week') {
      const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);
      dateFilter = { createdAt: { $gte: weekAgo } };
    } else if (range === 'month') {
      const monthAgo = new Date(); monthAgo.setMonth(monthAgo.getMonth() - 1);
      dateFilter = { createdAt: { $gte: monthAgo } };
    } else if (range === 'year') {
      const yearAgo = new Date(); yearAgo.setFullYear(yearAgo.getFullYear() - 1);
      dateFilter = { createdAt: { $gte: yearAgo } };
    }

    const activeFilter = { ...dateFilter, status: { $nin: ['Cancelled'] } };

    const [overview, byStatus, bySource, monthly] = await Promise.all([
      // Overview aggregation
      WhatsAppOrder.aggregate([
        { $match: activeFilter },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$totalAmount' },
            totalOrders: { $sum: 1 },
            avgOrderValue: { $avg: '$totalAmount' },
            totalAdvance: { $sum: '$payment.advance' },
            totalPending: { $sum: '$payment.remaining' }
          }
        }
      ]),

      // Orders by status
      WhatsAppOrder.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),

      // Orders by source
      WhatsAppOrder.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$source', count: { $sum: 1 }, revenue: { $sum: '$totalAmount' } } }
      ]),

      // Monthly revenue (last 6 months)
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
            orders: { $sum: 1 }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } }
      ])
    ]);

    const stats = overview[0] || {
      totalRevenue: 0, totalOrders: 0,
      avgOrderValue: 0, totalAdvance: 0, totalPending: 0
    };

    res.json({
      success: true,
      stats: {
        overview: stats,
        byStatus,
        bySource,
        monthly
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
