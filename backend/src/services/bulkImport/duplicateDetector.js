import md5 from 'md5';

/**
 * Detects duplicate images based on MD5 hashing.
 * 
 * @param {Map<string, Buffer[]>} imageIndex 
 * @returns {{ deduplicatedIndex: Map<string, Buffer[]>, duplicates: Array<{sku: string, filename: string, hash: string}> }}
 */
export function detectDuplicateImages(imageIndex) {
  const seenHashes = new Set();
  const deduplicatedIndex = new Map();
  const duplicates = [];

  for (const [sku, buffers] of imageIndex.entries()) {
    const deduplicatedBuffers = [];
    
    buffers.forEach((buffer, index) => {
      const hash = md5(buffer);
      if (seenHashes.has(hash)) {
        duplicates.push({
          sku,
          filename: `${sku}-${index}`, // approximate since we don't store filename here
          hash
        });
      } else {
        seenHashes.add(hash);
        deduplicatedBuffers.push(buffer);
      }
    });

    if (deduplicatedBuffers.length > 0) {
      deduplicatedIndex.set(sku, deduplicatedBuffers);
    }
  }

  return { deduplicatedIndex, duplicates };
}

/**
 * Detects duplicate SKUs within the parsed rows.
 * 
 * @param {Array<any>} rows 
 * @returns {{ duplicates: Array<{sku: string, rowNumbers: number[]}> }}
 */
export function detectDuplicateSKUs(rows) {
  const skuMap = new Map();
  const duplicateMap = new Map();

  for (const row of rows) {
    if (!row.sku) continue;
    const sku = row.sku.toString().toUpperCase();
    
    if (skuMap.has(sku)) {
      if (!duplicateMap.has(sku)) {
        duplicateMap.set(sku, [skuMap.get(sku)]);
      }
      duplicateMap.get(sku).push(row._rowNumber);
    } else {
      skuMap.set(sku, row._rowNumber);
    }
  }

  const duplicates = Array.from(duplicateMap.entries()).map(([sku, rowNumbers]) => ({
    sku,
    rowNumbers
  }));

  return { duplicates };
}
