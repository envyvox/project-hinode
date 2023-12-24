"use server";

import { UserBoxes } from "@prisma/client";

import prisma from "@/lib/prisma";

/**
 * Get user boxes
 * @param userId User id
 * @returns User box model array
 */
const getUserBoxes = async (userId: string): Promise<UserBoxes[]> => {
  return await prisma.userBoxes.findMany({
    where: {
      userId: userId,
      amount: {
        gt: 0,
      },
    },
    orderBy: {
      box: "asc",
    },
  });
};

export { getUserBoxes };
