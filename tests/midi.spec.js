const { test, expect } = require('@playwright/test');

test.describe('Web MIDI Permission & Error Handling (Task 005)', () => {

  test('Requirement 7: page load with Web MIDI denied produces zero pageerror events and zero console.error calls', async ({ page }) => {
    const pageErrors = [];
    const consoleErrors = [];

    page.on('pageerror', err => {
      pageErrors.push(err.message || String(err));
    });

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.locator('#piano-keys').waitFor();

    expect(pageErrors, `Expected 0 pageerror events during load, got: ${pageErrors.join('; ')}`).toEqual([]);
    expect(consoleErrors, `Expected 0 console.error logs during load, got: ${consoleErrors.join('; ')}`).toEqual([]);
  });

  test('Requirement 8: when Web MIDI access is denied or unavailable, #midi-badge reads "MIDI Off" and does not have class "connected"', async ({ page }) => {
    await page.goto('/');
    await page.locator('#piano-keys').waitFor();

    const badge = page.locator('#midi-badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('MIDI Off');
    await expect(badge).not.toHaveClass(/connected/);
  });

  test('Requirement 3: when Web MIDI access is granted, #midi-badge reads "MIDI Ready" and gains class "connected"', async ({ page }) => {
    await page.addInitScript(() => {
      navigator.requestMIDIAccess = () => Promise.resolve({
        inputs: new Map()
      });
    });

    await page.goto('/');
    await page.locator('#piano-keys').waitFor();

    const badge = page.locator('#midi-badge');
    await expect(badge).toHaveText('MIDI Ready');
    await expect(badge).toHaveClass(/connected/);
  });

});
