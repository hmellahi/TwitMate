import { camelToSnakeCase } from "@/lib/utils";
import { Community } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { UsersList } from "./UsersList";
import { Button } from "../ui/button";

export default function CommunityCard({
  community,
  className,
}: {
  community: Community;
  className: string;
}) {
  return (
    <div
      className={`border-[1px] border-white text-white bg-dark-3 pt-7 pb-3 px-4 rounded-md ${className}`}
    >
      <div className="flex gap-4 items-center ">
        <Link href={`/community/${community.id}`}>
          <Image
            width="49"
            height="40"
            alt="avatar"
            src={community.image || ""}
            className="cursor-pointer object-contadin rounded-full"
          />
        </Link>
        <div>
          <p>{community.name}</p>
          <p className="text-gray-300 text-small-medium">
            @{camelToSnakeCase(community.name)}
          </p>
          <p>{community.bio}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10">
        <Link href={`/community/${community.id}`}>
          <Button className={" px-5 !py-1"}>View</Button>
        </Link>
        <UsersList users={community.members}></UsersList>
      </div>
    </div>
  );
}
