import AdmZip from 'adm-zip';
import path from 'path';

const MAX_SIZE_MB = parseInt(process.env.MAX_EXTRACTED_SIZE_MB) || 1000;
const MAX_BYTES = MAX_SIZE_MB * 1024 * 1024;
const MAX_IMAGES = parseInt(process.env.MAX_IMAGES_PER_IMPORT) || 1500;
const ALLOWED_EXTENSIONS = ['.xlsx', '.csv', '.jpg', '.jpeg', '.png', '.webp'];
const BANNED_EXTENSIONS = ['.exe', '.sh', '.php', '.js', '.py', '.bat', '.cmd'];

function checkMagicBytes(buffer, ext) {
  if (buffer.length < 4) return false;
  const hex = buffer.toString('hex', 0, 4).toUpperCase();
  
  if (ext === '.jpg' || ext === '.jpeg') {
    return hex.startsWith('FFD8FF');
  }
  if (ext === '.png') {
    return hex.startsWith('89504E47');
  }
  if (ext === '.webp') {
    return hex.startsWith('52494646'); // RIFF
  }
  return true; // Pass through if we don't have a check
}

export function extractZip(buffer) {
  const zip = new AdmZip(buffer);
  const zipEntries = zip.getEntries();
  
  let totalExtractedSize = 0;
  let spreadsheetBuffer = null;
  let spreadsheetName = null;
  const imageIndex = new Map();
  let imageCount = 0;

  for (const entry of zipEntries) {
    if (entry.isDirectory) continue;

    const fileName = entry.name;
    const entryPath = entry.entryName;

    // Path traversal check
    if (entryPath.includes('..') || entryPath.startsWith('/')) {
      throw new Error(`Path traversal attempt detected in ZIP: ${entryPath}`);
    }

    const ext = path.extname(fileName).toLowerCase();
    
    // Check banned extensions
    if (BANNED_EXTENSIONS.includes(ext)) {
      throw new Error(`Executable or script file found in ZIP: ${fileName}`);
    }

    // Check allowed extensions
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      continue;
    }

    const entryData = entry.getData();
    totalExtractedSize += entryData.length;

    // Zip bomb protection
    if (totalExtractedSize > MAX_BYTES) {
      throw new Error(`Extracted ZIP size exceeds limit of ${MAX_SIZE_MB}MB`);
    }

    if (ext === '.xlsx' || ext === '.csv') {
      if (!spreadsheetBuffer) {
        spreadsheetBuffer = entryData;
        spreadsheetName = fileName;
      }
    } else if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      if (imageCount >= MAX_IMAGES) {
         continue; // skip the rest if max reached
      }

      if (!checkMagicBytes(entryData, ext)) {
        console.warn(`Invalid magic bytes for file ${fileName}, skipping.`);
        continue;
      }

      // Parse SKU stem. e.g., TAN001-1.jpg -> TAN001
      const stemMatch = fileName.match(/^([A-Za-z0-9_-]+?)(-\d+)?\.[a-z]+$/i);
      if (stemMatch) {
        const sku = stemMatch[1].toUpperCase();
        if (!imageIndex.has(sku)) {
          imageIndex.set(sku, []);
        }
        imageIndex.get(sku).push({ buffer: entryData, name: fileName });
        imageCount++;
      }
    }
  }

  if (!spreadsheetBuffer) {
    throw new Error('No Excel or CSV file found in ZIP');
  }

  // Sort images per SKU
  const finalImageIndex = new Map();
  for (const [sku, images] of imageIndex.entries()) {
    // Exact match (no hyphen number) goes first, then sorted by hyphen number
    images.sort((a, b) => {
      const getNum = (name) => {
        const match = name.match(/-(\d+)\.[a-z]+$/i);
        return match ? parseInt(match[1], 10) : 0;
      };
      return getNum(a.name) - getNum(b.name);
    });
    finalImageIndex.set(sku, images.map(img => img.buffer));
  }

  return { spreadsheetBuffer, spreadsheetName, imageIndex: finalImageIndex };
}
