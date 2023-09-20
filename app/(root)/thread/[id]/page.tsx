import PostThread from "@/components/forms/PostThread";
import ThreadCard from "@/components/forms/ThreadCard";
import { ThreadsList } from "@/components/shared/ThreadsList";
import { fetchThread } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { ThreadWithDetails } from "@/types/Thread";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
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
    redirect("/");
  }

  return (
    <div>
      <ThreadCard thread={thread} user={userInfo} path="/thread" />
      <PostThread
        className="border-y-[.01px] border-[#2A2C2E] pb-4 pt-2"
        userId={userInfo.id}
        parentThreadId={thread.id}
        btnTitle="Reply"
        postBtnClass="!px-3"
        userImage={userInfo.image}
      />
      <div className="mt-4">
        <ThreadsList
          user={userInfo}
          threads={thread.childrens}
          path="/thread"
          isComment={true}
        ></ThreadsList>
      </div>
    </div>
  );
}
