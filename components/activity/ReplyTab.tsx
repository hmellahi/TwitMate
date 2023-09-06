import React from "react";
import Reply from "./Reply";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";

export default async function ReplyTab() {
  const userFromClerk = await currentUser();
  if (!userFromClerk) return null;
  const user = await fetchUser(userFromClerk.id);
  if (!user) return null;
  return (
    <div className="flex flex-col gap-y-6 px-6  ">
      {[1, 3, 3].map((reply) => (
        <Reply user={user} />
      ))}
    </div>
  );
}
