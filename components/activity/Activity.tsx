import { Thread, User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatDateString } from "@/lib/utils";
import { timeAgo } from "@/lib/time-converter";

export default function Activity({
  activity,
  isSmall = false,
  className,
}: {
  activity: Thread;
  isSmall?: boolean;
  className: string;
}) {
  const author = activity.user;
  return (
    <div
      className={`flex justify-between text-white items-center ${className}`}
    >
      <div className="flex gap-5 items-center">
        {author.image ? (
          <Image
            width="49"
            height="40"
            alt="avatar"
            src={author.image}
            className="cursor-pointer object-contadin rounded-full"
          />
        ) : (
          <></>
        )}
        <div>
          <div className="flex items-center">
            <p className={isSmall ? "text-small-medium" : ""}>{author.name} </p>
            <div className="rounded-full w-1 h-1 bg-[#A0A0A0] ml-2"></div>
            <span className="text-gray-4 ml-2">
              {" "}
              {timeAgo(activity.createdAt)}
            </span>
          </div>
          <p className="text-gray-4 text-base-regular">
            {activity.type === "like" ? "liked" : "replied to"} your
            <Link
              href={`/thread/${activity.threadId}`}
              className="text-primary-500 text-bold"
            >
              {" "}
              thread
            </Link>
          </p>
        </div>
      </div>
      <Link href={`/thread/${activity.threadId}`}>
        <Button className={`px-8 ${isSmall && "text-small-medium"}`}>
          View
        </Button>
      </Link>
    </div>
  );
}
