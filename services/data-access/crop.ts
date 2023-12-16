"use server";

import prisma from "@/lib/prisma";
import { Crop, UserCrops } from "@prisma/client";

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

export { getUserCrops };