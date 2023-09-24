import { fetchThreads } from "@/server-actions/thread/thread.actions";
import { currentUser, useOrganizationList, useUser } from "@clerk/nextjs";
import { ThreadsList } from "../../../components/shared/";
import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/server-actions/user/user.actions";
import { useStore } from "zustand";
import useFeedStore from "@/app/(root)/(feed)/_store/feedsStore";
import ThreadsListWrapper from "@/components/shared/ThreadsListWrapper";
import * as threadActions from "@/server-actions/thread/thread.actions";
import useUserStore from "@/store/userStore";
import Feed from "./_components/feed";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;

  const [userInfo, initialThreadsData] = await Promise.all([
    fetchUser(user.id),
    threadActions.fetchThreads({
      userId: user.id,
      path: "/",
    })
  ]);

  if (!userInfo) return null;

  return <Feed user={userInfo} initialThreadsData={initialThreadsData} />;
}
