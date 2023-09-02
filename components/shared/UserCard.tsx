import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function UserCard({ user }: { user: User }) {
  return (
    <div className="flex justify-between text-white items-center">
      <div className="flex gap-4 items-center">
        {user.image ? (
          <Image
            width="49"
            height="40"
            alt="avatar"
            src={user.image}
            className="cursor-pointer object-contadin rounded-full"
          />
        ) : (
          <></>
        )}
        <div>
          <p>{user.name}</p>
          <p className="text-gray-300 text-small-medium">@{user.username}</p>
        </div>
      </div>
      <Link href={`/profile/${user.id}`}>
        <Button className="bg-primary-500 rounded-md w-dfull">View</Button>
      </Link>
    </div>
  );
}
