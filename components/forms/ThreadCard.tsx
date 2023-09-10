"use client";

import { likeThread, unLikeThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Heart, Reply, HeartFilled, Repost, Share } from "../svgs";
import { ThreadWithDetails } from "@/types/Thread";
import { timeAgo } from "@/lib/time-converter";
import { UsersList } from "../community/UsersList";
import ThreadActions from "../shared/Thread/ThreadActions";
import { MediaViewer } from "../ui/MediaViewer";

export default function ThreadCard({
  thread,
  user,
  isComment = false,
  path,
  className = "",
  ...props
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

  const [isUserLikedThread, setisUserLikedThread] =
    useState(isLikedByCurrentUser);

  async function reactToThread(e) {
    e.preventDefault();
    e.stopPropagation();

    setisUserLikedThread(!isUserLikedThread);
    let reactToThreadDebounce = setTimeout(async () => {
      clearTimeout(reactToThreadDebounce);
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
  const threadImages = thread?.images?.map((image) => image.imageUrl);

  return (
    <div className={`${bg} ${className} text-white rounded-lg py-7`}>
      <div className="flex justify-between items-start">
        <div className={`px-7 flex gap-3 relative w-full bg-dred-300`}>
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-10 w-10">
              <Image
                src={author.image || ""}
                alt="avatar"
                fill
                className="cursor-pointer rounded-full"
              ></Image>
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="w-full">
            <div className="flex justify-between w-full">
              <h3 className="text-xl">
                <Link
                  href={`/profile/${author.id}`}
                  className="relative h-11 w-11"
                >
                  {author?.username}
                </Link>
                <p className="whitespace-pre-line	text-small-regular font-light mt-1">
                  {text}
                </p>
              </h3>
              <div className={`text-gray-2 mr-4 mt-3 flex gap-2 items-center `}>
                {timeAgo(thread.createdAt)}{" "}
                {author.id === user.id && (
                  <ThreadActions
                    threadId={thread.id}
                    authorId={author.id}
                    path={path}
                  />
                )}
              </div>
            </div>
            {threadImages?.length > 0 && (
              <MediaViewer
                className="mt-4"
                imageURLs={threadImages}
              ></MediaViewer>
            )}
            <div className={`flex gap-2 mt-2 text-white items-center`}>
              <div className="icon-hover relative">
                <LikeIcon
                  width="25"
                  height="25"
                  className="cursor-pointer"
                  onClick={reactToThread}
                />
              </div>
              <div className="icon-hover">
                <Link
                  href={`/thread/${thread.id}`}
                  className={className}
                  {...props}
                >
                  <Reply width="25" height="25" />
                </Link>
              </div>
              <div className="icon-hover">
                <Repost width="25" height="25" />
              </div>
              <div className="icon-hover">
                <Share width="25" height="25" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {(hasReplies || hasLikes) && (
        <div className="flex items-center">
          <UsersList
            className="z-20 w-[7rem] justify-center"
            users={threadRepliers}
            width={15}
            height={15}
          ></UsersList>
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
  );
}
