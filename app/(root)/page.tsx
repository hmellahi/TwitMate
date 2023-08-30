import ThreadCard from "@/components/forms/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { UserButton, currentUser } from "@clerk/nextjs";
import { Thread } from "@prisma/client";

export default async function Home() {
  const user: User | null = await currentUser();
  if (!user) return null;
  const { threads } = await fetchThreads(user?.id);
  console.log({ threads });

  return (
    <div className="text-white flex gap-4 flex-col">
      {/* Conditional rendering based on threads */}
      {threads.length < 1 ? (
        <div>no result</div>
      ) : (
        threads.map((thread, index) => (
          <ThreadCard key={index} thread={thread} />
        ))
      )}
    </div>
  );
}
