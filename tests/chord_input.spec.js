const { test, expect } = require('@playwright/test');

test('Requirement 2: latch button toggles state and active class', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1280, height: 720 });

  const latchBtn = page.locator('#latch-btn');
  await expect(latchBtn).toBeVisible();
  await expect(latchBtn).not.toHaveClass(/active/);

  // Turn on latch
  await latchBtn.click();
  await expect(latchBtn).toHaveClass(/active/);

  // Turn off latch
  await latchBtn.click();
  await expect(latchBtn).not.toHaveClass(/active/);
});

test('Requirement 2: toggling an active key in latch mode turns it off', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1280, height: 720 });

  await page.click('#latch-btn');

  // Click key 60 to activate
  await page.click('.key[data-midi="60"]');
  await expect(page.locator('.key[data-midi="60"]')).toHaveClass(/active/);

  // Click key 60 again to deactivate
  await page.click('.key[data-midi="60"]');
  await expect(page.locator('.key[data-midi="60"]')).not.toHaveClass(/active/);
  await expect(page.locator('.key.active')).toHaveCount(0);
});

test('Requirement 2: attempting to latch a 9th note displays capped class on analysis bar which auto-clears', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1280, height: 720 });

  await page.click('#latch-btn');

  // Latch 8 notes
  const midiNotes = [60, 62, 64, 65, 67, 69, 71, 72];
  for (const midi of midiNotes) {
    await page.click(`.key[data-midi="${midi}"]`);
  }

  // Click 9th note (74)
  await page.click('.key[data-midi="74"]');

  // Analysis bar should gain capped class
  const analysisBar = page.locator('#analysis-bar');
  await expect(analysisBar).toHaveClass(/capped/);

  // Capped class should clear after short delay
  await expect(analysisBar).not.toHaveClass(/capped/);
});

test('Requirement 3: latched mode allows building up to 8 audible and visible notes', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1280, height: 720 });

  // Enable latch
  await page.click('#latch-btn');

  // Click 8 different keys
  const midiNotes = [60, 62, 64, 65, 67, 69, 71, 72];
  for (const midi of midiNotes) {
    await page.click(`.key[data-midi="${midi}"]`);
  }

  // All 8 keys must have class 'active'
  await expect(page.locator('.key.active')).toHaveCount(8);
  for (const midi of midiNotes) {
    await expect(page.locator(`.key[data-midi="${midi}"]`)).toHaveClass(/active/);
  }

  // Analysis bar should be visible and sounding 8 notes
  const analysisBar = page.locator('#analysis-bar');
  await expect(analysisBar).toHaveClass(/visible/);

  // Assert audio state audibility: State.oscs.size === 8
  const oscsSize = await page.evaluate(() => State.oscs.size);
  expect(oscsSize).toBe(8);
});

test('Requirement 3: sequence-mode drills turn latch off automatically so 9-note 4.7 Diminished Scale completes', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1280, height: 720 });

  // Enable latch mode beforehand
  await page.click('#latch-btn');
  await expect(page.locator('#latch-btn')).toHaveClass(/active/);

  // Select "4.7 Diminished Scale"
  await page.click('text=4.7 Diminished Scale');
  await page.click('#start-topic-btn');

  // Latch should be turned OFF automatically for sequence drills
  await expect(page.locator('#latch-btn')).not.toHaveClass(/active/);

  // Play all 9 notes in order: C4 (60), Db4 (61), Eb4 (63), E4 (64), F#4 (66), G4 (67), A4 (69), Bb4 (70), C5 (72)
  const notes = [60, 61, 63, 64, 66, 67, 69, 70, 72];
  for (const midi of notes) {
    await page.click(`.key[data-midi="${midi}"]`);
  }

  // Drill card should gain success class and next-btn should be visible
  await expect(page.locator('#drill-card')).toHaveClass(/success/);
  await expect(page.locator('#next-btn')).toBeVisible();
});

test('Requirement 4: attempting to latch a 9th note is rejected leaving State.active at 8', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1280, height: 720 });

  await page.click('#latch-btn');

  // Latch 8 notes
  const midiNotes = [60, 62, 64, 65, 67, 69, 71, 72];
  for (const midi of midiNotes) {
    await page.click(`.key[data-midi="${midi}"]`);
  }

  await expect(page.locator('.key.active')).toHaveCount(8);

  // Click a 9th note (74)
  await page.click('.key[data-midi="74"]');

  // Key count must stay 8, and 74 should not be active
  await expect(page.locator('.key.active')).toHaveCount(8);
  await expect(page.locator('.key[data-midi="74"]')).not.toHaveClass(/active/);
  await expect(page.locator('#analysis-bar')).toHaveClass(/visible/);
});

test('Requirement 4: physical keyboard release does not kill a note owned by pointer', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1280, height: 720 });

  // Enable latch mode
  await page.click('#latch-btn');

  // Click key 48 with mouse (pointer owns key 48)
  await page.click('.key[data-midi="48"]');
  await expect(page.locator('.key[data-midi="48"]')).toHaveClass(/active/);

  // Press and release physical key 'z' (MIDI 48)
  await page.keyboard.press('z');

  // Note 48 should still be active and State.active.size === 1
  await expect(page.locator('.key[data-midi="48"]')).toHaveClass(/active/);
  const activeSize = await page.evaluate(() => State.active.size);
  expect(activeSize).toBe(1);
});

test('Requirement 4a: cap of 8 allows 6-note upper structure drill to complete', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1280, height: 720 });

  // Select "4.4 Upper Structures"
  await page.click('text=4.4 Upper Structures');
  await page.click('#start-topic-btn');

  // Enable latch mode
  await page.click('#latch-btn');

  // Click the 7 notes of Cmaj7 + Dmaj: C4 (60), E4 (64), G4 (67), B4 (71), D5 (74), F#4 (66), A4 (69)
  const notes = [60, 64, 67, 71, 74, 66, 69];
  for (const midi of notes) {
    await page.click(`.key[data-midi="${midi}"]`);
  }

  // Drill card should gain success class and next-btn should be visible
  await expect(page.locator('#drill-card')).toHaveClass(/success/);
  await expect(page.locator('#next-btn')).toBeVisible();
});

test('Requirement 5: multi-touch touchstart on 8 separate keys yields 8 active notes', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1280, height: 720 });

  const midiNotes = [60, 62, 64, 65, 67, 69, 71, 72];

  // Simultaneous touchstart on 8 separate keys (without latch)
  for (const midi of midiNotes) {
    await page.locator(`.key[data-midi="${midi}"]`).dispatchEvent('touchstart');
  }

  await expect(page.locator('.key.active')).toHaveCount(8);
  for (const midi of midiNotes) {
    await expect(page.locator(`.key[data-midi="${midi}"]`)).toHaveClass(/active/);
  }
  await expect(page.locator('#analysis-bar')).toHaveClass(/visible/);

  // Release touches
  for (const midi of midiNotes) {
    await page.locator(`.key[data-midi="${midi}"]`).dispatchEvent('touchend');
  }
  await expect(page.locator('.key.active')).toHaveCount(0);
});

test('Requirement 6: clear button releases all latched notes at once', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1280, height: 720 });

  await page.click('#latch-btn');

  // Latch 3 notes
  await page.click('.key[data-midi="60"]');
  await page.click('.key[data-midi="64"]');
  await page.click('.key[data-midi="67"]');

  await expect(page.locator('.key.active')).toHaveCount(3);

  // Click clear
  await page.click('#clear-btn');

  // Active key count should be 0 and analysis bar hidden
  await expect(page.locator('.key.active')).toHaveCount(0);
  await expect(page.locator('#analysis-bar')).not.toHaveClass(/visible/);

  // Assert audio state audibility: State.oscs.size === 0
  const oscsSizeAfterClear = await page.evaluate(() => State.oscs.size);
  expect(oscsSizeAfterClear).toBe(0);
});

test('Requirement 7: chord drills complete via latched mouse input', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1280, height: 720 });

  // Select "3.1 Major Triads"
  await page.click('text=3.1 Major Triads');
  await page.click('#start-topic-btn');

  // Enable latch mode
  await page.click('#latch-btn');

  // Click C4 (60), E4 (64), G4 (67)
  await page.click('.key[data-midi="60"]');
  await page.click('.key[data-midi="64"]');
  await page.click('.key[data-midi="67"]');

  // Drill card should gain success class and next-btn should be visible
  await expect(page.locator('#drill-card')).toHaveClass(/success/);
  await expect(page.locator('#next-btn')).toBeVisible();
});

test('Requirement 10a: turning latch off while notes are held releases all latched notes', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1280, height: 720 });

  // Enable latch
  await page.click('#latch-btn');

  // Latch 4 notes
  const midiNotes = [60, 64, 67, 72];
  for (const midi of midiNotes) {
    await page.click(`.key[data-midi="${midi}"]`);
  }
  await expect(page.locator('.key.active')).toHaveCount(4);

  // Turn latch OFF
  await page.click('#latch-btn');

  // All notes released and analysis bar hidden
  await expect(page.locator('.key.active')).toHaveCount(0);
  await expect(page.locator('#analysis-bar')).not.toHaveClass(/visible/);
});

test('Requirement 10b: computer keyboard input follows press-and-release regardless of latch state', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1280, height: 720 });

  // Enable latch mode
  await page.click('#latch-btn');

  // Press key 'z' (MIDI 48) on physical keyboard
  await page.keyboard.down('z');
  await expect(page.locator('.key[data-midi="48"]')).toHaveClass(/active/);

  // Release key 'z' on physical keyboard - should deactivate despite latch mode
  await page.keyboard.up('z');
  await expect(page.locator('.key[data-midi="48"]')).not.toHaveClass(/active/);
  await expect(page.locator('.key.active')).toHaveCount(0);
});
