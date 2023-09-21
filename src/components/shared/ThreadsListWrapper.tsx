"use client";
import React, { useEffect, useState } from "react";
import { ThreadsList } from "./ThreadsList";
import { useStore } from "zustand";
import useFeedStore from "@/src/state/feedsStore";
import { Thread, User } from "@prisma/client";
import PostThread from "../forms/PostThread";
import useUserStore from "@/src/state/userStore";
import VirtualizedThreadsList from "./Thread/VirtualizedThreadsList";

export default function ThreadsListWrapper({
  userId,
  initialThreadsData,
  onFetchThreads,
  onDeleteThread,
  threads,
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

  const { totalCount, threads: initialThreads } = initialThreadsData ?? {
    threads: [],
  };

  console.log("threads list wrapper", { threads, totalCount });

  if (!threads) {
    threads = initialThreads || [];
  }

  return (
    <>
      <VirtualizedThreadsList
        userId={userId}
        path="/"
        threads={threads}
        totalCount={totalCount}
        onFetchThreads={fetchHandler}
        onDeleteThread={onDeleteThread}
      />
    </>
  );
}
