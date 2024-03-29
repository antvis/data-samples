module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  testRegex: '(/__tests__/.*\\.(test|spec))\\.ts$',
  verbose: false,
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
  },
};
