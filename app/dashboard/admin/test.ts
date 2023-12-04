"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function test(userId: string) {
  const crops = await prisma.crop.findMany();
  const seeds = await prisma.seed.findMany();
  const products = await prisma.product.findMany();
  const createCrops: Prisma.UserCropsCreateManyInput[] = [];
  const createSeeds: Prisma.UserSeedsCreateManyInput[] = [];
  const createProducts: Prisma.UserProductsCreateManyInput[] = [];

  crops.forEach((crop) =>
    createCrops.push({ userId: userId, cropId: crop.id, amount: 999 }),
  );

  seeds.forEach((seed) =>
    createSeeds.push({ userId: userId, seedId: seed.id, amount: 999 }),
  );

  products.forEach((product) =>
    createProducts.push({ userId: userId, productId: product.id, amount: 999 }),
  );

  await prisma.userCrops.createMany({
    skipDuplicates: true,
    data: createCrops,
  });

  await prisma.userSeeds.createMany({
    skipDuplicates: true,
    data: createSeeds,
  });

  await prisma.userProducts.createMany({
    skipDuplicates: true,
    data: createProducts,
  });
}
