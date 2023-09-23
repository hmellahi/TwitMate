import { User } from "@prisma/client";
import { create } from "zustand";

type feedStore = {
  currentUser: User | null;
  setCurrentUser: (newUser: User) => void;
};

const useUserStore = create<feedStore>((set) => ({
  currentUser: null,
  setCurrentUser: (newUser: User) => set(() => ({ currentUser: newUser })),
}));

export default useUserStore;
