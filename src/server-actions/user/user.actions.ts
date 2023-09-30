"use server";

import { User } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";

interface UpdateUser {
  id: string | undefined;
  username: string;
  name: string;
  bio?: string;
  image: string;
}

export async function updateUser(newUserData: UpdateUser, path: string) {
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

    revalidatePath(path);
    return updateUser;
  } catch (error: any) {}
}

export async function fetchUser(userId: string) {
  try {
    let user = await prisma.user.findFirst({
      where: { id: userId },
    });
    return user;
  } catch (error: any) {
    return null;
  }
}

export async function fetchUsers({
  userId,
  searchKeyword = "",
  limit,
}: {
  userId: string;
  searchKeyword?: string;
  limit: number;
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
      take: limit,
      select: {
        id: true,
        image: true,
        username: true,
        name: true,
      },
    });
    return users;
  } catch (error: any) {}
}
