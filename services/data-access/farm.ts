"use server";

import { FarmCellState, Seed, UserFarmCell, Weather } from "@prisma/client";

import prisma from "@/lib/prisma";

import { getWorldState } from "./world-state";

export type UserFarmCellSeedIncluded = {
  seed: Seed | null;
} & UserFarmCell;

const getUserFarmCells = async (userId: string) => {
  return await prisma.userFarmCell.findMany({
    where: {
      userId: userId,
    },
    include: {
      seed: true,
    },
    orderBy: {
      id: "asc",
    },
  });
};

/**
 * Create a user farm cell for the given user ID.
 *
 * @param {string} userId - The ID of the user.
 * @return {Promise<UserFarmCell>} A promise that resolves to the created user farm cell.
 */
const addUserFarmCell = async (userId: string): Promise<UserFarmCell> => {
  return await prisma.userFarmCell.create({
    data: {
      userId: userId,
    },
  });
};

/**
 * Updates the user's farm cell with the specified seed and sets the state to "Planted".
 *
 * @param {string} cellId - The ID of the farm cell to update.
 * @param {string} seedId - The ID of the seed to plant in the farm cell.
 * @return {Promise<UserFarmCell>} - A promise that resolves to the updated user farm cell.
 */
const plantSeedToCell = async (
  cellId: string,
  seedId: string
): Promise<UserFarmCell> => {
  return await prisma.userFarmCell.update({
    where: {
      id: cellId,
    },
    data: {
      seedId: seedId,
      state: FarmCellState.Planted,
    },
  });
};

/**
 * Updates the state of a user's farm cell to "Watered".
 *
 * @param {string} cellId - The ID of the cell to be watered.
 * @return {Promise<UserFarmCell>} A promise that resolves to the updated user farm cell.
 */
const waterCell = async (cellId: string): Promise<UserFarmCell> => {
  return await prisma.userFarmCell.update({
    where: {
      id: cellId,
    },
    data: {
      state: FarmCellState.Watered,
    },
  });
};

/**
 * Updates a user farm cell for re-growth.
 *
 * @param {string} cellId - The ID of the farm cell to update.
 * @return {Promise<UserFarmCell>} - A promise that resolves to the updated user farm cell.
 */
const reGrowthCell = async (cellId: string): Promise<UserFarmCell> => {
  const worldState = await getWorldState();

  return await prisma.userFarmCell.update({
    where: {
      id: cellId,
    },
    data: {
      progress: 0,
      inReGrowth: true,
      state:
        worldState.weatherToday === Weather.Rain
          ? FarmCellState.Watered
          : FarmCellState.Planted,
    },
  });
};

/**
 * Resets a cell in the user's farm.
 *
 * @param {string} cellId - The ID of the cell to reset.
 * @return {Promise<UserFarmCell>} - A promise that resolves to the updated user farm cell.
 */
const resetCell = async (cellId: string): Promise<UserFarmCell> => {
  return await prisma.userFarmCell.update({
    where: {
      id: cellId,
    },
    data: {
      progress: 0,
      inReGrowth: false,
      seedId: null,
      state: FarmCellState.Empty,
    },
  });
};

export {
  getUserFarmCells,
  addUserFarmCell,
  plantSeedToCell,
  waterCell,
  reGrowthCell,
  resetCell,
};
