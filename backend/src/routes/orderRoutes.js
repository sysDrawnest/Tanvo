import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import Order from '../models/Order.js';
import {
  createOrder,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  updateOrderStatus,
  cancelOrder,
  getAllOrders
} from '../controllers/orderController.js';

const router = express.Router();

// Protected routes (user must be logged in)
router.use(protect);

// Create new order
router.post('/', createOrder);

// Get logged in user's orders
router.get('/my-orders', getMyOrders);

// Get single order
router.get('/:id', getOrderById);

// Update order to paid
router.put('/:id/pay', updateOrderToPaid);

// Cancel order
router.put('/:id/cancel', cancelOrder);

// ============ ADMIN ROUTES ============
// Get all orders (admin only)
router.get('/', admin, getAllOrders);

// Update order status (admin only)
router.put('/:id/status', admin, updateOrderStatus);

// Get order statistics (admin only)
router.get('/admin/stats', admin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ orderStatus: 'Pending' });
    const processingOrders = await Order.countDocuments({ orderStatus: 'Processing' });
    const shippedOrders = await Order.countDocuments({ orderStatus: 'Shipped' });
    const deliveredOrders = await Order.countDocuments({ orderStatus: 'Delivered' });
    const cancelledOrders = await Order.countDocuments({ orderStatus: 'Cancelled' });

    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayOrders = await Order.countDocuments({
      createdAt: { $gte: today }
    });

    const todayRevenue = await Order.aggregate([
      {
        $match: {
          paymentStatus: 'Paid',
          createdAt: { $gte: today }
        }
      },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    res.json({
      success: true,
      stats: {
        total: totalOrders,
        pending: pendingOrders,
        processing: processingOrders,
        shipped: shippedOrders,
        delivered: deliveredOrders,
        cancelled: cancelledOrders,
        revenue: totalRevenue[0]?.total || 0,
        todayOrders,
        todayRevenue: todayRevenue[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get orders by date range (admin only)
router.get('/admin/range', admin, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const orders = await Order.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).populate('user', 'name email');

    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.json({
      success: true,
      orders,
      total: orders.length,
      revenue: totalRevenue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export orders as CSV (admin only)
router.get('/admin/export/csv', admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email phone')
      .sort('-createdAt');

    // Create CSV header
    let csv = 'Order ID,Date,Customer,Email,Phone,Total,Status,Payment Method,Payment Status\n';

    // Add rows
    orders.forEach(order => {
      csv += `${order._id},${order.createdAt.toISOString()},${order.user?.name || 'N/A'},${order.user?.email || 'N/A'},${order.shippingAddress?.phone || 'N/A'},${order.totalPrice},${order.orderStatus},${order.paymentMethod},${order.paymentStatus}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=orders.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;