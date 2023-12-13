import {
  UserFishIncluded,
  removeFishFromUser,
  getUserFish,
  addFishToUser,
  removeAllFishFromUser,
} from "@/data-access/fish";
import { create } from "zustand";
import { useUserStore } from "./user-store";

type UserFishState = {
  loading: boolean;
  userFish: UserFishIncluded[];
  addFishToUser: (fishId: string, amount: number) => void;
  removeFishFromUser: (fishId: string, amount: number) => void;
  removeAllFishFromUser: () => void;
  getUserFish: (userId: string) => void;
};

export const useUserFishStore = create<UserFishState>((set, get) => ({
  loading: true,
  userFish: [],
  addFishToUser: async (fishId: string, amount: number) => {
    set({ loading: true });

    const userFish = get().userFish;
    const userId = useUserStore.getState().user.id;

    await addFishToUser(userId, fishId, amount);

    const updatedUserFish = userFish.map((uf) => ({
      ...uf,
      amount: uf.fishId === fishId ? uf.amount + amount : uf.amount,
    }));

    set({ userFish: updatedUserFish, loading: false });
  },
  removeAllFishFromUser: async () => {
    set({ loading: true });

    const userId = useUserStore.getState().user.id;

    await removeAllFishFromUser(userId);

    set({ userFish: [], loading: false });
  },
  removeFishFromUser: async (fishId: string, amount: number) => {
    set({ loading: true });

    const userFish = get().userFish;
    const userId = useUserStore.getState().user.id;

    await removeFishFromUser(userId, fishId, amount);

    const updatedUserFish = userFish
      .map((userFish) => ({
        ...userFish,
        amount:
          userFish.fishId === fishId
            ? userFish.amount - amount
            : userFish.amount,
      }))
      .filter((userFish) => userFish.amount > 0);

    set({ userFish: updatedUserFish, loading: false });
  },
  getUserFish: async (userId: string) => {
    set({ loading: true });

    const userFish = await getUserFish(userId);

    set({ userFish: userFish, loading: false });
  },
}));
