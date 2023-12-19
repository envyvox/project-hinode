import { FishRarity } from "@prisma/client";

/**
 * Returns the border color based on the rarity of a fish.
 *
 * @param {FishRarity} rarity - The rarity of the fish.
 * @return {string} The border color corresponding to the rarity.
 */
export const getRarityBorderColor = (rarity: FishRarity): string => {
  switch (rarity) {
    case FishRarity.Common:
      return "";
    case FishRarity.Rare:
      return "border-blue-400/60";
    case FishRarity.Epic:
      return "border-violet-400/60";
    case FishRarity.Mythical:
      return "border-pink-400/60";
    case FishRarity.Legendary:
      return "border-orange-400/60";
    default:
      return "";
  }
};
