import PostThread from "@/components/forms/PostThread";
import ThreadCard from "@/components/forms/ThreadCard";
import { ThreadsList } from "@/components/shared/ThreadsList";
import ThreadsListWrapper from "@/components/shared/ThreadsListWrapper";
import { fetchThread } from "@/server-actions/thread/thread.actions";
import { fetchUser } from "@/server-actions/user/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import ThreadDetails from "./_components/threadDetails";

export default async function page({ params }: { params: { id: string } }) {
  const threadId = params.id;
  if (!threadId) return;
  const user = await currentUser();
  if (!user) return null;

  const [userInfo, thread] = await Promise.all([
    fetchUser(user.id),
    fetchThread({
      threadId,
      userId: user.id,
    }),
  ]);

  if (!thread || !userInfo) {
    redirect("/");
  }

  return (
    <div>
      <ThreadCard thread={thread} user={userInfo} path="/thread" />
      <ThreadDetails threadId={thread.id} user={userInfo} />
    </div>
  );
}
