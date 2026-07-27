export function validateRows(rows, options = {}) {
  const { importMode, existingSkus = new Set(), autoCreateCategories = false } = options;
  
  const valid = [];
  const errors = [];
  const warnings = [];
  
  let errorCount = 0;
  let warningCount = 0;
  
  const ALLOWED_CATEGORIES = ['Women', 'Men', 'Accessories', 'Home Decor', 'Kids Collection'];

  for (const row of rows) {
    const rowErrors = [];
    const rowWarnings = [];
    
    const addError = (field, issue, suggestion = null) => {
      rowErrors.push({ row: row._rowNumber, sku: row.sku, field, issue, suggestion, severity: 'error' });
      errorCount++;
    };
    
    const addWarning = (field, issue, suggestion = null) => {
      rowWarnings.push({ row: row._rowNumber, sku: row.sku, field, issue, suggestion, severity: 'warning' });
      warningCount++;
    };

    // 1. Missing name
    if (!row.name) {
      addError('name', 'Product name is required');
    } else if (row.name.length > 100) {
      addError('name', 'Product name too long (max 100 characters)');
    }

    // 2. Missing price
    if (row.price === undefined || row.price === null) {
      addError('price', 'Selling price is required');
    } else if (typeof row.price !== 'number' || isNaN(row.price) || row.price < 0) {
      addError('price', 'Price must be a positive number');
    }

    // 3. Missing category
    if (!row.category) {
      addError('category', 'Category is required');
    } else {
      if (!ALLOWED_CATEGORIES.includes(row.category)) {
        if (!autoCreateCategories) {
          addError('category', 'Invalid category', `Use one of: ${ALLOWED_CATEGORIES.join(', ')}`);
        } else {
          addWarning('category', 'Category will be created');
        }
      }
    }

    // 4. Missing stock
    if (row.stock === undefined || row.stock === null) {
      addError('stock', 'Stock quantity is required');
    } else if (typeof row.stock !== 'number' || isNaN(row.stock) || row.stock < 0 || !Number.isInteger(row.stock)) {
      addError('stock', 'Stock must be a non-negative integer');
    }

    // Business Logic Validation
    if (row.originalPrice !== undefined && row.price !== undefined && row.originalPrice < row.price) {
      addWarning('originalPrice', 'MRP is lower than selling price — discount may be inverted');
    }

    if (row.costPrice !== undefined && row.price !== undefined && row.costPrice > row.price) {
      addWarning('costPrice', 'Cost price exceeds selling price — negative margin');
    }

    // Description length
    if (row.description && row.description.length > 2000) {
      addWarning('description', 'Description exceeds 2000 characters and will be truncated');
    }
    
    // Weight numeric
    if (row.weight !== undefined && (typeof row.weight !== 'number' || isNaN(row.weight))) {
      addWarning('weight', 'Weight must be a numeric value');
    }

    // SKU Logic based on importMode
    if (row.sku) {
      const skuExists = existingSkus.has(row.sku);
      if (importMode === 'Update Existing' && !skuExists) {
        addError('sku', 'SKU not found in catalog — cannot update');
      } else if (importMode === 'Create New' && skuExists) {
        addError('sku', 'SKU already exists — use Update Existing or Create or Update mode');
      }
    } else {
      addError('sku', 'SKU is required for all imports');
    }

    // Push errors and warnings to global lists
    errors.push(...rowErrors);
    warnings.push(...rowWarnings);

    // If no errors, push to valid
    if (rowErrors.length === 0) {
      valid.push({ ...row, _warnings: rowWarnings });
    }
  }

  return {
    valid,
    errors,
    warnings,
    stats: {
      total: rows.length,
      valid: valid.length,
      errorCount,
      warningCount
    }
  };
}
