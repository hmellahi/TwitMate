"use server";
import ReplyTab from "@/components/activity/ReplyTab";
import ThreadCard from "@/components/forms/ThreadCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { ThreadWithDetails } from "@/types/Thread";
import { Thread, User } from "@prisma/client";
import React from "react";
import SvgIcon from "../ui/svgIcon";

export default async function ProfileTabs({
  threads,
  user,
}: {
  threads: ThreadWithDetails[];
  user: User;
}) {
  return (
    <Tabs defaultValue="threads" className="w-full">
      <TabsList className="w-full flex justify-between text-center tab">
        {profileTabs.map((tab, index) => (
          <TabsTrigger value={tab.value} className="tab" key={index}>
            <SvgIcon
              width={30}
              height={30}
              alt="tab"
              className="object-contain text-white"
              iconName={tab.value}
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
        <TabsContent value="replies">
          <ReplyTab />
        </TabsContent>
        <TabsContent value="tagged"></TabsContent>
      </div>
    </Tabs>
  );
}
