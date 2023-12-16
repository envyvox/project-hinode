import {
  UserSeedIncluded,
  addSeedToUser,
  getUserSeeds,
} from "@/services/data-access/seed";
import { create } from "zustand";
import { useUserStore } from "./user-store";

type UserSeedState = {
  loading: boolean;
  userSeeds: UserSeedIncluded[];
  getUserSeeds: (userId: string) => void;
  addSeedToUser: (seedId: string, amount: number) => void;
};

export const useUserSeedStore = create<UserSeedState>((set, get) => ({
  loading: true,
  userSeeds: [],
  getUserSeeds: async (userId: string) => {
    set({ loading: true });

    const userSeeds = await getUserSeeds(userId);

    set({ userSeeds: userSeeds, loading: false });
  },
  addSeedToUser: async (seedId: string, amount: number) => {
    set({ loading: true });

    const user = useUserStore.getState().user;
    const userSeeds = get().userSeeds;

    await addSeedToUser(user.id, seedId, amount);

    const updatedUserSeeds = userSeeds.map((userSeed) => ({
      ...userSeed,
      amount:
        userSeed.seedId === seedId ? userSeed.amount + amount : userSeed.amount,
    }));

    set({ userSeeds: updatedUserSeeds, loading: false });
  },
}));
