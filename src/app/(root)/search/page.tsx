import UserCard from "@/components/shared/UserCard";
import { SearchInput } from "@/components/ui/searchInput";
import { fetchUsers } from "@/server-actions/user/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import React from "react";

export default async function page({
  searchParams: { query },
}: {
  searchParams: { query: string };
}) {
  const searchKeyword: string = query || "";
  const user = await currentUser();
  if (!user) return null;
  const users = await fetchUsers({ userId: user.id, searchKeyword });

  return (
    <div className="flex flex-col gap-9">
      <h3 className="text-heading1-bold text-white">Search</h3>
      <SearchInput
        className="w-[23rem]"
        keyword={searchKeyword}
        route="search"
        placeholder="Type username or name"
      ></SearchInput>
      <div className="flex flex-col gap-6 mt-3">
        {users?.map((user: User) => (
          <UserCard user={user} className="line-break"/>
        ))}
      </div>
    </div>
  );
}
