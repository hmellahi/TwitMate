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

export interface CreateThreadParams {
  text: string;
  communityId?: string;
  parentId?: string;
  userId: string;
  images?: string[];
  path:string
}

export interface FetchThreadsParams {
  userId: string;
  offset?: number;
  limit?: number;
  path?: string;
  communityId?: null | string;
}
