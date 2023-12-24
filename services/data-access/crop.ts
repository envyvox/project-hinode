"use server";

import { Crop, UserCrops } from "@prisma/client";

import prisma from "@/lib/prisma";

export type UserCropIncluded = {
  crop: Crop;
} & UserCrops;

/**
 * Get user crops
 * @param userId User id
 * @returns User crops model array
 */
const getUserCrops = async (userId: string): Promise<UserCropIncluded[]> => {
  return await prisma.userCrops.findMany({
    where: {
      userId: userId,
      amount: {
        gt: 0,
      },
    },
    include: {
      crop: true,
    },
    orderBy: {
      crop: {
        name: "asc",
      },
    },
  });
};

/**
 * Retrieves a crop by its seed ID.
 *
 * @param {string} seedId - The ID of the seed to retrieve the crop for.
 * @return {Promise<Crop>} - A promise that resolves to the retrieved crop.
 */
const getCropBySeedId = async (seedId: string): Promise<Crop> => {
  return await prisma.crop.findUniqueOrThrow({
    where: {
      seedId: seedId,
    },
  });
};

/**
 * Adds a user crop to the database or updates the amount if the user crop already exists.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} cropId - The ID of the crop.
 * @param {number} amount - The amount of the crop to add or update.
 * @return {Promise<UserCropIncluded>} A promise that resolves to the updated user crop object, including the crop information.
 */
const addCropToUser = async (
  userId: string,
  cropId: string,
  amount: number
): Promise<UserCropIncluded> => {
  return await prisma.userCrops.upsert({
    where: {
      userId_cropId: {
        userId: userId,
        cropId: cropId,
      },
    },
    update: {
      amount: {
        increment: amount,
      },
    },
    create: {
      userId: userId,
      cropId: cropId,
      amount: amount,
    },
    include: {
      crop: true,
    },
  });
};

export { getUserCrops, addCropToUser, getCropBySeedId };
