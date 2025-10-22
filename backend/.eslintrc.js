/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: ESLint config for backend
 * BACKEND CONTRACT: N/A
 * TODO: Adjust rules as team prefers
 */

module.exports = {
  env: { node: true, es2022: true, jest: true },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: { ecmaVersion: 2022, sourceType: "script" },
  rules: {
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-console": "off"
  }
};


