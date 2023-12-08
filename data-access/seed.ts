"use server";

import prisma from "@/lib/prisma";
import { Seed, UserSeeds } from "@prisma/client";

export type UserWithSeed = {
  seed: Seed;
} & UserSeeds;

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