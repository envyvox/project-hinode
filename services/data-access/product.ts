"use server";

import prisma from "@/lib/prisma";
import { Product, UserProducts } from "@prisma/client";

export type UserProductIncluded = {
  product: Product;
} & UserProducts;

/**
 * Retrieves the user's products from the database.
 *
 * @param {string} userId - The ID of the user.
 * @return {Promise<UserProductIncluded[]>} - A promise that resolves to an array of user products with included product information.
 */
const getUserProducts = async (
  userId: string,
): Promise<UserProductIncluded[]> => {
  console.log("get user products", userId);
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

/**
 * Retrieves a list of products from the database.
 *
 * @return {Promise<Product[]>} A promise that resolves to an array of products.
 */
const getProducts = async (): Promise<Product[]> => {
  return await prisma.product.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
};

/**
 * Adds a product to a user's collection.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} productId - The ID of the product.
 * @param {number} amount - The amount of the product to add.
 * @return {Promise<UserProducts>} A promise that resolves to the updated user products.
 */
const addProductToUser = async (
  userId: string,
  productId: string,
  amount: number,
): Promise<UserProducts> => {
  return await prisma.userProducts.upsert({
    where: {
      userId_productId: {
        userId: userId,
        productId: productId,
      },
    },
    update: {
      amount: {
        increment: amount,
      },
    },
    create: {
      userId: userId,
      productId: productId,
      amount: amount,
    },
  });
};

export { getUserProducts, getProducts, addProductToUser };
