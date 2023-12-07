"use server";

import prisma from "@/lib/prisma";

export type UserWithCrop = {
  crop: {
    id: string;
    name: string;
    price: number;
    seedId: string;
  };
} & {
  userId: string;
  cropId: string;
  amount: bigint;
};

/**
 * Get user crops
 * @param userId User id
 * @returns User crops model array
 */
export async function getUserCrops(userId: string): Promise<UserWithCrop[]> {
  return await prisma.userCrops.findMany({
    where: {
      userId: userId,
    },
    include: {
      crop: true,
    },
  });
}
