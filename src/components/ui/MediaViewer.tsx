import Image from "next/image";

export function MediaViewer({
  imageURLs,
  className,
  onLoad,
  ...props
}: {
  imageURLs: Array<string>;
  className: string;
}) {
  if (imageURLs.length === 0) {
    return;
  }
  return (
    <div className={`w-full h-[22rem] relative flex ${className}`} {...props}>
      {imageURLs.map((imageSrc, index) => (
        <div key={index} className="rounded-lg">
          <Image
            src={imageSrc}
            fill
            className="relative w-full object-cover rounded-lg"
            alt={`Avatar ${index + 1}`}
            onLoad={onLoad}
            loading="eager"
          />
        </div>
      ))}
    </div>
  );
}
