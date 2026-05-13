import express from 'express';
import { submitContactForm, submitBugReport } from '../controllers/supportController.js';

const router = express.Router();

router.post('/contact', submitContactForm);
router.post('/bug-report', submitBugReport);

export default router;
