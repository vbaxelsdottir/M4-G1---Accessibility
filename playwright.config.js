import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', fullyParallel: false, workers: 1, retries: 0,
  timeout: 20000, expect: { timeout: 3000 },
  reporter: [['list'], ['json', { outputFile: process.env.RESULT_FILE || 'test-results/results.json' }]],
  use: { browserName: 'chromium', baseURL: 'http://127.0.0.1:5180', trace: 'retain-on-failure' },
  projects: [{ name: 'A', metadata: { route: 'a' } }, { name: 'B', metadata: { route: 'b' } }],
  webServer: { command: 'npm run dev -- --port 5180 --strictPort', url: 'http://127.0.0.1:5180', reuseExistingServer: !process.env.CI },
});
