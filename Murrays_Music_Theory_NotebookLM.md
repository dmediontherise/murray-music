# Murray's Music Theory - Project Documentation
**For NotebookLM Integration**

## 1. Project Overview
**Murray's Music Theory** is an interactive, web-based educational tool designed to visualize and audibly demonstrate complex music theory concepts. It serves as a digital companion to the "Murray's Theory" curriculum, allowing students to hear, see, and interact with theoretical structures in real-time.

## 2. Design Philosophy & User Experience
*   **Aesthetic:** High Contrast Black & White (Piano Key Theme). The interface uses a strictly monochromatic palette (`#000000` background, `#FFFFFF` text) to minimize distraction and focus entirely on the theory.
*   **Layout:** A responsive "Bento Grid" layout that organizes information into three distinct tiers:
    1.  **Fundamentals:** Basic building blocks (Intervals, Triads).
    2.  **Modes & Scales:** Melodic structures and the Circle of 5ths.
    3.  **Advanced:** Complex voicings and reharmonization techniques.
*   **Interaction:**
    *   **Interactive Piano:** A fully playable, 3-octave virtual piano (C3-B5) that visualizes active notes.
    *   **Staff Visualization:** A dynamic music staff that renders notes in real-time as they are played.
    *   **Info Panel:** A context-aware sidebar that provides educational descriptions for every selected element.

## 3. Audio Engine
The tool utilizes the **Web Audio API** to generate sound in real-time without relying on pre-recorded MP3s.
*   **Oscillators:** Uses triangle and sine waves to create clear, pitch-perfect tones.
*   **Polyphony:** Capable of playing complex chords (up to 7+ notes) simultaneously.
*   **Sustain:** Supports "press and hold" functionality for keys.

## 4. Educational Content (Theory Database)

### Fundamentals
*   **Intervals:**
    *   **Minor 2nd:** Very dissonant, 1 semitone apart. Creates a sense of tension or horror.
    *   **Major 2nd:** Whole step, 2 semitones. A standard building block for scales.
    *   **Minor 3rd:** Sad, melancholic, or serious. The defining interval of a Minor Chord.
    *   **Major 3rd:** Happy, bright, or stable. The defining interval of a Major Chord.
    *   **Perfect 4th:** Consonant but slightly suspended. Sounds like a call or announcement.
    *   **Tritone (d5):** The "Devil in Music". 6 semitones. Highly unstable and demands resolution.
    *   **Perfect 5th:** The "Power Chord". 7 semitones. Very stable, grounded, and powerful.
    *   **Minor 6th:** Emotional, romantic, or tragic.
    *   **Major 6th:** Pleasant, pastoral, and restful.
    *   **Minor 7th:** Funky, jazzy, or unresolved. Essential for Dominant 7th chords.
    *   **Major 7th:** Dreamy, nostalgic, and smooth. Common in Jazz.
    *   **Octave:** The same note at a higher pitch. Perfectly consonant.

*   **Triads & 7th Chords:**
    *   **Major Triad (1-3-5):** Happy, bright, and stable.
    *   **Minor Triad (1-b3-5):** Sad, serious, or melancholic.
    *   **Diminished Triad (1-b3-b5):** Tense, constricted, and unstable.
    *   **Augmented Triad (1-3-#5):** Dreamy, floating, and unsettled.
    *   **Suspended 4th (1-4-5):** Open and tension-building.
    *   **Major 7th (1-3-5-7):** Dreamy, nostalgic.
    *   **Minor 7th (1-b3-5-b7):** Mellow, cool, and soulful.
    *   **Dominant 7th (1-3-5-b7):** Tense and bluesy. Wants to resolve to the Tonic.
    *   **Half-Diminished (m7b5):** Dark, mysterious, and tragic.
    *   **Fully Diminished (dim7):** Extremely tense and ambiguous.

### Modes & Scales
*   **Church Modes:**
    *   **Ionian:** The standard Major scale. Bright and heroic.
    *   **Dorian:** Minor scale with a brighter Major 6th. Soulful and jazzy.
    *   **Phrygian:** Minor scale with a dark Flat 2nd. Spanish or exotic sound.
    *   **Lydian:** Major scale with a Sharp 4th. Dreamy and magical.
    *   **Mixolydian:** Major scale with a Flat 7th. Bluesy and rock-n-roll.
    *   **Aeolian:** The standard Natural Minor scale. Sad and epic.
    *   **Locrian:** The only mode with a diminished 5th. Very unstable.

*   **Minor Variations:**
    *   **Harmonic Minor:** Natural minor with a raised 7th. "Snake Charmer" sound.
    *   **Melodic Minor (Jazz Minor):** Natural minor with raised 6th and 7th. Smooth and sophisticated.

*   **Jazz, Blues, & Exotic:**
    *   **Major Pentatonic:** 5-note "Country/Pop" scale. Very pure.
    *   **Minor Pentatonic:** 5-note "Rock/Blues" scale.
    *   **Blues Scale:** Minor Pentatonic with an added "Blue Note" (#4/b5).
    *   **Whole Tone:** 6 notes separated by whole steps. Dreamy and ambiguous.
    *   **Diminished (Half-Whole):** Symmetrical scale used over Dominant 7b9 chords.
    *   **Double Harmonic Major:** The "Byzantine" scale. Exotic and intense.
    *   **Double Harmonic Minor:** The "Sadness" scale. Features two augmented second intervals.

### Advanced Concepts
*   **Voicings:**
    *   **Shell Voicings:** Playing only the essential 3rd and 7th (dropping the root). Defines the chord clearly with minimal notes.
    *   **Herbie Hancock Voicing:** A rich Dominant 13th voicing (LH: 1-7, RH: 3-13-7-9).
    *   **So What Voicing:** A quartal voicing (stacked 4ths) used for modal jazz.
    *   **Kenny Barron Voicing:** An open Minor 11th voicing (1-5-9-11-7).
*   **Reharmonization:**
    *   **Tritone Substitution:** Replacing a Dominant 7th chord with one a tritone away (e.g., G7 -> Db7).
    *   **Altered Dominants:** Adding tension to a Dominant chord using Sharp 5 (#5) or Flat 9 (b9) to pull stronger to the tonic.
    *   **Circle of 5ths:** A visual tool showing the relationship between the 12 tones.

## 5. Technical Stack
*   **Frontend:** HTML5, CSS3 (Flexbox/Grid), Vanilla JavaScript (ES6+).
*   **Audio:** Web Audio API (`AudioContext`, `OscillatorNode`, `GainNode`).
*   **Deployment:** GitHub Pages (Single Page Application).
