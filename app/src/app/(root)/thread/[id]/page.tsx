import ThreadCard from "@/components/forms/ThreadCard";
import { getCurrentUserId } from "@/lib/get-current-user";
import { fetchThread } from "@/server-actions/thread/thread.actions";
import { fetchUser } from "@/server-actions/user/user.actions";
import { redirect } from "next/navigation";
import ThreadDetails from "./_components/ThreadDetails";

export default async function page({ params }: { params: { id: string } }) {
  const threadId = params.id;
  if (!threadId) return;

  const userId = getCurrentUserId();
  if (!userId) return null;

  const [userInfo, thread] = await Promise.all([
    fetchUser(userId),
    fetchThread({
      threadId,
      userId,
    }),
  ]);

  if (!thread || !userInfo) {
    redirect("/");
  }

  return (
    <div>
      <ThreadCard thread={thread} userId={userInfo.id} path="/thread" />
      <ThreadDetails threadId={thread.id} user={userInfo} />
    </div>
  );
}
