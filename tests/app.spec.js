const { test, expect } = require('@playwright/test');

test('test description and next button flow', async ({ page }) => {
  await page.goto('/');

  // 1. Open Menu (mobile/desktop handled by responsiveness, but assuming desktop or expanded for now)
  // If mobile, might need to toggle menu. 
  // Let's set viewport size to desktop to be safe first.
  await page.setViewportSize({ width: 1280, height: 720 });

  // 2. Click on "Intervals" in Beginner section
  await page.click('text=1.1 The Semitone');

  // 3. EXPECTATION: Should see a Description and a "Start" button.
  // Currently, it goes straight to drill. So this should fail or we check for absence.
  // We want to verify the "Description" element exists.
  // I'll assume we'll add an ID 'topic-intro' or similar.
  
  // Wait for either the drill (old) or intro (new)
  const drillTitle = page.locator('#drill-title');
  
  // For TDD, we assert that the "Start Exercises" button is visible.
  // We'll name the button id="start-topic-btn"
  const startBtn = page.locator('#start-topic-btn');
  
  // This expectation is for the FUTURE state.
  await expect(startBtn).toBeVisible({ timeout: 2000 }); 
  
  // 4. Click Start
  await startBtn.click();
  
  // 5. Now we should be in the drill
  await expect(drillTitle).not.toBeEmpty();
  await expect(page.locator('#staff-display')).toBeVisible();
});

test('verify sequence notes are spaced apart', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1280, height: 720 });
  
  // Go to "1.1 The Semitone" (Interval/Sequence type)
  await page.click('text=1.1 The Semitone');
  await page.click('#start-topic-btn');
  
  // Wait for notes to render
  const notes = page.locator('#staff-display ellipse');
  await expect(notes).toHaveCount(2); // C4 and C#4
  
  const note1 = notes.nth(0);
  const note2 = notes.nth(1);
  
  const cx1 = parseFloat(await note1.getAttribute('cx'));
  const cx2 = parseFloat(await note2.getAttribute('cx'));
  
  console.log(`Note 1 cx: ${cx1}, Note 2 cx: ${cx2}`);
  
  // Expect spacing to be ~20px
  expect(cx2 - cx1).toBeGreaterThan(15);
});
