import UserCard from "@/components/shared/UserCard";
import { SearchInput } from "@/components/ui/searchInput";
import { fetchUsers } from "@/lib/actions/user.actions";
import { User, currentUser } from "@clerk/nextjs/server";
import React, { useState } from "react";

export default async function page({ searchParams: { query } }) {
  console.log({ query });
  const searchKeyword: string = query || "";
  const user: User | null = await currentUser();
  if (!user) return null;
  const users = await fetchUsers({ userId: user.id, searchKeyword });
  console.log({ users, searchKeyword });

  return (
    <div className="flex flex-col gap-9">
      <h3 className="text-heading1-bold text-white">Search</h3>
      <SearchInput keyword={searchKeyword}></SearchInput>
      <div className="flex flex-col gap-6 mt-5 ">
        {users?.map((user) => (
          <>
            <UserCard user={user} />
            <UserCard user={user} />
          </>
        ))}
      </div>
    </div>
  );
}
