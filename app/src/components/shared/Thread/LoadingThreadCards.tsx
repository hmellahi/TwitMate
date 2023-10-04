import { LoadingThreadCard } from "./LoadingThreadCard";

export default function LoadingThreadCards({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  let list = new Array(count).fill(0);

  return (
    <div className={`flex flex-col ${className} bgd-red-200`}>
      {list.map((_, index) => (
        <LoadingThreadCard
          key={index}
          className="line-break py-7 px-0 sm:px-2"
        />
      ))}
    </div>
  );
}
