import React from "react";
import UserCard from "../UserCard";
import { currentUser } from "@clerk/nextjs";
import { fetchUsers } from "@/src/lib/actions/user.actions";
import { Community, User } from "@prisma/client";
import CommunityCard from "./CommunityCard";
import { fetchCommunities } from "@/src/lib/actions/community.actions";

export default async function SuggestedCommunities() {
  const user = await currentUser();
  if (!user) return null;
  const communities = await fetchCommunities({
    userId: user.id,
    searchKeyword: "",
    limit: 5,
  });

  return (
    <div>
      <h3 className="text-heading3-medium text-light-1">
        Suggested Communities
      </h3>
      <div className="flex flex-col gap-6 mt-5 ">
        {communities?.map((community: Community) => (
          <CommunityCard community={community} isSmall={true} />
        ))}
      </div>
    </div>
  );
}
