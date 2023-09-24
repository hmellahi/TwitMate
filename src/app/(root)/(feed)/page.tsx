import { currentUser, useOrganizationList, useUser } from "@clerk/nextjs";
import { fetchUser } from "@/server-actions/user/user.actions";
import * as threadActions from "@/server-actions/thread/thread.actions";
import Feed from "./_components/feed";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;

  const [userInfo, initialThreadsData] = await Promise.all([
    fetchUser(user.id),
    threadActions.fetchThreads({
      userId: user.id,
      path: "/",
    })
  ]);

  if (!userInfo) return null;

  return <Feed user={userInfo} initialThreadsData={initialThreadsData} />;
}
