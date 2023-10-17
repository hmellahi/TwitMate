"use server";

import { currentUser } from "@clerk/nextjs";
import SuggestedCommunities from "./SuggestedCommunities";
import SuggestedUsers from "./SuggestedUsers";

export default async function RightSidebar({ currentUserId }: { currentUserId: string }) {
  if (!currentUserId) return null;

  return (
    <section className="custom-scrollbar rightsidebar py-0 sm:py-10">
      <div className="flex flex-1 flex-col justify-start">
        <SuggestedCommunities currentUserId={currentUserId} />
      </div>
      <div className="flex flex-1 flex-col justify-start ">
        <SuggestedUsers currentUserId={currentUserId} />
      </div>
    </section>
  );
}
