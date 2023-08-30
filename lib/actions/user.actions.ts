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
  console.log({ newUserData });

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
