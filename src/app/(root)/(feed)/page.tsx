import { fetchThreads } from "@/src/lib/actions/thread.actions";
import { currentUser, useOrganizationList, useUser } from "@clerk/nextjs";
import { ThreadsList } from "../../../components/shared/";
import PostThread from "@/src/components/forms/PostThread";
import { fetchUser } from "@/src/lib/actions/user.actions";
import { useStore } from "zustand";
import useFeedStore from "@/src/state/feedsStore";
import ThreadsListWrapper from "@/src/components/shared/ThreadsListWrapper";
import * as threadActions from "@/src/lib/actions/thread.actions";
import useUserStore from "@/src/state/userStore";
import Feed from "./_components/feed";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;

  const [userInfo, initialThreadsData] = await Promise.all([
    fetchUser(user.id),
    threadActions.fetchThreads({
      userId: user.id,
      path: "/",
    }),
  ]);

  if (!userInfo) return null;

  return <Feed user={userInfo} initialThreadsData={initialThreadsData} />;
}
