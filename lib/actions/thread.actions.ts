"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { CreateThreadParams, FetchThreadsParams } from "@/types/Thread";

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
      revalidatePath(path);
    })();

    return newThread;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

const threadPreviewData = (userId: string) => ({
  id: true,
  text: true,
  createdAt: true,
  author: {
    select: {
      id: true,
      username: true,
      image: true,
    },
  },
  _count: {
    select: {
      likes: true,
      childrens: true,
    },
  },
  images: {
    select: {
      imageUrl: true,
    },
  },
  likes: {
    where: {
      userId,
    },
    select: {
      id: true,
    },
    take: 1,
  },
});

export async function fetchThread({
  threadId,
  authorId,
}: {
  threadId: string;
  authorId: string;
}) {
  try {
    return prisma.thread.findFirst({
      where: { id: threadId },
      select: {
        ...threadPreviewData(authorId),
        childrens: {
          select: {
            ...threadPreviewData(authorId),
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
  page = 0,
  limit = 10,
  communityId,
}: FetchThreadsParams) {
  const query: Prisma.ThreadFindManyArgs = {
    where: { communityId },
  };
  const startTime = performance.now();
  try {
    const [threads, count] = await prisma.$transaction([
      prisma.thread.findMany({
        where: query.where,
        skip: page * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          ...threadPreviewData(userId),
          childrens: {
            take: 4,
            select: {
              author: {
                select: {
                  id: true,
                  image: true,
                },
              },
            },
          },
        },
      }),
      prisma.thread.count({ where: query.where }),
    ]);
    const isLastPage = page + limit >= count;
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    console.log(`fetchThreads took ${elapsedTime} milliseconds.`);
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

export async function removeThread({
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
