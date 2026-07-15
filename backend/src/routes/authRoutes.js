import express from 'express';
import { protect } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../validators/schemas.js';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  forgotPassword,
  resetPassword,
  verifyEmail,
  googleAuth
} from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post(
  '/register',
  validateRequest({ body: registerSchema }),
  registerUser
);

router.post(
  '/login',
  validateRequest({ body: loginSchema }),
  loginUser
);

router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);
router.post('/verify-email', verifyEmail);
router.post('/google', googleAuth);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Address routes
router.post('/address', protect, addAddress);
router.put('/address/:addressId', protect, updateAddress);
router.delete('/address/:addressId', protect, deleteAddress);

export default router;