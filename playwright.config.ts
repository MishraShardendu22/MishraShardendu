import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Admin-Desktop-Chrome',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:5173' },
    },
    {
      name: 'Blog-Desktop-Chrome',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:5174' },
    },
  ],
  webServer: [
    {
      command: 'pnpm --filter ms22-admin dev',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'pnpm --filter ms22-blog dev',
      url: 'http://localhost:5174',
      reuseExistingServer: !process.env.CI,
    },
  ],
})
