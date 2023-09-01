"use server";
import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import React from "react";

export default async function page() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  return (
    <div>
      <h1 className="head-text">Create Thread</h1>
      <PostThread userId={userInfo?.id} />
    </div>
  );
}
