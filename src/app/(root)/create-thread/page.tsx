import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/server-actions/user/user.actions";
import { currentUser } from "@clerk/nextjs";
import React from "react";

export default async function page() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo) return null;

  return (
    <div>
      <h1 className="head-text">Create Thread</h1>
      <PostThread
        userId={userInfo.id}
        postBtnClass="w-full"
        redirectUrl="/"
        userImage={userInfo.image}
      />
    </div>
  );
}
