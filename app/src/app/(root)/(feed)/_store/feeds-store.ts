import * as threadActions from "@/server-actions/thread/thread.actions";
import { CreateThreadParams, FetchThreadsParams } from "@/types/thread";
import { Thread } from "@prisma/client";
import { useRouter } from "next/navigation";
import { create } from "zustand";
import useUserStore from "../../../../store/user-store";

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
  let { totalCount, threads } = useFeedStore.getState();
  const thread = threads.find((thread) => thread.id === threadId);
  const threadIndex = threads.indexOf(thread);
  if (!thread) return;

  threads = [...threads.slice(0, threadIndex), ...threads.slice(threadIndex + 1, threads.length)];

  useFeedStore.setState({ totalCount: --totalCount, threads });

  threadActions.removeThread({ path, authorId, threadId });
  if (path.includes("thread")) useRouter().push("/");
};

const fetchThreads = async (params: FetchThreadsParams, clearOldList: boolean = false) => {
  const { threads, setIsThreadsLoading, setThreads } = useFeedStore.getState();

  setIsThreadsLoading(true);

  if (clearOldList) {
    setThreads([]);
  }

  let { threads: newThreads, totalCount } = await threadActions.fetchThreads({
    ...params,
    sortByLikesAndReplies: true,
  });

  if (!clearOldList && threads) {
    newThreads = [...threads, ...newThreads];
  }

  useFeedStore.setState({ totalCount, threads: newThreads });
  setIsThreadsLoading(false);

  return { threads, totalCount };
};

const createThread = async (params: CreateThreadParams) => {
  const { setThreads, threads, totalCount } = useFeedStore.getState();
  const { currentUser } = useUserStore.getState();
  const { localImageUrl } = params;

  const createdThread = await threadActions.createThread(params);
  createdThread.author = currentUser;

  if (localImageUrl) {
    createdThread.images = [{ imageUrl: localImageUrl }];
  }

  setThreads([createdThread, ...threads]);
  useFeedStore.setState({ totalCount: totalCount + 1 });
};

const useFeedStore = create<feedStore>((set) => ({
  threads: null,
  totalCount: 0,
  isThreadsLoading: true,
  deleteThread,
  fetchThreads,
  createThread,
  setThreads: (newThreads: Thread[]) => set(() => ({ threads: newThreads })),
  setIsThreadsLoading: (value: boolean) => set(() => ({ isThreadsLoading: value })),
}));

export default useFeedStore;
