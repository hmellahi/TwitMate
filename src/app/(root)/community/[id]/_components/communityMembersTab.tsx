import UserCard from "@/components/shared/UserCard";
import { User } from "@prisma/client";

export default function CommunityMembersTab({ members }) {
  return (
    <>
      {members.length < 1 ? (
        <div>this community have no members</div>
      ) : (
        <div className="flex gap-4 flex-col">
          {members.map((member: User, index: number) => {
            return (
              <UserCard
                key={index}
                user={member}
                className="border-b-2 border-light-gray pb-3"
              />
            );
          })}
        </div>
      )}
    </>
  );
}
