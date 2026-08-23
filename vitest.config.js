import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/__tests__/**/*.test.js'],
    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
      reporter: ['json', 'lcov', 'text', 'clover'],
      include: ['src/**/*.js'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
})
