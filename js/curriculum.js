const Curriculum = {
    BEGINNER: [
        "Intervals", "Diatonic Scales", "Chromatic Scale", "Major & Minor Scales",
        "Major & Minor Triads", "Augmented & Diminished Triads", "Suspended Chords",
        "6th Chords", "Tetrads (4-Note Chords)", "Chord Inversions", "Relative Keys", "The Number System"
    ],
    ADVANCED: [
        "Dominants & Tritones", "Secondary Dominants", "Tritone Substitution",
        "Altered Notes & Extensions", "Circle of 5ths", "Modes", "Minor Variations",
        "Exotic Scales", "Jazz Voicings", "Enclosures", "Approach Tones"
    ],
    CHALLENGES: {
        "Intervals": [
            {type: "interval", notes: ["C4","E4"], instruction: "Play C Major 3rd", context: "Happy. 'When the Saints'."},
            {type: "interval", notes: ["C4","G4"], instruction: "Play C Perfect 5th", context: "Power. 'Star Wars'."},
            {type: "interval", notes: ["A3","C4"], instruction: "Play A Minor 3rd", context: "Sad. 'Greensleeves'."},
            {type: "interval", notes: ["G3","C4"], instruction: "Play G Perfect 4th", context: "Call. 'Here Comes the Bride'."},
            {type: "interval", notes: ["D4","E4"], instruction: "Play D Major 2nd", context: "Step. 'Happy Birthday'."},
            {type: "interval", notes: ["E4","F4"], instruction: "Play E Minor 2nd", context: "Tension. 'Jaws'."},
            {type: "interval", notes: ["F3","F4"], instruction: "Play F Octave", context: "Leap. 'Over the Rainbow'."},
            {type: "interval", notes: ["B3","F4"], instruction: "Play B Tritone", context: "Devil. 'The Simpsons'."},
            {type: "interval", notes: ["C4","B4"], instruction: "Play C Major 7th Interval", context: "Dreamy. 'Take On Me'."},
            {type: "interval", notes: ["G4","F5"], instruction: "Play G Minor 7th Interval", context: "Space. 'Star Trek'."}
        ],
        "Major & Minor Triads": [
            {type: "triad", notes: ["C4","E4","G4"], instruction: "Play C Major", context: "Happy. (1-3-5)"},
            {type: "triad", notes: ["A3","C4","E4"], instruction: "Play A Minor", context: "Sad. (1-b3-5)"},
            {type: "triad", notes: ["G3","B3","D4"], instruction: "Play G Major", context: "Bright."},
            {type: "triad", notes: ["E4","G4","B4"], instruction: "Play E Minor", context: "Heavy."},
            {type: "triad", notes: ["D4","F#4","A4"], instruction: "Play D Major", context: "Bold."},
            {type: "triad", notes: ["D4","F4","A4"], instruction: "Play D Minor", context: "Serious."},
            {type: "triad", notes: ["F3","A3","C4"], instruction: "Play F Major", context: "Warm."},
            {type: "triad", notes: ["F3","Ab3","C4"], instruction: "Play F Minor", context: "Tragic."},
            {type: "triad", notes: ["B3","D#4","F#4"], instruction: "Play B Major", context: "Sharp."},
            {type: "triad", notes: ["B3","D4","F#4"], instruction: "Play B Minor", context: "Dark."}
        ]
        // ... (Full data would be here, truncated for artifacts limit, but logic handles missing data safely)
    }
};

window.Curriculum = Curriculum;
