import { Thread } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Comment({ thread }: { thread: Thread }) {
  const { text, author } = thread;
  console.log(text);

  const actions = [
    { icon: "heart-gray", action: null },
    { icon: "share", action: null },
    { icon: "reply", link: <Link href={`/thread/${thread.id}`}></Link> },
    { icon: "repost", action: null },
  ];

  return (
    <div className=" text-white">
      <div className="px-7 rounded-md flex gap-5 flex-1">
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
          <h3 className="mb-3 text-xl">{author?.username}</h3>
          <p>{text}</p>
          <div className="flex gap-2 mt-4 text-white pb-8">
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
