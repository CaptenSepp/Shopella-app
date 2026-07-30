import { defineConfig } from '@playwright/test' // Playwright config helper

export default defineConfig({
  testDir: './e2e', // keep E2E specs in one place
  timeout: 30000, // basic timeout for slow CI
  use: {
    baseURL: 'http://127.0.0.1:4173', // dev server URL for tests
  },
  webServer: {
    command: 'npm run vite:dev -- --host 127.0.0.1 --port 4173', // start Vite dev server
    url: 'http://127.0.0.1:4173', // wait for server to be ready
    reuseExistingServer: !process.env.CI, // speed up local runs
    env: {
      ...process.env,
      VITE_SUPABASE_URL: 'http://127.0.0.1:4173/test-supabase',
      VITE_SUPABASE_PUBLISHABLE_KEY: 'test-publishable-key',
    }, // use a browser-mocked Supabase endpoint during E2E tests
  },
})
