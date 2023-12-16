import React from "react";

// Define a type that represents possible argument types for the formatString function.
type FormatArguments = string | number | React.ReactNode;

/**
 * Formats a string by replacing placeholders with provided values.
 * @param format - The string with placeholders (e.g., "Go to the {0} for {1} yen and also see: {2}").
 * @param args - Values to replace the placeholders.
 * @returns Formatted string with replaced values.
 */
const formatString = (
  format: string,
  ...args: FormatArguments[]
): React.ReactNode => {
  // Split the format string using regular expression to identify placeholders.
  return format
    .split(/(\{\d+\})/g)
    .map((part, index) => {
      const match = part.match(/\{(\d+)\}/);
      // If a placeholder is found, replace it with the corresponding argument.
      if (match) {
        const argIndex = parseInt(match[1], 10);
        return args[argIndex];
      } else {
        // If no placeholder is found, keep the original part of the string.
        return part;
      }
    })
    .map((part, index) => <React.Fragment key={index}>{part}</React.Fragment>);
};

export default formatString;
