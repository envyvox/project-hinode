"use server";

import prisma from "@/lib/prisma";
import { Season } from "@prisma/client";

export type UserWithSeed = {
  seed: {
    id: string;
    name: string;
    season: Season;
    growthDays: number;
    reGrowthDays: number;
    isMultiply: boolean;
    price: number;
  };
} & {
  userId: string;
  seedId: string;
  amount: bigint;
};

/**
 * Get user seeds
 * @param userId User id
 * @returns User seeds model array
 */
export async function getUserSeeds(userId: string): Promise<UserWithSeed[]> {
  return await prisma.userSeeds.findMany({
    where: {
      userId: userId,
    },
    include: {
      seed: true,
    },
  });
}
