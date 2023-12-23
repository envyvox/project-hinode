import { Currency, Location, Season } from "@prisma/client";

export const ReactQueryKeys = {
  users: ["users"],
  products: ["products"],
  worldState: ["world-state"],
  lotteryUsers: ["lottery-users"],
  seeds: (season: Season) => ["seeds", season],
  transits: (departure: Location) => ["transits", departure],
  userLottery: (userId: string) => ["lottery-users", "user-lottery", userId],
  userBanners: (userId: string) => ["user-banners", userId],
  userActiveBanner: (userId: string) => ["user-active-banner", userId],
  userBoxes: (userId: string) => ["user-boxes", userId],
  userCrops: (userId: string) => ["user-crops", userId],
  userCurrencies: (userId: string) => ["user-currencies", userId],
  userCurrency: (userId: string, currency: Currency) => [
    "user-currency",
    userId,
    currency,
  ],
  userFish: (userId: string) => ["user-fish", userId],
  userGatherings: (userId: string) => ["user-gatherings", userId],
  userProducts: (userId: string) => ["user-products", userId],
  userSeasonFish: (userId: string, season: Season) => [
    "user-season-fish",
    userId,
    season,
  ],
  userSeeds: (userId: string) => ["user-seeds", userId],
  userTitles: (userId: string) => ["user-titles", userId],
};
