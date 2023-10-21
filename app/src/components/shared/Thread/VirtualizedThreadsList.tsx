"use client";
import ThreadCard from "@/components/forms/ThreadCard";
import VirtualAndInfiniteScroll from "../VirtualAndInfiniteScroll";
import LoadingThreadCards from "./LoadingThreadCards";
import { useCallback } from "react";

export default function VirtualizedThreadsList({
  userId,
  path,
  onFetchThreads,
  onDeleteThread,
  threads,
  totalCount,
  isThreadsLoading,
}: {
  userId: string;
  path: string;
  fetchHandler: (page: number) => Promise<unknown>;
  onDelete: () => Promise<void>;
  totalCount: number;
}) {
  const renderThread = useCallback(({ item, measure, index }) => (
    <ThreadCard
      thread={item}
      userId={userId}
      path={path}
      onDelete={onDeleteThread}
      className="line-break"
      measure={measure}
      index={index}
    />
  ), [])

  return (
    <VirtualAndInfiniteScroll
      list={threads}
      renderRow={renderThread}
      totalCount={totalCount}
      fetchHandler={onFetchThreads}
      loaderComponent={<LoadingThreadCards count={3} />}
      className="text-white flex flex-col overflow-x-hidden"
      isNextPageLoading={isThreadsLoading}
    />
  );
}
