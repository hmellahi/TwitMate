"use client";
import { Thread } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ThreadCard({ thread }: { thread: Thread }) {
  const { text, author } = thread;
  console.log(text);
  const actions = [
    { icon: "heart-gray", action: null },
    { icon: "share", action: null },
    { icon: "reply", action: null },
    { icon: "repost", action: null },
  ];
  return (
    <div className="bg-dark-2 ">
      <div className="p-7 rounded-md flex gap-5 items-start flex-1">
        <div className="flex flex-col items-center">
          <Link href={`/protfile/${author.id}`} className="relative h-11 w-11">
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
          <h3 className="mb-3 text-xl">Hamid</h3>
          <p>{text}</p>
          <div className="flex gap-2 mt-4 text-white">
            {actions.map((action, index) => (
              <Image
                width="25"
                height="25"
                alt="avatar"
                src={"assets/" + action.icon + ".svg"}
                className="cursor-pointer object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
