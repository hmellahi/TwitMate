"use server";

import { currentUser } from "@clerk/nextjs";
import SuggestedCommunities from "./SuggestedCommunities";
import SuggestedUsers from "./SuggestedUsers";

export default async function RightSidebar() {
  const user = await currentUser();
  if (!user) return null;
  return (
    <section className="custom-scrollbar rightsidebar py-0 sm:py-10">
      <div className="flex flex-1 flex-col justify-start">
        <SuggestedCommunities currentUserId={user.id} />
      </div>
      <div className="flex flex-1 flex-col justify-start ">
        <SuggestedUsers currentUserId={user.id} />
      </div>
    </section>
  );
}
