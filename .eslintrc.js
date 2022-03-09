module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb-base",
    "plugin:jest/all",
    "plugin:react/recommended",

  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "no-underscore-dangle": "off",
    "jest/require-hook": "off",
    "no-useless-escape": "off",
    "no-tabs": 0,
    "no-nested-ternary": "off",
    "no-mixed-spaces-and-tabs": 0,
    "react/prop-types": "off",
    "import/prefer-default-export": "off",
    "prefer-promise-reject-errors": "off",
    "jest/no-hooks": "off",
    quotes: [2, "double", { avoidEscape: true }],
    "max-len": ["error", { code: 160 }],
  },
};
