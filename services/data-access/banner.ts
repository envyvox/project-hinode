"use server";

import { Banner, BannerRarity, UserBanner } from "@prisma/client";

import prisma from "@/lib/prisma";

export type UserBannerIncluded = {
  banner: Banner;
} & UserBanner;

/**
 * Retrieves banners based on the given rarities.
 *
 * @param {BannerRarity[]} rarities - The rarities to filter by.
 * @return {Promise<Banner[]>} A promise that resolves to an array of banners.
 */
const getBanners = async (rarities: BannerRarity[]): Promise<Banner[]> => {
  return await prisma.banner.findMany({
    where: {
      rarity: {
        in: rarities,
      },
    },
    orderBy: [
      {
        rarity: "asc",
      },
    ],
  });
};

/**
 * Updates the isActive property of a user banner in the database.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} bannerId - The ID of the banner.
 * @param {boolean} isActive - The new value for the isActive property.
 * @return {Promise<UserBanner>} A Promise that resolves to the updated UserBanner object.
 */
const toggleUserBanner = async (
  userId: string,
  bannerId: string,
  isActive: boolean
) => {
  return await prisma.userBanner.update({
    where: {
      userId_bannerId: {
        userId: userId,
        bannerId: bannerId,
      },
    },
    data: {
      isActive: isActive,
    },
  });
};

/**
 * Retrieves the user banners for a given user ID.
 *
 * @param {string} userId - The ID of the user.
 * @return {Promise<UserBannerIncluded[]>} A Promise that resolves to an array of user banners, including the associated banner information.
 */
const getUserBanners = async (
  userId: string
): Promise<UserBannerIncluded[]> => {
  return await prisma.userBanner.findMany({
    where: {
      userId: userId,
    },
    include: {
      banner: true,
    },
    orderBy: [
      {
        banner: {
          rarity: "desc",
        },
      },
    ],
  });
};

/**
 * Retrieves the active user banner for the specified user ID.
 *
 * @param {string} userId - The ID of the user.
 * @return {Promise<UserBannerIncluded>} A promise that resolves to the active user banner.
 */
const getUserActiveBanner = async (
  userId: string
): Promise<UserBannerIncluded> => {
  return await prisma.userBanner.findFirstOrThrow({
    where: {
      userId: userId,
      isActive: true,
    },
    include: {
      banner: true,
    },
  });
};

/**
 * Add a banner to a user.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} bannerId - The ID of the banner.
 * @return {Promise<UserBanner>} A promise that resolves to the created UserBanner object.
 */
const addBannerToUser = async (
  userId: string,
  bannerId: string
): Promise<UserBanner> => {
  return await prisma.userBanner.create({
    data: {
      userId: userId,
      bannerId: bannerId,
      isActive: false,
    },
  });
};

export {
  getBanners,
  getUserBanners,
  toggleUserBanner,
  getUserActiveBanner,
  addBannerToUser,
};
