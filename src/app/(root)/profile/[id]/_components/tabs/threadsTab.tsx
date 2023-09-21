"use client";
import { useStore } from "zustand";
import useFeedStore from "@/src/state/feedsStore";
import ThreadsListWrapper from "@/src/components/shared/ThreadsListWrapper";
import useUserStore from "@/src/state/userStore";
import { User } from "@prisma/client";
import { useEffect } from "react";
import useProfileStore from "@/src/state/profileStore";

export default function ThreadsTab({
  user,
}: // initialThreadsData,
{
  user: User;
  // initialThreadsData: unknown;
}) {
  let { fetchUserThreads, deleteThread, threads } = useStore(useProfileStore);

  const initialThreadsData = null;
  let { setCurrentUser } = useStore(useUserStore);

  useEffect(() => {
    setCurrentUser(() => user);
    fetchUserThreads({ userId: user.id });

    // setThreads(initialThreadsData.threads);
  }, []);

  return (
    <>
      <ThreadsListWrapper
        userId={user.id}
        initialThreadsData={initialThreadsData}
        onDeleteThread={deleteThread}
        onFetchThreads={fetchUserThreads}
        threads={threads}
      ></ThreadsListWrapper>
    </>
  );
}
