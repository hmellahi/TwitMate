import { SearchInput } from "@/components/ui/SearchInput";
import { getCurrentUserId } from "@/lib/get-current-user";
import { fetchCommunities } from "@/server-actions/community/community.actions";
import { Community } from "@prisma/client";
import CommunityCard from "./_components/CommunityCard";

export default async function page({
  searchParams: { query },
}: {
  searchParams: { query: string };
}) {
  const searchKeyword: string = query || "";

  const userId = getCurrentUserId();
  if (!userId) return null;

  const communities = await fetchCommunities({
    userId: userId,
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
        {communities?.map((community: Community, index: number) => (
          <CommunityCard
            key={index}
            community={community}
            className="basis-[90%] sm:basis-[46%] box-border"
          />
        ))}
      </div>
    </div>
  );
}
