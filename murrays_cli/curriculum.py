class Curriculum:
    BEGINNER_PATH = [
        "Intervals (Half/Whole Steps)",
        "Diatonic Scales",
        "Chromatic Scale",
        "Major & Minor Scales",
        "Major & Minor Triads",
        "Augmented & Diminished Triads",
        "Suspended Chords",
        "6th Chords",
        "Tetrads (4-Note Chords)",
        "Chord Inversions",
        "Relative Keys",
        "The Number System (Roman Numerals)"
    ]

    ADVANCED_PATH = [
        "Dominants & Tritones",
        "Secondary Dominants",
        "Tritone Substitution",
        "Altered Notes & Extensions",
        "Circle of 5ths",
        "Modes",
        "Minor Variations",
        "Exotic Scales",
        "Jazz Voicings (Open/Closed/Quartal)"
    ]

    DESCRIPTIONS = {
        # BOOK 1: BASIC
        "Intervals (Half/Whole Steps)": "The distance between notes. Half Step = 1 Key (C to C#). Whole Step = 2 Keys (C to D).",
        "Diatonic Scales": "The 'White Keys' scale. All notes from C to C with no sharps or flats. The foundation of Western music.",
        "Chromatic Scale": "Every single note in order (12 tones). All the sharps and flats included.",
        "Major & Minor Scales": "The two main moods of music. Major = Happy (W-W-H-W-W-W-H). Minor = Sad (W-H-W-W-H-W-W).",
        "Major & Minor Triads": "3-note chords. Major (1-3-5) is happy. Minor (1-b3-5) is sad.",
        "Augmented & Diminished Triads": "Augmented: Sharp the 5th (1-3-#5). Diminished: Flat the 3rd and 5th (1-b3-b5).",
        "Suspended Chords": "Replace the 3rd with a 2nd (Sus2) or 4th (Sus4). Sounds open and floating.",
        "6th Chords": "Add the 6th note to a triad. C6 = C-E-G-A. Sounds pastoral and sweet.",
        "Tetrads (4-Note Chords)": "Sticking to the 7th note. Major 7 (1-3-5-7), Minor 7 (1-b3-5-b7), Dominant 7 (1-3-5-b7).",
        "Chord Inversions": "Rearranging the order of notes (e.g., C-E-G becomes E-G-C). Makes chord changes smoother.",
        "Relative Keys": "Every Major key has a Minor twin that shares the same notes. C Major's relative is A Minor.",
        "The Number System (Roman Numerals)": "Labeling chords 1-7 (I-VII) to understand their function in any key.",

        # BOOK 2: ADVANCED
        "Dominants & Tritones": "The tension chord (V7). Contains a Tritone (Devil in Music) that pulls to the root.",
        "Secondary Dominants": "A dominant chord that resolves to a chord *other* than the tonic (e.g., V of V).",
        "Tritone Substitution": "Replacing a Dominant 7th with another Dominant 7th exactly 6 semitones away.",
        "Altered Notes & Extensions": "Adding spice: 9ths, 11ths, 13ths, b9, #9, #11, b13.",
        "Circle of 5ths": "A visual map of how all 12 keys relate to each other.",
        "Modes": "Variations of the Major scale starting on different steps (Dorian, Phrygian, Lydian, etc.).",
        "Minor Variations": "Harmonic Minor (Sharp 7), Melodic Minor (Sharp 6 & 7).",
        "Exotic Scales": "Whole Tone, Diminished (Half-Whole), and other non-traditional scales.",
        "Jazz Voicings (Open/Closed/Quartal)": "Advanced ways to arrange notes. Herbie Hancock, Bill Evans, and Kenny Barron styles."
    }
    
    CHALLENGES = {
        "Intervals (Half/Whole Steps)": [
            {"type": "interval", "root": "C4", "semitones": 1, "instruction": "Play a Half Step Up from C", "context": "The smallest interval. 'Jaws' Theme."},
            {"type": "interval", "root": "C4", "semitones": 2, "instruction": "Play a Whole Step Up from C", "context": "Standard major scale step. 'Happy Birthday'."},
            {"type": "interval", "root": "E4", "semitones": 1, "instruction": "Play a Half Step (E to F)", "context": "Natural half step (no black key between E and F)."},
            {"type": "interval", "root": "G3", "semitones": 2, "instruction": "Play a Whole Step Up from G", "context": "The start of many folk melodies."}
        ],
        "Diatonic Scales": [
            {"type": "sequence", "notes": ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"], "instruction": "Play the C Major Diatonic Scale", "context": "The 'White Keys' scale. Do-Re-Mi..."},
            {"type": "sequence", "notes": ["G3", "A3", "B3", "C4", "D4", "E4", "F#4", "G4"], "instruction": "Play the G Major Scale (1 Sharp)", "context": "Classic classical key. Note the F#."},
            {"type": "sequence", "notes": ["F3", "G3", "A3", "Bb3", "C4", "D4", "E4", "F4"], "instruction": "Play the F Major Scale (1 Flat)", "context": "Common key for brass instruments."}
        ],
        "Chromatic Scale": [
            {"type": "sequence", "notes": ["C4", "C#4", "D4", "D#4", "E4", "F4"], "instruction": "Play C Chromatic (Ascending)", "context": "Every half step. 'Flight of the Bumblebee'."},
            {"type": "sequence", "notes": ["G4", "F#4", "F4", "E4", "Eb4", "D4"], "instruction": "Play G Chromatic (Descending)", "context": "Used in glissandos and runs."}
        ],
        "Major & Minor Scales": [
            {"type": "sequence", "notes": ["A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4"], "instruction": "Play A Natural Minor Scale", "context": "Sad, serious. Same notes as C Major."},
            {"type": "sequence", "notes": ["A3", "B3", "C4", "D4", "E4", "F4", "G#4", "A4"], "instruction": "Play A Harmonic Minor (Sharp 7)", "context": "Classical/Latin flavor. Note the G#."},
            {"type": "sequence", "notes": ["C4", "D4", "Eb4", "F4", "G4", "Bb4", "C5"], "instruction": "Play C Minor Pentatonic", "context": "The 'Rock/Blues' scale. Essential for solos."}
        ],
        "Major & Minor Triads": [
            {"type": "triad", "root": "C4", "formula_key": "maj", "instruction": "Play C Major Triad (1-3-5)", "context": "Happy. 'Let It Be' (Beatles)."},
            {"type": "triad", "root": "C4", "formula_key": "min", "instruction": "Play C Minor Triad (1-b3-5)", "context": "Sad. 'Eye of the Tiger' (Survivor)."},
            {"type": "triad", "root": "F3", "formula_key": "maj", "instruction": "Play F Major Triad", "context": "Bright and open. 'Free Fallin' uses this."},
            {"type": "triad", "root": "A3", "formula_key": "min", "instruction": "Play A Minor Triad", "context": "Serious. 'Stairway to Heaven'."}
        ],
        "Augmented & Diminished Triads": [
            {"type": "triad", "root": "C4", "formula_key": "aug", "instruction": "Play C Augmented (1-3-#5)", "context": "Dreamy/Unsettled. 'Life on Mars' (Bowie) pre-chorus."},
            {"type": "triad", "root": "B3", "formula_key": "dim", "instruction": "Play B Diminished (1-b3-b5)", "context": "Tense. Pulls strongly to C Major."},
            {"type": "triad", "root": "F4", "formula_key": "aug", "instruction": "Play F Augmented", "context": "Floating feeling. Used in intros."}
        ],
        "Suspended Chords": [
            {"type": "triad", "root": "D4", "formula_key": "sus4", "instruction": "Play D Sus4 (1-4-5)", "context": "Rock: 'Pinball Wizard' (The Who)."},
            {"type": "triad", "root": "D4", "formula_key": "sus2", "instruction": "Play D Sus2 (1-2-5)", "context": "Ballad: 'Summer of 69' (Bryan Adams)."},
            {"type": "triad", "root": "A3", "formula_key": "sus4", "instruction": "Play A Sus4", "context": "Pop: 'Jack & Diane' intro."}
        ],
        "6th Chords": [
            {"type": "triad", "root": "C4", "formula_key": "maj6", "instruction": "Play C Major 6 (1-3-5-6)", "context": "Swing/Jazz. The ending chord of 'She Loves You' (Beatles)."},
            {"type": "triad", "root": "C4", "formula_key": "min6", "instruction": "Play C Minor 6 (1-b3-5-6)", "context": "Spy Theme: 'James Bond' Theme ending chord."},
            {"type": "triad", "root": "G3", "formula_key": "maj6", "instruction": "Play G Major 6", "context": "Rockabilly/Boogie Woogie bass lines."}
        ],
        "Tetrads (4-Note Chords)": [
            {"type": "triad", "root": "C4", "formula_key": "maj7", "instruction": "Play C Major 7 (1-3-5-7)", "context": "Dreamy. 'Imagine' (John Lennon)."},
            {"type": "triad", "root": "D4", "formula_key": "min7", "instruction": "Play D Minor 7 (1-b3-5-b7)", "context": "Cool. 'Get Down On It' (Kool & The Gang)."},
            {"type": "triad", "root": "G3", "formula_key": "dom7", "instruction": "Play G Dominant 7 (1-3-5-b7)", "context": "Bluesy. The V chord in C Major."}
        ],
        "Chord Inversions": [
            {"type": "sequence", "notes": ["E4", "G4", "C5"], "instruction": "Play C Major (1st Inversion)", "context": "3rd in the bass. Smoother voice leading."},
            {"type": "sequence", "notes": ["G3", "C4", "E4"], "instruction": "Play C Major (2nd Inversion)", "context": "5th in the bass. Used in gospel 'Amen' endings."},
            {"type": "sequence", "notes": ["F4", "A4", "D5"], "instruction": "Play D Minor (1st Inversion)", "context": "Common in pop piano ballads."}
        ],
        "Relative Keys": [
            {"type": "sequence", "notes": ["C4", "A3"], "instruction": "Play C Major then A Minor (Relative)", "context": "They share the exact same notes."},
            {"type": "sequence", "notes": ["G3", "E3"], "instruction": "Play G Major then E Minor (Relative)", "context": "Standard pop modulation."},
            {"type": "sequence", "notes": ["F3", "D3"], "instruction": "Play F Major then D Minor (Relative)", "context": "Common pairing in ballads."}
        ],
        "The Number System (Roman Numerals)": [
            {"type": "sequence", "notes": ["C4", "F4", "G4", "C5"], "instruction": "Play I - IV - V - I in C", "context": "The 'Three Chord Trick'. Basis of Rock & Roll."},
            {"type": "sequence", "notes": ["C4", "A3", "F3", "G3"], "instruction": "Play I - vi - IV - V in C", "context": "The '50s Progression' (Stand By Me, etc.)."},
            {"type": "sequence", "notes": ["D4", "G3", "C4"], "instruction": "Play ii - V - I in C (Dm - G - C)", "context": "The 'Jazz Progression'."}
        ],
        
        # ADVANCED
        "Dominants & Tritones": [
            {"type": "triad", "root": "G3", "formula_key": "dom7", "instruction": "Play G7 (V of C)", "context": "Hear the pull to C? That's the Tritone (B-F)."},
            {"type": "interval", "root": "B3", "semitones": 6, "instruction": "Play the Tritone in G7 (B to F)", "context": "The 'Unstable' core of the chord."},
            {"type": "triad", "root": "E4", "formula_key": "dom7", "instruction": "Play E7 (V of A)", "context": "Resolves to A Major or A Minor."}
        ],
        "Secondary Dominants": [
            {"type": "triad", "root": "A3", "formula_key": "dom7", "instruction": "Play A7 (V of ii in C)", "context": "Pulls to D Minor. 'Hey Jude' uses this."},
            {"type": "triad", "root": "D4", "formula_key": "dom7", "instruction": "Play D7 (V of V in C)", "context": "Pulls to G. 'Yesterday' uses this."},
            {"type": "triad", "root": "E4", "formula_key": "dom7", "instruction": "Play E7 (V of vi in C)", "context": "Pulls to A Minor. 'Creep' (Radiohead) uses III7."}
        ],
        "Tritone Substitution": [
            {"type": "triad", "root": "Db4", "formula_key": "dom7", "instruction": "Play Db7 (Sub for G7)", "context": "Resolves to C. Jazz chromatic bass movement."},
            {"type": "triad", "root": "Gb3", "formula_key": "dom7", "instruction": "Play Gb7 (Sub for C7)", "context": "Resolves to F."},
            {"type": "sequence", "notes": ["D4", "Db4", "C4"], "instruction": "Play ii - subV - I (Dm - Db7 - C)", "context": "Smooth chromatic bassline."}
        ],
        "Altered Notes & Extensions": [
            {"type": "sequence", "notes": ["C4", "E4", "G4", "Bb4", "D5"], "instruction": "Play C9 (Dominant 9th)", "context": "James Brown funk chord."},
            {"type": "sequence", "notes": ["C4", "E4", "G4", "Bb4", "Db5"], "instruction": "Play C7b9", "context": "Jazz tension. Resolves to Fm."},
            {"type": "sequence", "notes": ["C4", "E4", "G#4", "Bb4"], "instruction": "Play C7#5 (Altered)", "context": "Whole tone feel. Intros and endings."}
        ],
        "Circle of 5ths": [
            {"type": "sequence", "notes": ["C4", "F4", "Bb3"], "instruction": "Play C -> F -> Bb", "context": "Falling 5ths. The strongest harmonic motion."},
            {"type": "sequence", "notes": ["E4", "A3", "D4", "G3", "C4"], "instruction": "Play E -> A -> D -> G -> C", "context": "Full diatonic circle progression."}
        ],
        "Modes": [
            {"type": "sequence", "notes": ["D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5"], "instruction": "Play D Dorian (White Keys)", "context": "Sad but hopeful. 'So What' (Miles Davis)."},
            {"type": "sequence", "notes": ["E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"], "instruction": "Play E Phrygian", "context": "Spanish/Flamenco sound."},
            {"type": "sequence", "notes": ["F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4"], "instruction": "Play F Lydian (#4)", "context": "Dreamy/Sci-Fi. 'The Simpsons' opening."}
        ],
        "Minor Variations": [
            {"type": "sequence", "notes": ["A3", "B3", "C4", "D4", "E4", "F4", "G#4", "A4"], "instruction": "Play Harmonic Minor", "context": "Snake charmer vibe."},
            {"type": "sequence", "notes": ["A3", "B3", "C4", "D4", "E4", "F#4", "G#4", "A4"], "instruction": "Play Melodic Minor (Ascending)", "context": "Smooth, jazzy minor."}
        ],
        "Exotic Scales": [
            {"type": "sequence", "notes": ["C4", "D4", "E4", "F#4", "G#4", "Bb4", "C5"], "instruction": "Play Whole Tone Scale", "context": "Dream sequences in movies."},
            {"type": "sequence", "notes": ["C4", "Db4", "E4", "F4", "G4", "Ab4", "B4", "C5"], "instruction": "Play Double Harmonic Major", "context": "Middle Eastern/Byzantine sound ('Misirlou')."}
        ],
        "Jazz Voicings (Open/Closed/Quartal)": [
            {"type": "sequence", "notes": ["D4", "G4", "C5", "F5"], "instruction": "Play Quartal Voicing (Stacked 4ths)", "context": "'So What' voicing. Modern and open."},
            {"type": "sequence", "notes": ["C4", "E4", "G4", "B4"], "instruction": "Play Closed Voicing (Cmaj7)", "context": "Tight block chord."},
            {"type": "sequence", "notes": ["C3", "G3", "E4", "B4"], "instruction": "Play Open Voicing (Cmaj7)", "context": "Spacious, professional ballad sound."}
        ]
    }
