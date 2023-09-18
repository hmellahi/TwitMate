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
  initialThreads,
}: {
  user: User;
  initialThreads: Thread[];
}) {
  let { threads, fetchThreads, deleteThread, createThread, setThreads } =
    useStore(useFeedStore);

  const [isThreadsLoading, setIsThreadsLoading] = useState(true);

  const fetchHandler = async (page: number) =>
    fetchThreads({
      userId: user.id,
      page,
    });

  useEffect(() => {
    useUserStore.setState({ currentUser: user });
    setThreads(initialThreads);
    setIsThreadsLoading(false);
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
      />
    </>
  );
}
