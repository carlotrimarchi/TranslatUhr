import { expect, test } from "vitest";
import germanTimeToHuman from "../main.ts";
import { numbersMap } from "../constants.ts";

const cases = [
  ["drei uhr", "15:00"],
  ["fünf uhr", "17:00"],
  ["drei uhr zwanzig", "15:20"],
  ["vier uhr vierzig", "16:40"],
  ["fünf uhr zwanzig", "17:20"],
  ["halb drei", "14:30"],
  ["halb vier", "15:30"],
  ["halb fünf", "16:30"],
  ["halb sechs", "17:30"],
  // ["viertel nach sechs", "18:15"],
  // ["viertel vor sechs", "17:45"],
  // ["dreiviertel sieben", "18:45"],
  // ["dreiviertel nach sieben", "19:45"],
];

test.each(cases)("should translate '%s' correctly:", (input, expected) => {
  expect(germanTimeToHuman(input, numbersMap)).toBe(expected);
});
