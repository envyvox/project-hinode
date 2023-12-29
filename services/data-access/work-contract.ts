"use server";

import { Location, WorkContract } from "@prisma/client";

import prisma from "@/lib/prisma";

/**
 * Retrieves all work contracts for a given location.
 *
 * @param {Location} location - The location to retrieve work contracts for.
 * @return {Promise<WorkContract[]>} - A promise that resolves to an array of work contracts.
 */
export const getWorkContracts = async (
  location: Location
): Promise<WorkContract[]> => {
  return await prisma.workContract.findMany({
    where: {
      location: location,
    },
  });
};
