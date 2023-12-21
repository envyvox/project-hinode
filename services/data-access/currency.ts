"use server";

import prisma from "@/lib/prisma";
import { Currency, UserCurrency } from "@prisma/client";

/**
 * Get user currencies
 * @param userId User id
 * @returns User currency model array
 */
const getUserCurrencies = async (userId: string): Promise<UserCurrency[]> => {
  console.log("get user currencies", userId);
  return await prisma.userCurrency.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      currency: "asc",
    },
  });
};

/**
 * Get user currency
 * @param userId User id
 * @param currency Currency
 * @returns User currency model
 */
const getUserCurrency = async (
  userId: string,
  currency: Currency,
): Promise<UserCurrency> => {
  return await prisma.userCurrency.findUniqueOrThrow({
    where: {
      userId_currency: {
        userId: userId,
        currency: currency,
      },
    },
  });
};

/**
 * Adds currency to provided user
 * @param userId User id
 * @param currency Currency type
 * @param amount Amount
 */
const addCurrencyToUser = async (
  userId: string,
  currency: Currency,
  amount: number,
) => {
  await prisma.userCurrency.upsert({
    where: {
      userId_currency: {
        userId: userId,
        currency: currency,
      },
    },
    update: {
      amount: {
        increment: amount,
      },
    },
    create: {
      userId: userId,
      currency: currency,
      amount: amount,
    },
  });
};

/**
 * Removes currency from provided user
 * @param userId User id
 * @param currency Currency type
 * @param amount Amount
 */
const removeCurrencyFromUser = async (
  userId: string,
  currency: Currency,
  amount: number,
) => {
  await prisma.userCurrency.update({
    where: {
      userId_currency: {
        userId: userId,
        currency: currency,
      },
    },
    data: {
      amount: { decrement: amount },
    },
  });
};

export {
  getUserCurrencies,
  getUserCurrency,
  addCurrencyToUser,
  removeCurrencyFromUser,
};
