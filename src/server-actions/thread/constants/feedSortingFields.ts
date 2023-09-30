export const feedSortingFields = [
  {
    likes: {
      _count: "desc",
    },
  },
  {
    childrens: {
      _count: "desc",
    },
  },
  {
    createdAt: "desc",
  },
];

export const sortByLatest = [
  {
    createdAt: "desc",
  },
];
