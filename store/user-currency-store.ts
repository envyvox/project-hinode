import {
  addCurrencyToUser,
  getUserCurrencies,
  removeCurrencyFromUser,
} from "@/data-access/currency";
import { Currency, UserCurrency } from "@prisma/client";
import { create } from "zustand";
import { useUserStore } from "./user-store";

type UserCurrencyState = {
  userCurrencies: UserCurrency[];
  loading: boolean;
  addCurrencyToUser: (currency: Currency, amount: bigint) => void;
  removeCurrencyFromUser: (currency: Currency, amount: bigint) => void;
  getUserCurrencies: () => void;
};

export const useUserCurrencyStore = create<UserCurrencyState>((set, get) => ({
  userCurrencies: [],
  loading: false,
  addCurrencyToUser: async (currency: Currency, amount: bigint) => {
    set({ loading: true });

    const userCurrencies = get().userCurrencies;
    const userId = userCurrencies[0].userId;

    await addCurrencyToUser(userId, currency, amount);

    const updatedUserCurrencies = userCurrencies.map((userCurrency) => ({
      ...userCurrency,
      amount:
        userCurrency.currency === currency
          ? userCurrency.amount + amount
          : userCurrency.amount,
    }));

    set({ userCurrencies: updatedUserCurrencies, loading: false });
  },
  removeCurrencyFromUser: async (currency: Currency, amount: bigint) => {
    set({ loading: true });

    const userCurrencies = get().userCurrencies;
    const userId = userCurrencies[0].userId;

    await removeCurrencyFromUser(userId, currency, amount);

    const updatedUserCurrencies = userCurrencies.map((userCurrency) => ({
      ...userCurrency,
      amount:
        userCurrency.currency === currency
          ? userCurrency.amount - amount
          : userCurrency.amount,
    }));

    set({ userCurrencies: updatedUserCurrencies, loading: false });
  },
  getUserCurrencies: async () => {
    set({ loading: true });

    const user = useUserStore.getState().user;
    const userCurrencies = await getUserCurrencies(user.id);

    set({ userCurrencies, loading: false });
  },
}));
