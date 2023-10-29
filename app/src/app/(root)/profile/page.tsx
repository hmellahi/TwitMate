import { getCurrentUserId } from "@/lib/get-current-user";
import { redirect } from "next/navigation";

export default function page() {
  const currentUserId = getCurrentUserId();
  redirect(`/profile/${currentUserId}`) 
}
