import Product from '../../models/Product.js';
import InventoryLog from '../../models/InventoryLog.js';
import ImportJob from '../../models/ImportJob.js';

export async function executeImport(jobId, validRows, imageMap, options) {
  const { importMode, isDryRun, autoCreateCategories, brand, adminUserId } = options;
  
  let created = 0;
  let updated = 0;
  let skipped = 0;
  let failed = 0;
  
  const rollbackSnapshot = [];
  const allCloudinaryIds = [];

  const batchSize = imageMap.size > 0 
    ? (parseInt(process.env.IMPORT_BATCH_SIZE_IMAGES) || 20) 
    : (parseInt(process.env.IMPORT_BATCH_SIZE_METADATA) || 100);

  const processedSKUs = [];
  let batchIndex = 0;

  for (let i = 0; i < validRows.length; i += batchSize) {
    const batch = validRows.slice(i, i + batchSize);
    
    for (const row of batch) {
      try {
        const sku = row.sku;
        const images = imageMap.get(sku) || [];
        
        images.forEach(img => {
          if (img.publicId && !img.publicId.startsWith('dry-run/')) {
            allCloudinaryIds.push(img.publicId);
          }
        });

        // Basic data mapping
        const productData = {
          name: row.name,
          sku: row.sku,
          description: row.description,
          shortDescription: row.shortDescription,
          price: row.price,
          originalPrice: row.originalPrice,
          costPrice: row.costPrice,
          stock: row.stock,
          category: row.category,
          subCategory: row.subCategory,
          weave: row.weave,
          fabric: row.fabric,
          colors: row.colors,
          tags: row.tags,
          occasion: row.occasion,
          isBestSeller: row.isBestSeller,
          isFeatured: row.isFeatured,
          isNewArrival: row.isNewArrival,
          gender: row.gender,
          ageGroup: row.ageGroup,
          metaTitle: row.metaTitle,
          metaDescription: row.metaDescription,
          careInstructions: row.careInstructions,
          weight: row.weight,
          brand: brand
        };
        
        if (row.description && row.description.length > 2000) {
          productData.description = row.description.substring(0, 2000);
        }

        if (images.length > 0) {
           productData.images = images.map(img => ({
             url: img.url,
             publicId: img.publicId,
             isPrimary: img.isPrimary
           }));
        }

        const baseSlug = row.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
        productData.slug = baseSlug;

        const existingDoc = await Product.findOne({ sku });

        if (importMode === 'Ignore Existing' && existingDoc) {
          skipped++;
          continue;
        }

        let doc;
        let action = null;
        let preStock = 0;

        if (isDryRun) {
           if (existingDoc && (importMode === 'Update Existing' || importMode === 'Create or Update')) {
              updated++;
           } else if (!existingDoc && (importMode === 'Create New' || importMode === 'Create or Update')) {
              created++;
           } else {
              skipped++;
           }
           processedSKUs.push(sku);
           continue;
        }

        // Generate unique slug if not existing doc
        if (!existingDoc || (existingDoc && existingDoc.name !== row.name)) {
          let slugCount = await Product.countDocuments({ slug: { $regex: `^${baseSlug}` }, sku: { $ne: sku } });
          if (slugCount > 0) {
            productData.slug = `${baseSlug}-${slugCount + 1}`;
          }
        }

        if (importMode === 'Create New' || (importMode === 'Create or Update' && !existingDoc)) {
           doc = await Product.create(productData);
           action = 'created';
           created++;
           rollbackSnapshot.push({ action: 'created', productId: doc._id, cloudinaryPublicIds: images.map(i => i.publicId) });
        } else if (importMode === 'Update Existing' || (importMode === 'Create or Update' && existingDoc)) {
           preStock = existingDoc.stock;
           rollbackSnapshot.push({ action: 'updated', productId: existingDoc._id, previousData: existingDoc.toObject() });
           doc = await Product.findOneAndUpdate({ sku }, productData, { new: true });
           action = 'updated';
           updated++;
        }
        
        if (doc && action) {
           await InventoryLog.create({
              type: 'RESTOCK',
              channel: 'Offline',
              productId: doc._id,
              productName: doc.name,
              quantity: doc.stock,
              stockBefore: preStock,
              stockAfter: doc.stock,
              orderReference: 'Bulk Import #' + jobId,
              createdBy: adminUserId
           });
        }
        
        processedSKUs.push(sku);
      } catch (err) {
        console.error('Error executing import for row:', row, err);
        failed++;
      }
    }
    
    batchIndex++;
    if (!isDryRun) {
      await ImportJob.findByIdAndUpdate(jobId, {
        $set: { lastBatchIndex: batchIndex, processedSKUs: [...processedSKUs] }
      });
    }
  }

  return { created, updated, skipped, failed, rollbackSnapshot, allCloudinaryIds };
}
