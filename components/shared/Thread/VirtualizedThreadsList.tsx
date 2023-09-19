"use client";
import React from "react";
import { User } from "@prisma/client";
import VirtualizedThreadsList from "./Thread/VirtualizedThreadsList";
import VirtualAndInfiniteScroll from "../VirtualAndInfiniteScroll";
import LoadingThreadCards from "./LoadingThreadCards";
import ThreadCard from "@/components/forms/ThreadCard";

export default function VirtualizedThreadsList({
  user,
  fetchHandler,
  path,
  onDelete,
  initialThreadsData,
}: {
  user: User;
  path: string;
  fetchHandler: (page: number) => Promise<unknown>;
  onDelete: () => Promise<void>;
  initialThreadsData: unknown;
}) {
  const renderThread = ({ item, style }) => (
    <ThreadCard
      thread={item}
      user={user}
      path={path}
      onDelete={onDelete}
      style={style}
      className="line-break"
    />
  );

  const { threads, totalCount } = initialThreadsData;

  return (
    <VirtualAndInfiniteScroll
      initialList={threads}
      renderRow={renderThread}
      totalCount={totalCount}
      fetchHandler={fetchHandler}
      loaderComponent={<LoadingThreadCards count={3} />}
      className="text-white flex flex-col"
    />
  );
}
