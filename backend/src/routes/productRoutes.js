import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { uploadProductImages } from '../middleware/upload.js';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts
} from '../controllers/productController.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/top', getTopProducts);
router.get('/:id', getProductById);

// Protected routes
router.post('/:id/reviews', protect, createProductReview);

// Admin routes
router.post('/', protect, admin, uploadProductImages.array('images', 10), createProduct);
router.put('/:id', protect, admin, uploadProductImages.array('images', 10), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;