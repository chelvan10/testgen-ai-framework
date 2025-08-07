import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: 2,
  timeout: 30000,
  use: {
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});