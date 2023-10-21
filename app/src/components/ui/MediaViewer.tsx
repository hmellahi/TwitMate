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
            src={imageSrc}
            fill
            className="!relative w-full object-cover rounded-xl !h-auto bodder-2 border-white"
            alt={`Avatar ${index + 1}`}
            onLoad={onLoad}
            sizes="(min-width: 820px) 506px, (min-width: 780px) calc(-305vw + 2915px), (min-width: 640px) calc(78.33vw - 59px), (min-width: 520px) 78vw, (min-width: 460px) calc(47.5vw + 112px), (min-width: 420px) 291px, (min-width: 360px) calc(47.5vw + 63px), calc(15vw + 145px)"
            priority={isPriority}
          />
        </div>
      ))}
    </div>
  );
}

// export function MediaViewer({
//   imageURLs,
//   className,
//   onLoad,
//   ...props
// }: {
//   imageURLs: Array<string>;
//   className: string;
// }) {
//   if (imageURLs.length === 0) {
//     return null; // Return null when there are no images to display
//   }

//   return (
//     <div className={`w-full relative flex ${className}`} {...props}>
//       {imageURLs.map((imageSrc, index) => (
//         <div
//           key={index}
//           className="w-full relative border-2 border-white rounded-xl overflow-hidden"
//         >
//           <div
//             className="absolute top-0 left-0 w-full"
//             style={{
//               paddingBottom: '100%', // Maintain a 1:1 aspect ratio
//               background: `url(${imageSrc}) center/cover no-repeat`,
//             }}
//           ></div>
//         </div>
//       ))}
//     </div>
//   );
// }
