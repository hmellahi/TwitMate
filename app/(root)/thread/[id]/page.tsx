import ThreadCard from "@/components/forms/ThreadCard";
import UserReplyInput from "@/components/forms/UserReplyInput";
import { ThreadsList } from "@/components/shared/ThreadsList";
import { fetchThread } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { ThreadWithDetails } from "@/types/Thread";
import { currentUser } from "@clerk/nextjs";
import { Thread } from "@prisma/client";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const threadId = params.id;
  if (!threadId) return;
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo) return null;

  const thread: ThreadWithDetails | null = await fetchThread({
    threadId,
  });

  if (!thread) {
    return null;
  }

  return (
    <div>
      <ThreadCard thread={thread} user={userInfo} path="/thread" />
      <UserReplyInput user={userInfo} parentThreadId={thread.id} />
      <div className="mt-4">
        <ThreadsList
          user={userInfo}
          threads={thread.childrens}
          path="/thread"
          isComment={true}
          className=""
        ></ThreadsList>
      </div>
    </div>
  );
}
