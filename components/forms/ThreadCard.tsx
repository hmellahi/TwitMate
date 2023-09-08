"use client";

import { likeThread, unLikeThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Heart, Reply, HeartFilled, Repost, Share } from "../svgs";
import { ThreadWithDetails } from "@/types/Thread";
import Lottie from "lottie-react";
import heartReact from "@/components/animations/heart-react.json";
import { formatDateString } from "@/lib/utils";
import { timeAgo } from "@/lib/time-converter";
import { UsersList } from "../community/UsersList";
import { Thread } from "@prisma/client";

export default function ThreadCard({
  thread,
  user,
  isComment = false,
  path,
}: {
  thread: ThreadWithDetails;
  user: any;
  isComment?: boolean;
  path: string;
}) {
  const { text, author } = thread;
  const userLikeId = thread?.likes?.find((like) => like.userId === user.id)?.id;
  const isLikedByCurrentUser = userLikeId != undefined;
  const threadRepliers: ThreadWithDetails[] = [];
  const uniqueAuthors: { [id: string]: string } = {};

  thread.childrens.forEach((subThread: ThreadWithDetails) => {
    if (subThread?.author?.id) {
      const authorId = subThread.authorId;
      if (!uniqueAuthors[authorId]) {
        uniqueAuthors[authorId] = subThread.authorId;
        threadRepliers.push(subThread.author);
      }
    }
  });

  console.log({ threadRepliers });

  const [isUserLikedThread, setisUserLikedThread] =
    useState(isLikedByCurrentUser);

  async function reactToThread(e) {
    e.preventDefault();
    e.stopPropagation();

    setisUserLikedThread(!isUserLikedThread);
    let reactToThreadDebounce = setTimeout(async () => {
      clearTimeout(reactToThreadDebounce);
      console.log({ isUserLikedThread });
      if (isUserLikedThread) {
        await unLikeThread({ likeId: userLikeId, path });
      } else {
        await likeThread({
          userId: user.id,
          threadId: thread.id,
          path,
        });
      }
    }, 600); // 300ms
  }

  const LikeIcon = isUserLikedThread ? HeartFilled : Heart;
  const bg = isComment ? "bg-transparent" : "bg-dark-2";

  return (
    <Link href={`/thread/${thread.id}`} onClick={(e) => e.stopPropagation()}>
      <div className={`${bg} text-white rounded-lg pb-4`}>
        <div className="flex justify-between">
          <div
            className={`{
              ${!isComment ? "pt-6 py-0" : ""} px-7 flex gap-3 relative`}
          >
            <div className="flex flex-col items-center">
              <Link
                href={`/profile/${author.id}`}
                className="relative h-14 w-14"
              >
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
              <h3 className="mb-1 text-xl">
                <Link
                  href={`/profile/${author.id}`}
                  className="relative h-11 w-11 text-body-bold"
                >
                  {author?.username}
                </Link>
              </h3>
              <p>{text}</p>
              <div
                className={`flex gap-2 mt-4 text-white items-center ${
                  isComment && "pb-2"
                }`}
              >
                <div className="hover:bg-[rgba(241,77,77,.5)] rounded-full p-1  relative">
                  <LikeIcon
                    width="25"
                    height="25"
                    className="cursor-pointer 
                    dhover:text-[rgba(241,77,77,.5)]"
                    onClick={reactToThread}
                  />
                </div>
                <div className="hover:bg-[rgba(241,77,77,.5)] p-1 rounded-full">
                  <Reply width="25" height="25" />
                </div>
                <div className="hover:bg-[rgba(241,77,77,.5)] p-1 rounded-full">
                  <Repost width="25" height="25" />
                </div>
                <div className="hover:bg-[rgba(241,77,77,.5)] p-1 rounded-full">
                  <Share width="25" height="25" />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`
         text-gray-2 mr-4 ${!isComment ? "mt-4" : "-mt-2"}`}
          >
            {timeAgo(thread.createdAt)}
          </div>
        </div>
        <div className="flex items-center mt-1">
          <UsersList
            className="z-20 w-[7.5rem] justify-center"
            users={threadRepliers}
          ></UsersList>
          <div className="text-[#A0A0A0] flex items-center gap-x-2 -ml-4">
            {thread?.childrens?.length} replies
            <div className="rounded-full w-1 h-1 bg-[#A0A0A0]"></div>
            {thread?.likes?.length} likes
          </div>
        </div>
      </div>
    </Link>
  );
}
