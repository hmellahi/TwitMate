import { CreateThreadParams, FetchThreadsParams } from "@/types/thread";
import { Thread } from "@prisma/client";

export type CommunityStore = {
  threads: Thread[] | null;
  totalCount: number;
  isThreadsLoading: boolean;
  deleteThread: ({
    path,
    authorId,
    threadId,
  }: {
    path: string;
    authorId: string;
    threadId: string;
  }) => void;
  createThread: (params: CreateThreadParams) => Promise<void>;
  fetchThreads: (
    params: FetchThreadsParams,
    clearOldList: boolean
  ) => Promise<{ threads: Thread[]; totalCount: number }>;
  setThreads: (newThreads: Thread[]) => void;
  setIsThreadsLoading: (value: boolean) => void;
};
