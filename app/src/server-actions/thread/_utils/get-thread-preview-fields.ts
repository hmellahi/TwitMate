export const getThreadPreviewFields = (userId: string | null) => {
  const baseFields = {
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
  };

  const additionalFields = {
    childrens: {
      take: 3,
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
      select: {
        user: {
          select: {
            id: true,
            image: true,
          },
        },
      },
    },
  };

  // Conditionally apply the NOT filter if userId is not null
  if (userId != null) {
    additionalFields.childrens.where = { NOT: { authorId: userId } };
    additionalFields.likes.where = { NOT: { userId } };
  }

  return { ...baseFields, ...additionalFields };
};
