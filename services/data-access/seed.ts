"use server";

import prisma from "@/lib/prisma";
import { Crop, Seed, UserSeeds } from "@prisma/client";

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
 * @return {Promise<SeedCropIncluded[]>} A promise that resolves to an array of SeedCropIncluded objects.
 */
const getSeeds = async (): Promise<SeedCropIncluded[]> => {
  return await prisma.seed.findMany({
    include: {
      crop: true,
    },
    orderBy: {
      name: "asc",
    },
  });
};

export { getUserSeeds, getSeeds };
