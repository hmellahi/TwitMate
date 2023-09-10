"use server";

import ProfileTabs from "@/components/profile/profileTabs";
import { Edit } from "@/components/svgs";
import { Button } from "@/components/ui/button";
import { fetchUserThreads } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function profile({ params }: { params: { id: string } }) {
  const userId = params.id;
  if (!userId) return null;
  const user = await fetchUser(userId);
  if (!user) return null;
  let { threads } = await fetchUserThreads({ userId: user.id });
  let loggedInUser = await currentUser();

  return (
    <div>
      <div className="text-white flex gap-y-4 gap-x-8 flex-col">
        <div className="mx-0">
          <div className="flex gap-4 mb-10 justify-between">
            <div>
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
            <div>
              {user.id == loggedInUser?.id && (
                <Link href="/settings">
                  <Button className="flex h-auto text-dark-1 items-center gap-2">
                    <Edit width={20} height={20} />
                    Edit Profile
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <h3 className="text-body-medium mb-2">{user.bio}</h3>
        </div>
        <ProfileTabs threads={threads} user={user} />
      </div>
    </div>
  );
}
