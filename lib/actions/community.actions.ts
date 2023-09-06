import { Community, User } from "@prisma/client";
import { prisma } from "../prisma";
import { UserNotMemberError } from "../errors/community.errors";

interface addCommunity {
  id: string;
  name: string;
  image: string | null;
  slug: string;
  bio: string | null;
  createdBy: string;
}

interface updateCommunity {
  id: string;
  name: string;
  image: string | null;
  slug: string;
  bio: string | null;
}

class CommunityNotFoundError extends Error {
  constructor() {
    super("Community not found");
    this.name = "CommunityNotFoundError";
  }
}

class UserAlreadyMemberError extends Error {
  constructor() {
    super("User is already a member of the community");
    this.name = "UserAlreadyMemberError";
  }
}

async function addMemberToCommunity({
  communityId,
  userId,
}: {
  communityId: string;
  userId: string;
}) {
  try {
    const community = await prisma.community.findUnique({
      where: { id: communityId },
      include: { members: true },
    });

    if (!community) {
      throw new CommunityNotFoundError();
    }

    // Check if the user is already a member of the community
    const isMember = community.members.some(
      (member: User) => member.id === userId
    );

    if (isMember) {
      throw new UserAlreadyMemberError();
    }

    // Add the user to the community's members
    const updatedCommunity = await prisma.community.update({
      where: { id: communityId },
      data: { members: { connect: { id: userId } } },
      include: { members: true },
    });

    return updatedCommunity;
  } catch (error: any) {
    if (
      error instanceof CommunityNotFoundError ||
      error instanceof UserAlreadyMemberError
    ) {
      throw error;
    }
    throw new Error(`Failed to add member to community: ${error.message}`);
  }
}

async function createCommunity(newCommunity: addCommunity) {
  try {
    await prisma.community.create({
      data: newCommunity,
    });
  } catch (error) {
    throw new Error(`Failed to create the community: ${error.message}`);
  }
}

async function deleteCommunity(communityId: string) {
  try {
    await prisma.community.delete({
      where: { id: communityId },
    });
  } catch (error) {
    throw new Error(`Failed to delete the community: ${error.message}`);
  }
}

async function removeUserFromCommunity({
  communityId,
  userId,
}: {
  communityId: string;
  userId: string;
}) {
  try {
    // Find the community
    const community = await prisma.community.findUnique({
      where: { id: communityId },
      include: { members: true },
    });

    if (!community) {
      throw new CommunityNotFoundError();
    }

    // Check if the user is a member of the community
    const isMemberIndex = community.members.findIndex(
      (member) => member.id === userId
    );

    if (isMemberIndex === -1) {
      throw new UserNotMemberError();
    }

    // Remove the user from the community's members
    const updatedCommunity = await prisma.community.update({
      where: { id: communityId },
      data: { members: { disconnect: { id: userId } } },
      include: { members: true },
    });

    return updatedCommunity;
  } catch (error) {
    throw new Error(`Failed to remove member from community: ${error.message}`);
  }
}

async function updateCommunityInfo(
  updatedCommunityData: updateCommunity
): Promise<Community | null> {
  try {
    // Assuming you have a valid structure for updating a community
    const { id: communityId, ...communityUpdateData } = updatedCommunityData;
    console.log({communityUpdateData, communityId})
    // Update the community information
    const updatedCommunity = await prisma.community.update({
      where: { id: communityId },
      data: communityUpdateData,
      include: { members: true },
    });

    return updatedCommunity;
  } catch (error) {
    throw new Error(`Failed to update community information: ${error.message}`);
  }
}

async function fetchCommunities({
  userId,
  searchKeyword = "",
}: {
  userId: string;
  searchKeyword?: string;
}) {
  try {
    let communities = await prisma.community.findMany({
      where: {
        NOT: { id: userId },
        name: {
          contains: searchKeyword,
          mode: "insensitive",
        },
      },
      include: {
        members: {
          take: 4,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return communities;
  } catch (error: any) {
    console.log(error);
  }
}

export {
  addMemberToCommunity,
  createCommunity,
  deleteCommunity,
  removeUserFromCommunity,
  updateCommunityInfo,
  fetchCommunities,
};
