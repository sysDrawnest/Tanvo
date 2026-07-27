import * as xlsx from 'xlsx';

/**
 * Normalizes boolean values.
 */
function normalizeBoolean(val) {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'number') return val === 1;
  if (typeof val === 'string') {
    const lower = val.trim().toLowerCase();
    return ['yes', 'true', '1', 'y'].includes(lower);
  }
  return false;
}

/**
 * Strips formula/CSV injection characters.
 */
function stripInjection(val) {
  if (typeof val !== 'string') return val;
  let str = val;
  while (['=', '+', '-', '@', '\t', '\r'].includes(str.charAt(0))) {
    str = str.slice(1);
  }
  return str.trim();
}

/**
 * Converts comma-separated string to array.
 */
function toArray(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val.map(v => stripInjection(String(v)));
  if (typeof val === 'string') {
    return val.split(',').map(s => stripInjection(s)).filter(Boolean);
  }
  return [];
}

/**
 * Parses Excel (.xlsx) and CSV files from a Buffer.
 * 
 * @param {Buffer} buffer 
 * @param {string} filename 
 * @returns {{ rows: Array<any>, templateType: string }}
 */
export function parseSpreadsheet(buffer, filename) {
  const wb = xlsx.read(buffer, { type: 'buffer' });
  const sheetName = wb.SheetNames[0];
  const sheet = wb.Sheets[sheetName];

  // Try to find template type from defined names
  let templateType = 'fashion';
  if (wb.Workbook && wb.Workbook.Names) {
    const templateName = wb.Workbook.Names.find(n => n.Name === '__template_type__');
    if (templateName && templateName.Ref) {
      const cellParts = templateName.Ref.split('!');
      if (cellParts.length === 2) {
         const cellVal = wb.Sheets[cellParts[0].replace(/'/g, '')]?.[cellParts[1]];
         if (cellVal) templateType = cellVal.v;
      }
    }
  }

  const rawData = xlsx.utils.sheet_to_json(sheet, { raw: false, defval: null });
  const rows = [];

  rawData.forEach((rawRow, index) => {
    // Check if row is completely empty
    const isEmpty = Object.values(rawRow).every(v => v === null || v === '' || v === undefined);
    if (isEmpty) return;

    // Helper to find value by possible keys
    const getValue = (keys) => {
      for (const key of keys) {
        const foundKey = Object.keys(rawRow).find(k => k.trim().toLowerCase() === key.toLowerCase());
        if (foundKey && rawRow[foundKey] != null) {
          return rawRow[foundKey];
        }
      }
      return null;
    };

    const name = getValue(['Product Name', 'Name', 'Title']);
    const sku = getValue(['SKU', 'Item Code', 'Product Code']);
    const description = getValue(['Description', 'Long Description', 'Details']);
    const shortDescription = getValue(['Short Description', 'Excerpt']);
    const priceStr = getValue(['Price', 'Selling Price', 'Sale Price']);
    const originalPriceStr = getValue(['MRP', 'Original Price', 'Compare Price', 'Was Price']);
    const costPriceStr = getValue(['Cost Price', 'Cost', 'Purchase Price']);
    const stockStr = getValue(['Stock', 'Quantity', 'QTY', 'Inventory']);
    const category = getValue(['Category', 'Main Category']);
    const subCategory = getValue(['Sub Category', 'Subcategory', 'Sub-Category']);
    const weave = getValue(['Weave', 'Weave Type']);
    const fabric = getValue(['Fabric', 'Material', 'Fabric Type']);
    const colors = getValue(['Color', 'Colors', 'Colour']);
    const tags = getValue(['Tags']);
    const occasion = getValue(['Occasion', 'Occasions']);
    const isBestSeller = getValue(['Bestseller', 'Best Seller', 'Is Bestseller']);
    const isFeatured = getValue(['Featured', 'Is Featured']);
    const isNewArrival = getValue(['New Arrival', 'Is New Arrival']);
    const gender = getValue(['Gender']);
    const ageGroup = getValue(['Age Group', 'Age']);
    const metaTitle = getValue(['SEO Title', 'Meta Title']);
    const metaDescription = getValue(['SEO Description', 'Meta Description']);
    const careInstructions = getValue(['Care Instructions', 'Care']);
    const weightStr = getValue(['Weight']);

    const row = {
      name: stripInjection(name),
      sku: stripInjection(sku),
      description: stripInjection(description),
      shortDescription: stripInjection(shortDescription),
      price: priceStr != null ? parseFloat(stripInjection(String(priceStr))) : undefined,
      originalPrice: originalPriceStr != null ? parseFloat(stripInjection(String(originalPriceStr))) : undefined,
      costPrice: costPriceStr != null ? parseFloat(stripInjection(String(costPriceStr))) : undefined,
      stock: stockStr != null ? parseInt(stripInjection(String(stockStr)), 10) : undefined,
      category: stripInjection(category),
      subCategory: stripInjection(subCategory),
      weave: stripInjection(weave),
      fabric: stripInjection(fabric),
      colors: toArray(colors),
      tags: toArray(tags),
      occasion: toArray(occasion),
      isBestSeller: normalizeBoolean(isBestSeller),
      isFeatured: normalizeBoolean(isFeatured),
      isNewArrival: normalizeBoolean(isNewArrival),
      gender: stripInjection(gender),
      ageGroup: stripInjection(ageGroup),
      metaTitle: stripInjection(metaTitle),
      metaDescription: stripInjection(metaDescription),
      careInstructions: stripInjection(careInstructions),
      weight: weightStr != null ? parseFloat(stripInjection(String(weightStr))) : undefined,
      _rowNumber: index + 2 // Assuming row 1 is header
    };

    rows.push(row);
  });

  return { rows, templateType };
}
