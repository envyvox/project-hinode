import getRandomNumberBetween from "./get-random-number";

export default function getSuccessAmount(
  chance: number,
  doubleChance: number,
  amount: number,
) {
  return chance >= getRandomNumberBetween(1, 101)
    ? doubleChance >= getRandomNumberBetween(1, 101)
      ? amount * 2
      : amount
    : 0;
}
