import PostThread from "@/src/components/forms/PostThread";
import ThreadsListWrapper from "@/src/components/shared/ThreadsListWrapper";
import useFeedStore from "@/src/state/feedsStore";
import { ThreadWithDetails } from "@/src/types/Thread";
import { User } from "@prisma/client";
import React from "react";
import { useStore } from "zustand";

export default function ThreadDetails({
  user,
  thread,
}: {
  user: User;
  thread: ThreadWithDetails;
}) {
  let { fetchThreads, deleteThread, setThreads, threads, createThread } =
    useStore(useFeedStore);

  return (
    <>
      <PostThread
        className="border-y-[.01px] border-[#2A2C2E] pb-4 pt-2"
        userId={user.id}
        parentThreadId={thread.id}
        btnTitle="Reply"
        postBtnClass="!px-3"
        userImage={user.image}
      />
      <ThreadsListWrapper
        user={user}
        initialThreadsData={initialThreadsData}
        onDeleteThread={deleteThread}
        onFetchThreads={fetchThreads}
        threads={threads}
      ></ThreadsListWrapper>
    </>
  );
}
