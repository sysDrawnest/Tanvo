import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate({
        path: 'items.product',
        select: 'name price images stock weave fabric colors sizes'
      });

    if (!cart) {
      // Create empty cart if doesn't exist
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }

    res.json({
      success: true,
      cart
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, color, size } = req.body;

    // Validate quantity
    if (quantity < 1) {
      return res.status(400).json({ 
        success: false,
        message: 'Quantity must be at least 1' 
      });
    }

    // Check if product exists and has stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ 
        success: false,
        message: `Insufficient stock. Only ${product.stock} available.` 
      });
    }

    // Find user's cart or create new one
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: []
      });
    }

    // Check if product already in cart with same options
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId && 
              item.color === color && 
              item.size === size
    );

    if (existingItemIndex > -1) {
      // Check if adding more would exceed stock
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      if (product.stock < newQuantity) {
        return res.status(400).json({ 
          success: false,
          message: `Cannot add ${quantity} more. Only ${product.stock - cart.items[existingItemIndex].quantity} available.` 
        });
      }
      
      // Update quantity if product exists
      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Validate color/size if product has them
      if (color && product.colors && !product.colors.includes(color)) {
        return res.status(400).json({ 
          success: false,
          message: 'Invalid color selection' 
        });
      }
      if (size && product.sizes && !product.sizes.includes(size)) {
        return res.status(400).json({ 
          success: false,
          message: 'Invalid size selection' 
        });
      }

      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        color,
        size,
        price: product.price
      });
    }

    await cart.save();
    
    // Populate product details
    await cart.populate({
      path: 'items.product',
      select: 'name price images stock weave fabric colors sizes'
    });

    res.json({
      success: true,
      message: 'Item added to cart successfully',
      cart
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update/:itemId
// @access  Private
export const updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    // Validate quantity
    if (quantity < 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Quantity cannot be negative' 
      });
    }

    // Find cart and update in one atomic operation
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ 
        success: false,
        message: 'Cart not found' 
      });
    }

    // Find the item
    const itemIndex = cart.items.findIndex(
      item => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ 
        success: false,
        message: 'Item not found in cart' 
      });
    }

    if (quantity === 0) {
      // Remove item if quantity is 0
      cart.items.splice(itemIndex, 1);
    } else {
      // Check stock
      const product = await Product.findById(cart.items[itemIndex].product);
      if (product.stock < quantity) {
        return res.status(400).json({ 
          success: false,
          message: `Insufficient stock. Only ${product.stock} available.` 
        });
      }

      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    
    await cart.populate({
      path: 'items.product',
      select: 'name price images stock weave fabric colors sizes'
    });

    res.json({
      success: true,
      message: quantity === 0 ? 'Item removed from cart' : 'Cart updated successfully',
      cart
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:itemId
// @access  Private
export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Atomic operation using $pull
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { items: { _id: itemId } } },
      { new: true }
    ).populate({
      path: 'items.product',
      select: 'name price images stock weave fabric colors sizes'
    });

    if (!cart) {
      return res.status(404).json({ 
        success: false,
        message: 'Cart not found' 
      });
    }

    res.json({
      success: true,
      message: 'Item removed from cart',
      cart
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { 
        $set: { 
          items: [],
          couponCode: null,
          discountAmount: 0
        } 
      },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ 
        success: false,
        message: 'Cart not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Cart cleared successfully',
      cart 
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Apply coupon to cart
// @route   POST /api/cart/apply-coupon
// @access  Private
export const applyCoupon = async (req, res) => {
  try {
    const { couponCode } = req.body;

    if (!couponCode) {
      return res.status(400).json({ 
        success: false,
        message: 'Coupon code is required' 
      });
    }

    // Mock coupons (replace with actual Coupon model later)
    const validCoupons = {
      'SYS10': { discount: 10, type: 'percentage', minOrder: 0, description: '10% off on all orders' },
      'SYS20': { discount: 20, type: 'percentage', minOrder: 1000, description: '20% off on orders above ₹1000' },
      'SYS500': { discount: 500, type: 'fixed', minOrder: 2500, description: '₹500 off on orders above ₹2500' },
      'WELCOME': { discount: 15, type: 'percentage', minOrder: 0, description: '15% welcome discount' },
      'FREESHIP': { discount: 100, type: 'fixed', minOrder: 500, description: '₹100 off on orders above ₹500' }
    };

    const coupon = validCoupons[couponCode.toUpperCase()];
    if (!coupon) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid coupon code' 
      });
    }

    // Find user's cart
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ 
        success: false,
        message: 'Cart not found' 
      });
    }

    if (cart.items.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Cart is empty' 
      });
    }

    // Calculate subtotal
    const subtotal = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Check minimum order amount
    if (subtotal < coupon.minOrder) {
      return res.status(400).json({ 
        success: false,
        message: `Minimum order amount of ₹${coupon.minOrder} required for this coupon` 
      });
    }

    let discountAmount = 0;
    if (coupon.type === 'percentage') {
      discountAmount = (subtotal * coupon.discount) / 100;
      // Cap discount at 50% of subtotal
      discountAmount = Math.min(discountAmount, subtotal * 0.5);
    } else {
      discountAmount = coupon.discount;
      // Cap fixed discount at subtotal
      discountAmount = Math.min(discountAmount, subtotal);
    }

    // Round to nearest rupee
    discountAmount = Math.round(discountAmount);

    // Update cart
    cart.couponCode = couponCode.toUpperCase();
    cart.discountAmount = discountAmount;
    await cart.save();

    // Populate product details
    await cart.populate({
      path: 'items.product',
      select: 'name price images stock weave fabric colors sizes'
    });

    res.json({
      success: true,
      message: 'Coupon applied successfully',
      cart,
      discountAmount,
      couponDetails: {
        code: couponCode.toUpperCase(),
        discount: coupon.discount,
        type: coupon.type,
        description: coupon.description
      }
    });
  } catch (error) {
    console.error('Apply coupon error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};