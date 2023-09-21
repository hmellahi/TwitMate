"use client";
import PostThread from "@/src/components/forms/PostThread";
import { useStore } from "zustand";
import useFeedStore from "@/src/state/feedsStore";
import ThreadsListWrapper from "@/src/components/shared/ThreadsListWrapper";
import useUserStore from "@/src/state/userStore";
import { User } from "@prisma/client";
import { useEffect } from "react";

export default function Feed({
  user,
  initialThreadsData,
}: {
  user: User;
  initialThreadsData: unknown;
}) {
  let { fetchThreads, deleteThread, setThreads, threads, createThread } =
    useStore(useFeedStore);

  let { setCurrentUser } = useStore(useUserStore);

  useEffect(() => {
    setCurrentUser(() => user);
    setThreads(initialThreadsData.threads);
  }, []);

  return (
    <>
      <PostThread
        userId={user?.id}
        userImage={user.image}
        createThreadHandler={createThread}
        className="mb-4"
      />
      <ThreadsListWrapper
        userId={user.id}
        initialThreadsData={initialThreadsData}
        onDeleteThread={deleteThread}
        onFetchThreads={fetchThreads}
        threads={threads}
      ></ThreadsListWrapper>
    </>
  );
}
