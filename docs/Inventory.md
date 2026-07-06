# TANVO Inventory Management System

## Overview

The TANVO Inventory Management System is responsible for maintaining a single source of truth for product stock across all sales channels:

- Website Orders
- WhatsApp Orders
- Offline POS Sales

Every confirmed sale must update the same inventory database to prevent overselling and stock mismatch.

---

# Core Principle

## One Product = One Inventory

Example:

Product:

```

Sambalpuri Silk Saree

```

Current Stock:

```

10 pieces

```

Sales:

Website:

```

Sold 2

```

WhatsApp:

```

Sold 3

```

Offline:

```

Sold 1

```

Final Inventory:

```

10 - 6 = 4 pieces remaining

```

All channels must update the same product stock.

---

# Inventory Flow

## Website Order

```

Customer places order
↓
Payment confirmed
↓
Order status confirmed
↓
Inventory deduction
↓
Stock updated

```

---

## WhatsApp Order

```

Customer enquiry
↓
No stock change

Customer confirms
↓
Advance/payment received
↓
Inventory deduction
↓
Stock updated

```

---

## Offline POS Order

```

Billing completed
↓
Inventory deduction
↓
Stock updated

```

---

# Stock Rules

## New Inquiry

Status:

```

New Inquiry

```

Action:

```

No inventory change

```

Reason:

Customer may cancel.

---

## Confirmed Order

Status:

```

Confirmed
Advance Received
Processing

```

Action:

```

Reduce inventory

```

Example:

Before:

```

Stock: 5

```

After confirmation:

```

Stock: 4

```

---

## Cancelled Order

Status:

```

Cancelled

```

Action:

```

Restore inventory

```

Example:

Before cancellation:

```

Stock: 4

```

After restore:

```

Stock: 5

```

---

# Inventory Data Structure

Product Model:

```js
{
  (productId, name, stockQuantity, reservedQuantity, soldQuantity);
}
```

Example:

```json
{
  "name": "Sambalpuri Silk Saree",
  "stockQuantity": 10,
  "reservedQuantity": 2,
  "soldQuantity": 5
}
```

---

# Inventory Transaction History

Every stock change must create a record.

Collection:

```
InventoryTransaction
```

Example:

```json
{
  "type": "SALE",
  "channel": "WhatsApp",
  "product": "Sambalpuri Silk Saree",
  "quantity": -1,
  "orderId": "WA-1001",
  "createdAt": "date"
}
```

---

# Transaction Types

## SALE

Stock decreases.

Example:

```
Quantity: -1
```

---

## RESTOCK

New inventory added.

Example:

```
Quantity: +20
```

---

## RETURN

Customer return.

Example:

```
Quantity: +1
```

---

## ADJUSTMENT

Manual admin correction.

Example:

```
Quantity: -2
```

---

# Inventory Validation

Before reducing stock:

Check:

```
Requested Quantity <= Available Stock
```

Example:

Available:

```
2 sarees
```

Customer wants:

```
3 sarees
```

Result:

```
Order blocked
```

Message:

```
Insufficient stock available
```

---

# Admin Dashboard Inventory

Show:

## Inventory Overview

Cards:

```
Total Products

Total Stock Value

Low Stock Products

Out of Stock Products
```

---

# Product Level Tracking

Each product should show:

```
Product Name

Available Stock

Reserved Stock

Sold Quantity

Last Sold Date
```

---

# Low Stock Alert

Condition:

```
Stock <= 3
```

Show:

```
Low Stock Warning
```

Example:

```
Sambalpuri Saree
Only 2 left
```

---

# Out Of Stock

Condition:

```
Stock = 0
```

Actions:

Disable purchase button

Show:

```
Currently unavailable
```

---

# Multi Channel Sales Tracking

Every sale should store:

```
Channel:

Website
WhatsApp
Offline
```

Example Analytics:

```
Website Sales:
120 products

WhatsApp Sales:
85 products

Offline Sales:
40 products
```

---

# Implementation Requirements

## Backend

Create:

```
inventoryController.js
inventoryRoutes.js
InventoryTransaction.js
```

Functions:

```
reduceInventory()

restoreInventory()

addStock()

getInventoryHistory()
```

---

## Order Integration

Connect:

```
Order Controller
WhatsApp Order Controller
POS Billing Controller
```

with:

```
Inventory Service
```

---

# Testing Checklist

## WhatsApp Test

Product:

```
Stock: 5
```

Create WhatsApp Order:

```
Quantity: 1
```

Confirm order.

Expected:

```
Stock: 4
```

---

Cancel order.

Expected:

```
Stock: 5
```

---

## Website Test

Create website order.

Expected:

```
Inventory decreases
```

---

## Multiple Channel Test

Initial:

```
Stock: 10
```

Website:

```
-2
```

WhatsApp:

```
-3
```

Offline:

```
-1
```

Expected:

```
Remaining Stock: 4
```

---

# Final Goal

TANVO should operate with a unified inventory system where every sale channel updates the same stock database automatically.

No duplicate inventory.
No overselling.
Complete sales visibility.

```

```
