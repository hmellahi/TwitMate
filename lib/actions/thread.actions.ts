"use server";

import { User } from "@prisma/client";
import { prisma } from "../prisma";

interface CreateThread {
  text: string;
  community: String | undefined;
  userId: String;
}

export async function createThread({
  userId,
  community,
  text,
}: CreateThread) {
  const newThread = {
    author: userId,
    community:null,
    text,
  };

  try {
    const updateThread = await prisma.thread.create({
      data: newThread,
    });

    return updateThread;
  } catch (error: any) {
    console.log(error);
  }
}

export async function fetchThread(threadId: string) {
  try {
    return await prisma.thread.findFirst({
      where: { id: threadId },
    });
  } catch (error: any) {
    console.log(error);
  }
}
