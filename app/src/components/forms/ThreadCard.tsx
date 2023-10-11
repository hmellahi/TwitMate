"use client";

import { debounce } from "@/lib/debounce";
import useRedirect from "@/lib/hooks/useRedirect";
import { timeAgo } from "@/lib/time-converter";
import { showLikesCount } from "@/lib/utils";
import { likeThread, unLikeThread } from "@/server-actions/thread/thread.actions";
import { ThreadWithDetails } from "@/types/thread";
import { ThreadImages } from "@prisma/client";
import Link from "next/link";
import { forwardRef, useCallback, useState } from "react";
import { ProfileImg } from "../shared/ProfileImg";
import ThreadActions from "../shared/Thread/ThreadActions";
import { UsersList } from "../shared/Thread/UsersList";
import { Heart, HeartFilled, Reply } from "../svgs";
import { MediaViewer } from "../ui/MediaViewer";

function ThreadCard(
  {
    thread,
    userId,
    isComment = false,
    path,
    className = "",
    onDelete,
    measure,
    style,
  }: {
    thread: ThreadWithDetails;
    userId: string;
    isComment?: boolean;
    path: string;
    className: string;
    onDelete?: Function;
  },
  ref
) {
  const { redirectToThread } = useRedirect();
  const { text, author, threadReactors = [], isLikedByCurrentUser = false } = thread;

  console.log(thread.threadReactors);

  const [isUserLikedThread, setisUserLikedThread] = useState(isLikedByCurrentUser);

  // Debounce the saveUserReaction function
  const debouncedSaveUserReaction = debounce(async (isLiked: boolean) => {
    if (isLiked) {
      await unLikeThread({ userId, threadId: thread.id, path });
    } else {
      await likeThread({
        userId: userId,
        threadId: thread.id,
        path,
      });
    }
  }, 200);

  // Use useCallback to memoize the debounced function
  const memoizedDebouncedSaveUserReaction = useCallback(debouncedSaveUserReaction, []);

  // Update reactToThread to call the memoized debounced function
  async function reactToThread(e) {
    e.preventDefault();
    e.stopPropagation();

    setisUserLikedThread(!isUserLikedThread);

    memoizedDebouncedSaveUserReaction(isUserLikedThread);
  }

  const hasReplies = thread?.childrens?.length > 0;
  let threadLikes = thread?._count?.likes || 0;
  let likesCount = isUserLikedThread + threadLikes + (isLikedByCurrentUser ? -1 : 0);
  if (isUserLikedThread && likesCount == 0) {
    likesCount = 1;
  }

  const hasLikes = likesCount > 0;

  const LikeIcon = isUserLikedThread ? HeartFilled : Heart;
  const threadImages = thread?.images?.map((image: ThreadImages) => image.imageUrl);
  const hasReactions = threadReactors?.length > 0;

  return (
    <div
      className={`bg-transparent ${className} text-white pt-4 pb-5 px-0 sm:px-0 cursor-pointer`}
      onClick={() => redirectToThread(thread.id)}
      style={style}
      ref={ref}
    >
      <div className="flex justify-between items-start">
        <div className={`flex gap-3 relative w-full`}>
          <div className="flex flex-col items-center w-[5.5rem]">
            <ProfileImg className="!h-11 !w-11" aria-Labelledby="link to profile" user={author} />
            {hasReactions && <div className="thread-card_bar" />}
          </div>
          <div className="w-full">
            <div className="w-full">
              <div className="flex justify-between w-full items-start ">
                <div className="w-full">
                  <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
                    {author?.username}
                  </Link>
                </div>

                <div
                  className={`text-gray-2 text-small-regular mr-0 sm:mr-4 flex gap-2 items-center -mt-[.3rem]`}
                >
                  <p className="whitespace-nowrap">{timeAgo(thread.createdAt)}</p>
                  <ThreadActions
                    threadId={thread.id}
                    authorId={author.id}
                    path={path}
                    onDelete={onDelete}
                    userId={userId}
                  />
                </div>
              </div>
              <p className="whitespace-pre-line	text-small-regular font-light mt-1 mb-2">{text}</p>
            </div>
            {threadImages?.length > 0 && (
              <MediaViewer
                className="mt-4 mb-2"
                imageURLs={threadImages}
                onLoad={measure}
              ></MediaViewer>
            )}
            <div className={`flex gap-2  text-white items-center`}>
              <div className="icon-hover relative" onClick={reactToThread}>
                <LikeIcon width="25" height="25" className="cursor-pointer" />
              </div>
              {/* <AnimatedLike /> */}
              <div className="icon-hover">
                <Reply width="25" height="25" />
              </div>
              {/* <div className="icon-hover">
                <Repost width="25" height="25" />
              </div>
              <div className="icon-hover">
                <Share width="25" height="25" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center h-7">
        {(hasReplies || hasLikes) && (
          <>
            <UsersList className="z-20 w-[5rem] justify-center" users={threadReactors}></UsersList>
            <div className="text-[#A0A0A0] flex items-center gap-x-2 ml-2 ">
              {hasReplies && (
                <>
                  <p>{thread?.childrens?.length} replies</p>
                  {hasLikes && <div className="rounded-full w-1 h-1 bg-gray-1"></div>}
                </>
              )}
              {showLikesCount(likesCount)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default forwardRef(ThreadCard);
