import ProfileTabs from "@/app/(root)/profile/[id]/_components/ProfileTabs";
import { ProfileImg } from "@/components/shared/ProfileImg";
import { Edit, Location } from "@/components/svgs";
import { Button } from "@/components/ui/Button";
import { getCurrentUser } from "@/lib/get-current-user";
import { fetchUser } from "@/server-actions/user/user.actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function profile({ params }: { params: { id: string } }) {
  const userId = params.id;
  if (!userId) return null;

  let [loggedInUser, user] = await Promise.all([getCurrentUser(), fetchUser(userId)]);

  if (!user) return redirect("/");

  return (
    <div>
      <div className="text-white flex gap-y-4 gap-x-8 flex-col">
        <div className="mx-0">
          <div className="flex gap-4 mb-5 justify-between">
            <div className="flex gap-4 items-start">
              <ProfileImg className="!h-20 !w-20" user={user} size={65} />
              <div>
                <p className="text-heading3-bold font-bold capitalize">{user.username}</p>
                <h3 className="text-gray-1">@{user.name}</h3>
              </div>
            </div>
            <div>
              {user.id == loggedInUser?.id && (
                <Link href="/settings">
                  <Button className="flex h-auto text-dark-1 items-center gap-2 sm:!p-3 w-auto">
                    <Edit width={20} height={20} />
                    <span className="hidden sm:inline">Edit Profile</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <h3 className="text-body-medium mb-2">{user.bio}</h3>
          {user?.location && (
            <div className="flex mt-4 text-gray-1 items-end gap-2">
              <Location width={25} height={25} /> {user.location}
            </div>
          )}
        </div>
        <ProfileTabs user={user} />
      </div>
    </div>
  );
}
