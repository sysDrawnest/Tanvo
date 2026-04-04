import Product from '../models/Product.js';
import Review from '../models/Review.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.page) || 1;

    const query = {};

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by subCategory
    if (req.query.subCategory) {
      query.subCategory = req.query.subCategory;
    }

    // Filter by weave
    if (req.query.weave) {
      query.weave = req.query.weave;
    }

    // Filter by fabric
    if (req.query.fabric) {
      query.fabric = req.query.fabric;
    }

    // Filter by price range
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    // Search by name
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }

    // Filter by tags
    if (req.query.tag) {
      query.tags = req.query.tag;
    }

    // Featured products
    if (req.query.featured) {
      query.isFeatured = true;
    }

    // Best sellers
    if (req.query.bestSeller) {
      query.isBestSeller = true;
    }

    // New arrivals
    if (req.query.newArrival) {
      query.isNewArrival = true;
    }

    // Sorting
    let sort = {};
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price-asc':
          sort = { price: 1 };
          break;
        case 'price-desc':
          sort = { price: -1 };
          break;
        case 'newest':
          sort = { createdAt: -1 };
          break;
        case 'rating':
          sort = { ratings: -1 };
          break;
        default:
          sort = { createdAt: -1 };
      }
    } else {
      sort = { createdAt: -1 };
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      // Get reviews for this product
      const reviews = await Review.find({ product: product._id, status: 'approved' })
        .populate('user', 'name profileImage')
        .sort('-createdAt')
        .limit(10);

      // Get related products
      const relatedProducts = await Product.find({
        $or: [
          { category: product.category },
          { weave: product.weave },
          { fabric: product.fabric }
        ],
        _id: { $ne: product._id }
      })
        .limit(4)
        .select('name price originalPrice images ratings numReviews isBestSeller');

      res.json({
        ...product.toJSON(),
        reviews,
        relatedProducts
      });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      Object.assign(product, req.body);
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create product review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = async (req, res) => {
  try {
    const { rating, comment, title } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      // Check if user already reviewed
      const alreadyReviewed = await Review.findOne({
        user: req.user._id,
        product: product._id
      });

      if (alreadyReviewed) {
        return res.status(400).json({ message: 'Product already reviewed' });
      }

      // Check if user purchased the product
      // This would require checking orders - implement based on your order model

      const review = await Review.create({
        user: req.user._id,
        product: product._id,
        rating: Number(rating),
        title,
        comment,
        isVerifiedPurchase: true // Set based on actual purchase check
      });

      // Update product ratings
      const reviews = await Review.find({ product: product._id, status: 'approved' });
      product.numReviews = reviews.length;
      product.ratings = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
      await product.save();

      res.status(201).json(review);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .sort({ ratings: -1 })
      .limit(10);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};