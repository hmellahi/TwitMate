import { prisma } from "@/lib/prisma";

export default async function isUserLikedThread({ userId, threadId }) {
  const userLike = await prisma.threadLikes.findFirst({
    where: {
      threadId,
      userId,
    },
  });

  return userLike !== null;
}
