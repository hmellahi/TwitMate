import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser, useOrganizationList } from "@clerk/nextjs";
import { ThreadsList } from "../../components/shared/ThreadsList";
import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { useStore } from "zustand";
import useFeedStore from "@/state/feedsStore";
import ThreadsListWrapper from "@/components/shared/ThreadsListWrapper";
import * as threadActions from "@/lib/actions/thread.actions";
import useUserStore from "@/state/userStore";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo) return null;

  let { threads } = await threadActions.fetchThreads({
    userId: user.id,
    path: "/",
  });

  return (
    <ThreadsListWrapper user={userInfo} initialThreads={threads}></ThreadsListWrapper>
  );
}
