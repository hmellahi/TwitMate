"use client";
import PostThread from "@/components/forms/PostThread";
import ThreadCard from "@/components/forms/ThreadCard";
import ThreadsListWrapper from "@/components/shared/Thread/ThreadsListWrapper";
import useUserStore from "@/store/user-store";
import { Thread } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStore } from "zustand";
import useThreadDetailsStore from "../_store/thread-details-store";

export default function ThreadDetails({
  user,
  thread,
}: {
  userId: string;
  thread: Thread;
  userImage: string;
}) {
  const { id: threadId } = thread;
  let { fetchReplies, deleteThread, threads, createThread, totalCount, isRepliesLoading } =
    useStore(useThreadDetailsStore);
  let { setCurrentUser } = useStore(useUserStore);
  const { id: userId, image: userImage } = user;
  const router = useRouter()

  const fetchHandler = (...args) => fetchReplies({ userId, threadId, ...args }, true);

  useEffect(() => {
    setCurrentUser(user);
    fetchHandler();
  }, []);


  const onDelete = (...args) => {
    deleteThread(...args);
    router.push("/");
  };

  return (
    <>
      <ThreadCard thread={thread} userId={user.id} path="/thread" onDelete={onDelete} />
      <PostThread
        className="border-y-[.01px] border-[#2A2C2E] pb-4 !pt-6 px-6"
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
        onFetchThreads={fetchHandler}
        threads={threads}
        isThreadsLoading={isRepliesLoading}
        totalCount={totalCount}
      ></ThreadsListWrapper>
    </>
  );
}
