import express from 'express';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import { protect, admin } from '../middleware/auth.js';
import {
  uploadAndValidate,
  executeImport,
  getJobStatus,
  rollbackImport,
  resumeImport,
  getImportHistory,
  downloadTemplate,
  exportProducts,
  cancelImport
} from '../controllers/bulkImportController.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: parseInt(process.env.MAX_ZIP_SIZE_MB || '200') * 1024 * 1024
  }
});

const importRateLimit = rateLimit({
  windowMs: parseInt(process.env.IMPORT_RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.IMPORT_RATE_LIMIT_MAX || '5'),
  message: 'Too many import requests from this IP, please try again later.'
});

router.use(protect);
router.use(admin);

router.post('/upload', importRateLimit, upload.single('file'), uploadAndValidate);
router.post('/execute', importRateLimit, executeImport);
router.post('/rollback/:id', importRateLimit, rollbackImport);
router.post('/resume/:id', importRateLimit, resumeImport);
router.get('/status/:id', importRateLimit, getJobStatus);
router.get('/history', importRateLimit, getImportHistory);
router.get('/template', downloadTemplate); // No rate limit
router.get('/export', importRateLimit, exportProducts);
router.delete('/:id', importRateLimit, cancelImport);

export default router;
