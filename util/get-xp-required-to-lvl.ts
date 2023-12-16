const fixedIncreased = 500;

/**
 * Calculates the leap value based on the given level.
 *
 * @param {number} level - The level for which to calculate the leap value.
 * @return {number} The calculated leap value based on the level.
 * @throws {RangeError} If the level is outside the valid range.
 */
const leap = (level: number): number => {
  switch (true) {
    case level >= 1 && level <= 20:
      return 35;
    case level >= 21 && level <= 40:
      return 33;
    case level >= 41 && level <= 60:
      return 60;
    case level >= 61 && level <= 80:
      return 110;
    case level >= 81 && level <= 100:
      return 255;
    default:
      throw new RangeError(`ArgumentOutOfRangeException: ${level}`);
  }
};

/**
 * Calculates the amount of experience points required to level up based on the current level.
 *
 * @param {number} level - The current level.
 * @return {number} - The amount of experience points required to level up.
 */
const getXpRequiredToLevel = (level: number): number => {
  return level > 2
    ? getXpRequiredToLevel(level - 1) +
        fixedIncreased +
        leap(level) * (level - 2)
    : fixedIncreased;
};

export default getXpRequiredToLevel;
