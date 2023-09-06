"use server";

import ProfileTabs from "@/components/profile/profileTabs";
import { fetchUserThreads } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import React from "react";

export default async function profile({ params }: { params: { id: string } }) {
  const userId = params.id;
  if (!userId) return null;
  const user = await fetchUser(userId);
  if (!user) return null;
  let { threads } = await fetchUserThreads({ userId: user.id });

  return (
    <div>
      <div className="text-white flex gap-y-4 gap-x-8 flex-col">
        <div className="flex gap-4">
          <Image
            src={user.image}
            width={70}
            height={70}
            alt="pdp"
            className="rounded-full"
          />
          <div>
            <p className="text-heading3-bold font-bold capitalize">
              {user.username}
            </p>
            <h3 className="text-gray-1">@{user.name}</h3>
          </div>
        </div>
        <h3 className="text-body-medium mb-10">{user.bio}</h3>
        <ProfileTabs threads={threads} user={user} />
      </div>
    </div>
  );
}
