import * as threadActions from "@/lib/actions/thread.actions";
import { CreateThreadParams, FetchThreadsParams } from "@/types/Thread";
import { Thread } from "@prisma/client";
import { useRouter } from "next/navigation";
import { create, useStore } from "zustand";
import useUserStore from "./userStore";

type feedStore = {
  threads: Thread[];
  totalCount: number;
  deleteThread: () => Promise<void>;
  createThread: () => Promise<void>;
  fetchThreads: (params: FetchThreadsParams, clearOldList: boolean) => void;
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
  let { setThreads, threads } = useFeedStore.getState();
  const thread = threads.find((thread) => thread.id === threadId);
  const threadIndex = threads.indexOf(thread);
  if (!thread) return;

  // threads.splice(threadIndex, 1);
  // thread.isDeleted = true
  threads = [...threads.slice(0,threadIndex) , ...threads.slice(threadIndex+1,threads.length)]

  setThreads(threads);

  // threadActions.removeThread({ path, authorId, threadId }); TODO 
  if (path.includes("thread")) useRouter().push("/");
};

const fetchThreads = async (
  params: FetchThreadsParams,
  clearOldList: boolean = true
) => {
  const { setThreads, threads } = useFeedStore.getState();

  if (clearOldList) {
    setThreads([]);
  }

  let { threads: newThreads, totalCount } = await threadActions.fetchThreads(
    params
  );

  if (!clearOldList) {
    newThreads = [...threads, ...newThreads];
  }

  setThreads(newThreads);

  return { threads, totalCount };
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
  threads: null,
  totalCount: 0,
  deleteThread,
  fetchThreads,
  createThread,
  setThreads: (newThreads: Thread[]) => set(() => ({ threads: newThreads })),
}));

export default useFeedStore;
