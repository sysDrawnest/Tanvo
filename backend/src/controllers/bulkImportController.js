import xlsx from 'xlsx';
import ImportJob from '../models/ImportJob.js';
import Product from '../models/Product.js';
import { parseSpreadsheet } from '../services/bulkImport/excelParser.js';
import { extractZip } from '../services/bulkImport/zipExtractor.js';
import { detectDuplicateImages, detectDuplicateSKUs } from '../services/bulkImport/duplicateDetector.js';
import { validateRows } from '../services/bulkImport/importValidator.js';
import { uploadImageBatch, deleteCloudinaryImages } from '../services/bulkImport/cloudinaryBatch.js';
import { executeImport as executeImportService } from '../services/bulkImport/importExecutor.js';
import { generateTemplate } from '../services/bulkImport/templateGenerator.js';

export const uploadAndValidate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { originalname, mimetype, buffer } = req.file;
    const isZip = originalname.endsWith('.zip') || mimetype === 'application/zip';
    const isXlsx = originalname.endsWith('.xlsx') || mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const isCsv = originalname.endsWith('.csv') || mimetype === 'text/csv';

    if (!isZip && !isXlsx && !isCsv) {
      return res.status(400).json({ success: false, message: 'Invalid file type. Only .xlsx, .csv, and .zip are allowed.' });
    }

    const {
      brand = 'TANVO',
      importMode = 'Create New',
      templateType = 'fashion',
      isDryRun = false,
      autoCreateCategories = false
    } = req.body;

    let spreadsheetBuffer;
    let imageIndex = new Map();

    if (isZip) {
      const extracted = await extractZip(buffer);
      spreadsheetBuffer = extracted.spreadsheetBuffer;
      imageIndex = extracted.imageIndex;
    } else {
      spreadsheetBuffer = buffer;
    }

    const rows = await parseSpreadsheet(spreadsheetBuffer, originalname);
    
    const intraFileDuplicates = detectDuplicateSKUs(rows);
    
    const allSkus = rows.map(r => r.sku).filter(Boolean);
    const existingProducts = await Product.find({ sku: { $in: allSkus } }).select('sku').lean();
    const existingSkus = new Set(existingProducts.map(p => p.sku));

    const validationResult = validateRows(rows, { importMode, existingSkus, autoCreateCategories });
    
    const deduplicatedIndex = detectDuplicateImages(imageIndex);

    const thumbnails = {};
    const imageBuffersForCache = {};

    for (const [sku, images] of deduplicatedIndex.entries()) {
      if (images && images.length > 0) {
        const firstImage = images[0];
        // Convert first 8KB to base64 for thumbnail
        const thumbnailB64 = firstImage.buffer.slice(0, 8192).toString('base64');
        const mimeType = firstImage.filename.endsWith('.png') ? 'image/png' : 
                         firstImage.filename.endsWith('.webp') ? 'image/webp' : 'image/jpeg';
        thumbnails[sku] = `data:${mimeType};base64,${thumbnailB64}`;

        imageBuffersForCache[sku] = images.map(img => ({
          filename: img.filename,
          base64: img.buffer.toString('base64')
        }));
      }
    }

    const previewRows = rows.map((row, index) => {
      const vResult = validationResult.details[index] || { isValid: true, errors: [], warnings: [] };
      return {
        ...row,
        isValid: vResult.isValid,
        errors: vResult.errors,
        warnings: vResult.warnings,
        thumbnail: thumbnails[row.sku] || null
      };
    });

    const parsedRowsCache = JSON.stringify({
      rows: validationResult.validRows,
      imageBuffers: imageBuffersForCache,
      deduplicateWarnings: intraFileDuplicates
    });

    const importJob = await ImportJob.create({
      status: 'queued',
      brand,
      importMode,
      isDryRun: isDryRun === 'true' || isDryRun === true,
      fileName: originalname,
      fileSize: req.file.size,
      createdBy: req.user._id,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      parsedRowsCache
    });

    res.status(200).json({
      success: true,
      jobId: importJob._id,
      preview: {
        total: rows.length,
        valid: validationResult.validRows.length,
        errorCount: validationResult.errorCount,
        warningCount: validationResult.warningCount + intraFileDuplicates.length,
        rows: previewRows,
        thumbnails
      },
      errors: validationResult.allErrors,
      warnings: [...validationResult.allWarnings, ...intraFileDuplicates]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const executeImport = async (req, res) => {
  try {
    const { jobId, importMode } = req.body;
    
    const job = await ImportJob.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Import job not found' });
    }

    if (job.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to execute this job' });
    }

    if (job.status !== 'queued') {
      return res.status(400).json({ success: false, message: 'Job is not in queued status' });
    }

    if (importMode) {
      job.importMode = importMode;
    }
    
    job.status = 'queued';
    await job.save();

    res.status(200).json({
      success: true,
      jobId: job._id,
      message: 'Import queued. Refresh /status/:id for progress.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getJobStatus = async (req, res) => {
  try {
    const job = await ImportJob.findById(req.params.id).select('-parsedRowsCache');
    if (!job) {
      return res.status(404).json({ success: false, message: 'Import job not found' });
    }

    if (job.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const rollbackImport = async (req, res) => {
  try {
    const job = await ImportJob.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Import job not found' });
    }

    if (job.status !== 'completed') {
      return res.status(400).json({ success: false, message: 'Only completed imports can be rolled back' });
    }

    let deletedCount = 0;
    let restoredCount = 0;
    const cloudinaryPublicIds = [];

    for (const entry of job.rollbackSnapshot || []) {
      if (entry.action === 'created') {
        await Product.findByIdAndDelete(entry.productId);
        deletedCount++;
      } else if (entry.action === 'updated') {
        await Product.findByIdAndUpdate(entry.productId, entry.preImportData);
        restoredCount++;
      }
      if (entry.cloudinaryPublicIds && entry.cloudinaryPublicIds.length > 0) {
        cloudinaryPublicIds.push(...entry.cloudinaryPublicIds);
      }
    }

    let imagesDeleted = 0;
    if (cloudinaryPublicIds.length > 0) {
      await deleteCloudinaryImages(cloudinaryPublicIds);
      imagesDeleted = cloudinaryPublicIds.length;
    }

    job.status = 'rolled_back';
    job.completedAt = new Date();
    await job.save();

    res.status(200).json({
      success: true,
      deleted: deletedCount,
      restored: restoredCount,
      imagesDeleted
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resumeImport = async (req, res) => {
  try {
    const job = await ImportJob.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Import job not found' });
    }

    if (job.status !== 'failed' || !job.resumable) {
      return res.status(400).json({ success: false, message: 'Job is not resumable' });
    }

    job.status = 'queued';
    await job.save();

    res.status(200).json({
      success: true,
      message: 'Import re-queued from last checkpoint'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getImportHistory = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, brand, dateFrom, dateTo } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (brand) filter.brand = brand;
    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
      if (dateTo) filter.createdAt.$lte = new Date(dateTo);
    }

    const skip = (page - 1) * limit;

    const jobs = await ImportJob.find(filter)
      .select('-parsedRowsCache')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ImportJob.countDocuments(filter);

    res.status(200).json({
      success: true,
      jobs,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const downloadTemplate = async (req, res) => {
  try {
    const { type = 'fashion', brand = 'TANVO' } = req.query;
    const buffer = await generateTemplate(type, brand);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="TANVO_Import_Template_${type}.xlsx"`);
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const exportProducts = async (req, res) => {
  try {
    const { format = 'xlsx', category, isFeatured, isBestSeller, isNewArrival, stock_lt, dateFrom, dateTo } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';
    if (isBestSeller !== undefined) filter.isBestSeller = isBestSeller === 'true';
    if (isNewArrival !== undefined) filter.isNewArrival = isNewArrival === 'true';
    if (stock_lt) filter.stock = { $lt: parseInt(stock_lt) };
    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
      if (dateTo) filter.createdAt.$lte = new Date(dateTo);
    }

    const cursor = Product.find(filter).lean().cursor();
    
    const wb = xlsx.utils.book_new();
    const rows = [];
    
    for await (const doc of cursor) {
      const row = {
        _id: doc._id.toString(),
        name: doc.name,
        sku: doc.sku,
        brand: doc.brand,
        price: doc.price,
        stock: doc.stock,
        category: doc.category,
        isFeatured: doc.isFeatured,
        isBestSeller: doc.isBestSeller,
        isNewArrival: doc.isNewArrival,
        createdAt: doc.createdAt
      };
      rows.push(row);
    }
    
    const ws = xlsx.utils.json_to_sheet(rows);
    xlsx.utils.book_append_sheet(wb, ws, 'Products');
    
    const buf = xlsx.write(wb, { type: 'buffer', bookType: format === 'csv' ? 'csv' : 'xlsx' });
    
    const ext = format === 'csv' ? 'csv' : 'xlsx';
    const contentType = format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="TANVO_Products_Export_${dateStr}.${ext}"`);
    res.send(buf);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const cancelImport = async (req, res) => {
  try {
    const job = await ImportJob.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Import job not found' });
    }

    if (job.status === 'processing') {
      return res.status(400).json({ success: false, message: 'Cannot cancel an import that is currently processing' });
    }

    if (job.status !== 'queued') {
      return res.status(400).json({ success: false, message: 'Only queued imports can be cancelled' });
    }

    await ImportJob.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ success: true, message: 'Import job cancelled' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
