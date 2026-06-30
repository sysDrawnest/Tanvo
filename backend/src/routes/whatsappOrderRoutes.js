import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import {
  getWhatsAppOrders,
  getWhatsAppOrderById,
  createWhatsAppOrder,
  updateWhatsAppOrder,
  updateOrderStatus,
  deleteWhatsAppOrder,
  uploadPaymentScreenshot,
  deletePaymentScreenshot,
  getWhatsAppOrderStats,
  checkCustomerByPhone
} from '../controllers/whatsappOrderController.js';
import {
  getCustomers,
  getCustomerById,
  updateCustomer,
  getCustomerStats
} from '../controllers/waCustomerController.js';
import { uploadProfileImage, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

// All routes require admin authentication
router.use(protect, admin);

// ── Analytics (before /:id to avoid route conflict) ─────────────────────────
router.get('/stats', getWhatsAppOrderStats);

// ── CRM - Customer Routes ────────────────────────────────────────────────────
router.get('/customers', getCustomers);
router.get('/customers/stats', getCustomerStats);
router.get('/customers/:id', getCustomerById);
router.put('/customers/:id', updateCustomer);

// ── Customer phone lookup (for returning customer prompt) ────────────────────
router.get('/check-customer/:phone', checkCustomerByPhone);

// ── Order CRUD ───────────────────────────────────────────────────────────────
router.get('/', getWhatsAppOrders);
router.post('/', createWhatsAppOrder);
router.get('/:id', getWhatsAppOrderById);
router.put('/:id', updateWhatsAppOrder);
router.delete('/:id', deleteWhatsAppOrder);

// ── Status update (with history append) ──────────────────────────────────────
router.put('/:id/status', updateOrderStatus);

// ── Payment screenshot ────────────────────────────────────────────────────────
router.post(
  '/:id/screenshot',
  uploadProfileImage.single('screenshot'),
  handleUploadError,
  uploadPaymentScreenshot
);
router.delete('/:id/screenshot', deletePaymentScreenshot);

export default router;
