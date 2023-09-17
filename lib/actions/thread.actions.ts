"use server";

import { Prisma, Thread } from "@prisma/client";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { CreateThread } from "@/types/Thread";
import { promise } from "zod";

export async function createThread({
  userId,
  communityId,
  text,
  parentId,
  pathToRevalidate,
  images = [],
}: CreateThread) {
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

    revalidatePath(pathToRevalidate);

    return newThread;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function fetchThread({ threadId }: { threadId: string }) {
  try {
    return await prisma.thread.findFirst({
      where: { id: threadId },
      include: {
        author: true,
        likes: true,
        images: true,
        childrens: {
          include: {
            author: true,
            likes: true,
            images: true,
            childrens: {
              select: {
                author: true,
              },
              take: 4,
            },
          },
        },
      },
    });
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function fetchThreads({
  userId,
  offset = 0,
  limit = 20,
  path,
  communityId,
}: {
  userId: string;
  offset?: number;
  limit?: number;
  path?: string;
  communityId?: null | string;
}) {
  const query: Prisma.ThreadFindManyArgs = {
    where: { NOT: { id: userId }, communityId },
  };
  try {
    let [threads, count] = await prisma.$transaction([
      prisma.thread.findMany({
        where: query.where,
        skip: offset,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
          likes: true,
          images: true,
          childrens: {
            select: {
              author: true,
            },
          },
        },
      }),
      prisma.thread.count({ where: query.where }),
    ]);
    const isLastPage = offset + limit >= count;
    // revalidatePath(path);
    return { threads, count, isLastPage };
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function fetchUserThreads({
  userId,
  offset = 0,
  limit = 20,
}: {
  userId: string;
  offset?: number;
  limit?: number;
}) {
  const query: Prisma.ThreadFindManyArgs = {
    where: { authorId: userId },
  };
  try {
    let [threads, count] = await prisma.$transaction([
      prisma.thread.findMany({
        where: query.where,
        skip: offset,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
          likes: true,
          childrens: {
            select: {
              author: true,
            },
          },
        },
      }),
      prisma.thread.count({ where: query.where }),
    ]);

    const isLastPage = offset + limit >= count;
    return { threads, count, isLastPage };
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function toggleThread({
  value,
  threadId,
  userId,
  path,
}: {
  value: boolean;
  threadId: string;
  userId: string;
  path: string;
}) {
  // if (value){
  const action: Function = value ? likeThread : unLikeThread;

  await action({
    threadId,
    userId,
    path,
  });
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
    console.log(e);
    throw e;
  }
}

export async function unLikeThread({
  likeId,
  path,
}: {
  likeId: string;
  path: string;
}) {
  try {
    await prisma.threadLikes.delete({
      where: {
        id: likeId,
      },
    });
    revalidatePath(path);
  } catch (e) {
    console.log(e);
    // throw e;
  }
}

export async function deleteThread({
  authorId,
  threadId,
  path,
}: {
  authorId: string;
  threadId: string;
  path: string;
}) {
  try {
    let deleteThreadLikesPromise = prisma.threadLikes.deleteMany({
      where: {
        threadId,
      },
    });
    let deleteThreadImagesPromise = prisma.threadImages.deleteMany({
      where: {
        threadId,
        userId: authorId,
      },
    });

    await Promise.all([deleteThreadLikesPromise, deleteThreadImagesPromise]);

    await prisma.thread.delete({
      where: {
        id: threadId,
        authorId,
      },
    });
    revalidatePath(path);
  } catch (e) {
    throw e;
  }
}

export async function getUserReplies({
  userId,
  path,
}: {
  userId: string;
  path: string;
}) {
  try {
    let userReplies = await prisma.thread.findMany({
      where: {
        authorId: userId,
        NOT: {
          parentId: null,
        },
      },
      include: {
        // id: true,
        // createdAt: true,
        // parentId: true,
        // text: true,
        author: true,
      },
    });
    revalidatePath(path);
    return userReplies;
  } catch (e) {
    throw e;
  }
}
