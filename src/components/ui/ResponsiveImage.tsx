import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';

function ResponsiveImage({ src, alt, ...props }) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState('auto');
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  // Function to adjust the image height
  const adjustImageHeight = () => {
    if (containerRef.current && imageRef.current) {
      const originalImage = new Image();
      originalImage.src = src;

      // Calculate the new height to maintain the aspect ratio
      const newHeight = (containerWidth * originalImage.height) / originalImage.width;

      // Set the image's height to the calculated value
      setImageHeight(`${newHeight}px`);
    }
  };

  useEffect(() => {
    // Initially set the container width
    setContainerWidth(containerRef.current.offsetWidth);

    // Attach a resize event listener to adjust the image height when the window is resized
    window.addEventListener('resize', adjustImageHeight);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', adjustImageHeight);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={adjustImageHeight}
        style={{ height: imageHeight }}
        {...props}
      />
    </div>
  );
}

export default ResponsiveImage;