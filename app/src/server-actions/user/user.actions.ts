"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";

interface UpdateUser {
  id: string | undefined;
  username: string;
  name: string;
  bio?: string;
  image: string;
}

type UserSearchQuery = {
  userId?: string | null;
  searchKeyword?: string;
  limit?: number;
  isFake?: boolean | null;
};

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
  } catch (error: any) {
    console.log({error})
  }
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
  userId = null,
  searchKeyword = "",
  limit = 10,
  isFake = null,
}: UserSearchQuery = {}) {
  try {
    
    // Define the whereClause object with the extracted type
    let whereClause: any = {
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
    };

    // Conditionally include the isFake filter if it's not null
    if (isFake !== null) {
      whereClause.isFake = isFake;
    }

    if (userId !== null) {
      whereClause["NOT"] = { id: userId };
    }

    let users = await prisma.user.findMany({
      where: whereClause,
      orderBy: {
      createdAt: "asc",
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
  } catch (error: any) {
    console.log(error);
  }
}


export default async function logout(userId:string) {
  console.log({userId})
  revalidatePath(`/profile/${userId}`)
}