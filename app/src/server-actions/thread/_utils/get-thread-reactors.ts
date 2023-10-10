import { Thread, ThreadLikes } from "@prisma/client";

// Function to calculate the list with the max length from likes and childrens
export const getThreadReactors = (thread: Thread) => {
  const likesLength = thread?.likes?.length || 0;
  const childrensLength = thread?.childrens?.length || 0;

  let reactors;

  if (likesLength >= childrensLength) {
    reactors = thread.likes.map((like: ThreadLikes) => like.user);
  } else {
    reactors = thread.childrens.map((child: Thread) => child.author);
  }

  // Create a Set to ensure uniqueness based on user IDs
  const uniqueUserIds = new Set<string>();

  // Filter and add unique user IDs to the Set
  const filteredReactors = reactors.filter((reactor) => {
    if (!uniqueUserIds.has(reactor.id)) {
      uniqueUserIds.add(reactor.id);
      return true;
    }
    return false;
  });

  return filteredReactors;
};
