import { MediaViewer } from "@/components/ui/MediaViewer";
import React, { useEffect, useState } from "react";

export default function MediaViewerWrapper({
  images,
  className = "",
}: {
  className?: string;
  images: Blob[];
}) {
  const [imageURLs, setImagesURLs] = useState<Array<string>>([]);

  useEffect(() => {
    if (images.length < 1 || images.length > 3) {
      setImagesURLs([]);
      return;
    }
    const newImageURLs: Array<string> = [];
    images.forEach((image: Blob) =>
      newImageURLs.push(URL.createObjectURL(image))
    );
    setImagesURLs(newImageURLs);
  }, [images]);

  return (
    <MediaViewer className={className} imageURLs={imageURLs}></MediaViewer>
  );
}
