import React from 'react';

const ImageDisplay = ({ src, alt, width = '200px', height = '200px' }) => {
  return <img src={src} alt={alt} style={{ width, height }} />;
};

export default ImageDisplay;
