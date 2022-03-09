module.exports = {
  moduleFileExtensions: ["js"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  coverageDirectory: "./coverage",
  collectCoverageFrom: ["src/**/*.js"],
  testRegex: "((\\.|/*.)(spec))\\.js?$",
  testEnvironment: "node",
  coveragePathIgnorePatterns: [
    "server.js",
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
