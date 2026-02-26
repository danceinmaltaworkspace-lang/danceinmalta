// Cloudinary configuration
export const cloudinaryConfig = {
  cloudName: 'dk99zyawv',
  apiKey: '856828549585781',
  apiSecret: '2dDeyzjjOKjIR8YsTHn5JlSb_hI',
  url: 'cloudinary://856828549585781:2dDeyzjjOKjIR8YsTHn5JlSb_hI@dk99zyawv'
};

// Helper function to get Cloudinary image URL
export const getCloudinaryImageUrl = (imageId, options = {}) => {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto'
  } = options;

  let url = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`;

  // Add transformations
  const transformations = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  transformations.push(`c_${crop}`);
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  if (transformations.length > 0) {
    url += `/${transformations.join(',')}`;
  }

  url += `/${imageId}`;

  return url;
};
