"use client";
import React, { useEffect, useState } from "react";
import { ThreadsList } from "./ThreadsList";
import { useStore } from "zustand";
import useFeedStore from "@/src/app/(root)/(feed)/_store/feedsStore";
import { Thread, User } from "@prisma/client";
import PostThread from "../forms/PostThread";
import useUserStore from "@/src/store/userStore";
import VirtualizedThreadsList from "./Thread/VirtualizedThreadsList";

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
    console.log({ page });
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
