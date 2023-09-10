import ThreadCard from "@/components/forms/ThreadCard";
import { User } from "@clerk/nextjs/server";
import { Thread } from "@prisma/client";

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
  return (
    <div className={`text-white flex flex-col ${className}`}>
      {threads.length < 1 ? (
        <div>no result</div>
      ) : (
        threads.map((thread: Thread, index: number) => {
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
  );
}
