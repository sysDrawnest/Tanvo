import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { sendOrderConfirmation } from '../utils/sendEmail.js';
import { createShiprocketOrder } from '../services/shiprocket.js';


// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const {
      shippingAddress,
      paymentMethod,
      items: reqItems, // Renamed to avoid confusion
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      discountPrice,
      couponCode,
      notes,
      isGift,
      giftMessage
    } = req.body;

    // 1. Get items from either DB Cart or Request Body (Direct Purchase)
    let orderItemsData = [];
    const dbCart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (dbCart && dbCart.items.length > 0) {
      orderItemsData = dbCart.items;
    } else if (reqItems && reqItems.length > 0) {
      // Direct Purchase / Buy Now Flow
      orderItemsData = reqItems;
    } else {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // 2. Map and Verify Items (Stock + Structure)
    const orderItems = [];
    for (const item of orderItemsData) {
      // Support both populated DB items and raw request items
      const productId = item.product._id || item.product;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: `Product not found: ${productId}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}`
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.price,
        image: product.images[0]?.url || '',
        color: item.color,
        size: item.size
      });
    }

    // 3. Create the Order
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress: {
        ...shippingAddress,
        phone: shippingAddress.phone || req.user.phone
      },
      paymentMethod: (paymentMethod || 'COD').toUpperCase(),
      itemsPrice: orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      taxPrice: taxPrice || 0,
      shippingPrice: shippingPrice || 0,
      totalPrice: totalPrice, // Use total from frontend or recalculate
      discountPrice: discountPrice || 0,
      couponCode,
      notes,
      isGift: isGift || false,
      giftMessage,
      orderStatus: 'Pending',
      paymentStatus: (paymentMethod || '').toUpperCase() === 'COD' ? 'Pending' : 'Pending'
    });

    // 4. Atomic Updates (Stock and Cart)
    // Update product stock
    await Promise.all(orderItems.map(item =>
      Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } })
    ));

    // Clear user's cart if it was used for this order
    if (dbCart && dbCart.items.length > 0) {
      dbCart.items = [];
      dbCart.couponCode = null;
      dbCart.discountAmount = 0;
      await dbCart.save();
    }

    // 5. Send Immediate Response to User
    res.status(201).json(order);

    // 6. Post-Response Tasks (Shiprocket & Email)
    // Run these in the background to prevent timeout on the main request
    (async () => {
      try {
        const user = await User.findById(req.user._id);

        // Order Email
        try {
          await sendOrderConfirmation(order, user);
        } catch (err) {
          console.error('Post-order email failed:', err);
        }

        // Shiprocket Order
        try {
          const shiprocketResponse = await createShiprocketOrder(order, user);
          if (shiprocketResponse) {
            await Order.findByIdAndUpdate(order._id, {
              shiprocketOrderId: shiprocketResponse.order_id,
              shiprocketShipmentId: shiprocketResponse.shipment_id
            });
          }
        } catch (err) {
          console.error('Post-order Shiprocket failed:', err);
        }
      } catch (err) {
        console.error('Critical background order task failed:', err);
      }
    })();

  } catch (error) {
    console.error('Create order error:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    }
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('orderItems.product', 'name images weave fabric');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user is authorized to view this order
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    const count = await Order.countDocuments({ user: req.user._id });
    const orders = await Order.find({ user: req.user._id })
      .sort('-createdAt')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .populate('orderItems.product', 'name images');

    res.json({
      orders,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.paymentStatus = 'Paid';
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error('Update order to paid error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, trackingNumber, estimatedDelivery } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.orderStatus = orderStatus || order.orderStatus;

    if (trackingNumber) {
      order.trackingNumber = trackingNumber;
    }

    if (estimatedDelivery) {
      order.estimatedDelivery = estimatedDelivery;
    }

    if (orderStatus === 'Delivered') {
      order.deliveredAt = Date.now();
    }

    if (orderStatus === 'Cancelled') {
      order.cancelledAt = Date.now();
      // Restore stock
      for (const item of order.orderItems) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity }
        });
      }
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req, res) => {
  try {
    const { cancellationReason } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if order can be cancelled (only pending or processing)
    if (!['Pending', 'Processing'].includes(order.orderStatus)) {
      return res.status(400).json({
        message: 'Order cannot be cancelled at this stage'
      });
    }

    order.orderStatus = 'Cancelled';
    order.cancelledAt = Date.now();
    order.cancellationReason = cancellationReason;

    // Restore stock
    for (const item of order.orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity }
      });
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const pageSize = 20;
    const page = Number(req.query.page) || 1;
    const status = req.query.status;

    const query = {};
    if (status) {
      query.orderStatus = status;
    }

    const count = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort('-createdAt')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .populate('user', 'name email');

    // Calculate total revenue
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    res.json({
      orders,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const checkShippingServiceability = async (req, res) => {
  try {
    const { pincode, weight } = req.body;

    if (!pincode) {
      return res.status(400).json({ message: 'Pincode is required' });
    }

    const { checkServiceability } = await import('../services/shiprocket.js');
    const result = await checkServiceability(pincode, weight || 0.5);

    res.json(result);
  } catch (error) {
    console.error('Serviceability check error:', error);
    res.status(500).json({ message: error.message });
  }
};
