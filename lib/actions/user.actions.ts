"use server";

import { prisma } from "../prisma";

interface UpdateUser {
  id: string | undefined;
  username: string;
  name: string;
  bio?: string;
  image: string;
}

export async function updateUser(newUserData: UpdateUser) {
  const { username, name, bio, image, id } = newUserData;

  const updatedUser = {
    name,
    username,
    bio,
    image,
    onboarded: true,
    id,
  };

  try {
    const updateUser = await prisma.user.upsert({
      where: {
        id: newUserData.id,
      },
      update: updatedUser,
      create: updatedUser,
    });

    return updateUser;
  } catch (error: any) {
    console.log(error);
  }
}

export async function fetchUser(userId: string) {
  try {
    let user = await prisma.user.findFirst({
      where: { id: userId },
    });
    return user;
  } catch (error: any) {
    console.log(error);
  }
}

export async function fetchUsers({
  userId,
  searchKeyword = "",
}: {
  userId: string;
  searchKeyword?: string;
}) {
  try {
    let users = await prisma.user.findMany({
      where: {
        NOT: { id: userId },
        OR: [
          {
            username: {
              contains: searchKeyword,
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: searchKeyword,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return users;
  } catch (error: any) {
    console.log(error);
  }
}
