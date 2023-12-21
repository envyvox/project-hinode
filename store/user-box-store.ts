import { getUserBoxes } from "@/services/data-access/box";
import { UserBoxes } from "@prisma/client";
import { create } from "zustand";

type UserBoxState = {
  loading: boolean;
  userBoxes: UserBoxes[];
  getUserBoxes: (userId: string) => Promise<void>;
};

export const useUserBoxStore = create<UserBoxState>((set) => ({
  loading: true,
  userBoxes: [],
  getUserBoxes: async (userId: string) => {
    set({ loading: true });

    const UserBoxes = await getUserBoxes(userId);

    set({ userBoxes: UserBoxes, loading: false });
  },
}));
