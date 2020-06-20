module.exports = {
  rootDir: './',
  roots: ['<rootDir>/__tests__'],
  collectCoverageFrom: [
    '**/*.test.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/__tests__/cssTransform.js',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^components/(.*)$': '<rootDir>/components/$1',
    '^lib/(.*)$': '<rootDir>/lib/$1',
    '^pages_/(.*)$': '<rootDir>/pages_/$1',
    '^generated': '<rootDir>/generated',
  },
}
