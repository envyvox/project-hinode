"use server";

import prisma from "@/lib/prisma";
import { Product, UserProducts } from "@prisma/client";

export type UserWithProduct = {
  product: Product;
} & UserProducts;

/**
 * Get user products
 * @param userId User id
 * @returns User products model array
 */
export async function getUserProducts(
  userId: string,
): Promise<UserWithProduct[]> {
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
  });
}
