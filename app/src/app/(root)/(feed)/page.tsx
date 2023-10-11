import { fetchUser } from "@/server-actions/user/user.actions";
import { currentUser } from "@clerk/nextjs";
import Feed from "./_components/Feed";

export default async function Home() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo) return null;

  return <Feed user={userInfo} initialThreadsData={null} />;
}
