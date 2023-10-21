"use client";
import { useCallback } from "react";
import LoadingThreadCards from "./LoadingThreadCards";
import VirtualizedThreadsList from "./VirtualizedThreadsList";

export default function ThreadsListWrapper({
  userId,
  initialThreadsData,
  onFetchThreads,
  onDeleteThread,
  threads,
  isThreadsLoading,
  totalCount,
}: {
  userId: string;
  initialThreadsData: unknown;
}) {
  const fetchHandler = useCallback(async (page: number) => {
    let threadsData = await onFetchThreads({
      userId,
      page,
    });
    if (!threadsData) return;
    let { threads } = threadsData;
    return threads;
  }, []);

  if (!threads) {
    threads = initialThreadsData?.threads || [];
  }

  // Check if the code is executing on the server
  if (typeof window === "undefined") {
    // Return your loader component here
    return <LoadingThreadCards count={3} />;
  }

  // If the code is executing on the client, return the VirtualizedThreadsList component
  return (
    <VirtualizedThreadsList
      userId={userId}
      path="/"
      threads={threads}
      totalCount={totalCount}
      onFetchThreads={fetchHandler}
      onDeleteThread={onDeleteThread}
      isThreadsLoading={isThreadsLoading}
    />
  );
}
