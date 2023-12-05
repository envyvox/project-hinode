"use server";

import { Location, User } from "@prisma/client";
import prisma from "@/lib/prisma";

/**
 * Get user by email
 * @param email User email
 * @returns User
 */
export async function getUser(email: string): Promise<User> {
  return await prisma.user.findUniqueOrThrow({ where: { email: email } });
}

/**
 * Updates user location
 * @param userId User id
 * @param location New location
 * @returns Updated user
 */
export async function updateUserLocation(
  userId: string,
  location: Location,
): Promise<User> {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      location: location,
    },
  });
}
