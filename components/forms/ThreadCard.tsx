"use client";

import { likeThread, unLikeThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Heart, Reply, HeartFilled, Repost, Share } from "../svgs";
import { ThreadWithDetails } from "@/types/Thread";

export default function ThreadCard({
  thread,
  user,
  isComment = false,
}: {
  thread: ThreadWithDetails;
  user: any;
  isComment?: boolean;
}) {
  const { text, author } = thread;
  console.log({ li: thread.likes });
  const userLikeId = thread?.likes?.find((like) => like.userId === user.id)?.id;
  const isLikedByCurrentUser = userLikeId != undefined;

  const [isUserLikeThread, setIsUserLikeThread] =
    useState(isLikedByCurrentUser);

  async function reactToThread() {
    setIsUserLikeThread(!isUserLikeThread);
    // let reactToThreadDebounce =  setTimeout(async () => {
    //   clearTimeout(reactToThreadDebounce);
    //   if (isLikedByCurrentUser === !isUserLikeThread) {
    //     return;
    //   }
    if (userLikeId) {
      await unLikeThread({ likeId: userLikeId });
    } else {
      await likeThread({
        userId: user.id,
        threadId: thread.id,
      });
    }
    // }, 300); // 300ms
  }

  const LikeIcon = isUserLikeThread ? HeartFilled : Heart;
  const bg = isComment ? "bg-transparent" : "bg-dark-2";

  return (
    <Link href={`/thread/${thread.id}`} onClick={(e) => e.stopPropagation()}>
      <div className={`${bg} text-white rounded-lg pb-4`}>
        <div
          className={`{
              ${!isComment ? "p-7" : "px-7"} flex gap-5`}
        >
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-14 w-14">
              <Image
                src={author.image || ""}
                alt="avatar"
                fill
                className="cursor-pointer rounded-full"
              ></Image>
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div>
            <h3 className="mb-3 text-xl">
              <Link
                href={`/profile/${author.id}`}
                className="relative h-11 w-11"
              >
                {user?.username}
              </Link>
            </h3>
            <p>{text}</p>
            <div
              className={`flex gap-2 mt-4 text-white items-center ${
                isComment && "pb-2"
              }`}
            >
              <LikeIcon
                width="25"
                height="25"
                className="cursor-pointer"
                onClick={reactToThread}
              />
              <Reply width="25" height="25" />
              <Repost width="25" height="25" />
              <Share width="25" height="25" />
            </div>
            {(thread?.childrens?.length || thread?.likes?.length) && (
              <div className="mt-2 text-[#A0A0A0] flex items-center gap-x-2">
                {thread?.childrens?.length} replies
                <div className="rounded-full w-2 h-2 bg-[#A0A0A0]"></div>
                {thread?.likes?.length} likes
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
