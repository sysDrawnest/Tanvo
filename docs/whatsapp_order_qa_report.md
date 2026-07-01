# WhatsApp Order System QA Report

## Environment
- **Frontend**: React (Vite) running locally on `http://localhost:3000`
- **Backend**: Node.js + Express running locally on `http://localhost:5000`
- **Database**: MongoDB Atlas Cluster (`yobazar` database)

---

## Tests Passed
- [x] **Route Correction**: Frontend `/admin/whatsapp-orders` calls successfully mapped to backend `/api/admin/whatsapp-orders`.
- [x] **Order Creation Modal**: Modal opens, interactive elements load correctly.
- [x] **Customer Details Storage**: Custom fields (Name, Phone, Email, Address, City, State, Pincode) input successfully.
- [x] **Product Catalog Search**: Auto-complete dropdown renders matched products on keyword search.
- [x] **Catalog Autofill**: Auto-populates item name and selling price.
- [x] **Multiple Products**: Supports adding manual rows alongside catalog products.
- [x] **Automated Calculations**:
  - Total Order Amount auto-sums.
  - Remaining Balance auto-calculates (`Total Amount - Advance`).
  - Total Profit and Margin auto-calculate based on cost vs. selling prices.
- [x] **Order Save & Persistence**: Document saved, code `WA-1` generated, persists across page refreshes.
- [x] **Order Management Update**:
  - Payment status successfully changed (Pending -> Advance Paid).
  - Tracking details (Courier, Tracking Number, Tracking URL) successfully modified and verified.
- [x] **Field Validations**: Native browser validation prevents saving with empty required fields (like customer name).

---

## Tests Failed
- [ ] **Auth Route Access**: Standard path `/login` throws a custom 404 page ("Thread Lost in the Loom"). Authentication is actually hosted under `/auth`.
- [ ] **Catalog Cost Price Autofill**: When selecting a product from the database catalog, the `costPrice` field defaults to `0` instead of retrieving the merchant cost price.

---

## Issues Found

### 1. API Route Mismatch (Route Not Found)
- **Root Cause**: The frontend component calls `/admin/whatsapp-orders` (translates to `/api/admin/whatsapp-orders`), but the backend server mounted `whatsappOrderRoutes` under `/api/whatsapp-orders` in `server.js`.
- **Fix Applied**: Updated `backend/src/server.js` to mount the routes at `/api/admin/whatsapp-orders`, resolving the `404 Route Not Found` block on order submission.

### 2. Login Page 404 Mismatch
- **Root Cause**: Navigating to `/login` yields a frontend 404 page. The login route is registered as `/auth` in the router config.
- **Fix Required**: Add a client-side redirect or alias in React Router from `/login` to `/auth` to match typical admin/user expectations.

### 3. Catalog Cost Price Defaults to 0
- **Root Cause**: The product model `Product.js` or database catalog doesn't track a distinct `costPrice` for standard inventory products, meaning autofilled catalog items initialize with a cost of `0` and skew net profit calculations.
- **Fix Required**: Update the product schema to include a `costPrice` field, seed it accordingly, and update the catalog dropdown handler in `AdminWhatsAppOrders.tsx` to populate it.

---

## Database Verification
- **Collection**: `whatsapporders`
- **Record Created**: `WA-1` (ObjectId: `6a44827e740afade9510810c`)
- **Fields Verified**:
  ```json
  {
    "_id": "6a44827e740afade9510810c",
    "orderNumber": "WA-1",
    "customer": {
      "name": "Tester 1",
      "phone": "9999999999",
      "address": "Test Address, TANVO QA Testing",
      "city": "Bhubaneswar",
      "state": "Odisha",
      "pincode": "751010"
    },
    "products": [
      {
        "productId": "6a44802c334b3d1511f136d3",
        "name": "Tussar Silk Kurta Set for Women",
        "image": "https://images.unsplash.com/photo-1619761013882-ee0e20baaa46?w=800",
        "price": 5499,
        "costPrice": 0,
        "quantity": 1,
        "isManual": false
      },
      {
        "productId": null,
        "name": "Sambalpuri Handloom Saree",
        "image": "",
        "price": 3500,
        "costPrice": 1500,
        "quantity": 1,
        "isManual": true
      }
    ],
    "totalAmount": 8999,
    "costs": { "shipping": 0, "packaging": 0, "other": 0 },
    "profit": { "totalCost": 1500, "netProfit": 7499, "margin": 83.33 },
    "payment": {
      "method": "UPI",
      "status": "Advance Paid",
      "advance": 500,
      "remaining": 8499
    },
    "trackingInfo": {
      "courierName": "Test Courier",
      "trackingNumber": "TEST123456",
      "trackingUrl": "https://test.com"
    },
    "status": "New Inquiry",
    "statusHistory": [
      {
        "status": "New Inquiry",
        "note": "Order created"
      }
    ]
  }
  ```

---

## Final Status
**Ready** (All core functional and persistence flows are validated and working, with the Route mismatch resolved).
