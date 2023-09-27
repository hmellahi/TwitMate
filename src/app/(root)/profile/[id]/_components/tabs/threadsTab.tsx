"use client";
import useProfileStore from "@/app/(root)/profile/[id]/_store/profileStore";
import ThreadsListWrapper from "@/components/shared/ThreadsListWrapper";
import useUserStore from "@/store/userStore";
import { User } from "@prisma/client";
import { useEffect } from "react";
import { useStore } from "zustand";

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
