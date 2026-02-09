import React from 'react';
import { getCloudinaryImageUrl } from '../config/cloudinary';

const CloudinaryImage = ({ 
  imageId, 
  alt = '', 
  className = '', 
  width, 
  height, 
  crop = 'fill', 
  quality = 'auto',
  format = 'auto'
}) => {
  if (!imageId) {
    return null;
  }

  const imageUrl = getCloudinaryImageUrl(imageId, {
    width,
    height,
    crop,
    quality,
    format
  });

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
};

export default CloudinaryImage;
