import { expect, test } from "vitest";
import germanTimeToHuman from "../main.ts";

const cases = [
  ["drei uhr", "15:00"],
  ["fünf uhr", "17:00"],
  // ["halb drei", "14:30"],
  // ["viertel nach sechs", "18:15"],
  // ["viertel vor sechs", "17:45"],
  // ["dreiviertel sieben", "18:45"],
  // ["dreiviertel nach sieben", "19:45"],
];

test.each(cases)("should translate '%s' correctly:", (input, expected) => {
  expect(germanTimeToHuman(input)).toBe(expected);
});
