# TANVO Bulk Product Import — Admin User Guide

> **Audience**: Admin staff, catalog managers, operations team  
> **Version**: 1.0 | Updated: July 2026

---

## 1. What Is Bulk Import?

Bulk Import lets you add or update **hundreds or thousands of products** in TANVO at once, instead of adding them one by one.

You can import:
- New products (Create mode)
- Updates to existing products (Update mode)
- A mix of both (Create or Update mode)
- Products with images bundled into a ZIP file

---

## 2. When Should You Use Bulk Import?

| Situation | Use Bulk Import? |
|---|---|
| Adding 1–5 products | ❌ Use Add Product instead |
| Adding a new collection (20+ products) | ✅ Yes |
| Updating prices for a season | ✅ Yes |
| Uploading weaver photographs | ✅ Yes (ZIP import) |
| Correcting stock for 50+ products | ✅ Yes |

---

## 3. Step 1 — Download the Template

Before importing, download the correct template for your product type.

**How to download:**
1. Go to **Admin → Products → Bulk Import**
2. Click **"Download Template"**
3. Select the template type that matches your products:

| Template | Best For |
|---|---|
| **Fashion** | General clothing, kurtas, kurtis |
| **Sarees** | All types of sarees (Sambalpuri, Bomkai, etc.) |
| **Kids** | Boys and girls ethnic wear |
| **Accessories** | Jewelry, bags, stoles, dupattas |
| **Home Decor** | Cushion covers, wall hangings, etc. |

4. Open the downloaded `.xlsx` file in Microsoft Excel or Google Sheets

---

## 4. Step 2 — Fill in the Spreadsheet

### Required Columns (marked with *)

| Column | Example | Notes |
|---|---|---|
| **Product Name*** | Sambalpuri Silk Saree | Max 100 characters |
| **Price*** | 4500 | Selling price in INR (numbers only) |
| **Stock*** | 10 | Non-negative whole number |
| **Category*** | Women | Must be exactly: Women, Men, Accessories, Home Decor, Kids Collection |
| **Description*** | A beautiful hand-woven... | Max 2000 characters |

### Optional Columns

| Column | Example | Notes |
|---|---|---|
| SKU | TAN001 | Unique product code. Auto-generated if blank |
| MRP | 5500 | Original / compare-at price |
| Cost Price | 2800 | Your purchase cost (not shown to customers) |
| Sub Category | Sarees | Specific subcategory |
| Weave | Sambalpuri | Weave type |
| Fabric | Silk | Fabric material |
| Bestseller | Yes | Yes / No |
| Featured | No | Yes / No |
| New Arrival | Yes | Yes / No |
| Tags | handloom, odisha | Comma-separated |
| Care Instructions | Dry clean only | Washing instructions |
| SEO Title | Sambalpuri Silk Saree | For search engines |

### Tips for Filling the Sheet

- ✅ **Numbers only** for Price, MRP, Stock, Cost Price — no currency symbols (₹, Rs)
- ✅ **Yes / No** for boolean columns (not TRUE / FALSE)
- ✅ **Comma-separated** for Tags, Colors, Occasions: `Red, Blue, Green`
- ❌ Don't leave the required columns blank
- ❌ Don't change the column header names

---

## 5. Step 3 — Prepare Your Images

### Option A: Import Without Images

Just upload the `.xlsx` file directly. You can add images to products later via Edit Product.

### Option B: Import With Images (ZIP file)

1. **Name your image files using the product SKU:**
   ```
   TAN001.jpg         ← Primary image (shown first in gallery)
   TAN001-1.jpg       ← Second image
   TAN001-2.jpg       ← Third image
   TAN002.jpg         ← First image for product TAN002
   ```

2. **Create a ZIP file** with this structure:
   ```
   TanvoImport.zip
   ├── Products.xlsx      ← Your filled template
   ├── TAN001.jpg
   ├── TAN001-1.jpg
   ├── TAN001-2.jpg
   ├── TAN002.jpg
   └── TAN003.jpg
   ```

   > 📌 **Image files can be at the root of the ZIP or in a subfolder** — the system finds them automatically by SKU name.

3. **Image requirements:**
   - Formats: `.jpg`, `.jpeg`, `.png`, `.webp`
   - Max per product: 10 images
   - Max ZIP size: 200 MB
   - Recommended: at least 800×800 pixels, square or portrait

---

## 6. Step 4 — Configure Your Import

On the **Bulk Import** page, select your settings:

### Brand
Choose which brand the products belong to:
- **TANVO** (default)
- **Two Threads Studio**
- **SABEL**

### Import Mode
| Mode | What It Does |
|---|---|
| 🟢 **Create New** | Only adds products that don't already exist. SKUs already in the catalog will be flagged as errors. |
| 🔵 **Update Existing** | Only updates products that already have matching SKUs. New SKUs will be flagged as errors. |
| 🟡 **Create or Update** | Adds new products AND updates existing ones — one pass does both. |
| ⚪ **Ignore Existing** | Adds new products; silently skips any SKU already in the catalog (no error). |

### Dry Run (Simulation)
Enable **Dry Run** to simulate the entire import **without saving anything**. The system will:
- Parse your file
- Validate every row
- Show you exactly what would be created/updated
- Report all errors and warnings

Use this to **test your file before committing**, especially for large imports.

### Auto-Create Categories
If enabled, the system will accept category values that don't currently exist in the catalog. Use with caution.

---

## 7. Step 5 — Review the Preview

After uploading, the system validates your file and shows a **Preview** screen:

| Card | Meaning |
|---|---|
| ✅ Ready to Import | Rows that passed all validation checks |
| ⚠ Warnings | Rows with minor issues (will still import) |
| ❌ Errors | Rows that cannot be imported as-is |

### Preview Table
- Shows a thumbnail for each product (if images were included)
- Click any row to expand and see the exact validation message
- Filter rows by: All / Ready / Warnings / Errors

### Download Error Report
Click **"Download Error Report"** to get an Excel file listing every error with:
- Row number
- SKU
- Which field has the problem
- What the issue is
- How to fix it

Fix the errors in your spreadsheet, then re-upload.

---

## 8. Step 6 — Start the Import

Once you're satisfied with the preview:

1. Click **"Start Import"** (disabled if there are errors and Dry Run is off)
2. The system starts importing immediately in the background
3. You'll see **live progress bars** for:
   - 📸 Uploading Images to cloud storage
   - 📦 Importing Products to database
   - 📊 Updating Inventory logs

> ℹ️ You can **safely close the browser tab** after starting. The import continues running in the background.

---

## 9. Step 7 — Import Complete

When finished, you'll see a summary:

| | Count |
|---|---|
| Created | New products added |
| Updated | Existing products modified |
| Skipped | Products ignored (Ignore Existing mode) |
| Failed | Rows that couldn't be imported |
| Images Uploaded | Images successfully sent to cloud |

Download the **final Import Report** for a complete record.

---

## 10. How to Rollback an Import

If you imported products by mistake, you can **undo the entire import**:

1. Go to **Admin → Products → Import History**
2. Find the import you want to undo
3. Click **"Rollback"** (only available for completed imports)
4. Confirm the action

> ⚠️ **Rollback will:**
> - Delete all products that were **created** by that import
> - Restore all products that were **updated** to their previous values
> - Remove images that were uploaded during that import from cloud storage
>
> ⚠️ **Rollback cannot be undone.** Make sure you want to reverse the import before confirming.

---

## 11. Import History

Go to **Admin → Products → Import History** to see:
- Every import ever run (with date, file name, admin who ran it)
- Status: Completed, Failed, Simulated, Rolled Back
- How many products were created/updated/failed
- How long the import took

---

## 12. FAQ & Common Mistakes

**Q: My import keeps failing with "Invalid category"**  
A: The Category column must be exactly one of: `Women`, `Men`, `Accessories`, `Home Decor`, `Kids Collection`. Check for typos or extra spaces.

**Q: Images aren't showing on products after import**  
A: Check that image filenames match the SKU in column B of your spreadsheet. Example: if SKU is `TAN047`, the image must be named `TAN047.jpg`.

**Q: The import completed but some products are missing**  
A: Check the Import History → click "View Report" to see which rows failed and why.

**Q: Can I import the same SKU twice?**  
A: Yes — use "Create or Update" or "Update Existing" mode. The system will update the existing product.

**Q: My price shows an error even though it looks correct**  
A: Make sure the Price column contains only numbers. Remove any `₹`, `,`, or spaces. `4,500` should be `4500`.

**Q: Can I import 10,000 products at once?**  
A: Yes. For very large imports, the admin recommends testing with 100 products first using Dry Run mode.

**Q: How long does a large import take?**  
A: Without images: 1,000 products ≈ 30–60 seconds. With images: 1,000 products ≈ 5–15 minutes depending on image sizes.
