/**
 * Gets random number between specified numbers
 * @param min Minimum number (inclusive)
 * @param max Maximum number (exlusive)
 * @returns Random number between specified numbers
 */
const getRandomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export default getRandomNumberBetween;
