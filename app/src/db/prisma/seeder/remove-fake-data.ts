import { PrismaClient, Thread } from "@prisma/client";

const prisma = new PrismaClient();

async function removeAllUserThreads(userId: string) {
  // Delete thread images
  const deleteThreadImagePromise = prisma.threadImages.deleteMany({
    where: { userId: userId },
  });

  // Step 1: Find all threads created by the user
  const userThreads = await prisma.thread.findMany({
    where: {
      authorId: userId,
    },
  });

  // Step 2: Delete the user's threads, including replies
  const threadIdsToDelete = userThreads.map((thread: Thread) => thread.id);

  // Batch deletion of likes and replies
  const deletionPromises = [
    prisma.threadLikes.deleteMany({
      where: { threadId: { in: threadIdsToDelete } },
    }),
    prisma.thread.deleteMany({
      where: { parentId: { in: threadIdsToDelete } },
    }),
    deleteThreadImagePromise,
  ];

  // Execute all deletion promises concurrently
  await Promise.all(deletionPromises);

  // Delete the main threads
  await prisma.thread.deleteMany({
    where: { id: { in: threadIdsToDelete } },
  });
}

export default async function removeFakeData() {
  try {
    // Step 1: Identify users with fake posts
    let usersWithFakePosts = await prisma.user.findMany({
      where: { isFake: true }, // Replace with your specific criteria
      select: {
        id: true,
      },
    });

    usersWithFakePosts = usersWithFakePosts.slice(500)

    const batchSize = 20; // Number of users to delete in each batch
    let deleteUsersCount = 500;

    // Process users in batches
    for (let i = 0; i < usersWithFakePosts.length; i += batchSize) {
      const batch = usersWithFakePosts.slice(i, i + batchSize);
      const removeUserPromises = batch.map(async (user) => {
        await removeAllUserThreads(user.id);
        deleteUsersCount++;
        console.log(
          `User with ID ${user.id} deleted (${deleteUsersCount}/${usersWithFakePosts.length})`
        );
      });

      // Execute all user removal promises in the current batch concurrently
      await Promise.all(removeUserPromises);
    }

    // Step 3: Delete the users themselves
    await prisma.user.deleteMany({
      where: { isFake: true }, // Replace with your specific criteria
    });
  } catch (error) {
    console.error("Error removing fake users and posts:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
