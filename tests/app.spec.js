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
