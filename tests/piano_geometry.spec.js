const { test, expect } = require('@playwright/test');

test('verify black key alignment relative to white keys', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1280, height: 720 });

  // Wait for piano to render
  await page.locator('#piano-keys').waitFor();

  // Helper to get center X of an element
  const getCenter = async (selector) => {
    const box = await page.locator(selector).boundingBox();
    return box.x + box.width / 2;
  };

  // Helper to get right edge of an element
  const getRight = async (selector) => {
    const box = await page.locator(selector).boundingBox();
    return box.x + box.width;
  };

  // Helper to get left edge of an element
  const getLeft = async (selector) => {
    const box = await page.locator(selector).boundingBox();
    return box.x;
  };

  // We will check a few specific keys that were reported as issues.
  // G#5 (Midi 80). Neighbors: G5 (79) and A5 (81).
  const g5 = '[data-midi="79"]';
  const gs5 = '[data-midi="80"]';
  const a5 = '[data-midi="81"]';

  // F#5 (Midi 78). Neighbors: F5 (77) and G5 (79).
  const f5 = '[data-midi="77"]';
  const fs5 = '[data-midi="78"]';

  // Verify F#5 Position
  // It should be roughly centered on the line between F5 and G5.
  // The "Crack" is F5.right (which should equal G5.left).
  
  const f5Right = await getRight(f5);
  const g5Left = await getLeft(g5);
  const fs5Center = await getCenter(fs5);

  console.log(`F5 Right: ${f5Right}, G5 Left: ${g5Left}, F#5 Center: ${fs5Center}`);

  // The crack is approx (f5Right + g5Left) / 2 (they should be touching).
  const crackF = (f5Right + g5Left) / 2;
  
  // F# is usually nudged LEFT (-0.15 * width). Width is ~50. So ~7.5px left.
  const diffF = fs5Center - crackF;
  console.log(`F#5 offset from crack: ${diffF}`);

  // It should be within a reasonable range (e.g. -15px to +5px).
  expect(diffF).toBeLessThan(5); 
  expect(diffF).toBeGreaterThan(-20);

  // Verify G#5 Position
  // Crack between G5 and A5
  const g5Right = await getRight(g5);
  const a5Left = await getLeft(a5);
  const gs5Center = await getCenter(gs5);
  
  const crackG = (g5Right + a5Left) / 2;
  const diffG = gs5Center - crackG;
  console.log(`G#5 offset from crack: ${diffG}`);

  // G# is usually centered or slightly right.
  expect(diffG).toBeLessThan(10);
  expect(diffG).toBeGreaterThan(-5);
  
  // Check ordering visually: F5.left < F#5.left < G5.left is NOT true because black key is on top.
  // But F#5.left should be > F5.left and F#5.right < G5.right roughly? 
  // No, F#5 overlaps both.
});
