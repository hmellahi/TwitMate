import { User } from "@prisma/client";
import { create } from "zustand";

type UserStore = {
  currentUser: User | null;
  currentUserClerkId: string | null;
  setCurrentUser: (newUser: User) => void;
  setCurrentUserClerkId: (newUser: string) => void;
};

const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  currentUserClerkId: null,
  setCurrentUser: (newUser: User) => set(() => ({ currentUser: newUser })),
  setCurrentUserClerkId: (newClerkId: string) => {
    set(() => ({ currentUserClerkId: newClerkId }));
  },
}));

export default useUserStore;
