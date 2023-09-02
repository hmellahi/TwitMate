// 'use client'

import ThreadCard from "@/components/forms/ThreadCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUserThreads } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";
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
            <h3 className="text-gray-1">@{user.username}</h3>
          </div>
        </div>
        <h3 className="text-body-medium mb-10">{user.bio}</h3>

        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="w-full flex justify-between text-center tab">
            {profileTabs.map((tab) => (
              <TabsTrigger value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  width={30}
                  height={30}
                  alt="tab"
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.value == "threads" && (
                  <div className="bg-gray-600 px-3 py-1 box-shadow-count-badge rounded-md">
                    {threads?.length}
                  </div>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-10">
            <TabsContent value="threads">
              {threads.length < 1 ? (
                <div>no result</div>
              ) : (
                <div className="flex gap-4 flex-col">
                  {threads.map((thread, index) => {
                    return (
                      <Link href={`/thread/${thread.id}`} key={index}>
                        <ThreadCard key={index} thread={thread} user={user} />
                      </Link>
                    );
                  })}
                </div>
              )}
            </TabsContent>
            <TabsContent value="replies"></TabsContent>
            <TabsContent value="tagged"></TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
