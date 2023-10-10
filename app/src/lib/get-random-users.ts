import { User } from "@prisma/client";

// Helper function to get random users from the users list
export const getRandomUsers = (users: User[], count: number) => {
  const shuffledUsers = [...users];
  for (let i = shuffledUsers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledUsers[i], shuffledUsers[j]] = [shuffledUsers[j], shuffledUsers[i]];
  }
  return shuffledUsers.slice(0, count);
};
