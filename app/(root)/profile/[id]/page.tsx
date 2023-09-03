"use server";

import ThreadCard from "@/components/forms/ThreadCard";
import { Reply } from "@/components/svgs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUserThreads } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { Thread } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const components = {
  threads: Reply,
  // replies
};

export default async function profile({ params }: { params: { id: string } }) {
  const userId = params.id;
  if (!userId) return null;
  const user = await fetchUser(userId);
  if (!user) return null;
  let { threads } = await fetchUserThreads({ userId: user.id });
  // const pathname = usePathname();

  const getActionIcon = (tabIconName: string) => {
    // "use server"
    // import('')
    // retu
    return Reply;
  };

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

                {/* {getActionIcon(tab.icon)} */}
                {/* {components["threads"]} */}
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
                  {threads.map((thread: Thread, index: number) => {
                    return (
                      <ThreadCard
                        key={index}
                        thread={thread}
                        user={user}
                        path="/profile"
                      />
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
