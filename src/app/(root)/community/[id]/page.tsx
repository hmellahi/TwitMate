import SvgIcon from "@/components/ui/svgIcon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { communityTabs } from "@/constants";
import { camelToSnakeCase } from "@/lib/utils";
import { fetchCommunity } from "@/server-actions/community/community.actions";
import { fetchUser } from "@/server-actions/user/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import TotalThreadsCount from "./_components/TotalThreadsCount";
import CommunityMembers from "./_components/communityMembersTab";
import CommunityThreadsTab from "./_components/communityThreadsTab";

export default async function profile({ params }: { params: { id: string } }) {
  const communityId = params.id;
  if (!communityId) return null;

  const [community, userFromClerk] = await Promise.all([
    fetchCommunity({ communityId }),
    currentUser(),
  ]);

  console.log({ userFromClerk });

  if (!userFromClerk || !community) return null;
  const user = await fetchUser(userFromClerk.id);
  if (!user) {
    return;
  }

  const { members } = community;

  return (
    <div>
      <div className="text-white flex gap-y-4 gap-x-8 flex-col">
        <div className="flex gap-4">
          <div className="h-20 w-20 relative">
            <Image
              fill
              alt="avatar"
              src={community.image}
              className="cursor-pointer object-cover rounded-full"
            />
          </div>
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
                  className="object-cover"
                />
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.value == "threads" && (
                  <div className="ml-2 bg-gray-600 px-3 py-1 box-shadow-count-badge rounded-md">
                    <TotalThreadsCount />
                  </div>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-10">
            <TabsContent value="threads">
              <CommunityThreadsTab communityId={communityId} user={user} />
            </TabsContent>
            <TabsContent value="members">
              <CommunityMembers members={members} />
            </TabsContent>
            <TabsContent value="requests"></TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
