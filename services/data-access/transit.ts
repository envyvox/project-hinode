"use server";

import { Location, Transit } from "@prisma/client";

import prisma from "@/lib/prisma";

/**
 * Get transits from location
 * @param departure Departure location
 * @returns Transit model array
 */
const getTransitsFromLocation = async (
  departure: Location
): Promise<Transit[]> => {
  return await prisma.transit.findMany({
    where: {
      departure: departure,
    },
    orderBy: {
      destination: "asc",
    },
  });
};

export { getTransitsFromLocation };
