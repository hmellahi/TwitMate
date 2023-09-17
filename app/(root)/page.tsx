import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser, useOrganizationList } from "@clerk/nextjs";
import { ThreadsList } from "../../components/shared/ThreadsList";
import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo) return null;
  const { threads } = await fetchThreads({
    userId: user.id,
    path: "/",
  });

  return (
    <>
      <div className="mb-4">
        <PostThread
          userId={userInfo?.id}
          userImage={userInfo.image}
        />
      </div>
      <ThreadsList user={user} threads={threads} path="/"></ThreadsList>
    </>
  );
}
