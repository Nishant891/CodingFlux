module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2021, // Specify the ECMAScript version you're using
    sourceType: "module", // Enable ES modules
  },
  rules: {
    "no-empty": ["error", { "allowEmptyCatch": true }],
    "no-undef": "off"
  },
};
