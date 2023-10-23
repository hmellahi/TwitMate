import { getImgUrl } from "@/lib/utils";
import Image from "next/image";

export function MediaViewer({
  imageURLs,
  className,
  onLoad,
  isPriority,
  ...props
}: {
  imageURLs: Array<string>;
  className: string;
}) {
  if (imageURLs.length === 0) {
    return;
  }

  return (
    <div className={`w-full relative flex ${className}`} {...props}>
      {imageURLs.map((imageSrc, index) => (
        <div key={index} className=" w-full ">
          <Image
            src={getImgUrl(imageSrc, 536)}
            className="!relative w-full object-cover rounded-xl !h-auto bodder-2 border-white"
            alt={`Avatar ${index + 1}`}
            onLoad={onLoad}
            fill
            quality={75}
            sizes="(min-width: 820px) 536px, (min-width: 780px) calc(-305vw + 2915px), (min-width: 640px) calc(78.33vw - 59px), (min-width: 520px) 78vw, (min-width: 460px) calc(47.5vw + 112px), (min-width: 420px) 291px, (min-width: 360px) calc(47.5vw + 63px), 536px"
            priority={isPriority}
          />
        </div>
      ))}
    </div>
  );
}
