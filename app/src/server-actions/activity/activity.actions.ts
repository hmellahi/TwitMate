import { Thread, ThreadLikes } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export async function getUserActivity({ userId, path }: { userId: string; path?: string }) {
  try {
    let userThreadsRepliersPromise = prisma.thread.findMany({
      where: {
        authorId: userId,
      },
      select: {
        childrens: {
          where: {
            NOT: {
              authorId: userId,
            },
          },
          select: {
            id: true,
            author: true,
            createdAt: true,
            parentId:true
          },
        },
        likes: {
          where: {
            NOT: {
              userId,
            },
          },
          select: {
            id: true,
            user: true,
            threadId: true,
            createdAt: true,
          },
        },
      },
    });

    let userThreads = await userThreadsRepliersPromise;

    const activities = [];

    userThreads.forEach((thread) => {
      thread.childrens.forEach((reply: Thread) => {
        activities.push({
          type: "reply",
          threadId: reply.parentId,
          user: reply.author,
          createdAt: reply.createdAt,
        });
      });

      thread.likes.forEach((like: ThreadLikes) => {
        activities.push({
          type: "like",
          threadId: like.threadId,
          user: like.user,
          createdAt: like.createdAt,
        });
      });
    });

    // Sort activities by createdAt in ascending order
    activities.sort((a, b) => a.createdAt - b.createdAt);

    return activities;
  } catch (e) {
    throw e;
  }
}
