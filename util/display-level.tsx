import Image from "next/image";

/**
 * Displays an image based on the input level.
 *
 * @param {number} level - The level to determine the image.
 * @return {JSX.Element} The JSX element containing the image.
 */
const displayLevel = (level: number): JSX.Element => {
  const levelImageNames: { [key: number]: string } = {
    1: "Level1",
    5: "Level5",
    10: "Level10",
    20: "Level20",
    30: "Level30",
    50: "Level50",
    80: "Level80",
    100: "Level100",
  };

  const key = Object.keys(levelImageNames)
    .map(Number)
    .filter((x) => x <= level)
    .reduce((a, b) => Math.max(a, b), 0);

  return (
    <Image
      className="h-6 w-6"
      width={27}
      height={27}
      src={`/level/${levelImageNames[key]}.png`}
      alt={levelImageNames[key]}
    />
  );
};

export default displayLevel;
