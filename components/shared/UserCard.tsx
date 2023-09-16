import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

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
    <div
      className={`flex justify-between text-white items-center ${className}`}
    >
      <div className="flex gap-4 items-center">
        <Link href={`/profile/${user.id} `} className="h-12 w-12 relative">
          <Image
            fill
            alt="avatar"
            src={user.image}
            className="cursor-pointer object-contadin rounded-full"
          />
        </Link>
        <div>
          <p className={isSmall ? "text-small-medium" : ""}>{user.name}</p>
          <p className="text-gray-300 text-small-medium">@{user.username}</p>
        </div>
      </div>
      <Link href={`/profile/${user.id}`}>
        <Button className={`${isSmall && "text-subtle-medium"}`}>View</Button>
      </Link>
    </div>
  );
}
