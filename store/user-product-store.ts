import {
  UserProductIncluded,
  addProductToUser,
  getUserProducts,
} from "@/services/data-access/product";
import { create } from "zustand";
import { useUserStore } from "./user-store";

type UserProductState = {
  loading: boolean;
  userProducts: UserProductIncluded[];
  getUserProducts: (userId: string) => void;
  addProductToUser: (productId: string, amount: number) => void;
};

export const useUserProductStore = create<UserProductState>((set, get) => ({
  loading: true,
  userProducts: [],
  getUserProducts: async (userId: string) => {
    set({ loading: true });

    const userProducts = await getUserProducts(userId);

    set({ userProducts: userProducts, loading: false });
  },
  addProductToUser: async (productId: string, amount: number) => {
    set({ loading: true });

    const user = useUserStore.getState().user;
    const userProducts = get().userProducts;

    await addProductToUser(user.id, productId, amount);

    const updatedUserProducts = userProducts.map((userProduct) => ({
      ...userProduct,
      amount:
        userProduct.productId === productId
          ? userProduct.amount + amount
          : userProduct.amount,
    }));

    set({ userProducts: updatedUserProducts, loading: false });
  },
}));
