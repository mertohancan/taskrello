module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./config/setupTests.js'],
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '\\plus.svg|minus.svg|check.svg|attachment.svg$': '<rootDir>/__mocks__/svgrMock.js',
  },
};
