import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/forms/ThreadCard";
import UserReplyInput from "@/components/forms/UserReplyInput";
import { fetchThread } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { Thread } from "@prisma/client";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const threadId = params.id;
  if (!threadId) return;
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  const thread: Thread | null = await fetchThread({
    authorId: user.id,
    threadId,
  });

  if (!thread) {
    return null;
  }
  console.log(thread);

  return (
    <div>
      <ThreadCard thread={thread} user={userInfo} />
      <UserReplyInput
        className="mt-14"
        user={userInfo}
        parentThreadId={thread.id}
      />
      <div className="mt-8">
        {thread.childrens?.map((comment: Thread) => (
          <ThreadCard thread={comment} user={userInfo} isComment={true} />
        ))}
      </div>
    </div>
  );
}
