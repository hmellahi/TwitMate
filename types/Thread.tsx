import { Prisma } from "@prisma/client";

export type ThreadWithDetails = Prisma.ThreadGetPayload<{
  include: {
    author: true;
    childrens: {
      include: {
        author: true;
        likes: true;
      };
    };
    likes: true;
  };
}>;
