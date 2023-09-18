import * as threadActions from "@/lib/actions/thread.actions";
import { CreateThreadParams, FetchThreadsParams } from "@/types/Thread";
import { Thread } from "@prisma/client";
import { useRouter } from "next/navigation";
import { create, useStore } from "zustand";
import useUserStore from "./userStore";

type feedStore = {
  threads: Thread[];
  totalCount: number;
  deleteThread: () => void;
  createThread: () => void;
  fetchThreads: (params: FetchThreadsParams) => void;
  setThreads: (newThreads: Thread[]) => void;
};

const deleteThread = ({
  path,
  authorId,
  threadId,
}: {
  path: string;
  authorId: string;
  threadId: string;
}) => {
  const { setThreads, threads } = useFeedStore.getState();
  const thread = threads.find((thread) => thread.id === threadId);
  const threadIndex = threads.indexOf(thread);
  console.log({ thread, threadIndex });
  if (!thread) return;

  thread.isDeleted = true;
  threads[threadIndex] = thread;
  setThreads(threads);

  threadActions.removeThread({ path, authorId, threadId });
  if (path.includes("thread")) useRouter().push("/");
};

const fetchThreads = async (params: FetchThreadsParams) => {
  const { setThreads } = useFeedStore.getState();
  setThreads([]);
  const startTime = performance.now();

  let { threads, count, isLastPage } = await threadActions.fetchThreads(params);

  const endTime = performance.now();
  const elapsedTime = endTime - startTime;
  console.log(`fetchThreads took ${elapsedTime} milliseconds.`);

  setThreads(threads);
};

const createThread = async (params: CreateThreadParams) => {
  const { setThreads, threads } = useFeedStore.getState();
  const { currentUser } = useUserStore.getState();

  const createdThread = await threadActions.createThread(params);
  createdThread.author = currentUser;
  console.log({ currentUser });

  setThreads([createdThread, ...threads]);
};

const useFeedStore = create<feedStore>((set) => ({
  threads: [],
  totalCount: 0,
  deleteThread,
  fetchThreads,
  createThread,
  setThreads: (newThreads: Thread[]) => set(() => ({ threads: newThreads })),
}));

export default useFeedStore;
