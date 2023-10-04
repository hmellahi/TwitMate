"use client";
import PostThread from "@/components/forms/PostThread";
import ThreadsListWrapper from "@/components/shared/Thread/ThreadsListWrapper";
import useUserStore from "@/store/user-store";
import { useEffect } from "react";
import { useStore } from "zustand";
import useThreadDetailsStore from "../_store/thread-details-store";

export default function ThreadDetails({
  user,
  threadId,
}: {
  userId: string;
  threadId: string;
  userImage: string;
}) {
  let { fetchReplies, deleteThread, threads, createThread, totalCount, isRepliesLoading } =
    useStore(useThreadDetailsStore);
  let { setCurrentUser } = useStore(useUserStore);
  const { id: userId, image: userImage } = user;

  useEffect(() => {
    setCurrentUser(user);
    fetchReplies({ userId, threadId }, true);
  }, []);

  return (
    <>
      <PostThread
        className="border-y-[.01px] border-[#2A2C2E] pb-4 pt-2"
        userId={userId}
        parentThreadId={threadId}
        btnTitle="Reply"
        postBtnClass="!px-3"
        userImage={userImage}
        createThreadHandler={createThread}
      />
      <ThreadsListWrapper
        userId={userId}
        initialThreadsData={null}
        onDeleteThread={deleteThread}
        onFetchThreads={fetchReplies}
        threads={threads}
        isThreadsLoading={isRepliesLoading}
        totalCount={totalCount}
      ></ThreadsListWrapper>
    </>
  );
}
