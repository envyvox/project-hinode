"use server";

import prisma from "@/lib/prisma";
import { Title, UserTitle } from "@prisma/client";

/**
 * Retrieves the titles of a user.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise<UserTitle[]>} - A promise that resolves to an array of user titles.
 */
const getUserTitles = async (userId: string): Promise<UserTitle[]> => {
  return await prisma.userTitle.findMany({
    where: {
      userId: userId,
    },
  });
};

/**
 * Adds a title to a user.
 *
 * @param {string} userId - The ID of the user.
 * @param {Title} title - The title to be added.
 * @return {Promise<UserTitle>} - A promise that resolves to the created UserTitle.
 */
const addTitleToUser = async (
  userId: string,
  title: Title,
): Promise<UserTitle> => {
  return await prisma.userTitle.create({
    data: {
      userId: userId,
      title: title,
    },
  });
};

export { getUserTitles, addTitleToUser };
