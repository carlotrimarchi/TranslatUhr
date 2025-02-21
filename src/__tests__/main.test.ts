import { expect, describe, test } from "vitest";
// import germanTimeToHuman from "../main.ts";
import { numbersMap } from "../constants.ts";
import GermanTimeParser from "../GermanTimeParser.ts";

describe("GermanTimeParser", () => {
  const cases = {
    "Absolute time (hour only)": [
      ["drei uhr", { hour: 3, minutes: 0 }],
      ["fünf uhr", { hour: 5, minutes: 0 }],
    ],
    "Absolute time with minutes": [
      ["drei uhr zwanzig", { hour: 3, minutes: 20 }],
      ["vier uhr vierzig", { hour: 4, minutes: 40 }],
      ["fünf uhr zwanzig", { hour: 5, minutes: 20 }],
    ],
    "Relative time - 'halb'": [
      ["halb drei", { hour: 2, minutes: 30 }],
      ["halb vier", { hour: 3, minutes: 30 }],
      ["halb fünf", { hour: 4, minutes: 30 }],
      ["halb sechs", { hour: 5, minutes: 30 }],
    ],
    "Relative time - 'nach'": [
      ["viertel nach sechs", { hour: 6, minutes: 15 }],
      ["zwanzig nach vier", { hour: 4, minutes: 20 }],
    ],
    "Relative time - 'vor'": [
      ["zwanzig vor vier", { hour: 3, minutes: 40 }],
      ["viertel vor sechs", { hour: 5, minutes: 45 }],
    ],
    // ["dreiviertel sieben", "18:45"],
    // ["dreiviertel nach sieben", "19:45"],
  };
  for (const [category, tests] of Object.entries(cases)) {
    describe(category, () => {
      test.each(tests)(
        "should translate '%s' correctly:",
        (input, expected) => {
          expect(new GermanTimeParser(input, numbersMap).parse()).toEqual(
            expected,
          );
        },
      );
    });
  }
});
