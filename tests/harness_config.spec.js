const { test, expect } = require('@playwright/test');

function loadConfig() {
  const configPath = require.resolve('../playwright.config.js');
  delete require.cache[configPath];
  return require('../playwright.config.js');
}

test('playwright.config.js sets webServer.reuseExistingServer strictly to false', () => {
  const config = loadConfig();
  expect(config.webServer.reuseExistingServer).toBe(false);
});

test('playwright.config.js defaults to port 8080 when PORT is unset', () => {
  const originalPort = process.env.PORT;
  try {
    delete process.env.PORT;
    const config = loadConfig();
    expect(String(config.webServer.port)).toBe("8080");
    expect(config.use.baseURL).toBe("http://localhost:8080");
  } finally {
    if (originalPort !== undefined) {
      process.env.PORT = originalPort;
    } else {
      delete process.env.PORT;
    }
  }
});

test('playwright.config.js respects process.env.PORT when set to 9123', () => {
  const originalPort = process.env.PORT;
  try {
    process.env.PORT = "9123";
    const config = loadConfig();
    expect(String(config.webServer.port)).toBe("9123");
    expect(config.use.baseURL).toBe("http://localhost:9123");
  } finally {
    if (originalPort !== undefined) {
      process.env.PORT = originalPort;
    } else {
      delete process.env.PORT;
    }
  }
});
