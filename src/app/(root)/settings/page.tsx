import AccountProfile from "@/src/components/forms/AccountProfile";
import { fetchUser } from "@/src/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import React from "react";

export default async function page() {
  const user: User | null = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);

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
