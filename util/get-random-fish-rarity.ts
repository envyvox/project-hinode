import { FishRarity } from "@prisma/client";

import getRandomNumberBetween from "./get-random-number";

type Chances = {
  [key in FishRarity]: number;
};

const chances: Chances = {
  [FishRarity.Common]: 30,
  [FishRarity.Rare]: 30,
  [FishRarity.Epic]: 20,
  [FishRarity.Mythical]: 10,
  [FishRarity.Legendary]: 10,
};

const enumKeys = <O extends object, K extends keyof O = keyof O>(
  obj: O
): K[] => {
  return Object.keys(obj).filter((k) => !Number.isNaN(k)) as K[];
};

/**
 * Gets random fish rarity
 * @returns Random fish rarity
 */
const getRandomFishRarity = (): FishRarity => {
  while (true) {
    const rand = getRandomNumberBetween(1, 101);
    let current = 0;

    for (const rarity of enumKeys(FishRarity)) {
      const chance = chances[rarity];

      if (current <= rand && rand < current + chance) return rarity;

      current += chance;
    }
  }
};

export default getRandomFishRarity;
