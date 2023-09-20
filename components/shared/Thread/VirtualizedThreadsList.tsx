"use client";
import React from "react";
import { User } from "@prisma/client";
import VirtualizedThreadsList from "./Thread/VirtualizedThreadsList";
import VirtualAndInfiniteScroll from "../VirtualAndInfiniteScroll";
import LoadingThreadCards from "./LoadingThreadCards";
import ThreadCard from "@/components/forms/ThreadCard";

export default function VirtualizedThreadsList({
  userId,
  fetchHandler,
  path,
  onDelete,
  threads,
  totalCount,
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
      onDelete={onDelete}
      className="line-break"
      style={style}
      ref={registerChild}
      measure={measure}
    />
  );
  console.log("Rerendered : virtual threads list wrapper");

  return (
    <VirtualAndInfiniteScroll
      initialList={threads}
      renderRow={renderThread}
      totalCount={totalCount}
      fetchHandler={fetchHandler}
      loaderComponent={<LoadingThreadCards count={3} />}
      className="text-white flex flex-col gap-4d"
    />
  );
}
