"use server";

import prisma from "@/lib/prisma";
import { Season, Weather, WorldState } from "@prisma/client";

/**
 * Retrieves the current state of the world.
 *
 * @return {Promise<WorldState>} A promise that resolves to the current state of the world.
 */
const getWorldState = (): Promise<WorldState> => {
  return prisma.worldState.findFirstOrThrow();
};

/**
 * Updates the weather for today and tomorrow in the world state.
 *
 * @param {Weather} weatherToday - The weather condition for today.
 * @param {Weather} weatherTomorrow - The weather condition for tomorrow.
 * @return {Promise<void>} - A promise that resolves when the update is complete.
 */
const updateWeather = async (
  weatherToday: Weather,
  weatherTomorrow: Weather,
): Promise<void> => {
  await prisma.worldState.updateMany({
    data: {
      weatherToday: weatherToday,
      weatherTomorrow: weatherTomorrow,
    },
  });
};

/**
 * Updates the season of the world state.
 *
 * @param {Season} season - The new season to update the world state with.
 * @return {Promise<void>} - A promise that resolves when the update is complete.
 */
const updateSeason = async (season: Season): Promise<void> => {
  await prisma.worldState.updateMany({
    data: {
      season: season,
    },
  });
};

export { getWorldState, updateWeather, updateSeason };
