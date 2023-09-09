import ThreadCard from "@/components/forms/ThreadCard";
import { User } from "@clerk/nextjs/server";
import { Thread } from "@prisma/client";

export function ThreadsList({
  threads,
  user,
  path,
  className = "",
}: {
  threads: Thread[];
  user: User;
  path: string;
  className?: string;
}) {
  return (
    <div className={`text-white flex gap-0 flex-col ${className}`}>
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
              className="border-b-[.01px] border-[#2A2C2E]"
            />
          );
        })
      )}
    </div>
  );
}
