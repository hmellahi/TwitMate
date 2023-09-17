import Image from "next/image";

export function MediaViewer({
  imageURLs,
  className,
  ...props
}: {
  imageURLs: Array<string>;
  className: string;
}) {
  if (imageURLs.length === 0) {
    return;
  }
  return (
    <div
      className={`w-full h-[22rem] relative flex ${className} rounded-md`}
      {...props}
    >
      {imageURLs.map((imageSrc, index) => (
        <div key={index} className=" rounded-lg">
          <Image
            src={imageSrc}
            fill
            className="relative w-full rounded-md object-cover"
            alt={`Avatar ${index + 1}`}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
