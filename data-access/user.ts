"use server";

import { Location, User } from "@prisma/client";
import prisma from "@/lib/prisma";
import getXpRequiredToLevel from "@/lib/get-xp-required-to-lvl";

/**
 * Get user by email
 * @param email User email
 * @returns User
 */
export async function getUser(email: string): Promise<User> {
  return await prisma.user.findUniqueOrThrow({ where: { email: email } });
}

/**
 * Get all users sorted by level, xp
 * @returns User model array
 */
export async function getUsers(): Promise<User[]> {
  return await prisma.user.findMany({
    orderBy: [{ level: "desc" }, { xp: "desc" }],
  });
}

/**
 * Add xp to user
 * @param userId User id
 * @param amount Xp amount
 * @returns Updated user
 */
export async function addXpToUser(
  userId: string,
  amount: number,
): Promise<User> {
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
}

/**
 * Updates user location
 * @param userId User id
 * @param location New location
 * @returns Updated user
 */
export async function updateUserLocation(
  userId: string,
  location: Location,
): Promise<User> {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      location: location,
    },
  });
}
