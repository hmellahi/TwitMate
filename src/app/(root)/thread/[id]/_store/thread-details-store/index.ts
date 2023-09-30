import * as threadActions from "@/server-actions/thread/thread.actions";
import { CreateThreadParams, FetchThreadsParams } from "@/types/thread";
import { Thread } from "@prisma/client";
import { useRouter } from "next/navigation";
import { create } from "zustand";
import useUserStore from "../../../../../../store/user-store";
import { threadDetailsStore } from "../../_types/thread-details-store";

const deleteThread = ({
  path,
  authorId,
  threadId,
}: {
  path: string;
  authorId: string;
  threadId: string;
}) => {
  let { totalCount, threads } = useThreadDetailsStore.getState();
  const thread = threads.find((thread) => thread.id === threadId);
  const threadIndex = threads.indexOf(thread);
  if (!thread) return;

  threads = [...threads.slice(0, threadIndex), ...threads.slice(threadIndex + 1, threads.length)];

  useThreadDetailsStore.setState({ totalCount: --totalCount, threads });

  threadActions.removeThread({ path, authorId, threadId });
  if (path.includes("thread")) useRouter().push("/");
};

const fetchReplies = async (params: FetchThreadsParams, clearOldList: boolean = false) => {
  const { threads, setIsRepliesLoading, setThreads } = useThreadDetailsStore.getState();

  if (clearOldList) {
    setThreads([]);
  }

  setIsRepliesLoading(true);

  let { threads: newThreads, totalCount } = await threadActions.fetchThreadReplies(params);

  if (!clearOldList && threads) {
    newThreads = [...threads, ...newThreads];
  }

  useThreadDetailsStore.setState({
    totalCount,
    threads: newThreads,
    isRepliesLoading: false,
  });

  return { threads, totalCount };
};

const createThread = async (params: CreateThreadParams) => {
  const { setThreads, threads } = useThreadDetailsStore.getState();
  const { currentUser } = useUserStore.getState();
  const { images } = params;

  const createdThread = await threadActions.createThread(params);
  createdThread.author = currentUser;
  if (images?.length) {
    createdThread.images = [{ imageUrl: images[0] }];
  }

  setThreads([createdThread, ...threads]);
};

const useThreadDetailsStore = create<threadDetailsStore>((set) => ({
  threads: null,
  totalCount: 0,
  isRepliesLoading: true,
  deleteThread,
  fetchReplies,
  createThread,
  setThreads: (newThreads: Thread[]) => set(() => ({ threads: newThreads })),
  setIsRepliesLoading: (value: boolean) => set(() => ({ isRepliesLoading: value })),
}));

export default useThreadDetailsStore;
