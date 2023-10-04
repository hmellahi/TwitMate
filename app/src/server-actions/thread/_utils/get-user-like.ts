"use server";

export const getUserLike = (userId: string) => ({
  where: {
    userId,
  },
  select: {
    id: true,
  },
  take: 1,
});
