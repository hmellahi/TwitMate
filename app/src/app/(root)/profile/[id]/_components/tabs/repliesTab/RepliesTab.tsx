"use client";
import { getUserReplies } from "@/server-actions/thread/thread.actions";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import Reply from "./Reply";

export default function RepliesTab({ user }: { user: User }) {
  let [userReplies, setUserReplies] = useState([]);

  useEffect(() => {
    (async () => {
      let userRepliesList = await getUserReplies({
        userId: user.id,
        path: `/profile/${user.id}`,
      });
      setUserReplies(userRepliesList);
    })();
  });
  if (!userReplies) return null;
  return (
    <div className="flex flex-col gap-y-6 px-0 sm:px-6 ">
      {userReplies.map((reply) => (
        <Reply reply={reply} author={user} className="border-b-2 border-light-gray pb-3" />
      ))}
    </div>
  );
}
