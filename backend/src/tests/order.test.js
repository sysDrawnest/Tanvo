import test from 'node:test';
import assert from 'node:assert';
import { createOrder } from '../controllers/orderController.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import InventoryLog from '../models/InventoryLog.js';
import User from '../models/User.js';

const makeMockRes = () => {
  const res = {
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.jsonData = data;
      return this;
    }
  };
  return res;
};

test('Create Order - Success', async () => {
  const mockProductId = '60d5ec49f83f2a1b3c9d7e11';
  const mockUserId = '60d5ec49f83f2a1b3c9d7e22';
  const mockOrderId = '60d5ec49f83f2a1b3c9d7e33';

  // Mock Cart.findOne to support chaining .populate()
  Cart.findOne = () => ({
    populate: async () => ({
      items: [
        {
          product: {
            _id: mockProductId,
            price: 2000,
            name: 'Handloom Saree',
            images: [{ url: 'test-image.jpg' }],
            stock: 10
          },
          quantity: 2
        }
      ],
      discountAmount: 0,
      save: async () => {}
    })
  });

  // Mock Product.findById
  Product.findById = async () => ({
    _id: mockProductId,
    name: 'Handloom Saree',
    price: 2000,
    stock: 10,
    images: [{ url: 'test-image.jpg' }]
  });

  // Mock Product.findOneAndUpdate (for inventory deduction)
  Product.findOneAndUpdate = async () => ({
    _id: mockProductId,
    name: 'Handloom Saree',
    price: 2000,
    stock: 8,
    images: [{ url: 'test-image.jpg' }]
  });

  // Mock InventoryLog.create
  InventoryLog.create = async () => ({});

  // Mock User.findById
  User.findById = async () => ({
    _id: mockUserId,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210'
  });

  // Mock Order.create
  Order.create = async (orderData) => {
    return {
      _id: mockOrderId,
      ...orderData,
      save: async () => {}
    };
  };

  const req = {
    user: {
      _id: mockUserId,
      phone: '9876543210'
    },
    body: {
      shippingAddress: {
        addressLine1: '123 Test St',
        city: 'Bhubaneswar',
        state: 'Odisha',
        pincode: '751001',
        phone: '9876543210'
      },
      paymentMethod: 'Prepaid',
      items: []
    }
  };

  const res = makeMockRes();

  await createOrder(req, res);

  assert.strictEqual(res.statusCode, 201);
  assert.strictEqual(res.jsonData._id, mockOrderId);
  // itemsPrice: 2000 * 2 = 4000
  assert.strictEqual(res.jsonData.itemsPrice, 4000);
});
