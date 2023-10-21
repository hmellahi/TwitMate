import { fetchUser } from "@/server-actions/user/user.actions";
import { cookies } from "next/headers";

export const getCurrentUserId = () => cookies().get("currentUserClerkId")?.value;

export const getCurrentUser = async () => {
  const currentUserId = getCurrentUserId();
  if (!currentUserId) return;
  return fetchUser(currentUserId);
};
