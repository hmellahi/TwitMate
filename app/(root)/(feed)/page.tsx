import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser, useOrganizationList } from "@clerk/nextjs";
import { ThreadsList } from "../../../components/shared/ThreadsList";
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

  const [userInfo, initialThreadsData] = await Promise.all([
    fetchUser(user.id),
    threadActions.fetchThreads({
      userId: user.id,
      path: "/",
    }),
  ]);

  if (!userInfo) return null;

  let { createThread } = useFeedStore.getState();

  return (
    <>
      <PostThread
        userId={userInfo?.id}
        userImage={userInfo.image}
        createThreadHandler={createThread}
        className="mb-4"
      />
      <ThreadsListWrapper
        user={userInfo}
        initialThreadsData={initialThreadsData}
      ></ThreadsListWrapper>
    </>
  );
}