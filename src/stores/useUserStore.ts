import { create } from "zustand";

export interface User {
  name: string;
  email: string;
}

interface UserStore {
  user: User | null;
  setUser: (userObj: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser(userObj) {
    set({ user: userObj });
  },
}));
