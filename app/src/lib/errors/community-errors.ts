export class CommunityNotFoundError extends Error {
  constructor() {
    super("Community not found");
    this.name = "CommunityNotFoundError";
  }
}

export class UserAlreadyMemberError extends Error {
  constructor() {
    super("User is already a member of the community");
    this.name = "UserAlreadyMemberError";
  }
}

export class UserNotMemberError extends Error {
  constructor() {
    super("User is not a member of the community");
    this.name = "UserNotMemberError";
  }
}
