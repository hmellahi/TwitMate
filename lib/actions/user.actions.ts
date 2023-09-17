"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { currentUser } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs/server";

interface UpdateUser {
  id: string | undefined;
  username: string;
  name: string;
  bio?: string;
  image: string;
}
import Clerk from "@clerk/clerk-sdk-node/esm/instance";

// TODO REMOVE
const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });
console.log({ clerk });

const updateUserMapper = (user: UpdateUser) => {
  const { username, name, image } = user;
  return {
    firstName: name,
    username,
    imageUrl: image,
  };
};

const updateUserInClerk = async (updateUser: UpdateUser) => {
  // let loggedUser = await currentUser();
  // if (!loggedUser) return null;
  // const userId = loggedUser.id;
  // const updateUserData = updateUserMapper(updateUser)
  // console.log({ updateUserData });
  // await clerk.users.updateUser(userId, updateUserData);
  // setProfileImage
  //https://api.clerk.com/v1/users/{user_id}/profile_image
};

export async function updateUser(newUserData: UpdateUser, path: string) {
  const { username, name, bio, image, id } = newUserData;
  // console.log({us})
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
    updateUserInClerk(updatedUser);
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
  limit
}: {
  userId: string;
  searchKeyword?: string;
  limit:number
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
      take: limit
    });
    return users;
  } catch (error: any) {
    console.log(error);
  }
}
