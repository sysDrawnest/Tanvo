import Collection from '../models/Collection.js';
import Product from '../models/Product.js';

// Fetch products based on manual selection or automatic rule query
const getCollectionProducts = async (collection) => {
  if (collection.type === 'manual') {
    const populated = await Collection.findById(collection._id).populate('products');
    return populated.products || [];
  } else {
    const query = {};
    const { weave, fabric, category, priceRange } = collection.rules;

    if (weave && weave.trim() !== '') {
      query.weave = weave.trim();
    }
    if (fabric && fabric.trim() !== '') {
      query.fabric = fabric.trim();
    }
    if (category && category.trim() !== '') {
      query.category = category.trim();
    }

    const minPrice = priceRange?.min !== undefined ? priceRange.min : 0;
    const maxPrice = priceRange?.max !== undefined ? priceRange.max : 1000000;
    query.price = { $gte: minPrice, $lte: maxPrice };

    return await Product.find(query);
  }
};

// Create a new Collection
export const createCollection = async (req, res) => {
  try {
    const { name, slug, description, bannerImage, type, products, rules, seo, isActive } = req.body;

    // Check slug uniqueness
    if (slug) {
      const existing = await Collection.findOne({ slug });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Collection with this slug already exists' });
      }
    }

    const collection = new Collection({
      name,
      slug,
      description,
      bannerImage,
      type,
      products,
      rules,
      seo,
      isActive
    });

    await collection.save();
    res.status(201).json({ success: true, data: collection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all Collections
export const getCollections = async (req, res) => {
  try {
    const query = req.query.all === 'true' ? {} : { isActive: true };
    const collections = await Collection.find(query);
    res.status(200).json({ success: true, data: collections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single Collection by slug
export const getCollectionBySlug = async (req, res) => {
  try {
    const collection = await Collection.findOne({ slug: req.params.slug });
    if (!collection) {
      return res.status(404).json({ success: false, message: 'Collection not found' });
    }

    const products = await getCollectionProducts(collection);
    res.status(200).json({
      success: true,
      data: {
        collection,
        products
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a Collection
export const updateCollection = async (req, res) => {
  try {
    const { name, slug, description, bannerImage, type, products, rules, seo, isActive } = req.body;

    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).json({ success: false, message: 'Collection not found' });
    }

    // Check slug uniqueness if changed
    if (slug && slug !== collection.slug) {
      const existing = await Collection.findOne({ slug });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Collection with this slug already exists' });
      }
    }

    collection.name = name !== undefined ? name : collection.name;
    collection.slug = slug !== undefined ? slug : collection.slug;
    collection.description = description !== undefined ? description : collection.description;
    collection.bannerImage = bannerImage !== undefined ? bannerImage : collection.bannerImage;
    collection.type = type !== undefined ? type : collection.type;
    collection.products = products !== undefined ? products : collection.products;
    collection.rules = rules !== undefined ? rules : collection.rules;
    collection.seo = seo !== undefined ? seo : collection.seo;
    collection.isActive = isActive !== undefined ? isActive : collection.isActive;

    await collection.save();
    res.status(200).json({ success: true, data: collection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a Collection
export const deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).json({ success: false, message: 'Collection not found' });
    }

    await collection.deleteOne();
    res.status(200).json({ success: true, message: 'Collection deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
