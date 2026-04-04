// import multer from 'multer';
// import { v2 as cloudinary } from 'cloudinary';

// // Use memory storage - we'll stream to Cloudinary manually
// const memoryStorage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Not an image! Please upload only images.'), false);
//   }
// };

// // Multer middleware for different upload types
// export const uploadProductImages = multer({
//   storage: memoryStorage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024, files: 10 } // 5MB max, 10 files max
// });

// export const uploadProfileImage = multer({
//   storage: memoryStorage,
//   fileFilter,
//   limits: { fileSize: 2 * 1024 * 1024 } // 2MB max
// });

// export const uploadReviewImages = multer({
//   storage: memoryStorage,
//   fileFilter,
//   limits: { fileSize: 3 * 1024 * 1024, files: 5 } // 3MB max, 5 files max
// });

// // Helper to upload a buffer to Cloudinary
// export const uploadToCloudinary = (buffer, options) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
//       if (error) reject(error);
//       else resolve(result);
//     });
//     stream.end(buffer);
//   });
// };

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

// backend/src/middleware/upload.js
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Memory storage
const memoryStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

// UPDATED: 10MB limit for product images
export const uploadProductImages = multer({
  storage: memoryStorage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file (updated from 3MB)
    files: 10 // Maximum 10 files
  }
});

// Profile image limit (keep at 5MB for profile pics)
export const uploadProfileImage = multer({
  storage: memoryStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max for profile
  }
});

// Review images limit
export const uploadReviewImages = multer({
  storage: memoryStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per review image
    files: 5
  }
});

// Upload to Cloudinary function
export const uploadToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

// Error handler for multer
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 10MB per image.'
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