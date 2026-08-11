const { test, expect } = require('@playwright/test');

const viewports = [
  { width: 390, height: 844, name: 'phone portrait (390x844)' },
  { width: 820, height: 1180, name: 'tablet (820x1180)' },
  { width: 1280, height: 800, name: 'desktop (1280x800)' }
];

test.describe('Responsive Layout & UI Requirements (Task 003)', () => {

  for (const vp of viewports) {
    test(`Requirement 8: page body does not scroll horizontally at ${vp.name}`, async ({ page }) => {
      await page.goto('/');
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.locator('#piano-keys').waitFor();

      const scrollState = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth
        };
      });

      expect(scrollState.scrollWidth).toBeLessThanOrEqual(scrollState.innerWidth);
    });
  }

  test('Requirement 6: Desktop 1280x800 has at least two octaves visible without scrolling and no key vertically clipped', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.locator('#piano-keys').waitFor();

    const result = await page.evaluate(() => {
      const wrap = document.getElementById('piano-wrap');
      const wrapRect = wrap.getBoundingClientRect();
      const whiteKeys = Array.from(document.querySelectorAll('.white-key')).map(k => k.getBoundingClientRect());
      const allKeys = Array.from(document.querySelectorAll('.key')).map(k => k.getBoundingClientRect());

      // Count white keys whose right edge is within piano-wrap visible width
      const visibleWhiteKeys = whiteKeys.filter(r => r.x >= wrapRect.x && r.right <= wrapRect.x + wrapRect.width);

      // Check vertical clipping against piano-wrap
      const verticallyClipped = allKeys.filter(r => r.y < wrapRect.y - 1 || r.bottom > wrapRect.bottom + 1);

      return {
        visibleWhiteKeyCount: visibleWhiteKeys.length,
        verticallyClippedCount: verticallyClipped.length
      };
    });

    // 2 full octaves = 14 white keys
    expect(result.visibleWhiteKeyCount).toBeGreaterThanOrEqual(14);
    expect(result.verticallyClippedCount).toBe(0);
  });

  test('Requirement 7: Mobile 390x844 has at least 1 octave visible and minimum touch target widths', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#piano-keys').waitFor();

    const keyStats = await page.evaluate(() => {
      const wrap = document.getElementById('piano-wrap');
      const wrapRect = wrap.getBoundingClientRect();
      const whiteKeys = Array.from(document.querySelectorAll('.white-key')).map(k => k.getBoundingClientRect());
      const blackKeys = Array.from(document.querySelectorAll('.black-key')).map(k => k.getBoundingClientRect());

      const visibleWhiteKeys = whiteKeys.filter(r => r.x >= wrapRect.x && r.right <= wrapRect.x + wrapRect.width);

      const minWhiteWidth = Math.min(...whiteKeys.map(r => r.width));
      const minBlackWidth = Math.min(...blackKeys.map(r => r.width));

      return {
        visibleWhiteKeyCount: visibleWhiteKeys.length,
        minWhiteWidth,
        minBlackWidth
      };
    });

    // At least 1 full octave = 7 white keys visible without scrolling
    expect(keyStats.visibleWhiteKeyCount).toBeGreaterThanOrEqual(7);
    // White key width >= 28px
    expect(keyStats.minWhiteWidth).toBeGreaterThanOrEqual(28);
    // Black key width >= 18px
    expect(keyStats.minBlackWidth).toBeGreaterThanOrEqual(18);
  });

  test('Requirement 9: On mobile, selecting a topic closes drawer and overlay, and analysis bar does not cover keyboard', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#piano-keys').waitFor();

    // Open sidebar menu
    await page.click('#menu-btn');
    await expect(page.locator('#sidebar')).toHaveClass(/open/);
    await expect(page.locator('#overlay')).toHaveClass(/visible/);

    // Select a topic
    await page.click('text=3.1 Major Triads');

    // Sidebar and overlay must close
    await expect(page.locator('#sidebar')).not.toHaveClass(/open/);
    await expect(page.locator('#overlay')).not.toHaveClass(/visible/);

    // Check analysis bar position relative to keyboard
    const positions = await page.evaluate(() => {
      const bar = document.getElementById('analysis-bar').getBoundingClientRect();
      const wrap = document.getElementById('piano-wrap').getBoundingClientRect();
      return { barBottom: bar.bottom, wrapTop: wrap.top };
    });

    // Analysis bar bottom must be above or equal to piano-wrap top (not covering keyboard)
    expect(positions.barBottom).toBeLessThanOrEqual(positions.wrapTop + 1);
  });

  test('Requirement 9a: Header controls stay usable without overlapping or overflowing at 390px, with hit targets >= 32px', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('header').waitFor();

    const headerData = await page.evaluate(() => {
      const header = document.querySelector('header');
      const headerRect = header.getBoundingClientRect();

      const selectors = ['#menu-btn', '.brand', '#latch-btn', '#clear-btn', '#midi-badge'];
      const rects = selectors.map(sel => {
        const el = document.querySelector(sel);
        const r = el.getBoundingClientRect();
        return {
          selector: sel,
          x: r.x,
          y: r.y,
          width: r.width,
          height: r.height,
          right: r.x + r.width,
          bottom: r.y + r.height
        };
      });

      // Check overlap between elements
      let overlaps = false;
      for (let i = 0; i < rects.length; i++) {
        for (let j = i + 1; j < rects.length; j++) {
          const a = rects[i];
          const b = rects[j];
          if (a.x < b.right && a.right > b.x && a.y < b.bottom && a.bottom > b.y) {
            overlaps = true;
          }
        }
      }

      // Check header bounds overflow
      const overflowsHeader = rects.some(r => r.right > headerRect.right + 1 || r.x < headerRect.x - 1);

      // Check hit targets >= 32px for interactive controls
      const interactiveSelectors = ['#menu-btn', '#latch-btn', '#clear-btn', '#midi-badge'];
      const smallTargets = rects.filter(r => interactiveSelectors.includes(r.selector) && (r.width < 32 || r.height < 32));

      return {
        overlaps,
        overflowsHeader,
        smallTargetsCount: smallTargets.length
      };
    });

    expect(headerData.overlaps).toBe(false);
    expect(headerData.overflowsHeader).toBe(false);
    expect(headerData.smallTargetsCount).toBe(0);
  });

  test('Requirement 9b: Analysis bar displays capped class and remains visible when polyphony cap is hit', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 1280, height: 720 });

    await page.click('#latch-btn');

    // Latch 8 notes
    const midiNotes = [60, 62, 64, 65, 67, 69, 71, 72];
    for (const midi of midiNotes) {
      await page.click(`.key[data-midi="${midi}"]`);
    }

    // Click 9th note to trigger cap tell
    await page.click('.key[data-midi="74"]');

    const analysisBar = page.locator('#analysis-bar');
    await expect(analysisBar).toHaveClass(/capped/);

    // Verify opacity/visibility while capped
    const opacity = await analysisBar.evaluate(el => window.getComputedStyle(el).opacity);
    expect(parseFloat(opacity)).toBeGreaterThan(0);
  });

  for (const vp of viewports) {
    test(`Task 004 Requirement 1 & 2: all 36 keys are hit-testable at center at ${vp.name}`, async ({ page }) => {
      await page.goto('/');
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.locator('#piano-keys').waitFor();

      const failedKeys = await page.evaluate(() => {
        const keys = Array.from(document.querySelectorAll('.key'));
        const failures = [];

        keys.forEach(k => {
          k.scrollIntoView({ inline: 'center', block: 'nearest' });
          const midi = parseInt(k.dataset.midi);
          const rect = k.getBoundingClientRect();
          const cx = rect.x + rect.width / 2;
          const cy = rect.y + rect.height / 2;

          const hitEl = document.elementFromPoint(cx, cy);
          const isHit = hitEl && (hitEl === k || k.contains(hitEl));

          if (!isHit) {
            failures.push({
              midi,
              note: k.querySelector('.label-n')?.innerText || midi,
              hitElement: hitEl ? (hitEl.id || hitEl.className || hitEl.tagName) : 'null'
            });
          }
        });

        return failures;
      });

      expect(failedKeys).toEqual([]);
    });
  }

  test('Task 004 Requirement 10: clicking C3 (MIDI 48) without force at 390x844 activates the note', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#piano-keys').waitFor();

    await page.click('#latch-btn');

    const c3 = page.locator('.key[data-midi="48"]');
    await c3.click();

    await expect(c3).toHaveClass(/active/);
    const activeSize = await page.evaluate(() => State.active.size);
    expect(activeSize).toBeGreaterThan(0);
  });

  test('Task 004 Requirement 11: clicking #scroll-right at 390x844 scrolls piano-wrap horizontally', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#piano-keys').waitFor();

    const initialScroll = await page.evaluate(() => document.getElementById('piano-wrap').scrollLeft);

    await page.click('#scroll-right');

    await expect.poll(async () => {
      return page.evaluate(() => document.getElementById('piano-wrap').scrollLeft);
    }).toBeGreaterThan(initialScroll);
  });

});

