"use server";

import { getUserLike } from "./getUserLike";

export const getThreadPreviewFields = (userId: string) => ({
  id: true,
  text: true,
  createdAt: true,
  author: {
    select: {
      id: true,
      username: true,
      image: true,
    },
  },
  _count: {
    select: {
      likes: true,
      childrens: true,
    },
  },
  images: {
    select: {
      imageUrl: true,
    },
  },
  likes: getUserLike(userId),
});
