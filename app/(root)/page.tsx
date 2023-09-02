import ThreadCard from "@/components/forms/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import { Thread } from "@prisma/client";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;
  const { threads } = await fetchThreads({
    userId: user.id,
  });

  return (
    <div className="text-white flex gap-4 flex-col">
      {threads.length < 1 ? (
        <div>no result</div>
      ) : (
        threads.map((thread: Thread, index: number) => {
          return <ThreadCard key={index} thread={thread} user={user} />;
        })
      )}
    </div>
  );
}
