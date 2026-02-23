import React from 'react';
import { getCloudinaryImageUrl } from '../config/cloudinary';

const CloudinaryImage = ({ 
  imageId, 
  alt = '', 
  className = '', 
  width, 
  height, 
  crop = 'fill', 
  quality = 'auto:best',
  format = 'auto'
}) => {
  if (!imageId) {
    return null;
  }

  const imageUrl = getCloudinaryImageUrl(imageId, { width, height, crop, quality, format });

  // Build 2x retina URL when explicit dimensions are provided
  const retinaUrl = width && height
    ? getCloudinaryImageUrl(imageId, { width: width * 2, height: height * 2, crop, quality, format })
    : null;

  return (
    <img
      src={imageUrl}
      srcSet={retinaUrl ? `${imageUrl} 1x, ${retinaUrl} 2x` : undefined}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
};

export default CloudinaryImage;
