import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/server-actions/user/user.actions";
import useFeedStore from "@/app/(root)/(feed)/_store/feedsStore";
import { currentUser } from "@clerk/nextjs";
import React from "react";
import { useStore } from "zustand";

export default async function page() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo) return null;

  return (
    <div>
      <h1 className="head-text">Create Thread</h1>
      <PostThread userId={userInfo.id} postBtnClass="w-full" redirectUrl="/" />
    </div>
  );
}
