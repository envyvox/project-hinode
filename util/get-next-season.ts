import { Season } from "@prisma/client";

/**
 * Returns the next season based on the current season.
 *
 * @param {Season} season - The current season.
 * @return {Season} The next season.
 */
export const getNextSeason = (season: Season): Season => {
  switch (season) {
    case Season.Spring:
      return Season.Summer;
    case Season.Summer:
      return Season.Autumn;
    case Season.Autumn:
      return Season.Winter;
    case Season.Winter:
      return Season.Spring;
    default:
      return Season.Any;
  }
};
