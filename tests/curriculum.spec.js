const { test, expect } = require('@playwright/test');

test('every note in every curriculum challenge maps through window.Theory.getMidi into MIDI range 48..83 inclusive', async ({ page }) => {
  await page.goto('/');
  await page.waitForFunction(() => window.Curriculum && window.Theory);

  const invalidNotes = await page.evaluate(() => {
    const C = window.Curriculum;
    const T = window.Theory;
    const allTopics = [...C.BEGINNER, ...C.ADVANCED];
    const invalid = [];

    allTopics.forEach(topic => {
      const challenges = C.CHALLENGES[topic] || [];
      challenges.forEach((ch, idx) => {
        const noteLists = ch.sequence ? ch.sequence : [ch.notes || []];
        noteLists.forEach((noteArr, sIdx) => {
          noteArr.forEach(noteName => {
            const midi = T.getMidi(noteName);
            if (midi === null || midi < 48 || midi > 83) {
              invalid.push({ topic, challengeIndex: idx, stepIndex: sIdx, noteName, midi });
            }
          });
        });
      });
    });

    return invalid;
  });

  expect(invalidNotes).toEqual([]);
});

test('four specific music-theory spelling fixes are accurate', async ({ page }) => {
  await page.goto('/');
  await page.waitForFunction(() => window.Curriculum && window.Theory);

  const accuracyData = await page.evaluate(() => {
    const C = window.Curriculum;
    
    // Defect 1: 2.3 Subdominant Function Fmaj7 chord-sequence first step
    const d1 = C.CHALLENGES['2.3 Subdominant Function'].find(c => c.type === 'chord-sequence').sequence[0];
    
    // Defect 2: 2.5 Tritone Substitution Dm7 chord-sequence first step
    const d2 = C.CHALLENGES['2.5 Tritone Substitution'].find(c => c.type === 'chord-sequence').sequence[0];

    // Defect 3: 4.4 Upper Structures Cmaj7 + Dmaj first entry notes
    const d3 = C.CHALLENGES['4.4 Upper Structures'][0].notes;

    // Defect 4: 4.7 Diminished Scale Half-Whole Diminished notes
    const d4 = C.CHALLENGES['4.7 Diminished Scale'].find(c => c.instruction === 'Play Half-Whole Diminished').notes;

    return { d1, d2, d3, d4 };
  });

  expect(accuracyData.d1).toEqual(["F4","A4","C5","E5"]);
  expect(accuracyData.d2).toEqual(["D4","F4","A4","C5"]);
  expect(accuracyData.d3).toEqual(["C4","E4","G4","B4","D5","F#4","A4"]);
  expect(accuracyData.d4).toEqual(["C4","Db4","Eb4","E4","F#4","G4","A4","Bb4","C5"]);
});

test('task 002c music-theory spelling fixes (G7alt and So What) are accurate', async ({ page }) => {
  await page.goto('/');
  await page.waitForFunction(() => window.Curriculum && window.Theory);

  const accuracyData = await page.evaluate(() => {
    const C = window.Curriculum;

    const g7alt = C.CHALLENGES['4.5 Altered Dominants'].find(c => /G7alt/.test(c.instruction));
    const soWhat = C.CHALLENGES['4.3 Quartal Harmony'].find(c => /So What/.test(c.instruction));

    return {
      g7altInstruction: g7alt ? g7alt.instruction : null,
      g7altNotes: g7alt ? g7alt.notes : null,
      soWhatNotes: soWhat ? soWhat.notes : null
    };
  });

  expect(accuracyData.g7altInstruction).toBe("Play G7alt (b9, b13)");
  expect(accuracyData.g7altNotes).toEqual(["G4","B4","Eb5","F5","Ab5"]);
  expect(accuracyData.soWhatNotes).toEqual(["D4","G4","C5","F5","A5"]);
});

