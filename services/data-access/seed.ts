"use server";

import { Crop, Season, Seed, UserSeeds } from "@prisma/client";

import prisma from "@/lib/prisma";

export type UserSeedIncluded = {
  seed: Seed;
} & UserSeeds;

export type SeedCropIncluded = {
  crop: Crop | null;
} & Seed;

/**
 * Retrieves a list of user seeds that belong to a specific user.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise<UserSeedIncluded[]>} - A promise that resolves to an array of UserSeedIncluded objects.
 */
const getUserSeeds = async (userId: string): Promise<UserSeedIncluded[]> => {
  return await prisma.userSeeds.findMany({
    where: {
      userId: userId,
      amount: {
        gt: 0,
      },
    },
    include: {
      seed: true,
    },
    orderBy: {
      seed: {
        name: "asc",
      },
    },
  });
};

/**
 * Retrieves the seeds, including the associated crops
 *
 * @param {Season} season - The season to filter seeds by.
 * @return {Promise<SeedCropIncluded[]>} A promise that resolves to an array of SeedCropIncluded objects.
 */
const getSeeds = async (season: Season): Promise<SeedCropIncluded[]> => {
  return await prisma.seed.findMany({
    where: {
      season: season,
    },
    include: {
      crop: true,
    },
    orderBy: {
      name: "asc",
    },
  });
};

/**
 * Upserts a user's seed by adding the specified amount to the existing amount or creating a new user seed entry if it doesn't exist.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} seedId - The ID of the seed.
 * @param {number} amount - The amount to add to the existing seed amount.
 * @return {Promise<UserSeeds>} - The updated or newly created user seed entry.
 */
const addSeedToUser = async (
  userId: string,
  seedId: string,
  amount: number
): Promise<UserSeeds> => {
  return await prisma.userSeeds.upsert({
    where: {
      userId_seedId: {
        userId: userId,
        seedId: seedId,
      },
    },
    update: {
      amount: {
        increment: amount,
      },
    },
    create: {
      userId: userId,
      seedId: seedId,
      amount: amount,
    },
  });
};

/**
 * Removes a specified amount of seed from a user.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} seedId - The ID of the seed.
 * @param {number} amount - The amount of seed to remove.
 * @return {Promise<UserSeeds>} The updated user seeds object.
 */
const removeSeedFromUser = async (
  userId: string,
  seedId: string,
  amount: number
): Promise<UserSeeds> => {
  return await prisma.userSeeds.update({
    where: {
      userId_seedId: {
        userId: userId,
        seedId: seedId,
      },
    },
    data: {
      amount: {
        decrement: amount,
      },
    },
  });
};

export { getUserSeeds, getSeeds, addSeedToUser, removeSeedFromUser };
