import { Community, User } from "@prisma/client";
import { prisma } from "../prisma";

interface addCommunity {
  id: string;
  name: string;
  image: string | null;
  slug: string;
  bio: string | null;
  createdBy: string;
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
      throw CommunityNotFoundError;
    }

    // Check if the user is already a member of the community
    const isMember = community.members.some(
      (member: User) => member.id === userId
    );

    if (isMember) {
      throw UserAlreadyMemberError;
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
  } catch (e) {
    console.log(e);
  }
}

async function deleteCommunity(communityId: string) {
  try {
    await prisma.community.delete({
      where: { id: communityId },
    });
  } catch (e) {
    console.log(e);
  }
}

async function removeUserFromCommunity() {}
async function updateCommunityInfo() {}

export {
  addMemberToCommunity,
  createCommunity,
  deleteCommunity,
  removeUserFromCommunity,
  updateCommunityInfo,
};
