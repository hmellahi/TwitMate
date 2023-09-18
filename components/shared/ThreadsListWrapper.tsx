"use client";
import React, { useEffect } from "react";
import { ThreadsList } from "./ThreadsList";
import { useStore } from "zustand";
import useFeedStore from "@/state/feedsStore";
import { User } from "@prisma/client";
import * as threadActions from "@/lib/actions/thread.actions";
import PostThread from "../forms/PostThread";
import useUserStore from "@/state/userStore";

export default function ThreadsListWrapper({ user }: { user: User }) {
  let { threads, fetchThreads, deleteThread, createThread } =
    useStore(useFeedStore);

  async function fetchData() {
    await fetchThreads({
      userId: user.id,
      path: "/",
    });
  }

  useEffect(() => {
    useUserStore.setState({ currentUser: user });
    fetchData();
  }, []);

  return (
    <>
      <div className="mb-4">
        <PostThread
          userId={user?.id}
          userImage={user.image}
          createThreadHandler={createThread}
        />
      </div>
      <ThreadsList
        user={user}
        threads={threads}
        path="/"
        onDelete={deleteThread}
      ></ThreadsList>
    </>
  );
}
