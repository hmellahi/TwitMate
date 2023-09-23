"use client";
import { useStore } from "zustand";
import ThreadsListWrapper from "@/components/shared/ThreadsListWrapper";
import useUserStore from "@/store/userStore";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import useProfileStore from "@/app/(root)/profile/[id]/_store/profileStore";

export default function ThreadsTab({
  user,
}: // initialThreadsData,
{
  user: User;
  // initialThreadsData: unknown;
}) {
  let {
    fetchUserThreads,
    deleteThread,
    threads,
    totalCount,
    isThreadsLoading,
  } = useStore(useProfileStore);

  // const [initialThreadsData, setInitia] = useState({});
  let { setCurrentUser } = useStore(useUserStore);

  useEffect(() => {
    setCurrentUser(() => user);
    fetchUserThreads({ userId: user.id });
  }, []);

  return (
    <ThreadsListWrapper
      userId={user.id}
      initialThreadsData={null}
      onDeleteThread={deleteThread}
      onFetchThreads={fetchUserThreads}
      threads={threads}
      isThreadsLoading={isThreadsLoading}
      totalCount={totalCount}
    ></ThreadsListWrapper>
  );
}
