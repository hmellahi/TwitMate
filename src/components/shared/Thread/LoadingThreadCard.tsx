import { Skeleton } from "@/components/ui/Skeleton";

export function LoadingThreadCard({ className = "" }: { className?: string }) {
  return (
    <div className={` w-full ${className}`}>
      <div className="flex space-x-2">
        <div className="flex flex-col items-center">
          <Skeleton className="h-11 w-11 rounded-full" />
        </div>
        <div className=" w-full">
          <div className="justify-between flex">
            <Skeleton className="h-4 w-[60%]" />
            <Skeleton className="h-4 w-[3rem]" />
          </div>
          <Skeleton className="h-4 w-[50%]  mt-3" />
          <Skeleton className="h-[17rem] w-full mt-4" />
          <div className="flex gap-2">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} className="h-5 w-5 mt-3 rounded-full" />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
