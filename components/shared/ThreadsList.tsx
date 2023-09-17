"use client";
import ThreadCard from "@/components/forms/ThreadCard";
import { ThreadsContext } from "@/providers/ThreadsProvider";
import { User } from "@clerk/nextjs/server";
import { Thread } from "@prisma/client";
import { useCallback, useState } from "react";
import * as threadActions from "@/lib/actions/thread.actions";

export function ThreadsList({
  threads,
  user,
  path,
  className = "",
  isComment = false,
}: {
  threads: Thread[];
  user: User;
  path: string;
  className?: string;
  isComment?: boolean;
}) {
  // const [threads, setThreads] = useState(threads);
  const deleteThread = useCallback(
    ({
      authorId,
      threadId,
      path,
    }: {
      authorId: string;
      threadId: string;
      path: string;
    }) => {
      const thread = threads.find((thread) => thread.id === threadId);
      if (!thread) {
        return;
      }
      console.log({ thread });
      thread.isDeleted = true;
      threadActions.deleteThread({ path, authorId, threadId });
    },
    []
  );

  const contextValue = {
    threads,
    deleteThread,
  };

  return (
    <ThreadsContext.Provider value={contextValue}>
      <div className={`text-white flex flex-col ${className}`}>
        {threads.length < 1 ? (
          <div>no result</div>
        ) : (
          threads
            .filter((thread) => !thread.isDeleted)
            .map((thread: Thread, index: number) => {
              return (
                <ThreadCard
                  key={index}
                  thread={thread}
                  user={user}
                  path={path}
                  isComment={isComment}
                  className="border-b-[.01px] border-[#2A2C2E]"
                />
              );
            })
        )}
      </div>
    </ThreadsContext.Provider>
  );
}
