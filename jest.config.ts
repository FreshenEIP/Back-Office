import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  coveragePathIgnorePatterns: [
    './src/api',
    './node_modules',
    './src/utils',
    './src/redux',
    './src/query',
  ],
};
export default config;
