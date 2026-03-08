import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { uploadProfileImage } from '../middleware/upload.js';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  getUserActivity
} from '../controllers/userController.js';
import User from '../models/User.js';

const router = express.Router();

// ============ PROFILE ROUTES (Protected) ============
router.use(protect);

// Get user activity
router.get('/activity', getUserActivity);

// Wishlist routes
router.get('/wishlist', getWishlist);
router.post('/wishlist/add', addToWishlist);
router.post('/wishlist/toggle', toggleWishlist);
router.delete('/wishlist/:productId', removeFromWishlist);

// Update profile picture
router.post('/profile/picture', uploadProfileImage.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const user = await User.findById(req.user._id);
    user.profileImage = req.file.path;
    await user.save();

    res.json({
      success: true,
      imageUrl: req.file.path
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Change password
router.put('/change-password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ 
      success: true, 
      message: 'Password updated successfully' 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update profile
router.put('/profile', async (req, res) => {
  try {
    const { name, phone } = req.body;

    const user = await User.findById(req.user._id);
    
    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============ ADDRESS MANAGEMENT ============
// Get all addresses
router.get('/addresses', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new address
router.post('/addresses', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    const newAddress = {
      ...req.body,
      isDefault: user.addresses.length === 0 ? true : req.body.isDefault
    };

    // If this is default, unset other defaults
    if (newAddress.isDefault) {
      user.addresses.forEach(addr => {
        addr.isDefault = false;
      });
    }

    user.addresses.push(newAddress);
    await user.save();

    res.status(201).json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update address
router.put('/addresses/:addressId', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    const addressIndex = user.addresses.findIndex(
      addr => addr._id.toString() === req.params.addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // If setting as default, unset others
    if (req.body.isDefault) {
      user.addresses.forEach(addr => {
        addr.isDefault = false;
      });
    }

    // Update address
    user.addresses[addressIndex] = {
      ...user.addresses[addressIndex].toObject(),
      ...req.body
    };

    await user.save();
    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete address
router.delete('/addresses/:addressId', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    const wasDefault = user.addresses.find(
      addr => addr._id.toString() === req.params.addressId
    )?.isDefault;

    user.addresses = user.addresses.filter(
      addr => addr._id.toString() !== req.params.addressId
    );

    // If deleted address was default, set first as default
    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();
    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Set default address
router.put('/addresses/:addressId/default', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Unset all defaults
    user.addresses.forEach(addr => {
      addr.isDefault = false;
    });

    // Set new default
    const address = user.addresses.find(
      addr => addr._id.toString() === req.params.addressId
    );
    
    if (address) {
      address.isDefault = true;
      await user.save();
    }

    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============ ADMIN ROUTES ============
router.get('/', admin, getUsers);
router.get('/:id', admin, getUserById);
router.put('/:id', admin, updateUser);
router.delete('/:id', admin, deleteUser);

export default router;