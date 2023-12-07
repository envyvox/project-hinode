"use server";

import prisma from "@/lib/prisma";

export type UserWithProduct = {
  product: {
    id: string;
    name: string;
    price: number;
  };
} & {
  userId: string;
  productId: string;
  amount: bigint;
};

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
    },
    include: {
      product: true,
    },
  });
}
