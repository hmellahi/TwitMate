import { Create } from "@/components/svgs";
import { Label } from "@radix-ui/react-label";

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
    <div className="w-full flex gap-4 text-white">
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
      <p className="text-2xl">Media</p>
    </div>
  );
}
