"use client";
import React, { useEffect, useState } from "react";
import { ThreadsList } from "./ThreadsList";
import { useStore } from "zustand";
import useFeedStore from "@/state/feedsStore";
import { Thread, User } from "@prisma/client";
import PostThread from "../forms/PostThread";
import useUserStore from "@/state/userStore";
import VirtualizedThreadsList from "./Thread/VirtualizedThreadsList";

export default function ThreadsListWrapper({
  user,
  initialThreadsData,
  onFetchThreads,
  onDeleteThread,
  threads,
}: {
  user: User;
  initialThreadsData: unknown;
}) {
  const fetchHandler = async (page: number) => {
    console.log({ page });
    let threadsData = await onFetchThreads(
      {
        userId: user.id,
        page,
      },
      false
    );
    if (!threadsData) return;
    let { threads } = threadsData;
    return threads;
  };

  const { totalCount, threads: initialThreads } = initialThreadsData;
  console.log("threads list wrapper", { threads, totalCount });

  if (!threads) {
    threads = initialThreads;
  }

  return (
    <>
      <VirtualizedThreadsList
        userId={user.id}
        path="/"
        threads={threads}
        totalCount={totalCount}
        onFetchThreads={fetchHandler}
        onDeleteThread={onDeleteThread}
      />
    </>
  );
}
