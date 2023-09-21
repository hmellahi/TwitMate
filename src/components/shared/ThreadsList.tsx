"use client";
import ThreadCard from "@/src/components/forms/ThreadCard";
import { Thread, User } from "@prisma/client";

export function ThreadsList({
  threads,
  user,
  path,
  className = "",
  isComment = false,
  onDelete,
}: {
  threads: Thread[];
  user: User;
  path: string;
  className?: string;
  isComment?: boolean;
  onDelete?: (threadId: string) => void;
}) {
  if (!threads.length) {
    return null;
  }
  return (
    <div className={`text-white flex flex-col ${className}`}>
      {threads.length < 1 ? (
        <div></div>
      ) : (
        threads
          .filter((thread) => !thread.isDeleted)
          .map((thread: Thread, index: number) => {
            return (
              <ThreadCard
                key={index}
                thread={thread}
                userId={user.id}
                path={path}
                isComment={isComment}
                className="line-break"
                onDelete={onDelete}
              />
            );
          })
      )}
    </div>
  );
}
