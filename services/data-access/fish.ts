"use server";

import shuffle from "@/util/shuffle";
import {
  Fish,
  FishRarity,
  Season,
  TimesDay,
  UserFish,
  Weather,
} from "@prisma/client";

import prisma from "@/lib/prisma";

export type UserFishIncluded = {
  fish: Fish;
} & UserFish;

/**
 * Get user fish
 * @param userId User id
 * @returns User fish model array
 */
const getUserFish = async (userId: string): Promise<UserFishIncluded[]> => {
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
    orderBy: [
      {
        fish: {
          rarity: "desc",
        },
      },
      {
        fish: {
          name: "asc",
        },
      },
    ],
  });
};

/**
 * Retrieves a list of user fish for a specific season.
 *
 * @param {string} userId - The ID of the user.
 * @param {Season} season - The season to filter the fish by.
 * @return {Promise<UserFishIncluded[]>} - A promise that resolves to an array of user fish objects.
 */
const getUserSeasonFish = async (
  userId: string,
  season: Season
): Promise<UserFishIncluded[]> => {
  return await prisma.userFish.findMany({
    where: {
      userId: userId,
      amount: {
        gt: 0,
      },
      fish: {
        catchSeason: {
          hasSome: [Season.Any, season],
        },
      },
    },
    include: {
      fish: true,
    },
    orderBy: [
      {
        fish: {
          rarity: "desc",
        },
      },
      {
        fish: {
          name: "asc",
        },
      },
    ],
  });
};

/**
 * Get random fish based on provided params
 * @param rarity Fish rarity
 * @param weather Weather
 * @param timesDay Times day
 * @param season Season
 * @returns Random fish
 */
const getRandomFishWithParams = async (
  rarity: FishRarity,
  weather: Weather,
  timesDay: TimesDay,
  season: Season
): Promise<Fish> => {
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
};

/**
 * Adds fish to user
 * @param userId User id
 * @param fishId Fish id
 * @param amount Amount
 * @returns Updated user fish model
 */
const addFishToUser = async (
  userId: string,
  fishId: string,
  amount: number
): Promise<UserFish> => {
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
};

/**
 * Remove fish from user
 * @param userId User id
 * @param fishId Fish id
 * @param amount Amount
 * @returns Updated user fish model
 */
const removeFishFromUser = async (
  userId: string,
  fishId: string,
  amount: number
): Promise<UserFish> => {
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
};

export {
  getUserFish,
  getRandomFishWithParams,
  addFishToUser,
  removeFishFromUser,
  getUserSeasonFish,
};
