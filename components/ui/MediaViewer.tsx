import Image from "next/image";

export function MediaViewer({
  imageURLs,
  className,
  ...props
}: {
  imageURLs: Array<string>;
  className: string;
}) {
  return (
    <div
      className={`w-full h-[22rem] relative flex itemds-center ${className}`}
      {...props}
    >
      {imageURLs.map((imageSrc) => (
        <div className="object-contain rounded-lg">
          <Image src={imageSrc} fill className="relative w-full rounded-md" />
        </div>
      ))}
    </div>
  );
}
