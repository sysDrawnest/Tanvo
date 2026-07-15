import test from 'node:test';
import assert from 'node:assert';
import crypto from 'crypto';
import { handleWebhook } from '../controllers/paymentController.js';
import Order from '../models/Order.js';

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

test('Razorpay Webhook - Unauthorized due to missing signature', async () => {
  const req = {
    headers: {},
    rawBody: Buffer.from(JSON.stringify({ event: 'payment.captured' }))
  };
  const res = makeMockRes();

  await handleWebhook(req, res);

  assert.strictEqual(res.statusCode, 401);
  assert.strictEqual(res.jsonData.success, false);
  assert.strictEqual(res.jsonData.message.includes('Missing signature'), true);
});

test('Razorpay Webhook - Unauthorized due to invalid signature', async () => {
  process.env.RAZORPAY_WEBHOOK_SECRET = 'secret_key';
  const req = {
    headers: {
      'x-razorpay-signature': 'incorrect_signature'
    },
    rawBody: Buffer.from(JSON.stringify({ event: 'payment.captured' }))
  };
  const res = makeMockRes();

  await handleWebhook(req, res);

  assert.strictEqual(res.statusCode, 401);
  assert.strictEqual(res.jsonData.success, false);
  assert.strictEqual(res.jsonData.message.includes('Invalid webhook signature'), true);
});

test('Razorpay Webhook - Success with valid signature', async () => {
  const secret = 'secret_key';
  process.env.RAZORPAY_WEBHOOK_SECRET = secret;

  const payload = {
    event: 'payment.captured',
    payload: {
      payment: {
        entity: {
          id: 'pay_123',
          order_id: 'order_123'
        }
      }
    }
  };

  const rawBody = Buffer.from(JSON.stringify(payload));
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  const req = {
    headers: {
      'x-razorpay-signature': expectedSignature
    },
    rawBody,
    body: payload
  };
  const res = makeMockRes();

  // Mock Order.findOne
  Order.findOne = async () => null; // order not found, but signature verification should pass first

  await handleWebhook(req, res);

  // Since signature is valid, it proceeds to check database. Since order is not found,
  // it doesn't fail but returns status 'ok' (standard webhook behavior)
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.jsonData.status, 'ok');
});
