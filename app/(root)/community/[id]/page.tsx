// 'use client'

import ThreadCard from "@/components/forms/ThreadCard";
import { ThreadsList } from "@/components/shared/ThreadsList";
import UserCard from "@/components/shared/UserCard";
import SvgIcon from "@/components/ui/svgIcon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { communityTabs, profileTabs } from "@/constants";
import {
  fetchCommunities,
  fetchCommunity,
} from "@/lib/actions/community.actions";
import { fetchThreads, fetchUserThreads } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { camelToSnakeCase } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { Thread, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function profile({ params }: { params: { id: string } }) {
  const communityId = params.id;
  if (!communityId) return null;
  const userFromClerk = await currentUser();
  if (!userFromClerk) return null;
  const user = await fetchUser(userFromClerk.id);
  if (!user) {
    return;
  }
  const { threads } = await fetchThreads({
    userId: user.id,
    communityId,
  });
  const community = await fetchCommunity({ communityId });
  if (!community) return null;
  const { members } = community;

  return (
    <div>
      <div className="text-white flex gap-y-4 gap-x-8 flex-col">
        <div className="flex gap-4">
          <Image
            src={community.image}
            width={70}
            height={70}
            alt="pdp"
            className="rounded-full"
          />
          <div>
            <p className="text-heading3-bold font-bold capitalize">
              {community.name}
            </p>
            <h3 className="text-gray-1">@{camelToSnakeCase(community.name)}</h3>
          </div>
        </div>
        <h3 className="text-body-medium mb-10">{user.bio}</h3>

        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="w-full flex justify-between text-center tab">
            {communityTabs.map((tab, index) => (
              <TabsTrigger key={index} value={tab.value} className="tab">
                <SvgIcon
                  iconName={tab.value}
                  width={30}
                  height={30}
                  alt="tab"
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.value == "threads" && (
                  <div className="ml-2 bg-gray-600 px-3 py-1 box-shadow-count-badge rounded-md">
                    {threads?.length}
                  </div>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-10">
            <TabsContent value="threads">
              <ThreadsList threads={threads} path="/profile" user={user} />
            </TabsContent>
            <TabsContent value="members">
              {threads.length < 1 ? (
                <div>no result</div>
              ) : (
                <div className="flex gap-4 flex-col">
                  {members.map((member: User, index: number) => {
                    return <UserCard key={index} user={user} className="border-b-2 border-light-gray pb-3"/>;
                  })}
                </div>
              )}
            </TabsContent>
            <TabsContent value="requests"></TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
