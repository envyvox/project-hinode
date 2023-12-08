import { UserWithFish, getUserFish } from "@/data-access/fish";
import { create } from "zustand";

type UserFishState = {
  loading: boolean;
  userFish: UserWithFish[];
  getUserFish: (userId: string) => void;
};

export const useUserFishStore = create<UserFishState>((set) => ({
  loading: true,
  userFish: [],
  getUserFish: async (userId: string) => {
    set({ loading: true });

    const userFish = await getUserFish(userId);

    set({ userFish: userFish, loading: false });
  },
}));
