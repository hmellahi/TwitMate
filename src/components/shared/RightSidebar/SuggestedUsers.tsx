import React from "react";
import UserCard from "../UserCard";
import { currentUser } from "@clerk/nextjs";
import { fetchUsers } from "@/server-actions/user/user.actions";
import { User } from "@prisma/client";

export default async function SuggestedUsers() {
  const user = await currentUser();
  if (!user) return null;
  const users = await fetchUsers({
    userId: user.id,
    searchKeyword: "",
    limit: 4,
  });
  return (
    <div>
      <h3 className="text-heading3-medium text-light-1">Similair Minds</h3>
      <div className="flex flex-col gap-6 mt-5 ">
        {users?.map((user: User) => (
          <UserCard user={user} isSmall={true} />
        ))}
      </div>
    </div>
  );
}
