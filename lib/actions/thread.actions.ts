"use server";

import { Prisma, Thread } from "@prisma/client";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { CreateThread } from "@/types/Thread";

export async function createThread({
  userId,
  communityId,
  text,
  parentId,
  pathToRevalidate,
}: CreateThread) {
  const newThread = {
    authorId: userId,
    communityId: communityId,
    text,
    parentId: parentId || null,
  };

  try {
    const updateThread = await prisma.thread.create({
      data: newThread,
    });

    revalidatePath(pathToRevalidate);

    return updateThread;
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
        childrens: {
          include: {
            author: true,
            likes: true,
            childrens: true,
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
}: {
  userId: string;
  offset?: number;
  limit?: number;
  path: string;
}) {
  const query: Prisma.ThreadFindManyArgs = {
    where: { NOT: { id: userId } },
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
          childrens: true,
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
          childrens: true,
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
