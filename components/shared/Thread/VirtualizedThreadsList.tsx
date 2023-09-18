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
}: {
  user: User;
  path: string;
  fetchHandler: (page: number) => Promise<unknown>;
  onDelete: () => Promise<void>;
}) {
  const renderThread = ({ item, style }) => {
    return (
      <ThreadCard
        thread={item}
        user={user}
        path={path}
        onDelete={onDelete}
        style={style}
      />
    );
  };

  return (
    <VirtualAndInfiniteScroll
      renderRow={renderThread}
      TotalCount={3}
      fetchHandler={fetchHandler}
      loaderComponent={<LoadingThreadCards count={3} />}
    />
  );
}
