"use server";

import { Location, User } from "@prisma/client";
import prisma from "@/lib/prisma";
import getXpRequiredToLevel from "@/util/get-xp-required-to-lvl";

const getUser = async (email: string): Promise<User> => {
  return await prisma.user.findUniqueOrThrow({ where: { email: email } });
};

const getUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany({
    orderBy: [
      {
        level: "desc",
      },
      {
        xp: "desc",
      },
    ],
  });
};

const addXpToUser = async (userId: string, amount: number): Promise<User> => {
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      xp: {
        increment: amount,
      },
    },
  });

  const xpRequired = getXpRequiredToLevel(updatedUser.level + 1);

  if (updatedUser.xp > xpRequired) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        level: {
          increment: 1,
        },
      },
    });

    // TODO: add level up rewards
  }

  return updatedUser;
};

const updateUserLocation = async (
  userId: string,
  location: Location,
): Promise<User> => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      location: location,
    },
  });
};

export { getUser, getUsers, addXpToUser, updateUserLocation };
