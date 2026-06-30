import WACustomer from '../models/WACustomer.js';
import WhatsAppOrder from '../models/WhatsAppOrder.js';

// ── Get all customers ────────────────────────────────────────────────────────
export const getCustomers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search, sort = 'totalSpent' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }

    const sortMap = {
      totalSpent:  { totalSpent: -1 },
      totalOrders: { totalOrders: -1 },
      recent:      { lastPurchaseDate: -1 },
      name:        { name: 1 }
    };
    const sortQuery = sortMap[sort] || { totalSpent: -1 };

    const [customers, total] = await Promise.all([
      WACustomer.find(filter)
        .sort(sortQuery)
        .skip(skip)
        .limit(parseInt(limit))
        .select('-orders'), // Don't send full order list in index
      WACustomer.countDocuments(filter)
    ]);

    // Top customers by spend for analytics
    const topCustomers = await WACustomer.find()
      .sort({ totalSpent: -1 })
      .limit(5)
      .select('name phone totalSpent totalOrders');

    res.json({
      success: true,
      customers,
      topCustomers,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Get single customer with full order history ──────────────────────────────
export const getCustomerById = async (req, res) => {
  try {
    const customer = await WACustomer.findById(req.params.id)
      .populate({
        path: 'orders',
        select: 'orderNumber totalAmount status payment.status createdAt profit',
        options: { sort: { createdAt: -1 } }
      });

    if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });

    res.json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Update customer ──────────────────────────────────────────────────────────
export const updateCustomer = async (req, res) => {
  try {
    const { name, email, address, city, state, pincode, tags, notes, whatsappNumber } = req.body;
    const customer = await WACustomer.findById(req.params.id);
    if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });

    if (name !== undefined)           customer.name = name;
    if (email !== undefined)          customer.email = email;
    if (address !== undefined)        customer.address = address;
    if (city !== undefined)           customer.city = city;
    if (state !== undefined)          customer.state = state;
    if (pincode !== undefined)        customer.pincode = pincode;
    if (tags !== undefined)           customer.tags = tags;
    if (notes !== undefined)          customer.notes = notes;
    if (whatsappNumber !== undefined) customer.whatsappNumber = whatsappNumber;

    await customer.save();
    res.json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Find or create customer by phone (used during order creation) ─────────────
export const findOrCreateCustomer = async (customerData, adminUserId) => {
  const phone = customerData.phone?.trim();
  if (!phone) return null;

  let customer = await WACustomer.findOne({ phone });

  if (!customer) {
    customer = await WACustomer.create({
      name: customerData.name,
      phone,
      whatsappNumber: customerData.whatsappNumber || phone,
      address: customerData.address,
      city: customerData.city,
      state: customerData.state,
      pincode: customerData.pincode,
      tags: ['New'],
      createdBy: adminUserId
    });
  }

  return customer;
};

// ── Update customer stats after an order is linked ───────────────────────────
export const syncCustomerStats = async (customerId) => {
  if (!customerId) return;
  const orders = await WhatsAppOrder.find({
    customerId,
    status: { $nin: ['Cancelled'] }
  }).select('totalAmount createdAt');

  const totalOrders = orders.length;
  const totalSpent  = orders.reduce((s, o) => s + o.totalAmount, 0);
  const lastPurchaseDate = orders.length > 0
    ? orders.sort((a, b) => b.createdAt - a.createdAt)[0].createdAt
    : null;

  await WACustomer.findByIdAndUpdate(customerId, {
    totalOrders,
    totalSpent,
    lastPurchaseDate,
    // Upgrade tag from 'New' to 'Regular' after 2+ orders
    ...(totalOrders >= 2 ? { $addToSet: { tags: 'Regular' } } : {})
  });
};

// ── Get customer stats for dashboard ─────────────────────────────────────────
export const getCustomerStats = async (req, res) => {
  try {
    const [total, topSpenders, newThisMonth] = await Promise.all([
      WACustomer.countDocuments(),
      WACustomer.find().sort({ totalSpent: -1 }).limit(5).select('name phone totalSpent totalOrders tags'),
      WACustomer.countDocuments({
        createdAt: { $gte: new Date(new Date().setDate(1)) }
      })
    ]);

    res.json({
      success: true,
      stats: { total, newThisMonth, topSpenders }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
