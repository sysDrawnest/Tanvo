import { z } from 'zod';

/**
 * Recursively sanitizes input objects by stripping out any keys starting with '$'.
 * This prevents MongoDB/NoSQL operator injection attacks.
 */
export const sanitizeInput = (val) => {
  if (val === null || val === undefined) return val;
  if (Array.isArray(val)) {
    return val.map(sanitizeInput);
  }
  if (typeof val === 'object') {
    const clean = {};
    for (const key in val) {
      if (Object.prototype.hasOwnProperty.call(val, key)) {
        if (!key.startsWith('$')) {
          clean[key] = sanitizeInput(val[key]);
        }
      }
    }
    return clean;
  }
  return val;
};

/**
 * Express middleware to sanitize and validate requests using Zod schemas.
 * 
 * @param {Object} schemas - Object containing Zod schemas for body, query, and/or params
 */
export const validateRequest = (schemas = {}) => {
  return (req, res, next) => {
    try {
      // 1. Sanitize to prevent NoSQL injection
      if (req.body) req.body = sanitizeInput(req.body);
      if (req.query) req.query = sanitizeInput(req.query);
      if (req.params) req.params = sanitizeInput(req.params);

      // 2. Validate against Zod schemas if defined
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }
      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      next(error);
    }
  };
};
