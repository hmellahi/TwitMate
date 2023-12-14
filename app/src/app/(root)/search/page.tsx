import UserCard from "@/components/shared/UserCard";
import { SearchInput } from "@/components/ui/SearchInput";
import { getCurrentUser } from "@/lib/get-current-user";
import { fetchUsers } from "@/server-actions/user/user.actions";
import { User } from "@prisma/client";

export default async function page({
  searchParams: { query },
}: {
  searchParams: { query: string };
}) {
  const searchKeyword: string = query || "";
  const user = await getCurrentUser();
  if (!user) return null;
  const users = await fetchUsers({ userId: user.id, searchKeyword });

  return (
    <div className="flex flex-col gap-9">
      <h3 className="text-heading1-semibold text-white">Search</h3>
      <SearchInput
        className="w-[23rem]"
        keyword={searchKeyword}
        route="search"
        placeholder="Type username or name"
      ></SearchInput>
      <div className="flex flex-col gap-2 mt-3">
        {users?.map((user: User, index: number) => (
          <UserCard user={user} className="line-break" key={index} />
        ))}
      </div>
    </div>
  );
}
