"use server";

import prisma from "@/lib/prisma";
import { Weather, WorldState } from "@prisma/client";

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
 */
const updateWeather = async (
  weatherToday: Weather,
  weatherTomorrow: Weather,
) => {
  await prisma.worldState.updateMany({
    data: {
      weatherToday: weatherToday,
      weatherTomorrow: weatherTomorrow,
    },
  });
};

export { getWorldState, updateWeather };
