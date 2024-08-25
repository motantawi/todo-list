import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const userStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userInfo) => set(() => ({ user: userInfo })),
      removeUser: () => set({ user: null }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default userStore;
