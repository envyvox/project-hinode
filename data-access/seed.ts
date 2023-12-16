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
 * Retrieves the user seeds for a given user ID.
 *
 * @param {string} userId - The ID of the user.
 * @return {Promise<UserSeedIncluded[]>} A Promise that resolves to an array of UserSeedIncluded objects representing the user seeds.
 */
export async function getUserSeeds(
  userId: string,
): Promise<UserSeedIncluded[]> {
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
}

/**
 * Retrieves all the seeds including the associated crop.
 *
 * @return {Promise<SeedCropIncluded[]>} A promise that resolves to an array of seeds with the associated crop.
 */
export async function getSeeds(): Promise<SeedCropIncluded[]> {
  return await prisma.seed.findMany({
    include: {
      crop: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}
