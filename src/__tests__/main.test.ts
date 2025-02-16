import { expect, test } from "vitest";
// import germanTimeToHuman from "../main.ts";
import { numbersMap } from "../constants.ts";
import GermanTimeParser from "../GermanTimeParser.ts";

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
  ["viertel nach sechs", "18:15"],
  ["zwanzig nach vier", "16:20"],
  ["zwanzig vor vier", "15:40"],
  ["viertel vor sechs", "17:45"],
  // ["dreiviertel sieben", "18:45"],
  // ["dreiviertel nach sieben", "19:45"],
];

test.each(cases)("should translate '%s' correctly:", (input, expected) => {
  expect(new GermanTimeParser(input, numbersMap).parse()).toBe(expected);
});
