import { getCurrentUserId } from "@/lib/get-current-user";
import { fetchUser } from "@/server-actions/user/user.actions";
import Feed from "./_components/Feed";

export default async function Home() {
  const currentUserId = getCurrentUserId();

  if (!currentUserId) return null;

  const userInfo = await fetchUser(currentUserId);

  if (!userInfo) return null;

  return <Feed user={userInfo} initialThreadsData={null} />;
}
