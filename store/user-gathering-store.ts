import {
  UserGatheringIncluded,
  getUserGatherings,
} from "@/services/data-access/gathering";
import { create } from "zustand";

type UserGatheringState = {
  loading: boolean;
  userGatherings: UserGatheringIncluded[];
  getUserGatherings: (userId: string) => void;
};

export const useUserGatheringStore = create<UserGatheringState>((set) => ({
  loading: true,
  userGatherings: [],
  getUserGatherings: async (userId: string) => {
    set({ loading: true });

    const userGatherings = await getUserGatherings(userId);

    set({ userGatherings: userGatherings, loading: false });
  },
}));
