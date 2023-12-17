"use server";

import { Location, Title } from "@prisma/client";
import prisma from "@/lib/prisma";
import getXpRequiredToLevel from "@/util/get-xp-required-to-lvl";

export type GameUser = {
  id: string;
  name: string | null;
  displayName: string | null;
  about: string | null;
  image: string | null;
  level: number;
  xp: number;
  location: Location;
  title: Title;
};

/**
 * Selected user fields, this is required for security.
 */
const selectFields: Record<keyof GameUser, true> = {
  id: true,
  name: true,
  displayName: true,
  about: true,
  image: true,
  level: true,
  xp: true,
  location: true,
  title: true,
};

/**
 * Retrieves a user by their email address.
 *
 * @param {string} email - The email address of the user.
 * @return {Promise<GameUser>} A promise that resolves to the user object.
 */
const getUser = async (email: string): Promise<GameUser> => {
  return await prisma.user.findUniqueOrThrow({
    select: selectFields,
    where: { email: email },
  });
};

/**
 * Retrieves all users from the database.
 *
 * @return {Promise<GameUser[]>} A promise that resolves to an array of GameUser objects.
 */
const getUsers = async (): Promise<GameUser[]> => {
  return await prisma.user.findMany({
    select: selectFields,
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

/**
 * Adds experience points to a user.
 *
 * @param {string} userId - The ID of the user.
 * @param {number} amount - The amount of experience points to add.
 * @return {Promise<GameUser>} - A promise that resolves to the updated user object.
 */
const addXpToUser = async (
  userId: string,
  amount: number,
): Promise<GameUser> => {
  const updatedUser = await prisma.user.update({
    select: selectFields,
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
      select: selectFields,
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

/**
 * Updates the location of a user.
 *
 * @param {string} userId - The ID of the user.
 * @param {Location} location - The new location of the user.
 * @return {Promise<GameUser>} - A promise that resolves to the updated user object.
 */
const updateUserLocation = async (
  userId: string,
  location: Location,
): Promise<GameUser> => {
  return await prisma.user.update({
    select: selectFields,
    where: {
      id: userId,
    },
    data: {
      location: location,
    },
  });
};

/**
 * Updates the title of a user.
 *
 * @param {string} userId - The ID of the user.
 * @param {Title} title - The new title of the user.
 * @return {Promise<User>} The updated user.
 */
const updateUserTitle = async (
  userId: string,
  title: Title,
): Promise<GameUser> => {
  return await prisma.user.update({
    select: selectFields,
    where: {
      id: userId,
    },
    data: {
      title: title,
    },
  });
};

export { getUser, getUsers, addXpToUser, updateUserLocation, updateUserTitle };
