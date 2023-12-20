"use server";

import prisma from "@/lib/prisma";
import { Banner, BannerRarity, UserBanner } from "@prisma/client";

type UserBannerIncluded = {
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
 * Retrieves the user banners for a given user ID.
 *
 * @param {string} userId - The ID of the user.
 * @return {Promise<UserBannerIncluded[]>} A Promise that resolves to an array of user banners, including the associated banner information.
 */
const getUserBanners = async (
  userId: string,
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
          rarity: "asc",
        },
      },
    ],
  });
};

export { getBanners, getUserBanners };
