type ConnectionType = 'slow-2g' | '2g' | '3g' | '4g';

const getConnectionSpeed = (): ConnectionType => {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const conn = (navigator as any).connection;
    return conn.effectiveType || '4g';
  }
  return '4g';
};

export const getCloudinaryUrl = (
  originalUrl: string, 
  options: { width?: number; isHero?: boolean } = {}
): string => {
  if (!originalUrl) return '';

  // If it's not a Cloudinary URL, just return it as is (do not use Fetch API)
  if (!originalUrl.includes('res.cloudinary.com')) {
      return originalUrl; 
  }

  const { width, isHero } = options;
  const speed = getConnectionSpeed();
  
  let qValue = 'auto'; // q_auto by default
  let widthValue = width ? `w_${width}` : 'w_auto';

  if (isHero) {
    if (speed === 'slow-2g' || speed === '2g' || speed === '3g') {
      qValue = 'eco'; // lower quality for slow connections
      widthValue = width ? `w_${Math.floor(width * 0.8)}` : 'w_auto'; // slightly smaller
    } else {
      qValue = 'best'; // high quality hero for fast connections
    }
  } else {
      if (speed === 'slow-2g' || speed === '2g' || speed === '3g') {
          qValue = 'eco';
      }
  }

  const transforms = [`f_auto`, `q_${qValue}`, `dpr_auto`, widthValue];

  // Regex to match the upload part of a Cloudinary URL to insert transformations
  // Will transform: /image/upload/v1234/ to /image/upload/f_auto,q_auto,dpr_auto,w_auto/v1234/
  return originalUrl.replace(/\/(upload)\//i, `/$1/${transforms.join(',')}/`);
};
