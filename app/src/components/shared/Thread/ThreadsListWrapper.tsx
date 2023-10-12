"use client";
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
  const fetchHandler = async (page: number) => {
    let threadsData = await onFetchThreads({
      userId,
      page,
    });
    if (!threadsData) return;
    let { threads } = threadsData;
    return threads;
  };

  if (!threads) {
    threads = initialThreadsData?.threads || [];
  }

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
