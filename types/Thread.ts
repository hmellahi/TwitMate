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

export interface CreateThread {
  text: string;
  communityId?: string;
  parentId?: string;
  userId: string;
  pathToRevalidate: string;
  images?: string[];
}
