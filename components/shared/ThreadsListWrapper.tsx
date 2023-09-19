"use client";
import React, { useEffect, useState } from "react";
import { ThreadsList } from "./ThreadsList";
import { useStore } from "zustand";
import useFeedStore from "@/state/feedsStore";
import { Thread, User } from "@prisma/client";
import PostThread from "../forms/PostThread";
import useUserStore from "@/state/userStore";
import LoadingThreadCards from "./Thread/LoadingThreadCards";
import InfiniteScroll from "./VirtualAndInfiniteScroll";
import VirtualizedThreadsList from "./Thread/VirtualizedThreadsList";

export default function ThreadsListWrapper({
  user,
  initialThreadsData,
}: {
  user: User;
  initialThreadsData: unknown;
}) {
  let { fetchThreads, deleteThread, createThread, setThreads } =
    useStore(useFeedStore);

  const fetchHandler = async (page: number) => {
    let threadsData = await fetchThreads({
      userId: user.id,
      page,
    });
    if (!threadsData) return;
    let { threads } = threadsData;
    return threads;
  };

  useEffect(() => {
    useUserStore.setState({ currentUser: user });
  }, []);

  return (
    <>
      <div className="mb-4">
        <PostThread
          userId={user?.id}
          userImage={user.image}
          createThreadHandler={createThread}
        />
      </div>
      <VirtualizedThreadsList
        user={user}
        fetchHandler={fetchHandler}
        path="/"
        onDelete={deleteThread}
        initialThreadsData={initialThreadsData}
      />
    </>
  );
}
