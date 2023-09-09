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
import { classNames } from "uploadthing/client";

export default function ThreadCard({
  thread,
  user,
  isComment = false,
  path,
  className = "",
}: {
  thread: ThreadWithDetails;
  user: any;
  isComment?: boolean;
  path: string;
  className: string;
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

  const hasReplies = thread?.childrens?.length > 0;
  const hasLikes = thread?.likes?.length > 0;

  const LikeIcon = isUserLikedThread ? HeartFilled : Heart;
  const bg = isComment ? "bg-transparent" : "bg-dark-2d";

  return (
    <Link
      href={`/thread/${thread.id}`}
      onClick={(e) => e.stopPropagation()}
      className={className}
    >
      <div className={`${bg} text-white rounded-lg pb-4`}>
        <div className="flex justify-between">
          <div
            className={`{
              ${!isComment ? "pt-6 py-0" : ""} px-7 flex gap-3 relative`}
          >
            <div className="flex flex-col items-center">
              <Link
                href={`/profile/${author.id}`}
                className="relative h-10 w-10"
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
                  className="relative h-11 w-11"
                >
                  {author?.username}
                </Link>
              </h3>
              <p className="whitespace-pre-line	">{text}</p>
              <div
                className={`flex gap-2 mt-2 text-white items-center ${
                  isComment && "pb-2"
                }`}
              >
                <div className="hover:bg-light-gray rounded-full p-1  relative">
                  <LikeIcon
                    width="25"
                    height="25"
                    className="cursor-pointer 
                    dhover:text-[rgba(241,77,77,.5)]"
                    onClick={reactToThread}
                  />
                </div>
                <div className="hover:bg-light-gray p-1 rounded-full">
                  <Reply width="25" height="25" />
                </div>
                <div className="hover:bg-light-gray p-1 rounded-full">
                  <Repost width="25" height="25" />
                </div>
                <div className="hover:bg-light-gray p-1 rounded-full">
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
        {(hasReplies || hasLikes) && (
          <div className="flex items-center">
            {/* <div className="relative"> */}
            {/* <div className="thread-card_bar absolute h-full pl-[3.25rem] w-0.5" /> */}
            <UsersList
              className="z-20 w-[7rem] justify-center"
              users={threadRepliers}
              width={15}
              height={15}
            ></UsersList>
            {/* </div> */}
            <div className="text-[#A0A0A0] flex items-center gap-x-2 -ml-6">
              {hasReplies && (
                <>
                  <p>{thread?.childrens?.length} replies</p>
                  <div className="rounded-full w-1 h-1 bg-[#A0A0A0]"></div>
                </>
              )}
              {thread?.likes?.length} likes
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
