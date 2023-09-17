import { Thread } from "@prisma/client";
import { create } from "zustand";

type threadsStore = {
  threads: Thread[];
  deleteThread: () => void;
};

const deleteThread = () => {};

const useThreadsStore = create<threadsStore>((set) => ({
  threads: [],
  deleteThread,
}));

export default useThreadsStore;
