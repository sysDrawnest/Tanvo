# Technical Debt & Production Hardening Remediation Report

This document records the updates made to resolve security risks, redundant dependencies, performance bottlenecks, and validation vulnerabilities on the TANVO platform.

---

## 1. Authentication Consolidation

- **Issue**: Competing auth contexts (`AuthContext.tsx` and `StoreContext.tsx`) managing similar state.
- **Resolution**:
  - Deleted the redundant `AuthContext.tsx` file and removed its `AuthProvider` wrapper from `App.tsx`.
  - Consolidated authentication state management into `StoreContext.tsx` as the single source-of-truth.
  - Implemented an `api` compatibility export in `services/api.ts` to prevent import breakages across pages like `Contact.tsx`, `ReportBug.tsx`, `VerifyEmail.tsx`, `ForgotPassword.tsx`, and `ResetPassword.tsx`.

---

## 2. Razorpay Webhook Security

- **Issue**: HMAC SHA-256 signature verification relied on `JSON.stringify(req.body)`, which is vulnerable to JSON key sorting/mutation bypasses.
- **Resolution**:
  - Configured `express.json()` in `backend/src/server.js` with a verification callback to capture the raw request body buffer as `req.rawBody`.
  - Updated `paymentController.handleWebhook` to use `req.rawBody` for cryptographically robust HMAC SHA-256 validation.
  - Configured the webhook controller to reject unauthorized signature failures with a `401 Unauthorized` status.

---

## 3. Server-Side Request Validation & Sanitization

- **Issue**: Lack of request body schemas and vulnerability to NoSQL operator injection (e.g., using `$gt` in fields).
- **Resolution**:
  - Created a Zod-based request validation middleware `backend/src/middleware/validate.js` that parses schemas and recursively sanitizes request payloads by stripping object keys prefixed with `$`.
  - Defined robust validation schemas for registration, login, product creation/updating, and order creation in `backend/src/validators/schemas.js`.
  - Applied the validation middleware to the public registration/login endpoints, admin product management routes, and customer order placement routes.

---

## 4. Product API Pagination

- **Issue**: Unpaginated product listings leading to performance issues.
- **Resolution**:
  - Implemented server-side pagination with query parameters (`page`, `limit`, `sort`, `search`, `category`) in `backend/src/controllers/productController.js`.
  - Returned standard pagination metadata structure (`page`, `limit`, `totalItems`, `totalPages`, `hasNextPage`, `hasPreviousPage`) while keeping original fields for backward compatibility.

---

## 5. Database Query Optimization

- **Issue**: In-memory JavaScript array operations (`reduce`, `filter`, `sort`) used for aggregating statistics on orders and users.
- **Resolution**:
  - Refactored `syncCustomerStats` in `waCustomerController.js` to compute totals, Spent Amount, and last purchase date via a MongoDB `$group` aggregation pipeline.
  - Refactored `getUserById` in `userController.js` to calculate total orders, spending, AOV, and pending/completed/cancelled order counts using a single MongoDB `$group` aggregation.
  - Refactored the `/admin/range` revenue calculation in `orderRoutes.js` to aggregate total revenue via the database using a MongoDB aggregation pipeline.

---

## 6. Testing Baseline

- **Issue**: Absence of automated backend tests.
- **Resolution**:
  - Configured a zero-dependency test runner using the native Node.js test runner.
  - Added unit tests under `backend/src/tests/` to verify login, registration, order creation, Razorpay webhooks, and product pagination using mock Mongoose queries.
