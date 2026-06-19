import express from 'express';
import {
  createRazorpayOrder,
  verifyPayment,
  handleWebhook
} from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Private routes for authenticated users
router.post('/create', protect, createRazorpayOrder);
router.post('/verify', protect, verifyPayment);

// Public webhook route directly from Razorpay
router.post('/webhook', handleWebhook);

export default router;
