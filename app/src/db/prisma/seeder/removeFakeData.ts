const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export default async function removeFakeData() {
  try {
    // Step 1: Identify users with fake posts
    const usersWithFakePosts = await prisma.user.findMany({
      where: { isFake: true }, // Replace with your specific criteria
      select: {
        id: true,
      },
    });

    // Step 2: Delete posts and associated post images concurrently
    const deletionPromises = usersWithFakePosts.map(async (user) => {
      const deletePostsPromise = prisma.thread.deleteMany({
        where: { authorId: user.id },
      });

      const deleteImagesPromise = prisma.threadImages.deleteMany({
        where: { userId: user.id },
      });

      await Promise.all([deletePostsPromise, deleteImagesPromise]);
    });

    await Promise.all(deletionPromises);
    // Step 3: Delete the users themselves
    await prisma.user.deleteMany({
      where: { isFake: true }, // Replace with your specific criteria
    });

  } catch (error) {
    console.error("Error removing fake users and posts:", error);
  } finally {
    await prisma.$disconnect();
  }
}
