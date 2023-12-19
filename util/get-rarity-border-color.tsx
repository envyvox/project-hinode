import { FishRarity } from "@prisma/client";

/**
 * Returns the border color based on the rarity of a fish.
 *
 * @param {FishRarity} rarity - The rarity of the fish.
 * @return {string} The border color corresponding to the rarity.
 */
export const getRarityBorderColor = (rarity: FishRarity): string => {
  return `border-${rarity.toLowerCase()}`;
};
