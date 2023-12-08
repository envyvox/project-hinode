import { UserWithProduct, getUserProducts } from "@/data-access/product";
import { create } from "zustand";

type UserProductState = {
  loading: boolean;
  userProducts: UserWithProduct[];
  getUserProducts: (userId: string) => void;
};

export const useUserProductStore = create<UserProductState>((set) => ({
  loading: true,
  userProducts: [],
  getUserProducts: async (userId: string) => {
    set({ loading: true });

    const userProducts = await getUserProducts(userId);

    set({ userProducts: userProducts, loading: false });
  },
}));
