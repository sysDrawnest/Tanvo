import test from 'node:test';
import assert from 'node:assert';
import { getProducts } from '../controllers/productController.js';
import Product from '../models/Product.js';

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

test('Get Products with Pagination - Success', async () => {
  // Mock Product.countDocuments
  Product.countDocuments = async () => 25;

  // Mock Product.find query chaining
  Product.find = () => {
    const queryChain = {
      sort() { return this; },
      limit() { return this; },
      skip() {
        return Promise.resolve([
          {
            toJSON() {
              return {
                _id: 'prod_1',
                name: 'Product 1',
                price: 1500
              };
            }
          }
        ]);
      }
    };
    return queryChain;
  };

  const req = {
    query: {
      page: '2',
      limit: '10'
    },
    headers: {}
  };

  const res = makeMockRes();

  await getProducts(req, res);

  assert.strictEqual(res.statusCode, 200);
  assert.ok(res.jsonData.pagination);
  assert.strictEqual(res.jsonData.pagination.page, 2);
  assert.strictEqual(res.jsonData.pagination.limit, 10);
  assert.strictEqual(res.jsonData.pagination.totalItems, 25);
  assert.strictEqual(res.jsonData.pagination.totalPages, 3);
  assert.strictEqual(res.jsonData.pagination.hasNextPage, true);
  assert.strictEqual(res.jsonData.pagination.hasPreviousPage, true);
});
