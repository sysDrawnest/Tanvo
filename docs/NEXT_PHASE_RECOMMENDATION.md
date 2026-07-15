# Engineering Recommendations: TANVO Platform Launch

**Date:** July 15, 2026  
**Auditor:** Senior Software Architect / CTO Auditor  
**Scope:** Actionable Execution Roadmap  

---

## 1. Prioritized Backlog & Engineering Plan

Below is the structured backlog designed to bring the TANVO platform to production-grade readiness, sorted by priority:

### Priority 1: Security & Compliance (Critical - Week 1)
*   **Cryptographic Webhook Signature Verification:** Enable verification for Razorpay webhooks in `paymentController.js` using `crypto.createHmac`.
*   **Auth Refactoring:** Remove the redundant `AuthContext.tsx` from the frontend and centralize all authentication, profile updates, and guest merging under `StoreContext.tsx`.

### Priority 2: Integration & Operational Readiness (High - Week 2)
*   **Live Credentials Deployment:** Configure live credentials (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `SHIPROCKET_EMAIL`, `SHIPROCKET_PASSWORD`) in production environment files.
*   **Shiprocket API Verification:** Replace sandbox fallbacks in `shiprocket.js` with live serviceability checks and shipment creations, followed by end-to-end user path dry runs.

### Priority 3: Stability & Quality Assurance (Medium - Week 3)
*   **Write Core Automated Tests:** Implement integration tests for inventory deduction and cart price validation.
*   **Add Database Aggregations:** Refactor POS statistics and CRM analytics endpoints to use MongoDB aggregation pipelines instead of JavaScript in-memory filtering.

### Priority 4: Performance & Optimization (Low - Week 4)
*   **Vite CSS Optimizations:** Migrate Tailwind CSS compile steps from runtime CDN execution to build-time processing via PostCSS.
*   **Add Server-Side Pagination:** Introduce pagination controls on product query endpoints to limit response payload sizes.

---

## 2. Estimated Effort & Resource Allocation

Below is the estimated effort required for a single senior full-stack engineer:

| Task Description | Dev Effort | Testing Effort | Priority Level |
| :--- | :---: | :---: | :---: |
| Implement Webhook Verification | 1.0 Day | 0.5 Day | Critical |
| Refactor Duplicate Auth Contexts | 1.5 Days | 0.5 Day | Critical |
| Deploy Live Credentials & Verify APIs | 1.0 Day | 1.0 Day | High |
| Database Aggregations Refactor | 1.5 Days | 0.5 Day | Medium |
| Add Server-side API Pagination | 1.5 Days | 0.5 Day | Low |
| Add Basic Unit & Integration Tests | 3.0 Days | 1.0 Day | Low |
| **Total Estimated Workload** | **9.5 Days** | **4.0 Days** | **13.5 Days** |

---

## 3. Recommended Production Launch Checklist

### Environment Configurations (`.env`)
Ensure the following variables are configured in the production environment:
*   `MONGO_URI` pointing to a production replica set.
*   `JWT_SECRET` set to a strong, randomly generated string.
*   Live keys for third-party services (`CLOUDINARY_URL`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `SHIPROCKET_EMAIL`, `SHIPROCKET_PASSWORD`).

### Security Configurations
*   Restrict CORS origins to the production domain.
*   Ensure all API requests route over HTTPS.

### CDN & Caching
*   Configure Cloudinary caching headers.
*   Deploy a reverse proxy (e.g., Cloudflare) to cache static assets and mitigate DDoS attacks.
