import express from 'express';
import multer from 'multer';
import { uploadImage, getImagesByTag, deleteImage } from '../controller/cloudinaryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Multer config for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Public route to fetch images
router.get('/list/:tag', getImagesByTag);

// Protected routes for uploading and deleting (requires auth eventually)
// For now, I'll leave them unprotected as requested for testing, or use 'protect' if you want security now
router.post('/upload', upload.single('file'), uploadImage);
router.post('/delete', deleteImage);

export default router;
