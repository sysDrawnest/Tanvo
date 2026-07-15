# Technical Debt & Code Quality Report: TANVO Platform

**Date:** July 15, 2026  
**Auditor:** Senior Software Architect / CTO Auditor  
**Scope:** Code Review, Vulnerabilities, Performance, & Flaws  

---

## 1. Critical Architectural Redundancies & Flaws

### Competing Authentication Contexts (High Debt)
* **Finding:** The application contains two duplicate authentication contexts in the frontend: `AuthContext.tsx` and `StoreContext.tsx`.
* **Details:** `StoreContext.tsx` manages its own authentication state, calls backend endpoints, and handles guest data merging. `AuthContext.tsx` also reads tokens from `localStorage` but its `useAuth` hook is not used by any component.
* **Risk:** Leads to dead code, larger bundle sizes, and potential state sync issues if components start importing the wrong context.

### Hardcoded Configuration Files
* **Finding:** The frontend contains hardcoded API base URLs (e.g. `http://localhost:5000/api` or `https://tanvo.onrender.com/api` fallback settings in `api.ts` and `AuthContext.tsx`).
* **Risk:** Hardcoded fallbacks make deployments brittle and configuration changes difficult.

---

## 2. Security & Vulnerability Analysis

### Webhook Signature Bypass (High Risk)
* **Finding:** The Razorpay controller handles webhook events but lacks live cryptographic signature verification.
* **Risk:** Allow attackers to forge payment success events and mark unpaid orders as "Paid" or "Payment Verified".

### Lack of Server-Side Input Sanitization
* **Finding:** Several input fields in custom routes lack schemas, relying instead on basic presence checks.
* **Risk:** Increases the risk of MongoDB injection attacks (e.g., passing `$gt` in query objects) or Cross-Site Scripting (XSS) via un-sanitized description fields.

---

## 3. Performance Bottlenecks & Queries

### Lack of Server-Side Pagination
* **Finding:** Endpoints like `/api/products` return the entire product list without page boundaries.
* **Risk:** As the catalog grows, this will degrade database performance, increase server load, and slow down page loads.

### Suboptimal Database Queries
* **Finding:** Multiple dashboard routes use `.find()` queries and perform post-processing in JavaScript rather than using MongoDB's aggregation pipelines (`$group`, `$sum`, `$project`).
* **Risk:** Performing heavy computations in memory on the server will cause performance issues as transaction volumes increase.

---

## 4. Test Coverage & Quality Assurance Gaps

### Complete Absence of Automated Testing
* **Finding:** The codebase does not contain unit tests (Jest/Vitest), integration tests (Supertest), or E2E tests (Playwright/Cypress).
* **Risk:** Relies entirely on manual verification. This makes code changes risky and prone to regressions, especially around payment processing and inventory deduction.

---

## 5. Development Infrastructure Debt

### Runtime Tailwind Compilation
* **Finding:** The project relies on runtime CDN injection for Tailwind CSS styling.
* **Risk:** Slows down initial page loads and can cause layout shifts as styles compile in the browser. Must be migrated to a build-time compile step.
