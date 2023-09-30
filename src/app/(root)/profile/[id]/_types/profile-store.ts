import { FetchThreadsParams } from "@/types/thread";
import { Thread } from "@prisma/client";

export type profileStore = {
  threads: Thread[];
  totalCount: number;
  deleteThread: () => Promise<void>;
  createThread: () => Promise<void>;
  setIsThreadsLoading: (value: boolean) => Promise<void>;
  fetchUserThreads: (params: FetchThreadsParams, clearOldList?: boolean) => void;
  setThreads: (newThreads: Thread[]) => void;
};
