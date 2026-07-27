import mongoose from 'mongoose';

/**
 * ImportJob — tracks the complete lifecycle of a bulk product import.
 *
 * status lifecycle:
 *   queued → processing → completed | failed | dry_run_complete
 *   completed → rolled_back (via rollback endpoint)
 *   failed (resumable=true) → queued (via resume endpoint)
 */

// ─── Sub-schemas ────────────────────────────────────────────────────────────

const issueSchema = new mongoose.Schema({
  row:        { type: Number, default: 0 },
  sku:        { type: String, default: '' },
  field:      { type: String, default: '' },
  issue:      { type: String, default: '' },
  suggestion: { type: String, default: '' },
  severity:   { type: String, enum: ['error', 'warning'], default: 'error' }
}, { _id: false });

const rollbackSnapshotSchema = new mongoose.Schema({
  productId:           { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  action:              { type: String, enum: ['created', 'updated'], required: true },
  preImportData:       { type: mongoose.Schema.Types.Mixed, default: null }, // stored for 'updated' entries
  cloudinaryPublicIds: [String]
}, { _id: false });

const checkpointSchema = new mongoose.Schema({
  lastBatchIndex: { type: Number, default: 0 },
  processedSKUs:  [String]
}, { _id: false });

// ─── Main Schema ─────────────────────────────────────────────────────────────

const importJobSchema = new mongoose.Schema({
  // Job status and type
  status: {
    type: String,
    enum: ['queued', 'processing', 'completed', 'failed', 'rolled_back', 'dry_run_complete'],
    default: 'queued',
    index: true
  },
  brand: {
    type: String,
    enum: ['TANVO', 'Two Threads Studio', 'SABEL'],
    default: 'TANVO'
  },
  importMode: {
    type: String,
    enum: ['Create New', 'Update Existing', 'Create or Update', 'Ignore Existing'],
    default: 'Create New'
  },
  isDryRun:             { type: Boolean, default: false },
  templateType: {
    type: String,
    enum: ['fashion', 'kids', 'accessories', 'sarees', 'home-decor'],
    default: 'fashion'
  },
  autoCreateCategories: { type: Boolean, default: false },

  // Audit fields
  createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ipAddress:  { type: String, default: '' },
  userAgent:  { type: String, default: '' },

  // File metadata
  fileName: { type: String, default: '' },
  fileSize: { type: Number, default: 0 },

  // Import statistics
  stats: {
    total:         { type: Number, default: 0 },
    valid:         { type: Number, default: 0 },
    created:       { type: Number, default: 0 },
    updated:       { type: Number, default: 0 },
    skipped:       { type: Number, default: 0 },
    failed:        { type: Number, default: 0 },
    warnings:      { type: Number, default: 0 },
    imageUploaded: { type: Number, default: 0 }
  },

  // Validation issues
  errors:   [issueSchema],
  warnings: [issueSchema],

  // Rollback data
  rollbackSnapshot: [rollbackSnapshotSchema],

  // Resume / checkpoint support
  checkpoint: { type: checkpointSchema, default: () => ({ lastBatchIndex: 0, processedSKUs: [] }) },
  resumable:  { type: Boolean, default: false },

  /**
   * parsedRowsCache — stores the serialized import payload between the
   * validate step and the execute step. JSON string containing:
   * {
   *   rows: RawProductRow[],
   *   imageBuffers: { [sku]: string[] }  // each string is base64 of image buffer
   * }
   * Cleared (set to null) after job completes or fails to free storage.
   */
  parsedRowsCache: { type: String, default: null },

  // Timing
  duration:    { type: Number, default: 0 }, // milliseconds
  startedAt:   { type: Date },
  completedAt: { type: Date }

}, {
  timestamps: true
});

// ─── Indexes ─────────────────────────────────────────────────────────────────

importJobSchema.index({ status: 1, createdAt: -1 });
importJobSchema.index({ createdBy: 1, createdAt: -1 });
importJobSchema.index({ brand: 1, createdAt: -1 });

// ─── Model ───────────────────────────────────────────────────────────────────

const ImportJob = mongoose.model('ImportJob', importJobSchema);
export default ImportJob;
