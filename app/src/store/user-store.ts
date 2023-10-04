import { User } from "@prisma/client";
import { create } from "zustand";

type UserStore = {
  currentUser: User | null;
  setCurrentUser: (newUser: User) => void;
};

const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (newUser: User) => set(() => ({ currentUser: newUser })),
}));

export default useUserStore;
