/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/server.js"],
  ignorePatterns: [
    "node_modules",
    "dist",
    "coverage",
    "build",
    "public",
    "src/generated",
  ],
};
