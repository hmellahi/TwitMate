import React from "react";
import Reply from "../tabs/repliesTab/Reply";
import { getUserReplies } from "@/lib/actions/thread.actions";
import { User } from "@prisma/client";

export default async function ReplyTab({ user }: { user: User }) {
  const userReplies = await getUserReplies({
    userId: user.id,
    path: `/profile/${user.id}`,
  });
  if (!userReplies) return null;
  return (
    <div className="flex flex-col gap-y-6 px-0 sm:px-6 ">
      {userReplies.map((reply) => (
        <Reply
          reply={reply}
          author={user}
          className="border-b-2 border-light-gray pb-3"
        />
      ))}
    </div>
  );
}
