import Image from "next/image";

/**
 * Generates the display for a given position.
 *
 * @param {number} position - The position to display.
 * @return {JSX.Element | number} The display element for the position, or the position itself if it is not 1, 2, or 3.
 */
const displayPosition = (position: number): JSX.Element | number => {
  const displayImageNames: { [key: number]: string } = {
    1: "CupGold",
    2: "CupSilver",
    3: "CupBronze",
  };

  const displayImageName = displayImageNames[position];

  return displayImageName ? (
    <Image
      className="h-8 w-8"
      width={36}
      height={36}
      src={`/etc/${displayImageName}.gif`}
      alt={displayImageName}
    />
  ) : (
    position
  );
};

export default displayPosition;
