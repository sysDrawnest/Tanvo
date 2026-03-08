import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';
import cloudinary from '../config/cloudinary.js';
import { uploadToCloudinary } from '../middleware/upload.js'; // Added import

// ===========================================
// DASHBOARD STATS
// ===========================================

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    // Get current date and first day of month
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1);

    // Parallel queries for better performance
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      monthlyStats,
      recentOrders,
      lowStockProducts,
      topProducts
    ] = await Promise.all([
      // Total users
      User.countDocuments({ role: 'user' }),
      
      // Total products
      Product.countDocuments(),
      
      // Total orders
      Order.countDocuments(),
      
      // Total revenue
      Order.aggregate([
        { $match: { paymentStatus: 'Paid' } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
      ]),
      
      // Monthly stats
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: firstDayOfMonth },
            paymentStatus: 'Paid'
          }
        },
        {
          $group: {
            _id: { $dayOfMonth: '$createdAt' },
            count: { $sum: 1 },
            revenue: { $sum: '$totalPrice' }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      
      // Recent orders
      Order.find()
        .sort('-createdAt')
        .limit(5)
        .populate('user', 'name email')
        .select('orderStatus totalPrice createdAt paymentStatus'),
      
      // Low stock products
      Product.find({ stock: { $lt: 10 } })
        .select('name stock images price')
        .sort('stock')
        .limit(10),
      
      // Top selling products
      Order.aggregate([
        { $unwind: '$orderItems' },
        {
          $group: {
            _id: '$orderItems.product',
            totalSold: { $sum: '$orderItems.quantity' },
            revenue: { $sum: { $multiply: ['$orderItems.price', '$orderItems.quantity'] } }
          }
        },
        { $sort: { totalSold: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: '_id',
            as: 'product'
          }
        },
        { $unwind: '$product' }
      ])
    ]);

    // Order status distribution
    const orderStatusDistribution = await Order.aggregate([
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    // Recent users
    const recentUsers = await User.find({ role: 'user' })
      .sort('-createdAt')
      .limit(5)
      .select('name email createdAt');

    res.json({
      success: true,
      stats: {
        overview: {
          totalUsers,
          totalProducts,
          totalOrders,
          totalRevenue: totalRevenue[0]?.total || 0,
          pendingOrders: orderStatusDistribution.find(s => s._id === 'Pending')?.count || 0,
          deliveredOrders: orderStatusDistribution.find(s => s._id === 'Delivered')?.count || 0,
          cancelledOrders: orderStatusDistribution.find(s => s._id === 'Cancelled')?.count || 0
        },
        monthly: monthlyStats,
        recentOrders,
        recentUsers,
        lowStockProducts,
        topProducts,
        orderStatus: orderStatusDistribution
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// ===========================================
// PRODUCT MANAGEMENT
// ===========================================

// @desc    Create new product
// @route   POST /api/admin/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      shortDescription,
      price,
      originalPrice,
      category,
      subCategory,
      weave,
      fabric,
      stock,
      colors,
      sizes,
      length,
      blousePiece,
      careInstructions,
      isFeatured,
      isBestSeller,
      isNewArrival,
      tags,
      weaverName,
      weaverGeneration,
      weaverLocation,
      weaverStory
    } = req.body;

    // Handle image uploads to Cloudinary
    const images = [];
    if (req.files && req.files.length > 0) {
      try {
        const uploadPromises = req.files.map(async (file, index) => {
          const result = await uploadToCloudinary(file.buffer, {
            folder: 'syssaree/products',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
            transformation: [
              { width: 1000, height: 1000, crop: 'limit' },
              { quality: 'auto:best' }
            ]
          });
          
          return {
            url: result.secure_url,
            publicId: result.public_id,
            isPrimary: index === 0 // First image is primary
          };
        });

        const uploadedImages = await Promise.all(uploadPromises);
        images.push(...uploadedImages);
        
      } catch (uploadError) {
        console.error('Error uploading to Cloudinary:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Error uploading images to Cloudinary'
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'At least one image is required'
      });
    }

    // Create slug from name
    const slug = name.toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // Create product
    const product = await Product.create({
      name,
      slug,
      description,
      shortDescription,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      category,
      subCategory,
      weave,
      fabric,
      images,
      stock: Number(stock),
      colors: colors ? colors.split(',').map(c => c.trim()) : [],
      sizes: sizes ? sizes.split(',').map(s => s.trim()) : [],
      length,
      blousePiece: blousePiece === 'true' || blousePiece === true,
      careInstructions,
      isFeatured: isFeatured === 'true' || isFeatured === true,
      isBestSeller: isBestSeller === 'true' || isBestSeller === true,
      isNewArrival: isNewArrival === 'true' || isNewArrival === true,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      weaverInfo: {
        name: weaverName,
        generation: weaverGeneration,
        location: weaverLocation,
        story: weaverStory
      },
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Product creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      try {
        // Delete old images from cloudinary
        for (const image of product.images) {
          if (image.publicId) {
            try {
              await cloudinary.uploader.destroy(image.publicId);
            } catch (err) {
              console.error('Error deleting image from cloudinary:', err);
            }
          }
        }

        // Upload new images
        const uploadPromises = req.files.map(async (file, index) => {
          const result = await uploadToCloudinary(file.buffer, {
            folder: 'syssaree/products',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
            transformation: [
              { width: 1000, height: 1000, crop: 'limit' },
              { quality: 'auto:best' }
            ]
          });
          
          return {
            url: result.secure_url,
            publicId: result.public_id,
            isPrimary: index === 0
          };
        });

        const uploadedImages = await Promise.all(uploadPromises);
        req.body.images = uploadedImages;
        
      } catch (uploadError) {
        console.error('Error uploading to Cloudinary:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Error uploading images to Cloudinary'
        });
      }
    }

    // Parse string fields that should be arrays
    if (req.body.colors && typeof req.body.colors === 'string') {
      req.body.colors = req.body.colors.split(',').map(c => c.trim());
    }
    if (req.body.sizes && typeof req.body.sizes === 'string') {
      req.body.sizes = req.body.sizes.split(',').map(s => s.trim());
    }
    if (req.body.tags && typeof req.body.tags === 'string') {
      req.body.tags = req.body.tags.split(',').map(t => t.trim());
    }

    // Parse boolean fields
    ['blousePiece', 'isFeatured', 'isBestSeller', 'isNewArrival'].forEach(field => {
      if (req.body[field] !== undefined) {
        req.body[field] = req.body[field] === 'true' || req.body[field] === true;
      }
    });

    // Parse numeric fields
    ['price', 'originalPrice', 'stock'].forEach(field => {
      if (req.body[field] !== undefined) {
        req.body[field] = Number(req.body[field]);
      }
    });

    // Update weaverInfo if provided
    if (req.body.weaverName || req.body.weaverGeneration || req.body.weaverLocation || req.body.weaverStory) {
      req.body.weaverInfo = {
        name: req.body.weaverName || product.weaverInfo?.name,
        generation: req.body.weaverGeneration || product.weaverInfo?.generation,
        location: req.body.weaverLocation || product.weaverInfo?.location,
        story: req.body.weaverStory || product.weaverInfo?.story
      };
    }

    // Update slug if name changed
    if (req.body.name && req.body.name !== product.name) {
      req.body.slug = req.body.name.toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Product update error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if product has any orders
    const ordersWithProduct = await Order.findOne({ 'orderItems.product': product._id });
    if (ordersWithProduct) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete product with existing orders. Consider marking as inactive instead.'
      });
    }

    // Delete images from cloudinary
    for (const image of product.images) {
      if (image.publicId) {
        try {
          await cloudinary.uploader.destroy(image.publicId);
        } catch (err) {
          console.error('Error deleting image from cloudinary:', err);
        }
      }
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Product deletion error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all products (for admin)
// @route   GET /api/admin/products
// @access  Private/Admin
export const getAdminProducts = async (req, res) => {
  try {
    const pageSize = 20;
    const page = Number(req.query.page) || 1;
    const { category, weave, fabric, search, lowStock } = req.query;

    // Build query
    const query = {};
    
    if (category) query.category = category;
    if (weave) query.weave = weave;
    if (fabric) query.fabric = fabric;
    if (lowStock === 'true') query.stock = { $lt: 10 };
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort('-createdAt')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .populate('createdBy', 'name email');

    // Get statistics
    const totalStock = await Product.aggregate([
      { $group: { _id: null, total: { $sum: '$stock' } } }
    ]);

    const totalValue = await Product.aggregate([
      { $group: { _id: null, total: { $sum: { $multiply: ['$price', '$stock'] } } } }
    ]);

    res.json({
      success: true,
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
      stats: {
        totalStock: totalStock[0]?.total || 0,
        totalValue: totalValue[0]?.total || 0
      }
    });
  } catch (error) {
    console.error('Get admin products error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// ===========================================
// ORDER MANAGEMENT
// ===========================================

// @desc    Get all orders (Admin)
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getAdminOrders = async (req, res) => {
  try {
    const pageSize = 20;
    const page = Number(req.query.page) || 1;
    const { status, paymentStatus, fromDate, toDate } = req.query;

    // Build query
    const query = {};
    
    if (status) query.orderStatus = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;
    
    if (fromDate || toDate) {
      query.createdAt = {};
      if (fromDate) query.createdAt.$gte = new Date(fromDate);
      if (toDate) query.createdAt.$lte = new Date(toDate);
    }

    const count = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort('-createdAt')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .populate('user', 'name email phone')
      .populate('orderItems.product', 'name images');

    // Calculate total revenue for filtered orders
    const revenue = await Order.aggregate([
      { $match: { ...query, paymentStatus: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    res.json({
      success: true,
      orders,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
      revenue: revenue[0]?.total || 0
    });
  } catch (error) {
    console.error('Get admin orders error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, trackingNumber, estimatedDelivery, notes } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Store previous status for logging
    const previousStatus = order.orderStatus;

    // Update order
    order.orderStatus = orderStatus || order.orderStatus;
    
    if (trackingNumber) {
      order.trackingNumber = trackingNumber;
    }
    
    if (estimatedDelivery) {
      order.estimatedDelivery = new Date(estimatedDelivery);
    }

    if (notes) {
      order.notes = notes;
    }

    // Set timestamps based on status
    if (orderStatus === 'Delivered') {
      order.deliveredAt = Date.now();
    }

    if (orderStatus === 'Cancelled' && previousStatus !== 'Cancelled') {
      order.cancelledAt = Date.now();
      // Restore stock
      for (const item of order.orderItems) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity }
        });
      }
    }

    // If order was cancelled and now being processed again, reduce stock
    if (previousStatus === 'Cancelled' && orderStatus !== 'Cancelled') {
      for (const item of order.orderItems) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity }
        });
      }
    }

    await order.save();

    // Log the status change (you can implement an OrderLog model if needed)
    console.log(`Order ${order._id} status changed from ${previousStatus} to ${orderStatus}`);

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single order details (Admin)
// @route   GET /api/admin/orders/:id
// @access  Private/Admin
export const getAdminOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone addresses')
      .populate('orderItems.product', 'name images weave fabric description');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Get admin order details error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ===========================================
// USER MANAGEMENT
// ===========================================

// @desc    Get all users (Admin)
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAdminUsers = async (req, res) => {
  try {
    const pageSize = 20;
    const page = Number(req.query.page) || 1;
    const { search, role } = req.query;

    // Build query
    const query = {};
    if (role) query.role = role;
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const count = await User.countDocuments(query);
    const users = await User.find(query)
      .select('-password -resetPasswordToken -resetPasswordExpire -emailVerificationToken')
      .sort('-createdAt')
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    // Get user statistics
    const userStats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      users,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
      stats: {
        totalUsers: count,
        admins: userStats.find(s => s._id === 'admin')?.count || 0,
        customers: userStats.find(s => s._id === 'user')?.count || 0
      }
    });
  } catch (error) {
    console.error('Get admin users error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user (Admin)
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
export const updateUserByAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Don't allow admin to modify their own role to prevent lockout
    if (req.params.id === req.user._id.toString() && req.body.role && req.body.role !== 'admin') {
      return res.status(400).json({
        success: false,
        message: 'You cannot change your own admin role'
      });
    }

    // Update fields
    const updatableFields = ['name', 'email', 'phone', 'role'];
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    // Update addresses if provided
    if (req.body.addresses) {
      user.addresses = req.body.addresses;
    }

    await user.save();

    res.json({
      success: true,
      message: 'User updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        addresses: user.addresses
      }
    });
  } catch (error) {
    console.error('Update user by admin error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete user (Admin)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUserByAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Don't allow deleting your own account
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    // Check if user has any orders
    const orders = await Order.find({ user: user._id });
    if (orders.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete user with existing orders. Consider deactivating instead.'
      });
    }

    await user.deleteOne();

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user by admin error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ===========================================
// REVIEW MANAGEMENT
// ===========================================

// @desc    Get all reviews (Admin)
// @route   GET /api/admin/reviews
// @access  Private/Admin
export const getAdminReviews = async (req, res) => {
  try {
    const pageSize = 20;
    const page = Number(req.query.page) || 1;
    const { status, productId } = req.query;

    const query = {};
    if (status) query.status = status;
    if (productId) query.product = productId;

    const count = await Review.countDocuments(query);
    const reviews = await Review.find(query)
      .sort('-createdAt')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .populate('user', 'name email')
      .populate('product', 'name images');

    res.json({
      success: true,
      reviews,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    console.error('Get admin reviews error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update review status (Approve/Reject)
// @route   PUT /api/admin/reviews/:id/status
// @access  Private/Admin
export const updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    review.status = status;
    await review.save();

    // Update product rating if review is approved
    if (status === 'approved' && review.status !== 'approved') {
      const productReviews = await Review.find({ 
        product: review.product, 
        status: 'approved' 
      });
      
      const avgRating = productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length;
      
      await Product.findByIdAndUpdate(review.product, {
        ratings: avgRating,
        numReviews: productReviews.length
      });
    }

    res.json({
      success: true,
      message: `Review ${status}`,
      review
    });
  } catch (error) {
    console.error('Update review status error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete review (Admin)
// @route   DELETE /api/admin/reviews/:id
// @access  Private/Admin
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Delete review images from cloudinary
    if (review.images && review.images.length > 0) {
      for (const image of review.images) {
        if (image.publicId) {
          try {
            await cloudinary.uploader.destroy(image.publicId);
          } catch (err) {
            console.error('Error deleting review image:', err);
          }
        }
      }
    }

    await review.deleteOne();

    // Update product rating
    const productReviews = await Review.find({ 
      product: review.product, 
      status: 'approved' 
    });
    
    if (productReviews.length > 0) {
      const avgRating = productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length;
      await Product.findByIdAndUpdate(review.product, {
        ratings: avgRating,
        numReviews: productReviews.length
      });
    } else {
      await Product.findByIdAndUpdate(review.product, {
        ratings: 0,
        numReviews: 0
      });
    }

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ===========================================
// COUPON MANAGEMENT
// ===========================================

// @desc    Create coupon
// @route   POST /api/admin/coupons
// @access  Private/Admin
export const createCoupon = async (req, res) => {
  try {
    const {
      code,
      description,
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscountAmount,
      validFrom,
      validUntil,
      usageLimit,
      perUserLimit,
      applicableCategories,
      applicableProducts,
      isActive
    } = req.body;

    // Check if coupon code already exists
    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (existingCoupon) {
      return res.status(400).json({
        success: false,
        message: 'Coupon code already exists'
      });
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      description,
      discountType,
      discountValue: Number(discountValue),
      minOrderAmount: minOrderAmount ? Number(minOrderAmount) : 0,
      maxDiscountAmount: maxDiscountAmount ? Number(maxDiscountAmount) : null,
      validFrom: new Date(validFrom),
      validUntil: new Date(validUntil),
      usageLimit: usageLimit ? Number(usageLimit) : null,
      perUserLimit: perUserLimit ? Number(perUserLimit) : 1,
      applicableCategories: applicableCategories ? applicableCategories.split(',') : [],
      applicableProducts: applicableProducts ? applicableProducts.split(',') : [],
      isActive: isActive === 'true' || isActive === true,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      coupon
    });
  } catch (error) {
    console.error('Create coupon error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};