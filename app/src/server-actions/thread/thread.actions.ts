"use server";

import { THREADS_LIMIT } from "@/constants";
import { getCurrentUserId } from "@/lib/get-current-user";
import { CreateThreadParams, FetchThreadsParams } from "@/types/thread";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { addThreadReactors } from "./_utils/add-thread-reactors";
import { getThreadPreviewFields } from "./_utils/get-thread-preview-fields";
import { feedSortingFields, sortByLatest } from "./constants/feed-sorting-fields";

export async function createThread({
  userId,
  communityId,
  text,
  parentId,
  images = [],
  path,
}: CreateThreadParams) {
  try {
    // Create a new thread
    const newThread = await prisma.thread.create({
      data: {
        authorId: userId,
        communityId,
        text,
        parentId: parentId || null,
      },
    });

    (async () => {
      // Save thread images
      if (images && images.length > 0) {
        for (const imageUrl of images) {
          await prisma.threadImages.create({
            data: {
              imageUrl,
              userId,
              threadId: newThread.id,
            },
          });
        }
      }
    })();

    return newThread;
  } catch (error: any) {
    throw error;
  } finally {
    revalidatePath(path);
  }
}

export async function fetchThread({ threadId, userId }: { threadId: string; userId: string }) {
  try {
    const thread = await prisma.thread.findFirst({
      where: { id: threadId },
      select: {
        ...getThreadPreviewFields(userId),
      },
    });

    if (!thread) {
      return;
    }
    await addThreadReactors([thread], userId);

    return thread;
  } catch (error: any) {
    throw error;
  }
}

export async function fetchThreadReplies({
  threadId,
  userId,
  limit = THREADS_LIMIT,
  page = 1,
}: {
  threadId: string;
  userId: string;
  limit: number;
  page: number;
}) {
  const query: Prisma.ThreadFindManyArgs = {
    where: { parentId: threadId },
  };

  try {
    const [threads, totalCount] = await prisma.$transaction([
      prisma.thread.findMany({
        where: query.where,
        select: {
          ...getThreadPreviewFields(userId),
        },
        take: limit,
        skip: (page - 1) * limit,
      }),
      prisma.thread.count({ where: query.where }),
    ]);

    await addThreadReactors(threads, userId);

    return { threads, totalCount };
  } catch (error: any) {
    throw error;
  }
}

export async function fetchThreads({
  userId,
  page = 1,
  limit = THREADS_LIMIT,
  communityId,
  sortByLikesAndReplies = false,
}: FetchThreadsParams) {
  console.log({ page });
  const query: Prisma.ThreadFindManyArgs = {
    where: {
      communityId,
    },
  };

  const OrderByFields = sortByLikesAndReplies ? feedSortingFields : sortByLatest;

  try {
    const [threads, totalCount] = await prisma.$transaction([
      prisma.thread.findMany({
        where: query.where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: OrderByFields,
        select: {
          ...getThreadPreviewFields(userId),
        },
      }),
      prisma.thread.count({ where: query.where }),
    ]);

    await addThreadReactors(threads, userId);

    return { threads, totalCount };
  } catch (error: any) {
    console.log({error})
    throw error;
  }
}

export async function fetchUserThreads({
  userId,
  page = 1,
  limit = THREADS_LIMIT,
}: {
  userId: string;
  page?: number;
  limit?: number;
}) {
  const currentUserId = getCurrentUserId();
  if (!currentUserId) {
    return;
  }

  const query: Prisma.ThreadFindManyArgs = {
    where: { authorId: userId },
  };
  try {
    let [threads, totalCount] = await prisma.$transaction([
      prisma.thread.findMany({
        where: query.where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          ...getThreadPreviewFields(currentUserId),
        },
      }),
      prisma.thread.count({ where: query.where }),
    ]);

    await addThreadReactors(threads, currentUserId);
    return { threads, totalCount };
  } catch (error: any) {
    throw error;
  }
}

export async function likeThread({
  threadId,
  userId,
  path,
}: {
  threadId: string;
  userId: string;
  path: string;
}) {
  let newLike = {
    threadId,
    userId,
  };

  try {
    const existingLike = await prisma.threadLikes.findFirst({
      where: {
        threadId,
        userId,
      },
    });

    if (existingLike) {
      // A like with the same threadId and userId already exists, so do nothing.
      return null;
    }

    await prisma.threadLikes.create({
      data: newLike,
    });

    revalidatePath(path);
  } catch (e) {
    throw e;
  }
}

export async function unLikeThread({
  threadId,
  userId,
  path,
}: {
  threadId: string;
  path: string;
  userId: string;
}) {
  try {
    await prisma.threadLikes.delete({
      where: {
        userId_threadId: {
          userId,
          threadId,
        },
      },
    });
    revalidatePath(path);
  } catch (e) {
    console.log(e);
    // throw e;
  }
}

export async function removeThread({
  authorId,
  threadId,
  path,
}: {
  authorId: string;
  threadId: string;
  path: string;
}) {
  const currentUserId = getCurrentUserId();

  try {
    let deleteThreadLikesPromise = prisma.threadLikes.deleteMany({
      where: {
        threadId,
      },
    });

    let deleteThreadImagesPromise = prisma.threadImages.deleteMany({
      where: {
        threadId,
        userId: currentUserId,
      },
    });

    await Promise.all([deleteThreadLikesPromise, deleteThreadImagesPromise]);

    await prisma.thread.delete({
      where: {
        id: threadId,
        authorId: currentUserId,
      },
    });
  } catch (e) {
    throw e;
  } finally {
    revalidatePath(path);
  }
}

export async function getUserReplies({ userId, path }: { userId: string; path: string }) {
  try {
    let userReplies = await prisma.thread.findMany({
      where: {
        authorId: userId,
        NOT: {
          parentId: null,
        },
      },
      include: {
        author: true,
      },
    });
    revalidatePath(path);
    return userReplies;
  } catch (e) {
    throw e;
  }
}
