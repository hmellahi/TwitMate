import { PrismaClient } from "@prisma/client";
import {
  Args,
  Call,
  DynamicClientExtensionThis,
  TypeMapCbDef,
} from "@prisma/client/runtime/library";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prisma: PrismaClient;

const CustomPrismaClient = () =>
  new PrismaClient()
  // .$extends({
  //   result: {
  //     thread: {
  //       isLikedByCurrentUser: {
  //         needs: {
  //           id: true,
  //           authorId: true,
  //           likes: {
  //             select: {
  //               id: true,
  //               userId:true
  //             },
  //           },
  //         },
  //         async compute(thread) {
  //           const { authorId: userId, id, likes } = thread;

  //           // Query the likes table to check if the thread is liked by the current user
  //           const userLikeId = likes?.find((like) => like.userId === user.id)?.id; 

  //           console.log({ likeRecord });

  //           // Return a boolean indicating whether the thread is liked by the current user
  //           return likeRecord;
  //         },
  //       },
  //     },
  //   },
  // });

if (process.env.NODE_ENV === "production") {
  prisma = CustomPrismaClient();
} else {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = CustomPrismaClient();
  }

  prisma = globalForPrisma.prisma;
}

export { prisma };
