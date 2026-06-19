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
      items: reqItems,
      notes,
      isGift,
      giftMessage,
      codOption // 'ADVANCE' or 'FULL_COD'
    } = req.body;

    console.log(`Order placement started for user: ${req.user._id}`);

    // 1. Get items from either DB Cart or Request Body (Direct Purchase)
    let orderItemsData = [];
    const dbCart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (dbCart && dbCart.items.length > 0) {
      orderItemsData = dbCart.items;
      console.log('Using items from DB Cart');
    } else if (reqItems && reqItems.length > 0) {
      orderItemsData = reqItems;
      console.log('Using items from Request Body (Direct Purchase)');
    } else {
      console.log('Order failed: No items found in cart or request');
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // 2. Validate and Recalculate Prices Server-side
    const orderItems = [];
    let itemsPrice = 0;

    for (const item of orderItemsData) {
      const productId = item.product?._id || item.product;
      const product = await Product.findById(productId);

      if (!product) {
        console.error(`Product not found: ${productId}`);
        return res.status(404).json({ message: `Product not found: ${productId}` });
      }

      if (product.stock < item.quantity) {
        console.error(`Insufficient stock for ${product.name}`);
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}`
        });
      }

      const itemPrice = product.price;
      itemsPrice += itemPrice * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: itemPrice,
        image: product.images[0]?.url || '',
        color: item.color,
        size: item.size
      });
    }

    // Calculate tax and shipping server-side
    const taxPrice = Math.round(itemsPrice * 0.05); // 5% GST
    const shippingPrice = itemsPrice > 5000 ? 0 : 500;
    const discountPrice = dbCart?.discountAmount || 0;
    const totalPrice = itemsPrice + taxPrice + shippingPrice - discountPrice;

    // COD Risk management calculations
    const isCOD = (paymentMethod || 'COD').toUpperCase() === 'COD';
    let codAdvancePaid = 0;
    let codFee = 0;
    let finalTotalPrice = totalPrice;

    if (isCOD) {
      if (totalPrice > 5000) {
        if (codOption === 'ADVANCE') {
          codAdvancePaid = Math.round(totalPrice * 0.1);
        } else {
          codFee = 250;
          finalTotalPrice = totalPrice + codFee;
        }
      }
    }
    const codRemainingAmount = isCOD ? (finalTotalPrice - codAdvancePaid) : 0;

    console.log(`Calculated Total: ${finalTotalPrice} (Items: ${itemsPrice}, Tax: ${taxPrice}, Shipping: ${shippingPrice}, Discount: ${discountPrice}, CODFee: ${codFee}, CODAdvance: ${codAdvancePaid})`);

    // Determine initial order status
    let initialOrderStatus = 'Created';
    if (!isCOD) {
      initialOrderStatus = 'Payment Pending';
    } else if (codAdvancePaid > 0) {
      initialOrderStatus = 'Payment Pending';
    }

    // 3. Create the Order in DB
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress: {
        addressLine1: shippingAddress.addressLine1,
        addressLine2: shippingAddress.addressLine2,
        city: shippingAddress.city,
        state: shippingAddress.state,
        pincode: shippingAddress.pincode,
        country: shippingAddress.country || 'India',
        phone: shippingAddress.phone || req.user.phone
      },
      paymentMethod: (paymentMethod || 'COD').toUpperCase(),
      isCOD,
      codAdvancePaid,
      codRemainingAmount,
      codFee,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice: finalTotalPrice,
      discountPrice,
      couponCode: dbCart?.couponCode,
      notes,
      isGift: isGift || false,
      giftMessage,
      orderStatus: initialOrderStatus,
      paymentStatus: 'Pending'
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

    // 5. Success Response
    console.log(`Order created successfully: ${order._id}`);
    res.status(201).json(order);

    // 6. Async Post-processing
    (async () => {
      try {
        const user = await User.findById(req.user._id);

        // Email
        try {
          await sendOrderConfirmation(order, user);
        } catch (err) {
          console.error('Post-order email failed:', err);
        }

        // Shiprocket
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
        console.error('Background tasks critical failure:', err);
      }
    })();

  } catch (error) {
    console.error('CRITICAL ORDER FAILURE:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Internal server error during order placement', error: error.message });
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
