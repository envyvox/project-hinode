"use server";

import prisma from "@/lib/prisma";
import { UserLottery } from "@prisma/client";
import { GameUser } from "./user";

type LotteryUserIncluded = {
  user: GameUser;
} & UserLottery;

/**
 * Retrieves a list of users participating in the lottery.
 *
 * @return {Promise<LotteryUserIncluded[]>} A promise that resolves to an array of UserLottery objects.
 */
const getLotteryUsers = async (): Promise<LotteryUserIncluded[]> => {
  return await prisma.userLottery.findMany({
    include: {
      user: true,
    },
  });
};

/**
 * Retrieves the user's lottery information from the database.
 *
 * @param {string} userId - The ID of the user.
 * @return {Promise<UserLottery | null>} The user's lottery information, or null if no information found.
 */
const getUserLottery = async (userId: string): Promise<UserLottery | null> => {
  return await prisma.userLottery.findFirst({
    where: {
      userId: userId,
    },
  });
};

/**
 * Creates a new lottery user with the given userId.
 *
 * @param {string} userId - The id of the user to create the lottery user for.
 * @return {Promise<UserLottery>} A promise that resolves with the created lottery user.
 */
const createLotteryUser = async (userId: string): Promise<UserLottery> => {
  return await prisma.userLottery.create({
    data: {
      userId: userId,
    },
  });
};

/**
 * Deletes all lottery users.
 *
 * @return {Promise<void>} Promise that resolves when all lottery users are deleted.
 */
const deleteLotteryUsers = async (): Promise<void> => {
  await prisma.userLottery.deleteMany();
};

export {
  getLotteryUsers,
  createLotteryUser,
  getUserLottery,
  deleteLotteryUsers,
};
