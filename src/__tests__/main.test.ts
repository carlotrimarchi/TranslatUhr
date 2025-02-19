import { expect, describe, test } from "vitest";
// import germanTimeToHuman from "../main.ts";
import { numbersMap } from "../constants.ts";
import GermanTimeParser from "../GermanTimeParser.ts";

describe("GermanTimeParser", () => {
const cases = {
"Absolute time (hour only)": [
  ["drei uhr", "15:00"],
  ["fünf uhr", "17:00"],
],
"Absolute time with minutes": [
  ["drei uhr zwanzig", "15:20"],
  ["vier uhr vierzig", "16:40"],
  ["fünf uhr zwanzig", "17:20"],
],
"Relative time - 'halb'": [
  ["halb drei", "14:30"],
  ["halb vier", "15:30"],
  ["halb fünf", "16:30"],
  ["halb sechs", "17:30"],
],
"Relative time - 'nach'": [
  ["viertel nach sechs", "18:15"],
  ["zwanzig nach vier", "16:20"],
],
"Relative time - 'vor'": [
  ["zwanzig vor vier", "15:40"],
  ["viertel vor sechs", "17:45"],
]
  // ["dreiviertel sieben", "18:45"],
  // ["dreiviertel nach sieben", "19:45"],
};
  for (const [category, tests] of Object.entries(cases)) {
    describe(category, () => {
      test.each(tests)("should translate '%s' correctly:", (input, expected) => {
        expect(new GermanTimeParser(input, numbersMap).parse()).toBe(expected);
      });
    });
  }
});
