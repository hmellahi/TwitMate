import { Create } from "@/components/svgs";
import { MediaViewer } from "@/components/ui/MediaViewer";
import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";
import MediaViewerWrapper from "./MediaViewerWrapper";

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export default function MediaUploader({ images, setImages }) {
  const onImageChange = (e: HTMLInputEvent) => {
    const files = e.target.files;
    if (files) {
      setImages([files[0]]);
    }
  };
  return (
    <div className="w-full ">
      <Label htmlFor="post" className="cursor-pointer !m-0 !p-0">
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
