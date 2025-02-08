import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/__tests__/**/*.test.{js,ts}"], // Looks for test files in __tests__
  },
});
