// import multer from 'multer';
// // import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import pkg from 'multer-storage-cloudinary';
// const { CloudinaryStorage } = pkg;
// import cloudinary from '../config/cloudinary.js';

// // Configure Cloudinary storage for product images
// const productStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     return {
//       folder: 'syssaree/products',
//       allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//       transformation: [
//         { width: 1000, height: 1000, crop: 'limit' },
//         { quality: 'auto:best' }
//       ],
//       public_id: `${Date.now()}-${file.originalname.split('.')[0].replace(/[^a-zA-Z0-9]/g, '-')}`
//     };
//   }
// });

// // Configure Cloudinary storage for profile images
// const profileStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     return {
//       folder: 'syssaree/profiles',
//       allowed_formats: ['jpg', 'jpeg', 'png'],
//       transformation: [
//         { width: 400, height: 400, crop: 'thumb' },
//         { quality: 'auto:best' }
//       ],
//       public_id: `user-${req.user?._id || Date.now()}`
//     };
//   }
// });

// // Configure Cloudinary storage for review images
// const reviewStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     return {
//       folder: 'syssaree/reviews',
//       allowed_formats: ['jpg', 'jpeg', 'png'],
//       transformation: [
//         { width: 800, height: 800, crop: 'limit' },
//         { quality: 'auto:best' }
//       ],
//       public_id: `${Date.now()}-${file.originalname.split('.')[0].replace(/[^a-zA-Z0-9]/g, '-')}`
//     };
//   }
// });

// // File filter - only allow images
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Not an image! Please upload only images.'), false);
//   }
// };

// // Create multer upload instances with error handling
// export const uploadProductImages = multer({
//   storage: productStorage,
//   fileFilter: fileFilter,
//   limits: { 
//     fileSize: 5 * 1024 * 1024, // 5MB limit
//     files: 10 // Maximum 10 files
//   }
// });

// export const uploadProfileImage = multer({
//   storage: profileStorage,
//   fileFilter: fileFilter,
//   limits: { 
//     fileSize: 2 * 1024 * 1024 // 2MB limit
//   }
// });

// export const uploadReviewImages = multer({
//   storage: reviewStorage,
//   fileFilter: fileFilter,
//   limits: { 
//     fileSize: 3 * 1024 * 1024, // 3MB limit
//     files: 5 // Maximum 5 files
//   }
// });

// // Error handler for multer
// export const handleUploadError = (err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     if (err.code === 'LIMIT_FILE_SIZE') {
//       return res.status(400).json({
//         success: false,
//         message: 'File too large. Maximum size is 5MB.'
//       });
//     }
//     if (err.code === 'LIMIT_FILE_COUNT') {
//       return res.status(400).json({
//         success: false,
//         message: 'Too many files. Maximum is 10 files.'
//       });
//     }
//   }
//   if (err) {
//     return res.status(400).json({
//       success: false,
//       message: err.message
//     });
//   }
//   next();
// };
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// Use memory storage - we'll stream to Cloudinary manually
const memoryStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

// Multer middleware for different upload types
export const uploadProductImages = multer({
  storage: memoryStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 10 } // 5MB max, 10 files max
});

export const uploadProfileImage = multer({
  storage: memoryStorage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB max
});

export const uploadReviewImages = multer({
  storage: memoryStorage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024, files: 5 } // 3MB max, 5 files max
});

// Helper to upload a buffer to Cloudinary
export const uploadToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    stream.end(buffer);
  });
};

// Error handler for multer
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        success: false, 
        message: 'File too large. Maximum size is 5MB.' 
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ 
        success: false, 
        message: 'Too many files. Maximum is 10 files.' 
      });
    }
  }
  if (err) {
    return res.status(400).json({ 
      success: false, 
      message: err.message 
    });
  }
  next();
};