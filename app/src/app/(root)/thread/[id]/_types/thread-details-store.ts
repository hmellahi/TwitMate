import { FetchThreadsParams } from "@/types/thread";
import { Thread } from "@prisma/client";

export type threadDetailsStore = {
  threads: Thread[];
  totalCount: number;
  isRepliesLoading: boolean;
  deleteThread: () => Promise<void>;
  createThread: () => Promise<void>;
  setIsRepliesLoading: (value: boolean) => Promise<void>;
  fetchReplies: (params: FetchThreadsParams, clearOldList?: boolean) => void;
  setThreads: (newThreads: Thread[]) => void;
};
