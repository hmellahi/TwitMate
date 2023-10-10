import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function assignThreadsToCommunities() {
  try {
    // Fetch 5 communities
    const communities = await prisma.community.findMany({
      take: 5,
    });

    // Fetch fake users
    const fakeUsers = await prisma.user.findMany({
      where: { isFake: true },
      select: { id: true },
    });

    const fakeUserIds = fakeUsers.map((user) => user.id);

    // Fetch threads created by fake users
    const fakeThreads = await prisma.thread.findMany({
      where: {
        authorId: {
          in: fakeUserIds,
        },
      },
    });

    for (let i = 0; i < communities.length; i++) {
      const community = communities[i];

      // Determine the range of threads to assign to this community
      const startIndex = i * 100;
      const endIndex = startIndex + 100;
      const threadsToAssign = fakeThreads.slice(startIndex, endIndex);

      // Connect the threads to the community
      await prisma.community.update({
        where: { id: community.id },
        data: {
          threads: {
            connect: threadsToAssign.map((thread) => ({ id: thread.id })),
          },
        },
      });

      // Add the creators of these threads as members to the community
      await prisma.community.update({
        where: { id: community.id },
        data: {
          members: {
            connect: threadsToAssign.map((thread) => ({
              id: thread.authorId,
            })),
          },
        },
      });
    }

    console.log("Threads assigned to communities, and members added successfully.");
  } catch (error) {
    console.error("Error assigning threads and adding members to communities:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
