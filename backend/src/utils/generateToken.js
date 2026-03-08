import jwt from 'jsonwebtoken';
import crypto from 'crypto';

/**
 * Generate JWT Token for user authentication
 * @param {string} id - User ID
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

/**
 * Generate email verification token
 * @returns {Object} Token and hash
 */
export const generateVerificationToken = () => {
  const token = crypto.randomBytes(32).toString('hex');
  
  const hash = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
    
  return { token, hash };
};

/**
 * Generate password reset token
 * @returns {Object} Token and hash with expiry
 */
export const generateResetToken = () => {
  const token = crypto.randomBytes(20).toString('hex');
  
  const hash = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
    
  const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return { token, hash, expiry };
};

/**
 * Generate refresh token
 * @param {string} id - User ID
 * @returns {string} Refresh token
 */
export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

/**
 * Verify token
 * @param {string} token - JWT token
 * @returns {Object} Decoded token
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

/**
 * Generate order tracking token
 * @param {string} orderId - Order ID
 * @returns {string} Tracking token
 */
export const generateTrackingToken = (orderId) => {
  return jwt.sign({ orderId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export default generateToken;