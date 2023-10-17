import { cookies } from "next/headers";

export const getCurrentUserId = () => cookies().get("currentUserClerkId")?.value;
