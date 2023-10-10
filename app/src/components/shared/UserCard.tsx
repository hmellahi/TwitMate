import { User } from "@prisma/client";
import Link from "next/link";
import { Button } from "../ui/Button";
import { ProfileImg } from "./ProfileImg";

export default function UserCard({
  user,
  isSmall = false,
  className = "",
}: {
  user: User;
  isSmall?: boolean;
  className: string;
}) {
  return (
    <div className={`flex justify-between text-white items-center ${className} pb-3`}>
      <div className="flex gap-2 items-center">
        <ProfileImg user={user} className="!h-12 !w-12" />
        <div>
          <p className={isSmall ? "text-small-medium" : ""}>{user.name}</p>
          <p className="text-gray-300 text-subtle-medium">@{user.username}</p>
        </div>
      </div>
      <Link href={`/profile/${user.id}`}>
        <Button className={`${isSmall && "text-subtle-medium"}`}>View</Button>
      </Link>
    </div>
  );
}
