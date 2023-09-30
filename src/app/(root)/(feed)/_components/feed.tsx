"use client";

import useFeedStore from "@/app/(root)/(feed)/_store/feeds-store";
import PostThread from "@/components/forms/PostThread";
import ThreadsListWrapper from "@/components/shared/ThreadsListWrapper";
import useUserStore from "@/store/user-store";
import { User } from "@prisma/client";
import { useEffect } from "react";
import { useStore } from "zustand";

export default function Feed({
  user,
  initialThreadsData,
}: {
  user: User;
  initialThreadsData: unknown;
}) {
  let {
    fetchThreads,
    deleteThread,
    threads,
    createThread,
    isThreadsLoading,
    totalCount,
    setThreads,
  } = useStore(useFeedStore);

  let { setCurrentUser } = useStore(useUserStore);

  useEffect(() => {
    setCurrentUser(user);
    if (!initialThreadsData) {
      return;
    }
    const { threads, totalCount } = initialThreadsData;
    setThreads(threads);
    useFeedStore.setState({ totalCount, isThreadsLoading: false });
    // fetchThreads({ userId: user.id }, true);
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
        isThreadsLoading={isThreadsLoading}
        totalCount={totalCount}
      ></ThreadsListWrapper>
    </>
  );
}
