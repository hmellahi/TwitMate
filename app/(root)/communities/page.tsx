import React from "react";
import { currentUser } from "@clerk/nextjs";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { Community } from "@prisma/client";
import CommunityCard from "@/components/community/CommunityCard";
import { SearchInput } from "@/components/ui/searchInput";

export default async function page({
  searchParams: { query },
}: {
  searchParams: { query: string };
}) {
  const searchKeyword: string = query || "";
  const user = await currentUser();
  if (!user) return null;

  const communities = await fetchCommunities({
    userId: user.id,
    searchKeyword,
  });

  return (
    <div>
      <h3 className="text-heading1-bold text-white mb-5">Communities</h3>
      <SearchInput
        className="mb-4 w-[23rem]"
        keyword={searchKeyword}
        route="communities"
        placeholder="Community Name"
      ></SearchInput>
      <div className="flex gap-6 mt-10 flex-wrap items-center">
        {communities?.map((community: Community) => (
          <CommunityCard community={community} className="basis-[90%] sm:basis-[46%] box-border"/>
        ))}
        {/* {communities?.map((community: Community) => ( */}
        {/* <CommunityCard community={community} /> */}
        {/* ))} */}
      </div>
    </div>
  );
}
