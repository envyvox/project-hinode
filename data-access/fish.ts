"use server";

import prisma from "@/lib/prisma";
import { shuffle } from "@/util/shuffle";
import {
  Fish,
  FishRarity,
  Season,
  TimesDay,
  UserFish,
  Weather,
} from "@prisma/client";

export type UserFishIncluded = {
  fish: Fish;
} & UserFish;

/**
 * Get user fish
 * @param userId User id
 * @returns User fish model array
 */
export async function getUserFish(userId: string): Promise<UserFishIncluded[]> {
  return await prisma.userFish.findMany({
    where: {
      userId: userId,
      amount: {
        gt: 0,
      },
    },
    include: {
      fish: true,
    },
    orderBy: {
      fish: {
        name: "asc",
      },
    },
  });
}

/**
 * Get random fish based on provided params
 * @param rarity Fish rarity
 * @param weather Weather
 * @param timesDay Times day
 * @param season Season
 * @returns Random fish
 */
export async function getRandomFishWithParams(
  rarity: FishRarity,
  weather: Weather,
  timesDay: TimesDay,
  season: Season,
): Promise<Fish> {
  const fish = await prisma.fish.findMany({
    where: {
      rarity: rarity,
      catchWeather: {
        in: [Weather.Any, weather],
      },
      catchTimesDay: {
        in: [TimesDay.Any, timesDay],
      },
      catchSeason: {
        hasSome: [Season.Any, season],
      },
    },
  });

  return shuffle(fish)[0];
}

/**
 * Adds fish to user
 * @param userId User id
 * @param fishId Fish id
 * @param amount Amount
 * @returns Updated user fish model
 */
export async function addFishToUser(
  userId: string,
  fishId: string,
  amount: number,
): Promise<UserFish> {
  return await prisma.userFish.upsert({
    where: {
      userId_fishId: {
        userId: userId,
        fishId: fishId,
      },
    },
    update: {
      amount: {
        increment: amount,
      },
    },
    create: {
      userId: userId,
      fishId: fishId,
      amount: amount,
    },
  });
}

/**
 * Remove fish from user
 * @param userId User id
 * @param fishId Fish id
 * @param amount Amount
 * @returns Updated user fish model
 */
export async function removeFishFromUser(
  userId: string,
  fishId: string,
  amount: number,
): Promise<UserFish> {
  return await prisma.userFish.update({
    where: {
      userId_fishId: {
        userId: userId,
        fishId: fishId,
      },
    },
    data: {
      amount: {
        decrement: amount,
      },
    },
  });
}

/**
 * Removes all fish from user
 * @param userId User id
 */
export async function removeAllFishFromUser(userId: string) {
  await prisma.userFish.deleteMany({
    where: { userId: userId },
  });
}
