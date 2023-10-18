import AccountProfile from "@/components/forms/AccountProfile";
import { getCurrentUserId } from "@/lib/get-current-user";
import { fetchUser } from "@/server-actions/user/user.actions";
import { UserData } from "@/types/user";
import { currentUser } from "@clerk/nextjs";

export default async function page() {
  const userId = getCurrentUserId();
  if (!userId) return null;

  const [user, userInfo] = await Promise.all([currentUser(), fetchUser(userId)]);

  const userData: UserData = {
    id: user?.id,
    objectId: userInfo?.id,
    username: userInfo?.username || user?.username || "",
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };

  return (
    <div className="text-white">
      <div className="head-text">Account Settings</div>
      <p className="mt-4 mb-10">Edit your profile</p>
      <AccountProfile btnTitle="Save" user={userData} />
    </div>
  );
}
