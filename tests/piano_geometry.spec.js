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
});

const viewports = [
  { width: 390, height: 844, name: 'phone portrait (390x844)' },
  { width: 820, height: 1180, name: 'tablet (820x1180)' },
  { width: 1280, height: 800, name: 'desktop (1280x800)' }
];

for (const vp of viewports) {
  test(`verify geometry of all 15 black keys and key width uniformity at ${vp.name}`, async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.locator('#piano-keys').waitFor();

    const keyGeometry = await page.evaluate(() => {
      const keys = Array.from(document.querySelectorAll('.key'));
      return keys.map(k => {
        const rect = k.getBoundingClientRect();
        return {
          midi: parseInt(k.dataset.midi),
          isBlack: k.classList.contains('black-key'),
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          right: rect.x + rect.width,
          center: rect.x + rect.width / 2
        };
      });
    });

    const whiteKeys = keyGeometry.filter(k => !k.isBlack).sort((a, b) => a.midi - b.midi);
    const blackKeys = keyGeometry.filter(k => k.isBlack).sort((a, b) => a.midi - b.midi);

    // Requirement 4: Every white key has same width and black key has same width (within 1px)
    const firstWhiteWidth = whiteKeys[0].width;
    for (const w of whiteKeys) {
      expect(Math.abs(w.width - firstWhiteWidth)).toBeLessThanOrEqual(1.01);
    }
    const firstBlackWidth = blackKeys[0].width;
    for (const b of blackKeys) {
      expect(Math.abs(b.width - firstBlackWidth)).toBeLessThanOrEqual(1.01);
    }

    // Requirement 2 & 3: Check all 15 black keys
    expect(blackKeys.length).toBe(15);

    for (let i = 0; i < blackKeys.length; i++) {
      const bk = blackKeys[i];
      const leftWhite = whiteKeys.find(w => w.midi === bk.midi - 1);
      const rightWhite = whiteKeys.find(w => w.midi === bk.midi + 1);

      expect(leftWhite).toBeDefined();
      expect(rightWhite).toBeDefined();

      const crack = (leftWhite.right + rightWhite.x) / 2;
      const diff = bk.center - crack;
      const whiteWidth = leftWhite.width;

      // Requirement 2: center within 20% of white key width from crack
      expect(Math.abs(diff)).toBeLessThanOrEqual(0.20 * whiteWidth);

      // Requirement 3: black key inside outer edges of neighbouring white keys
      expect(bk.x).toBeGreaterThanOrEqual(leftWhite.x - 1);
      expect(bk.right).toBeLessThanOrEqual(rightWhite.right + 1);

      // Requirement 3: no horizontal overlap between adjacent black keys
      if (i < blackKeys.length - 1) {
        const nextBk = blackKeys[i + 1];
        if (nextBk.midi - bk.midi <= 3) {
          expect(bk.right).toBeLessThanOrEqual(nextBk.x + 0.1);
        }
      }
    }
  });
}

