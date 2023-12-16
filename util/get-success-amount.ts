import getRandomNumberBetween from "./get-random-number";

/**
 * Calculates the success amount based on the given chance, double chance, and amount.
 *
 * @param {number} chance - The chance of success as a percentage.
 * @param {number} doubleChance - The chance of doubling the amount as a percentage.
 * @param {number} amount - The initial amount.
 * @return {number} The calculated success amount.
 */
const getSuccessAmount = (
  chance: number,
  doubleChance: number,
  amount: number,
): number => {
  return chance >= getRandomNumberBetween(1, 101)
    ? doubleChance >= getRandomNumberBetween(1, 101)
      ? amount * 2
      : amount
    : 0;
};

export default getSuccessAmount;
