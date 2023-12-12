const fixedIncreased = 500;

function leap(level: number): number {
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
}

export default function getXpRequiredToLevel(level: number): number {
  return level > 2
    ? getXpRequiredToLevel(level - 1) +
        fixedIncreased +
        leap(level) * (level - 2)
    : fixedIncreased;
}
