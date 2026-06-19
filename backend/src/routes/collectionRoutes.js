import express from 'express';
import {
  createCollection,
  getCollections,
  getCollectionBySlug,
  updateCollection,
  deleteCollection
} from '../controllers/collectionController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getCollections);
router.get('/:slug', getCollectionBySlug);

// Admin-only routes
router.post('/', protect, admin, createCollection);
router.put('/:id', protect, admin, updateCollection);
router.delete('/:id', protect, admin, deleteCollection);

export default router;
