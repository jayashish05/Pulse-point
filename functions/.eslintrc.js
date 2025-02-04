module.exports = {
  env: {
    es6: true,
    node: true, // Add this to enable Node.js globals
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "no-unused-vars": "warn", // Change unused vars to warnings
    "no-undef": "off", // Disable undefined variable checks
  },
};