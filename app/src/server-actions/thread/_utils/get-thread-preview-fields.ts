export const getThreadPreviewFields = (userId: string|null) => ({
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
  childrens: {
    take: 3,
    where: { NOT: { authorId: userId } },
    select: {
      author: {
        select: {
          id: true,
          image: true,
        },
      },
    },
  },
  likes: {
    take: 3,
    where: { NOT: { userId } },
    select: {
      user: {
        select: {
          id: true,
          image: true,
        },
      },
    },
  },
});
