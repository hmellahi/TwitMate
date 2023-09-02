"use client";

import { likeThread } from "@/lib/actions/thread.actions";
import { Thread, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Heart } from "../svgs";

export default function ThreadCard({
  thread,
  user,
  isComment = false,
}: {
  thread: Thread;
  user: any;
  isComment?: boolean;
}) {
  const { text, author } = thread;

  const [isUserLikeThread, setIsUserLikeThread] = useState(
    thread.likes ? true : false
  );

  function reactToThread() {
    let reactToThreadDebounce = setTimeout(() => {
      clearTimeout(reactToThreadDebounce);
      setIsUserLikeThread(!isUserLikeThread);
    });
  }

  const likeIcon = isUserLikeThread ? "heart-filled" : "heart-gray";
  const bg = isComment ? "bg-transparent" : "bg-dark-2";
  // const actions = [
  //   { icon: "heart-gray", action: reactToThread },
  //   { icon: "share", action: null },
  //   { icon: "reply", link: <Link href={`/thread/${thread.id}`}></Link> },
  //   { icon: "repost", action: null },
  // ];

  return (
    <div className={`${bg} text-white rounded-lg`}>
      <div
        className={`{
              ${!isComment ? "p-7" : "px-7"} flex gap-5`}
      >
        <div className="flex flex-col items-center">
          <Link href={`/profile/${author.id}`} className="relative h-14 w-14">
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
          <div
            className={`flex gap-2 mt-4 text-white items-center ${
              isComment && "pb-8"
            }`}
          >
            <Heart />
            <Image
              width="25"
              height="25"
              alt="avatar"
              src={"/assets/" + likeIcon + ".svg"}
              className="cursor-pointer object-contain"
            />
            <Link href={`/thread/${thread.id}`} className="relative h-11 w-11">
              <Image
                width="25"
                height="25"
                alt="avatar"
                src={"/assets/reply.svg"}
                className="cursor-pointer object-contain "
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
