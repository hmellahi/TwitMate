import * as threadActions from "@/server-actions/thread/thread.actions";
import { CreateThreadParams, FetchThreadsParams } from "@/types/Thread";
import { Thread } from "@prisma/client";
import { useRouter } from "next/navigation";
import { create, useStore } from "zustand";
import useUserStore from "../../../../store/userStore";
import { PostDeletedToast } from "@/lib/toasts/showPostDeletedToast";

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

  threads = [
    ...threads.slice(0, threadIndex),
    ...threads.slice(threadIndex + 1, threads.length),
  ];

  setThreads(threads);

  threadActions.removeThread({ path, authorId, threadId });
  if (path.includes("thread")) useRouter().push("/");
};

const fetchThreads = async (
  params: FetchThreadsParams,
  clearOldList: boolean = false
) => {
  const { threads, setIsThreadsLoading, setThreads } = useFeedStore.getState();

  if (clearOldList) {
    setThreads([]);
  }

  setIsThreadsLoading(true);

  let { threads: newThreads, totalCount } = await threadActions.fetchThreads(
    params
  );


  if (!clearOldList && threads) {
    newThreads = [...threads, ...newThreads];
  }

  useFeedStore.setState({ totalCount, threads: newThreads });
  setIsThreadsLoading(false);

  return { threads, totalCount };
};

const createThread = async (params: CreateThreadParams) => {
  const { setThreads, threads } = useFeedStore.getState();
  const { currentUser } = useUserStore.getState();
  const { images } = params;

  const createdThread = await threadActions.createThread(params);
  createdThread.author = currentUser;
  if (images?.length) {
    createdThread.images = [{ imageUrl: images[0] }];
  }

  setThreads([createdThread, ...threads]);
};

const useFeedStore = create<feedStore>((set) => ({
  threads: null,
  totalCount: 0,
  isThreadsLoading: true,
  deleteThread,
  fetchThreads,
  createThread,
  setThreads: (newThreads: Thread[]) => set(() => ({ threads: newThreads })),
  setIsThreadsLoading: (value: boolean) =>
    set(() => ({ isThreadsLoading: value })),
}));

export default useFeedStore;
