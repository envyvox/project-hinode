"use server";

import prisma from "@/lib/prisma";
import {
  Gathering,
  GatheringProperty,
  Location,
  UserGathering,
} from "@prisma/client";

export type UserGatheringIncluded = {
  gathering: Gathering;
} & UserGathering;

export type GatheringPropetriesIncluded = {
  properties: GatheringProperty[];
} & Gathering;

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

/**
 * Get all gatherings available in provided location
 * @param location Location
 * @returns Gathering with properties model array
 */
export async function getGatheringsInLocation(
  location: Location,
): Promise<GatheringPropetriesIncluded[]> {
  return await prisma.gathering.findMany({
    where: {
      location: location,
    },
    include: {
      properties: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

/**
 * Adds gathering to user
 * @param userId User id
 * @param gatheringId Gathering id
 * @param amount Amount
 * @returns Created or updated user gathering model
 */
export async function addGatheringToUser(
  userId: string,
  gatheringId: string,
  amount: number,
): Promise<UserGathering> {
  console.log("Adding gathering to user", userId, gatheringId, amount);
  return await prisma.userGathering.upsert({
    where: {
      userId_gatheringId: {
        userId: userId,
        gatheringId: gatheringId,
      },
    },
    update: {
      amount: {
        increment: amount,
      },
    },
    create: {
      userId: userId,
      gatheringId: gatheringId,
      amount: amount,
    },
  });
}
