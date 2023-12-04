"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

/**
 * Creates crops in database
 */
export async function generateCrops() {
  const seeds = await prisma.seed.findMany();
  const crops: Prisma.CropCreateManyInput[] = [];

  seeds.forEach((seed) => {
    crops.push({
      name: seed.name.replace("Seeds", ""),
      price: 999,
      seedId: seed.id,
    });
  });

  await prisma.crop.createMany({ skipDuplicates: true, data: crops });
}
