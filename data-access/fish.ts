"use server";

import prisma from "@/lib/prisma";
import { Fish, UserFish } from "@prisma/client";

export type UserWithFish = {
  fish: Fish;
} & UserFish;

/**
 * Get user fish
 * @param userId User id
 * @returns User fish model array
 */
export async function getUserFish(userId: string): Promise<UserWithFish[]> {
  return await prisma.userFish.findMany({
    where: {
      userId: userId,
    },
    include: {
      fish: true,
    },
  });
}
