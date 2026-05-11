import {defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './tests/e2e',

use: {
    baseURL: 'http://localhost:3000',
},
webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000/todos',
    reuseExistingServer: !process.env.CI,
    stdout:'ignore',
    stderr: 'pipe',
},
});