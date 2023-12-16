"use server";

import prisma from "@/lib/prisma";
import { Product, UserProducts } from "@prisma/client";

export type UserProductIncluded = {
  product: Product;
} & UserProducts;

/**
 * Get user products
 * @param userId User id
 * @returns User products model array
 */
const getUserProducts = async (
  userId: string,
): Promise<UserProductIncluded[]> => {
  return await prisma.userProducts.findMany({
    where: {
      userId: userId,
      amount: {
        gt: 0,
      },
    },
    include: {
      product: true,
    },
    orderBy: {
      product: {
        name: "asc",
      },
    },
  });
};

export { getUserProducts };
