"use client";
import React from "react";
import VirtualizedThreadsList from "./Thread/VirtualizedThreadsList";
import VirtualAndInfiniteScroll from "../VirtualAndInfiniteScroll";
import LoadingThreadCards from "./LoadingThreadCards";
import ThreadCard from "@/components/forms/ThreadCard";

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
  const renderThread = ({ item, style, registerChild, measure }) => (
    <ThreadCard
      thread={item}
      userId={userId}
      path={path}
      onDelete={onDeleteThread}
      className="line-break"
      style={style}
      measure={measure}
      ref={registerChild}
    />
  );
  console.log(
    "Rerendered : virtual threads list wrapper",
    isThreadsLoading,
    threads
  );

  return (
    <VirtualAndInfiniteScroll
      list={threads}
      renderRow={renderThread}
      totalCount={totalCount}
      fetchHandler={onFetchThreads}
      loaderComponent={<LoadingThreadCards count={3} />}
      className="text-white flex flex-col gap-4d"
      isNextPageLoading={isThreadsLoading}
    />
  );
}
