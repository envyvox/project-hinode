import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Generates a class name by merging multiple class values.
 *
 * @param {ClassValue[]} inputs - An array of class values to be merged.
 * @return {string} The merged class name.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
