import cloudinary from '../../config/cloudinary.js';
import { Readable } from 'stream';

export async function uploadImageBatch(imageIndex, brand, isDryRun) {
  const maxConcurrency = parseInt(process.env.IMPORT_CLOUDINARY_CONCURRENCY) || 5;
  const resultMap = new Map();
  
  let folder = 'tanvo/products/tanvo';
  if (brand === 'Two Threads Studio') folder = 'tanvo/products/tts';
  else if (brand === 'SABEL') folder = 'tanvo/products/sabel';

  const uploadBuffer = (buffer, publicId) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder,
          public_id: publicId,
          quality: 'auto',
          fetch_format: 'auto',
          transformation: [{ width: 1200, crop: 'limit' }]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      const rs = new Readable();
      rs.push(buffer);
      rs.push(null);
      rs.pipe(uploadStream);
    });
  };

  const tasks = [];
  for (const [sku, buffers] of imageIndex.entries()) {
    resultMap.set(sku, []);
    buffers.forEach((buffer, idx) => {
      tasks.push({ sku, buffer, idx });
    });
  }

  let activeCount = 0;
  let currentIndex = 0;

  return new Promise((resolve) => {
    const next = async () => {
      if (currentIndex >= tasks.length && activeCount === 0) {
        resolve(resultMap);
        return;
      }

      while (activeCount < maxConcurrency && currentIndex < tasks.length) {
        const task = tasks[currentIndex++];
        activeCount++;

        const publicId = `${task.sku}_image_${task.idx}`;
        const isPrimary = task.idx === 0;
        
        const processTask = async () => {
          if (isDryRun) {
            resultMap.get(task.sku).push({
              url: `https://placeholder.tanvo.com/${task.sku}-${task.idx}.jpg`,
              publicId: `dry-run/${task.sku}-${task.idx}`,
              isPrimary
            });
          } else {
            try {
              const res = await uploadBuffer(task.buffer, publicId);
              resultMap.get(task.sku).push({
                url: res.secure_url,
                publicId: res.public_id,
                isPrimary
              });
            } catch (err) {
              console.error(`Failed to upload image for SKU ${task.sku}:`, err);
            }
          }
        };

        processTask().finally(() => {
          activeCount--;
          next();
        });
      }
    };
    next();
  });
}

export async function deleteCloudinaryImages(publicIds) {
  if (!publicIds || !publicIds.length) return;
  try {
    // API limitation: delete_resources accepts array up to 100
    for (let i = 0; i < publicIds.length; i += 100) {
      const batch = publicIds.slice(i, i + 100);
      await cloudinary.v2.api.delete_resources(batch);
    }
  } catch (err) {
    console.error('Failed to delete some cloudinary images:', err);
  }
}
