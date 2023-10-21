import { Thread } from "@prisma/client";
import { getThreadReactors } from "./get-thread-reactors";
import isUserLikedThread from "./isUserLikedThread";

function canDeleteThread(thread: Thread, userId: string) {
  const { author } = thread;
  return author.id === userId;
}

export async function addThreadReactors(threads: Thread[], userId: string) {
  // Iterate through threads and add threadReactors property to each
  const addingThreadReactionsPromises = threads.map(async (thread) => {
    const threadId = thread?.id;
    thread.isLikedByCurrentUser = await isUserLikedThread({ userId, threadId });
    thread.canDelete = canDeleteThread(thread, userId);
    thread.threadReactors = getThreadReactors(thread);

    delete thread.childrens;
    delete thread.likes;
  });

  await Promise.all(addingThreadReactionsPromises);
}
