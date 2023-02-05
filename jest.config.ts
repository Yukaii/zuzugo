import nextJest from "next/jest";
import type { JestConfigWithTsJest } from "ts-jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const customJestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
    "^@/lib(.*)$": "<rootDir>/lib$1",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  extensionsToTreatAsEsm: [".ts"],
};

export default createJestConfig(customJestConfig);
