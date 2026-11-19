import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', timeout: 60000, workers: 1,
  use: { baseURL: 'http://127.0.0.1:4174', channel: 'msedge', headless: true, reducedMotion: 'reduce' },
  webServer: { command: 'node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 4174 --strictPort', url: 'http://127.0.0.1:4174', reuseExistingServer: true },
});
