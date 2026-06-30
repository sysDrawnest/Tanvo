import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import {
  getWhatsAppOrders,
  getWhatsAppOrderById,
  createWhatsAppOrder,
  updateWhatsAppOrder,
  deleteWhatsAppOrder,
  uploadPaymentScreenshot,
  deletePaymentScreenshot,
  getWhatsAppOrderStats
} from '../controllers/whatsappOrderController.js';
import { uploadProfileImage, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

// All routes require admin authentication
router.use(protect, admin);

// Analytics (must come before /:id to avoid route conflicts)
router.get('/stats', getWhatsAppOrderStats);

// CRUD
router.get('/', getWhatsAppOrders);
router.post('/', createWhatsAppOrder);
router.get('/:id', getWhatsAppOrderById);
router.put('/:id', updateWhatsAppOrder);
router.delete('/:id', deleteWhatsAppOrder);

// Payment screenshot
router.post(
  '/:id/screenshot',
  uploadProfileImage.single('screenshot'),
  handleUploadError,
  uploadPaymentScreenshot
);
router.delete('/:id/screenshot', deletePaymentScreenshot);

export default router;
