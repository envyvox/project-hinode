import { UserCropIncluded, getUserCrops } from "@/services/data-access/crop";
import { create } from "zustand";

type UserCropState = {
  loading: boolean;
  userCrops: UserCropIncluded[];
  getUserCrops: (userId: string) => void;
};

export const useUserCropStore = create<UserCropState>((set) => ({
  loading: true,
  userCrops: [],
  getUserCrops: async (userId: string) => {
    set({ loading: true });

    const userCrops = await getUserCrops(userId);

    set({ userCrops: userCrops, loading: false });
  },
}));
