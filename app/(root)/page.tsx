import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import { ThreadsList } from "../../components/shared/ThreadsList";
import PostThread from "@/components/forms/PostThread";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;
  const { threads } = await fetchThreads({
    userId: user.id,
    path: "/",
  });

  return (
    <>
      <div>
        <h1 className="head-text">Create Thread</h1>
        <PostThread userId={user?.id} />
      </div>
      <ThreadsList
        user={user}
        threads={threads}
        path="/"
        className=""
      ></ThreadsList>
    </>
  );
}
