import { getCurrentUser } from "@/lib/get-current-user";
import Feed from "./_components/Feed";

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;

  return <Feed user={currentUser} initialThreadsData={null} />;
}
