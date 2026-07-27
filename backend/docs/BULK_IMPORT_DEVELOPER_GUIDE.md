# TANVO Bulk Import System — Developer Guide

> **Audience**: Backend and full-stack engineers maintaining or extending the TANVO platform  
> **Version**: 1.0 | Updated: July 2026

---

## 1. Architecture Overview

```
Admin Browser
      │
      ▼  multipart/form-data (xlsx / csv / zip)
      │
┌─────────────────────────────────────────────────────────────────┐
│  Express.js API (src/routes/bulkImportRoutes.js)                │
│  Mounted at: POST /api/admin/bulk-import/*                      │
│  Auth: protect + admin middleware (JWT)                         │
│  Rate limit: 5 req / 15 min (configurable via ENV)              │
│  File upload: multer memory storage, 200MB limit                │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│  Controller (src/controllers/bulkImportController.js)           │
│  Phase 1: uploadAndValidate (sync, returns preview JSON)        │
│  Phase 2: executeImport (creates job, returns immediately)      │
└───────────────────────┬─────────────────────────────────────────┘
                        │  Writes ImportJob to MongoDB
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│  Background Worker (src/services/bulkImport/importWorker.js)    │
│  Polls MongoDB every IMPORT_WORKER_POLL_MS (default 2000ms)     │
│  Picks up ImportJob documents with status='queued'              │
│  Runs: cloudinaryBatch → importExecutor → update job            │
└──────────────┬─────────────────────────────┬────────────────────┘
               ▼                             ▼
         Cloudinary                     MongoDB
         tanvo/products/               products collection
         <brand>/<SKU>/                inventorylogs collection
                                       importjobs collection
```

---

## 2. ImportJob Lifecycle State Machine

```
                 [Admin uploads file]
                         │
                         ▼
                      queued  ◄──── resume() called
                         │
          [Worker picks up job]
                         │
                         ▼
                    processing
                    /          \
             [success]        [error]
               │                 │
               ▼                 ▼
          completed           failed
          (or              (resumable=true
       dry_run_complete)     if checkpoint
               │              was written)
               │
    [rollback called]
               │
               ▼
          rolled_back
```

**Terminal states**: `completed`, `dry_run_complete`, `rolled_back`, `failed` (non-resumable)

---

## 3. File Structure

```
backend/src/
├── models/
│   └── ImportJob.js             # Mongoose model for job lifecycle
├── controllers/
│   └── bulkImportController.js  # 9 route handlers
├── routes/
│   ├── adminRoutes.js           # Mounts bulkImportRoutes at /bulk-import
│   └── bulkImportRoutes.js      # Route definitions with multer + rate limit
└── services/
    └── bulkImport/
        ├── excelParser.js       # Parse .xlsx / .csv from Buffer
        ├── zipExtractor.js      # Safe ZIP extraction with bomb protection
        ├── duplicateDetector.js # MD5 image deduplication + SKU duplicate detection
        ├── importValidator.js   # 25+ validation rules (pure function, no DB calls)
        ├── cloudinaryBatch.js   # Concurrent Cloudinary uploads + delete helper
        ├── importExecutor.js    # DB writes in batches with checkpoint/rollback
        ├── importWorker.js      # MongoDB-backed background worker
        └── templateGenerator.js # Excel template generation per template type

frontend/src/pages/admin/
├── BulkImport.tsx               # 5-step wizard UI
└── ImportHistory.tsx            # Import audit log with rollback controls

backend/docs/
├── BULK_IMPORT_USER_GUIDE.md    # Employee-facing guide
└── BULK_IMPORT_DEVELOPER_GUIDE.md  # This file
```

---

## 4. API Contract

All endpoints require `Authorization: Bearer <adminJWT>` header.

### POST /api/admin/bulk-import/upload
**Request**: `multipart/form-data`

| Field | Type | Required | Description |
|---|---|---|---|
| `file` | File | ✅ | `.xlsx`, `.csv`, or `.zip` |
| `brand` | string | | Default: `TANVO` |
| `importMode` | string | | Default: `Create New` |
| `templateType` | string | | Default: `fashion` |
| `isDryRun` | boolean | | Default: `false` |
| `autoCreateCategories` | boolean | | Default: `false` |

**Response 200**:
```json
{
  "success": true,
  "jobId": "64abc123...",
  "preview": {
    "total": 150,
    "valid": 143,
    "errorCount": 4,
    "warningCount": 7,
    "rows": [
      {
        "_rowNumber": 2,
        "sku": "TAN001",
        "name": "Sambalpuri Silk Saree",
        "price": 4500,
        "stock": 10,
        "category": "Women",
        "thumbnail": "data:image/jpeg;base64,...",
        "validationStatus": "valid",
        "issues": []
      }
    ],
    "thumbnails": { "TAN001": "data:image/jpeg;base64,..." }
  },
  "errors": [...],
  "warnings": [...]
}
```

### POST /api/admin/bulk-import/execute
**Request body**: `{ "jobId": "64abc123...", "importMode": "Create New" }`  
**Response**: `{ "success": true, "jobId": "64abc123...", "message": "Import queued..." }`  
> Returns immediately. Worker processes asynchronously.

### GET /api/admin/bulk-import/status/:id
**Response**: Full `ImportJob` document (minus `parsedRowsCache` for bandwidth)

### POST /api/admin/bulk-import/rollback/:id
**Response**: `{ "success": true, "deleted": 143, "restored": 7, "imagesDeleted": 420 }`

### POST /api/admin/bulk-import/resume/:id
**Request**: empty body  
**Response**: `{ "success": true, "message": "Import re-queued from last checkpoint" }`

### GET /api/admin/bulk-import/history
**Query params**: `page`, `limit`, `status`, `brand`, `dateFrom`, `dateTo`  
**Response**: paginated list of `ImportJob` documents with `createdBy` populated

### GET /api/admin/bulk-import/template
**Query params**: `type` (fashion|kids|accessories|sarees|home-decor), `brand`  
**Response**: Binary `.xlsx` file stream

### GET /api/admin/bulk-import/export
**Query params**: `format` (xlsx|csv), `category`, `isFeatured`, `isBestSeller`, `isNewArrival`, `stock_lt`, `dateFrom`, `dateTo`  
**Response**: Binary file stream

### DELETE /api/admin/bulk-import/:id
Cancels a `queued` job. Returns 400 if `processing`.

---

## 5. Service Layer API Contracts

### `excelParser.js`
```js
parseSpreadsheet(buffer: Buffer, filename: string): {
  rows: Array<RawProductRow>,
  templateType: string
}
```
`RawProductRow` has camelCase keys. Every row includes `_rowNumber: number`.

### `zipExtractor.js`
```js
extractZip(buffer: Buffer): {
  spreadsheetBuffer: Buffer,
  spreadsheetName: string,
  imageIndex: Map<string, Buffer[]>  // key=SKU, value=ordered image buffers
}
```
Throws on validation failure (bomb, traversal, bad extension).

### `duplicateDetector.js`
```js
detectDuplicateImages(imageIndex: Map<string, Buffer[]>): {
  deduplicatedIndex: Map<string, Buffer[]>,
  duplicates: Array<{ sku, filename, hash }>
}

detectDuplicateSKUs(rows: RawProductRow[]): {
  duplicates: Array<{ sku, rowNumbers: number[] }>
}
```

### `importValidator.js`
```js
validateRows(rows: RawProductRow[], options: {
  importMode: string,
  existingSkus: Set<string>,
  autoCreateCategories: boolean
}): {
  valid: RawProductRow[],
  errors: ValidationIssue[],
  warnings: ValidationIssue[],
  stats: { total, valid, errorCount, warningCount }
}
```
**Pure function** — no DB calls. All DB lookups happen in the controller before calling this.

### `cloudinaryBatch.js`
```js
uploadImageBatch(
  imageIndex: Map<string, Buffer[]>,
  brand: string,
  isDryRun: boolean
): Promise<Map<string, Array<{ url, publicId, isPrimary }>>>

deleteCloudinaryImages(publicIds: string[]): Promise<void>
```

### `importExecutor.js`
```js
executeImport(
  jobId: string,
  validRows: RawProductRow[],
  imageMap: Map<string, Array<{ url, publicId, isPrimary }>>,
  options: { importMode, isDryRun, autoCreateCategories, brand, adminUserId }
): Promise<{
  created: number,
  updated: number,
  skipped: number,
  failed: number,
  rollbackSnapshot: SnapshotEntry[],
  allCloudinaryIds: string[]
}>
```

### `importWorker.js`
```js
startImportWorker(): void  // Call once from server.js after connectDB()
```

### `templateGenerator.js`
```js
generateTemplate(templateType: string, brand: string): Buffer  // .xlsx file
```

---

## 6. ImportJob Schema Reference

```js
{
  status:               'queued|processing|completed|failed|rolled_back|dry_run_complete',
  brand:                'TANVO|Two Threads Studio|SABEL',
  importMode:           'Create New|Update Existing|Create or Update|Ignore Existing',
  isDryRun:             Boolean,
  templateType:         'fashion|kids|accessories|sarees|home-decor',
  autoCreateCategories: Boolean,
  createdBy:            ObjectId → User,
  ipAddress:            String,
  userAgent:            String,
  fileName:             String,
  fileSize:             Number,  // bytes
  stats: {
    total: 0, valid: 0, created: 0, updated: 0,
    skipped: 0, failed: 0, warnings: 0, imageUploaded: 0
  },
  errors:   [{ row, sku, field, issue, suggestion, severity }],
  warnings: [{ row, sku, field, issue, suggestion, severity }],
  rollbackSnapshot: [{
    productId:           ObjectId,
    action:              'created|updated',
    preImportData:       Mixed,   // null for 'created', full product doc for 'updated'
    cloudinaryPublicIds: [String]
  }],
  checkpoint: {
    lastBatchIndex: Number,
    processedSKUs:  [String]
  },
  resumable:       Boolean,
  parsedRowsCache: String,   // JSON, cleared after completion
  duration:        Number,   // ms
  startedAt:       Date,
  completedAt:     Date,
  createdAt:       Date,
  updatedAt:       Date
}
```

---

## 7. Worker Internals & Resume Mechanics

### Startup
On server boot, the worker runs a one-time cleanup:
```js
// Mark any 'processing' jobs as 'failed + resumable'
// These are jobs that were mid-flight when the server crashed
await ImportJob.updateMany(
  { status: 'processing' },
  { status: 'failed', resumable: true }
);
```

### Polling Loop
```js
setInterval(async () => {
  const job = await ImportJob.findOneAndUpdate(
    { status: 'queued' },
    { $set: { status: 'processing', startedAt: new Date() } },
    { new: true, sort: { createdAt: 1 } }  // FIFO queue
  );
  if (job) await processJob(job);
}, POLL_INTERVAL_MS);
```

The `findOneAndUpdate` is **atomic** — safe for multiple server instances running the same worker without Redis. Two instances cannot pick up the same job.

### Resume from Checkpoint
When a failed job is resumed:
1. Frontend calls `POST /resume/:id`
2. Controller sets `status = 'queued'`
3. Worker picks it up on next poll
4. `importExecutor` checks `job.checkpoint.processedSKUs` and **skips** any SKU already in that set
5. Resumes from `lastBatchIndex + 1`

This guarantees **no duplicate products** even on resume.

### Image Storage for Async Processing
The controller cannot pass the in-memory ZIP buffers to the worker directly (they exist in different event loop ticks). Solution:
- Controller serializes image buffers as base64 strings inside `parsedRowsCache` JSON
- Worker deserializes them back to `Buffer` objects before calling `cloudinaryBatch`
- `parsedRowsCache` is cleared (`null`) after job completes to free DB storage

---

## 8. Rollback Mechanics (Exact Algorithm)

```
For each entry in rollbackSnapshot:
  
  If action === 'created':
    Product.findByIdAndDelete(entry.productId)
    → Hard delete from MongoDB
  
  If action === 'updated':
    Product.findByIdAndUpdate(entry.productId, entry.preImportData)
    → Restores all fields to pre-import values
    → This includes reverting images array to pre-import URLs
  
Collect all entry.cloudinaryPublicIds into a flat array
Call cloudinary.api.delete_resources(publicIds)
  → Only deletes images uploaded DURING THIS import
  → Does not touch images that were already on the product before import

Update ImportJob.status = 'rolled_back'
```

**What rollback does NOT do:**
- Does not delete `InventoryLog` entries (they remain as an audit trail)
- Does not restore Cloudinary images that were already there before the import
- Does not affect orders that referenced products imported in this batch

---

## 9. Cloudinary Folder Convention

```
tanvo/
└── products/
    ├── tanvo/          ← brand = TANVO
    │   └── TAN001/
    │       ├── TAN001-0   (isPrimary: true)
    │       ├── TAN001-1
    │       └── TAN001-2
    ├── tts/            ← brand = Two Threads Studio
    │   └── TTS001/
    └── sabel/          ← brand = SABEL
        └── SAB001/
```

The `public_id` format: `tanvo/products/<brandSlug>/<SKU>/image_<index>`

---

## 10. Adding a New Template Type

1. Open `src/services/bulkImport/templateGenerator.js`
2. Add your template name to the `TEMPLATE_CONFIGS` object:
   ```js
   'wedding-wear': {
     extraColumns: ['Embroidery', 'Occasion', 'Style', 'Length'],
     exampleValues: { 'Embroidery': 'Zari', 'Occasion': 'Wedding, Festive' }
   }
   ```
3. Update the `templateType` enum in `src/models/ImportJob.js`
4. Update the frontend `templateType` dropdown in `BulkImport.tsx`
5. Update the validator in `importValidator.js` if the new template has specific required fields

---

## 11. Adding a New Brand

1. Add to the `brand` enum in `src/models/ImportJob.js`
2. Add the brand slug mapping in `cloudinaryBatch.js`:
   ```js
   const BRAND_SLUGS = {
     'TANVO': 'tanvo',
     'Two Threads Studio': 'tts',
     'SABEL': 'sabel',
     'New Brand': 'new-brand'   // ← Add here
   };
   ```
3. Add to the Brand selector in `BulkImport.tsx`
4. Add to the Brand filter in `ImportHistory.tsx`

---

## 12. Environment Variable Reference

| Variable | Default | Description |
|---|---|---|
| `MAX_PRODUCTS_PER_IMPORT` | `10000` | Maximum rows per import file |
| `MAX_ZIP_SIZE_MB` | `200` | Maximum compressed ZIP size |
| `MAX_EXTRACTED_SIZE_MB` | `1000` | ZIP bomb protection — max uncompressed |
| `MAX_IMAGES_PER_IMPORT` | `1500` | Maximum images in a ZIP |
| `IMPORT_BATCH_SIZE_IMAGES` | `20` | DB write batch size when images present |
| `IMPORT_BATCH_SIZE_METADATA` | `100` | DB write batch size for metadata-only |
| `IMPORT_CLOUDINARY_CONCURRENCY` | `5` | Parallel Cloudinary upload streams |
| `IMPORT_WORKER_POLL_MS` | `2000` | Worker polling interval in ms |
| `IMPORT_RATE_LIMIT_MAX` | `5` | Max import requests per window |
| `IMPORT_RATE_LIMIT_WINDOW_MS` | `900000` | Rate limit window (15 min) |

---

## 13. Security Model

| Threat | Mitigation |
|---|---|
| Formula injection (Excel) | Any cell starting with `=`, `+`, `-`, `@` has the prefix stripped before processing |
| CSV injection | Same sanitization applied to CSV cells |
| ZIP bomb | Total uncompressed size checked against `MAX_EXTRACTED_SIZE_MB` during extraction |
| Path traversal | Any ZIP entry with `..` or absolute path is rejected immediately |
| Executable payloads | Extension whitelist: only `.xlsx`, `.csv`, `.jpg`, `.jpeg`, `.png`, `.webp` extracted |
| MIME type spoofing | First 4 magic bytes of each image validated against known signatures |
| Privilege escalation | All routes protected by `protect + admin` JWT middleware |
| Rate limiting | Dedicated rate limiter: 5 requests / 15 minutes per IP |
| Oversized uploads | multer `fileSize` limit = `MAX_ZIP_SIZE_MB` MB |
| Unauthorized rollback | Rollback endpoint verifies admin role |

---

## 14. Performance Benchmarks (Estimated)

| Products | Has Images | Estimated Duration |
|---|---|---|
| 100 | No | < 5 seconds |
| 100 | Yes (5 imgs each) | 30–60 seconds |
| 1,000 | No | 30–60 seconds |
| 1,000 | Yes (3 imgs each) | 5–15 minutes |
| 5,000 | No | 3–5 minutes |
| 5,000 | Yes (2 imgs each) | 20–45 minutes |
| 10,000 | No | 8–12 minutes |

Bottleneck: Cloudinary upload rate (limited by `IMPORT_CLOUDINARY_CONCURRENCY`). Raising this value speeds up image-heavy imports but may trigger Cloudinary rate limits on free/basic plans.

---

## 15. Known Limitations & Future Extension Points

### Current Limitations
- **Single-threaded worker**: one import processes at a time per server instance. Parallel imports require multiple server instances or upgrading to BullMQ.
- **Image buffer in DB**: storing base64 image buffers in `parsedRowsCache` is a workaround for the async worker. For very large ZIPs, this can temporarily inflate the `importjobs` collection. A future upgrade would write images to a temp Cloudinary folder and reference by publicId.
- **No webhook/email notification**: import completion is only visible via polling. A future upgrade should send an email/Slack notification when a large import finishes.

### BullMQ Upgrade Path
The `importWorker.js` polling loop can be replaced with BullMQ with minimal changes:
1. Replace `startImportWorker()` with a BullMQ `Worker` instance
2. Replace `ImportJob.findOneAndUpdate({ status: 'queued' })` with BullMQ job consumption
3. Keep all other services identical — they don't know about the queue implementation
4. The `ImportJob` MongoDB document can still be used for status/history tracking alongside BullMQ

### Planned Features
- Email/SMS notification on import completion
- Per-product Cloudinary folder (brand → collection → product)
- Shopify-compatible CSV format import
- Scheduled imports (upload file, run at midnight)
- Import approval workflow (import staged, second admin approves)
