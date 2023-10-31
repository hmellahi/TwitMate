import { fetchUsers } from "@/server-actions/user/user.actions";
import { User } from "@prisma/client";
import UserCard from "../UserCard";

export default async function SuggestedUsers({ currentUserId }: { currentUserId: string }) {
  const users = await fetchUsers({
    userId: currentUserId,
    searchKeyword: "",
    limit: 5,
  });

  return (
    <div>
      <h3 className="text-heading4-medium text-light-1">Similair Minds</h3>
      <div className="flex flex-col gap-1 mt-5 ">
        {users?.map((user: User, index: number) => (
          <UserCard user={user} isSmall={true} key={index} />
        ))}
      </div>
    </div>
  );
}
