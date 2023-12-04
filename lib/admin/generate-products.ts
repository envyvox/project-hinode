"use server";

import prisma from "@/lib/prisma";

/**
 * Creates products in databse
 */
export async function generateProducts() {
  await prisma.product.createMany({
    skipDuplicates: true,
    data: [
      {
        name: "Egg",
        price: 72,
      },
      {
        name: "Milk",
        price: 157,
      },
    ],
  });
}
