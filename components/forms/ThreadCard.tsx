"use client";
import { Thread, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ThreadCard({
  thread,
  user,
}: {
  thread: Thread;
  user: any;
}) {
  const { text, author } = thread;
  console.log({ author });

  const actions = [
    { icon: "heart-gray", action: null },
    { icon: "share", action: null },
    { icon: "reply", link: <Link href={`/thread/${thread.id}`}></Link> },
    { icon: "repost", action: null },
  ];

  return (
    <div className="bg-dark-2 text-white rounded-lg">
      <div className="p-7 flex gap-5">
        <div className="flex flex-col items-center">
          <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
            <Image
              src={author.image}
              alt="avatar"
              fill
              className="cursor-pointer rounded-full"
            ></Image>
          </Link>
          <div className="thread-card_bar" />
        </div>
        <div>
          <h3 className="mb-3 text-xl">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              {user?.username}
            </Link>
          </h3>
          <p>{text}</p>
          <div className="flex gap-2 mt-4 text-white">
            {actions.map((action, index) => (
              <Image
                width="25"
                height="25"
                alt="avatar"
                src={"/assets/" + action.icon + ".svg"}
                className="cursor-pointer object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
