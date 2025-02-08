import { expect, test } from "vitest";
import germanTimeToHuman from "../main.ts";

test("halb drei", () => {
  expect(germanTimeToHuman("halb drei")).toBe("2:30");
});
