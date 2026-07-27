import ImportJob from '../../models/ImportJob.js';
import { executeImport } from './importExecutor.js';
import { uploadImageBatch } from './cloudinaryBatch.js';

let isRunning = false;

export function startImportWorker() {
  const pollInterval = parseInt(process.env.IMPORT_WORKER_POLL_MS) || 2000;

  // On startup, mark interrupted jobs as failed but resumable
  ImportJob.updateMany(
    { status: 'processing' },
    { $set: { status: 'failed', resumable: true, error: 'Job interrupted due to server restart' } }
  ).then(() => {
    console.log('Bulk Import Worker initialized.');
    poll();
  }).catch(console.error);

  const poll = async () => {
    if (isRunning) {
      setTimeout(poll, pollInterval);
      return;
    }

    isRunning = true;
    try {
      const job = await ImportJob.findOneAndUpdate(
        { status: 'queued' },
        { $set: { status: 'processing', startedAt: new Date() } },
        { new: true, sort: { createdAt: 1 } }
      );

      if (job) {
        await processJob(job);
      }
    } catch (err) {
      console.error('Worker polling error:', err);
    } finally {
      isRunning = false;
      setTimeout(poll, pollInterval);
    }
  };
}

async function processJob(job) {
  try {
    const parsedRows = JSON.parse(job.parsedRowsCache || '{}');
    let imageMap = new Map();
    
    if (parsedRows.images) {
      for (const [sku, base64Array] of Object.entries(parsedRows.images)) {
        const buffers = base64Array.map(b64 => Buffer.from(b64, 'base64'));
        imageMap.set(sku, buffers);
      }
    }
    
    const validRows = parsedRows.validRows || [];
    
    if (imageMap.size > 0) {
      imageMap = await uploadImageBatch(imageMap, job.brand, job.isDryRun);
    }

    const options = {
      importMode: job.importMode,
      isDryRun: job.isDryRun,
      autoCreateCategories: job.autoCreateCategories,
      brand: job.brand,
      adminUserId: job.adminUserId
    };

    const result = await executeImport(job._id, validRows, imageMap, options);
    
    const stats = {
      ...job.stats,
      created: result.created,
      updated: result.updated,
      skipped: result.skipped,
      failed: result.failed
    };

    await ImportJob.findByIdAndUpdate(job._id, {
      status: job.isDryRun ? 'dry_run_complete' : 'completed',
      stats,
      completedAt: new Date(),
      duration: Date.now() - job.startedAt.getTime(),
      parsedRowsCache: null // free up space
    });
  } catch (err) {
    console.error(`Job ${job._id} failed:`, err);
    await ImportJob.findByIdAndUpdate(job._id, {
      status: 'failed',
      resumable: true,
      error: err.message
    });
  }
}
