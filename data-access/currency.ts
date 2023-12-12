"use server";

import prisma from "@/lib/prisma";
import { Currency, UserCurrency } from "@prisma/client";

/**
 * Get user currencies
 * @param userId User id
 * @returns User currency model array
 */
export async function getUserCurrencies(
  userId: string,
): Promise<UserCurrency[]> {
  return await prisma.userCurrency.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      currency: "asc",
    },
  });
}

/**
 * Get user currency
 * @param userId User id
 * @param currency Currency
 * @returns User currency model
 */
export async function getUserCurrency(
  userId: string,
  currency: Currency,
): Promise<UserCurrency> {
  return await prisma.userCurrency.findUniqueOrThrow({
    where: {
      userId_currency: {
        userId: userId,
        currency: currency,
      },
    },
  });
}

/**
 * Adds currency to provided user
 * @param userId User id
 * @param currency Currency type
 * @param amount Amount
 */
export async function addCurrencyToUser(
  userId: string,
  currency: Currency,
  amount: number,
) {
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
}

/**
 * Removes currency from provided user
 * @param userId User id
 * @param currency Currency type
 * @param amount Amount
 */
export async function removeCurrencyFromUser(
  userId: string,
  currency: Currency,
  amount: number,
) {
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
}
