"use server";

import { User } from "@prisma/client";
import prisma from "./prisma";

/**
 * Get user by email
 * @param email User email
 * @returns User
 */
export async function getUser(email: string): Promise<User> {
  return await prisma.user.findUniqueOrThrow({ where: { email: email } });
}
