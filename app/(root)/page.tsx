import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import { ThreadsList } from "../../components/shared/ThreadsList";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;
  const { threads } = await fetchThreads({
    userId: user.id,
    path: "/",
  });

  return (
    <ThreadsList
      user={user}
      threads={threads}
      path="/"
      className=""
    ></ThreadsList>
  );
}
