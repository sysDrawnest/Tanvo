import test from 'node:test';
import assert from 'node:assert';
import { registerUser, loginUser } from '../controllers/authController.js';
import User from '../models/User.js';

// Setup basic environment variables for tests
process.env.JWT_SECRET = 'test_secret';
process.env.JWT_EXPIRE = '1h';

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

test('Register User - Success', async () => {
  // Mock User exists check to return null (does not exist)
  User.findOne = async () => null;

  // Mock User.create
  User.create = async (userData) => {
    return {
      _id: 'mock_user_id',
      name: userData.name,
      email: userData.email,
      role: 'customer',
      save: async () => {}
    };
  };

  const req = {
    body: {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    }
  };

  const res = makeMockRes();

  await registerUser(req, res);

  assert.strictEqual(res.statusCode, 201);
  assert.strictEqual(res.jsonData._id, 'mock_user_id');
  assert.strictEqual(res.jsonData.email, 'john@example.com');
  assert.ok(res.jsonData.token);
});

test('Login User - Success', async () => {
  // Mock User.findOne to return a valid user with matchPassword method
  User.findOne = () => {
    return {
      select() {
        return {
          _id: 'mock_user_id',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'customer',
          matchPassword: async (pass) => pass === 'password123',
          save: async () => {}
        };
      }
    };
  };

  const req = {
    body: {
      email: 'john@example.com',
      password: 'password123'
    }
  };

  const res = makeMockRes();

  await loginUser(req, res);

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.jsonData._id, 'mock_user_id');
  assert.ok(res.jsonData.token);
});
