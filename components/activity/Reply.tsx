import { Thread, User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Reply({
  reply,
  author,
  isSmall = false,
  className = "",
}: {
  reply: Thread;
  author?: User;
  isSmall?: boolean;
  className: string;
}) {
  if (!author) author = reply.author;
  return (
    <div
      className={`flex justify-between text-white items-center ${className}`}
    >
      <div className="flex gap-3 items-center">
        <div className="w-12 h-12 relative">
          <Image
            fill
            alt="avatar"
            src={author.image}
            className="cursor-pointer object-cover rounded-full"
          />
        </div>
        <div>
          <div className="flex items-center">
            <p className={isSmall ? "text-small-medium" : ""}>{author.name} </p>
            <div className="rounded-full w-1 h-1 bg-[#A0A0A0] ml-2"></div>
            <span className="text-gray-4 ml-2">2d</span>
          </div>
          <p className="text-gray-4 text-small-regular sm:text-base-regular">
            Replied to
            <Link
              href={`/thread/${reply.parentId}`}
              className="text-primary-500 text-bold"
            >
              {" "}
              thread
            </Link>
          </p>
        </div>
      </div>
      <Link href={`/thread/${reply.parentId}`}>
        <Button className={`px-8 ${isSmall && "text-small-medium"}`}>
          View
        </Button>
      </Link>
    </div>
  );
}
