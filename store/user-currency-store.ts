import {
  addCurrencyToUser,
  getUserCurrencies,
  removeCurrencyFromUser,
} from "@/data-access/currency";
import { Currency, UserCurrency } from "@prisma/client";
import { create } from "zustand";

type UserCurrencyState = {
  userCurrencies: UserCurrency[];
  loading: boolean;
  addCurrencyToUser: (currency: Currency, amount: number) => void;
  removeCurrencyFromUser: (currency: Currency, amount: number) => void;
  getUserCurrencies: (userId: string) => void;
};

export const useUserCurrencyStore = create<UserCurrencyState>((set, get) => ({
  userCurrencies: [],
  loading: true,
  addCurrencyToUser: async (currency: Currency, amount: number) => {
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
  removeCurrencyFromUser: async (currency: Currency, amount: number) => {
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
  getUserCurrencies: async (userId: string) => {
    set({ loading: true });

    const userCurrencies = await getUserCurrencies(userId);

    set({ userCurrencies, loading: false });
  },
}));
