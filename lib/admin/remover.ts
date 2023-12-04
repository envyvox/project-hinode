"use server";

import prisma from "@/lib/prisma";

/**
 * Deletes all seeds from database
 */
export async function deleteSeeds() {
  await prisma.seed.deleteMany();
}

/**
 * Deletes all crops from database
 */
export async function deleteCrops() {
  await prisma.crop.deleteMany();
}

/**
 * Deletes all products from database
 */
export async function deleteProtucts() {
  await prisma.product.deleteMany();
}
