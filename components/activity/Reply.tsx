import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Reply({
  user,
  isSmall = false,
}: {
  user: User;
  isSmall?: boolean;
}) {
  return (
    <div className="flex justify-between text-white items-center">
      <div className="flex gap-2 items-center">
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
          <div className="flex items-center">
            <p className={isSmall ? "text-small-medium" : ""}>{user.name} </p>
            <div className="rounded-full w-1 h-1 bg-[#A0A0A0] ml-2"></div>
            <span className="text-gray-4 ml-2">2d</span>
          </div>
          <p className="text-gray-4 text-base-regular">
            Replied to your thread
          </p>
        </div>
      </div>
      {/* {` */}
      <Link href={`/profile/${user.id}`}>
        <Button
          className={`border-gray-5 bg-transparent hover:bg-white hover:text-gray-5 border-[1px] rounded-md px-8 !py-3 ${
            isSmall && "text-small-medium"
          }`}
        >
          View
        </Button>
      </Link>
    </div>
  );
}
