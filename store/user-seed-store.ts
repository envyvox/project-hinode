import { UserWithSeed, getUserSeeds } from "@/data-access/seed";
import { create } from "zustand";

type UserSeedState = {
  loading: boolean;
  userSeeds: UserWithSeed[];
  getUserSeeds: (userId: string) => void;
};

export const useUserSeedStore = create<UserSeedState>((set) => ({
  loading: true,
  userSeeds: [],
  getUserSeeds: async (userId: string) => {
    set({ loading: true });

    const userSeeds = await getUserSeeds(userId);

    set({ userSeeds: userSeeds, loading: false });
  },
}));
