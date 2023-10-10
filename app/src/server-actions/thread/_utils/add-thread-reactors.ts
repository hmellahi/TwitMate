import { Thread } from "@prisma/client";
import { getThreadReactors } from "./get-thread-reactors";
import isUserLikedThread from "./isUserLikedThread";

export async function addThreadReactors(threads: Thread[], userId: string) {
  // Iterate through threads and add threadReactors property to each
  const addingThreadReactionsPromises = threads.map(async (thread) => {
    const threadId = thread?.id;
    thread.isLikedByCurrentUser = await isUserLikedThread({ userId, threadId });
    thread.threadReactors = getThreadReactors(thread);
  });

  await Promise.all(addingThreadReactionsPromises);
  // console.log(addingThreadReactionsPromises);
}
