"use server";

import {
  Gathering,
  GatheringProperty,
  Location,
  UserGathering,
} from "@prisma/client";

import prisma from "@/lib/prisma";

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
const getUserGatherings = async (
  userId: string
): Promise<UserGatheringIncluded[]> => {
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
};

/**
 * Get all gatherings available in provided location
 * @param location Location
 * @returns Gathering with properties model array
 */
const getGatheringsInLocation = async (
  location: Location
): Promise<GatheringPropetriesIncluded[]> => {
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
};

/**
 * Adds gathering to user
 * @param userId User id
 * @param gatheringId Gathering id
 * @param amount Amount
 * @returns Created or updated user gathering model
 */
const addGatheringToUser = async (
  userId: string,
  gatheringId: string,
  amount: number
): Promise<UserGathering> => {
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
};

export { getUserGatherings, getGatheringsInLocation, addGatheringToUser };
