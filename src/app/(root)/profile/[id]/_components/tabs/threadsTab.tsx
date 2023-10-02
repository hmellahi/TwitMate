"use client";
import useProfileStore from "@/app/(root)/profile/[id]/_store/profile-store";
import ThreadsListWrapper from "@/components/shared/Thread/ThreadsListWrapper";
import useUserStore from "@/store/user-store";
import { User } from "@prisma/client";
import { useEffect } from "react";
import { useStore } from "zustand";

export default function ThreadsTab({ user }: { user: User }) {
  let { fetchUserThreads, deleteThread, threads, totalCount, isThreadsLoading } =
    useStore(useProfileStore);

  let { setCurrentUser } = useStore(useUserStore);

  useEffect(() => {
    setCurrentUser(() => user);
    fetchUserThreads({ userId: user.id }, true);
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
