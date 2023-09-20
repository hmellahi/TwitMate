"use client";
import { useStore } from "zustand";
import useFeedStore from "@/state/feedsStore";
import ThreadsListWrapper from "@/components/shared/ThreadsListWrapper";
import useUserStore from "@/state/userStore";
import { User } from "@prisma/client";
import { useEffect } from "react";
import useProfileStore from "@/state/profileStore";

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
