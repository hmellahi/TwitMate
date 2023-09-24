"use client";
import PostThread from "@/components/forms/PostThread";
import ThreadsListWrapper from "@/components/shared/ThreadsListWrapper";
import useFeedStore from "@/app/(root)/(feed)/_store/feedsStore";
import { ThreadWithDetails } from "@/types/Thread";
import { User } from "@prisma/client";
import React, { useEffect } from "react";
import { useStore } from "zustand";
import useThreadDetailsStore from "../_store/threadDetailsStore";
import useUserStore from "@/store/userStore";

export default function ThreadDetails({
  user,
  threadId,
}: {
  userId: string;
  threadId: string;
  userImage: string;
}) {
  let {
    fetchReplies,
    deleteThread,
    threads,
    createThread,
    totalCount,
    isRepliesLoading,
  } = useStore(useThreadDetailsStore);
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
