"use server";

import prisma from "@/lib/prisma";
import { WorldState } from "@prisma/client";

/**
 * Retrieves the current state of the world.
 *
 * @return {Promise<WorldState>} A promise that resolves to the current state of the world.
 */
const getWorldState = (): Promise<WorldState> => {
  return prisma.worldState.findFirstOrThrow();
};

export { getWorldState };
