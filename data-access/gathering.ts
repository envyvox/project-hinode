"use server";

import prisma from "@/lib/prisma";
import { Gathering, UserGathering } from "@prisma/client";

export type UserGatheringIncluded = {
  gathering: Gathering;
} & UserGathering;

/**
 * Get user gatherings
 * @param userId User id
 * @returns User gathering model array
 */
export async function getUserGatherings(
  userId: string,
): Promise<UserGatheringIncluded[]> {
  return await prisma.userGathering.findMany({
    where: {
      userId: userId,
      amount: {
        gt: 0,
      },
    },
    include: {
      gathering: true,
    },
    orderBy: {
      gathering: {
        name: "asc",
      },
    },
  });
}
