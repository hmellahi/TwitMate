import { User } from "@prisma/client";
import { ProfileImg } from "../ProfileImg";

export function UsersList({ users, className = "" }: { users: User[]; className?: string }) {
  if (!users) {
    return null;
  }

  return (
    <div className={`inline-flex row-reverse ${className}`} role="links">
      {users?.map((user, index) => (
        <ProfileImg key={index} user={user} index={index} className="-ml-[.6rem]"></ProfileImg>
      ))}
    </div>
  );
}
