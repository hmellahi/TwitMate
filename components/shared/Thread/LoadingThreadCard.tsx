import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingThreadCard({className = ""}: {className?: string}) {
  return (
    <div className={`px-4 w-full ${className}`}>
      <div className="flex space-x-4">
        <div className="  flex flex-col items-center">
          <Skeleton className="h-11 w-11 rounded-full" />
          <div className="thread-card_bar" />
        </div>
        <div className=" w-full">
          <div className="justify-between flex">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[3rem]" />
          </div>
          <Skeleton className="h-4 w-[200px] mt-3" />
          <Skeleton className="h-[20rem] w-full mt-4" />
        </div>
      </div>
    </div>
  );
}
