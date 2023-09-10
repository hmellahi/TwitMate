import { Create } from "@/components/svgs";
import { MediaViewer } from "@/components/ui/MediaViewer";
import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";

export default function MediaUploader({ images, setImages }) {
  const [imageURLs, setImagesURLs] = useState<Array<string>>([]);

  useEffect(() => {
    if (images.length < 1 || images.length > 3) return;
    const newImageURLs: Array<string> = [];
    images.forEach((image) => newImageURLs.push(URL.createObjectURL(image)));
    setImagesURLs(newImageURLs);
  }, [images]);

  const onImageChange = (e: unknown) => {
    setImages([...e.target.files]);
  };
  return (
    <div className="w-full !mt-3 ">
      {imageURLs.length && (
        <MediaViewer className="mb-5" imageURLs={imageURLs}></MediaViewer>
      )}
      <Label htmlFor="post" className="cursor-pointer !m-0 !p-0" >
        <Create width={25} height={25} />
      </Label>
      <input
        id="post"
        type="file"
        multiple
        accept="image/*"
        onChange={onImageChange}
        className="hidden"
      />
    </div>
  );
}
