import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';

// Initialize Razorpay SDK instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret'
});

/**
 * @desc    Create Razorpay Order
 * @route   POST /api/orders/razorpay/create
 * @access  Private
 */
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount || !orderId) {
      return res.status(400).json({ success: false, message: 'Amount and orderId are required' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Razorpay amount is in paisa (1 INR = 100 paisa)
    const options = {
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: orderId.toString()
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Save razorpayOrderId to local order model
    order.razorpayOrderId = razorpayOrder.id;
    order.orderStatus = 'Payment Pending';
    await order.save();

    res.status(200).json({
      success: true,
      keyId: process.env.RAZORPAY_KEY_ID,
      razorpayOrder
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Verify Razorpay Payment Signature
 * @route   POST /api/orders/razorpay/verify
 * @access  Private
 */
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Payment details are missing' });
    }

    // Signature verification logic
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
      .update(body.toString())
      .digest('hex');

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (!isSignatureValid) {
      return res.status(400).json({ success: false, message: 'Payment verification failed: Invalid signature' });
    }

    // Fetch order
    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order matching transaction not found' });
    }

    // Avoid double verification processing
    if (order.paymentStatus === 'Paid') {
      return res.status(200).json({ success: true, message: 'Payment verified already', data: order });
    }

    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    order.paymentStatus = 'Paid';
    order.orderStatus = 'Payment Verified';
    order.paymentVerifiedAt = new Date();

    // Move to Processing right after verification
    order.orderStatus = 'Processing';

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Payment verified and order updated successfully',
      data: order
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Handle Razorpay Webhook Event
 * @route   POST /api/orders/razorpay/webhook
 * @access  Public
 */
export const handleWebhook = async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'dummy_webhook_secret';

    const shasum = crypto.createHmac('sha256', webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest !== signature) {
      return res.status(400).json({ success: false, message: 'Invalid webhook signature' });
    }

    // Parse pay load
    const event = req.body.event;
    if (event === 'payment.captured') {
      const paymentEntity = req.body.payload.payment.entity;
      const razorpayOrderId = paymentEntity.order_id;
      const razorpayPaymentId = paymentEntity.id;

      // Find the corresponding order
      const order = await Order.findOne({ razorpayOrderId });
      if (order && order.paymentStatus !== 'Paid') {
        order.razorpayPaymentId = razorpayPaymentId;
        order.paymentStatus = 'Paid';
        order.orderStatus = 'Processing';
        order.paymentVerifiedAt = new Date();
        
        await order.save();
        console.log(`Order ${order._id} successfully updated to Paid via webhook.`);
      }
    }

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Error processing Razorpay webhook:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
