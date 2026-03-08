// src/routes/cartRoutes.js
import express from 'express';
import {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  applyCoupon
} from '../controllers/cartController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All cart routes require authentication
router.use(protect);

router.get('/', getCart);
router.post('/add', addToCart);
router.post('/apply-coupon', applyCoupon);
router.put('/update/:itemId', updateQuantity);
router.delete('/remove/:itemId', removeFromCart);
router.delete('/clear', clearCart);

export default router;