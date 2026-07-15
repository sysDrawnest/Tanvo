import User from '../models/User.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const pageSize = 20;
    const page = Number(req.query.page) || 1;

    const count = await User.countDocuments({});
    const users = await User.find({})
      .select('-password -resetPasswordToken -resetPasswordExpire -emailVerificationToken')
      .sort('-createdAt')
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      users,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user by ID (Admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -resetPasswordToken -resetPasswordExpire -emailVerificationToken');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user's order statistics via database aggregation
    const statsResult = await Order.aggregate([
      { $match: { user: user._id } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$totalPrice' },
          pendingOrders: {
            $sum: { $cond: [{ $eq: ['$orderStatus', 'Pending'] }, 1, 0] }
          },
          completedOrders: {
            $sum: { $cond: [{ $eq: ['$orderStatus', 'Delivered'] }, 1, 0] }
          },
          cancelledOrders: {
            $sum: { $cond: [{ $eq: ['$orderStatus', 'Cancelled'] }, 1, 0] }
          }
        }
      }
    ]);

    const statsData = statsResult[0] || {
      totalOrders: 0,
      totalSpent: 0,
      pendingOrders: 0,
      completedOrders: 0,
      cancelledOrders: 0
    };

    const stats = {
      totalOrders: statsData.totalOrders,
      totalSpent: statsData.totalSpent,
      averageOrderValue: statsData.totalOrders > 0 ? statsData.totalSpent / statsData.totalOrders : 0,
      pendingOrders: statsData.pendingOrders,
      completedOrders: statsData.completedOrders,
      cancelledOrders: statsData.cancelledOrders
    };

    res.json({ user, stats });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user has any orders
    const orders = await Order.find({ user: user._id });
    if (orders.length > 0) {
      return res.status(400).json({
        message: 'Cannot delete user with existing orders. Consider deactivating instead.'
      });
    }

    await user.deleteOne();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'wishlist',
        select: 'name price originalPrice images ratings weave fabric isBestSeller'
      });

    res.json(user.wishlist);
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add to wishlist
// @route   POST /api/users/wishlist/add
// @access  Private
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await User.findById(req.user._id);

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    await user.populate({
      path: 'wishlist',
      select: 'name price originalPrice images ratings weave fabric'
    });

    res.json(user.wishlist);
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove from wishlist
// @route   DELETE /api/users/wishlist/:productId
// @access  Private
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter(
      id => id.toString() !== productId
    );

    await user.save();

    await user.populate({
      path: 'wishlist',
      select: 'name price originalPrice images ratings weave fabric'
    });

    res.json(user.wishlist);
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle wishlist item
// @route   POST /api/users/wishlist/toggle
// @access  Private
export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await User.findById(req.user._id);

    const index = user.wishlist.findIndex(
      id => id.toString() === productId
    );

    if (index === -1) {
      user.wishlist.push(productId);
    } else {
      user.wishlist.splice(index, 1);
    }

    await user.save();

    await user.populate({
      path: 'wishlist',
      select: 'name price originalPrice images ratings weave fabric'
    });

    res.json({
      wishlist: user.wishlist,
      isInWishlist: index === -1
    });
  } catch (error) {
    console.error('Toggle wishlist error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user activity
// @route   GET /api/users/activity
// @access  Private
export const getUserActivity = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get recent orders
    const recentOrders = await Order.find({ user: userId })
      .sort('-createdAt')
      .limit(5)
      .select('orderStatus totalPrice createdAt');

    // Get recent reviews
    const recentReviews = await Review.find({ user: userId })
      .sort('-createdAt')
      .limit(5)
      .populate('product', 'name images');

    // Get wishlist
    const user = await User.findById(userId)
      .populate({
        path: 'wishlist',
        select: 'name price images',
        options: { limit: 5 }
      });

    // Get statistics
    const orderStats = await Order.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$totalPrice' },
          averageOrderValue: { $avg: '$totalPrice' }
        }
      }
    ]);

    const statusCounts = await Order.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      recentOrders,
      recentReviews,
      wishlist: user.wishlist,
      stats: {
        totalOrders: orderStats[0]?.totalOrders || 0,
        totalSpent: orderStats[0]?.totalSpent || 0,
        averageOrderValue: orderStats[0]?.averageOrderValue || 0
      },
      orderStatusCounts: statusCounts
    });
  } catch (error) {
    console.error('Get user activity error:', error);
    res.status(500).json({ message: error.message });
  }
};