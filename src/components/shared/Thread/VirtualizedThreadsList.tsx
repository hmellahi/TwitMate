"use client";
import ThreadCard from "@/components/forms/ThreadCard";
import VirtualAndInfiniteScroll from "../VirtualAndInfiniteScroll";
import LoadingThreadCards from "./LoadingThreadCards";

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
      className="text-white flex flex-col overflow-x-hidden"
      isNextPageLoading={isThreadsLoading}
    />
  );
}
