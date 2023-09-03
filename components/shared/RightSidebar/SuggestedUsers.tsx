import React from "react";
import UserCard from "../UserCard";
import { currentUser } from "@clerk/nextjs";
import { fetchUsers } from "@/lib/actions/user.actions";
import { User } from "@prisma/client";

export default async function SuggestedUsers() {
  const user = await currentUser();
  if (!user) return null;
  const users = await fetchUsers({ userId: user.id, searchKeyword: "" });
  return (
    <div>
      <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
      <div className="flex flex-col gap-6 mt-5 ">
        {users?.map((user: User) => (
          <>
            <UserCard user={user} />
          </>
        ))}
      </div>
    </div>
  );
}
