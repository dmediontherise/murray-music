class Curriculum:
    BEGINNER_PATH = [
        "Intervals",
        "Major Triads",
        "Minor Triads",
        "Diminished Triads", # Triad only
        "Suspended Chords",
        "Major 7th Chords",
        "Minor 7th Chords",
        "Dominant 7th Chords",
        "The Number System"
    ]

    ADVANCED_PATH = [
        "Circle of 5ths",
        "Modes",
        "Tritone Substitution",
        "Half-Diminished 7th",
        "Fully Diminished 7th",
        "Altered Dominants",
        "Herbie Hancock Voicing",
        "So What Voicing",
        "Kenny Barron Voicing",
        "Exotic Scales"
    ]

    DESCRIPTIONS = {
        # Intervals
        'm2': "Minor 2nd: Very dissonant, 1 semitone apart. Tension/Horror.",
        'M2': "Major 2nd: Whole step. Standard building block.",
        'm3': "Minor 3rd: Sad, melancholic. Defines Minor.",
        'M3': "Major 3rd: Happy, bright. Defines Major.",
        'P4': "Perfect 4th: Consonant but suspended. 'Here Comes the Bride'.",
        'd5': "Tritone: 'The Devil in Music'. Highly unstable.",
        'P5': "Perfect 5th: The 'Power Chord'. Stable.",
        'm6': "Minor 6th: Emotional, romantic, or tragic.",
        'M6': "Major 6th: Pleasant, pastoral.",
        'm7': "Minor 7th: Funky, jazzy, or unresolved.",
        'M7': "Major 7th: Dreamy, nostalgic.",
        'P8': "Octave: Perfectly consonant.",

        # Triads
        "Major Triads": "Happy, bright (1-3-5).",
        "Minor Triads": "Sad, serious (1-b3-5).",
        "Diminished Triads": "Tense, constricted (1-b3-b5).",
        "Suspended Chords": "Open, tension-building (sus2: 1-2-5, sus4: 1-4-5).",

        # 7ths
        "Major 7th Chords": "Dreamy, Jazz/Lo-Fi (1-3-5-7).",
        "Minor 7th Chords": "Mellow, cool (1-b3-5-b7).",
        "Dominant 7th Chords": "Tense, bluesy (1-3-5-b7).",
        "Half-Diminished 7th": "m7b5: Dark, mysterious (1-b3-b5-b7).",
        "Fully Diminished 7th": "dim7: Extremely tense (1-b3-b5-bb7).",

        # Advanced
        "Tritone Substitution": "Swap Dom7 with one a tritone away (G7 -> Db7).",
        "Altered Dominants": "Adding tension (#5, b9) to pull to tonic.",
        "The Number System": "Nashville Number System / Roman Numerals analysis.",
        "Circle of 5ths": "Relationship of 12 tones. Clockwise=5ths.",
        "Herbie Hancock Voicing": "Dense dominant 13th voicing.",
        "So What Voicing": "Quartal voicing (stacked 4ths).",
        "Kenny Barron Voicing": "Open Minor 11th voicing.",
        "Exotic Scales": "Double Harmonic, Whole Tone, etc."
    }
