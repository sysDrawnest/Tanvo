import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { uploadProductImages } from '../middleware/upload.js';
import {
  // Dashboard
  getDashboardStats,
  
  // Product management
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  
  // Order management
  getAdminOrders,
  getAdminOrderDetails,
  updateOrderStatus,
  
  // User management
  getAdminUsers,
  updateUserByAdmin,
  deleteUserByAdmin,
  
  // Review management
  getAdminReviews,
  updateReviewStatus,
  deleteReview,
  
  // Coupon management
  createCoupon
} from '../controllers/adminController.js';

const router = express.Router();

// All routes are protected and require admin
router.use(protect);
router.use(admin);

// ===========================================
// Dashboard
// ===========================================
router.get('/stats', getDashboardStats);

// ===========================================
// Product Management
// ===========================================
router.route('/products')
  .get(getAdminProducts)
  .post(uploadProductImages.array('images', 10), createProduct);

router.route('/products/:id')
  .put(uploadProductImages.array('images', 10), updateProduct)
  .delete(deleteProduct);

// ===========================================
// Order Management
// ===========================================
router.get('/orders', getAdminOrders);
router.get('/orders/:id', getAdminOrderDetails);
router.put('/orders/:id/status', updateOrderStatus);

// ===========================================
// User Management
// ===========================================
router.get('/users', getAdminUsers);
router.route('/users/:id')
  .put(updateUserByAdmin)
  .delete(deleteUserByAdmin);

// ===========================================
// Review Management
// ===========================================
router.get('/reviews', getAdminReviews);
router.put('/reviews/:id/status', updateReviewStatus);
router.delete('/reviews/:id', deleteReview);

// ===========================================
// Coupon Management
// ===========================================
router.post('/coupons', createCoupon);

export default router;