const { defineConfig } = require('@playwright/test');

const port = process.env.PORT || 8080;

module.exports = defineConfig({
  testDir: './tests',
  webServer: {
    command: 'node simple_server.js',
    port: port,
    reuseExistingServer: false,
  },
  use: {
    baseURL: `http://localhost:${port}`,
  },
});
