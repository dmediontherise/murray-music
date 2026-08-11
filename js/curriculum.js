const Curriculum = {
    BEGINNER: [
        // Section 1: The Atoms (Intervals)
        "1.1 The Semitone", "1.2 The Whole Tone", "1.3 The Major 2nd", "1.4 The Minor 3rd",
        "1.5 The Major 3rd", "1.6 The Perfect 4th", "1.7 The Tritone", "1.8 The Perfect 5th",
        "1.9 The Minor 6th", "1.10 The Major 6th", "1.11 The Minor 7th", "1.12 The Major 7th",
        "1.13 The Octave",
        
        // Section 2: Scales (The Palette)
        "2.1 The Chromatic Scale", "2.2 The Major Scale", "2.3 Natural Minor", 
        "2.4 Harmonic Minor", "2.5 Melodic Minor", "2.6 Major Pentatonic", 
        "2.7 Minor Pentatonic", "2.8 The Blues Scale",

        // Section 3: Triads (Building Blocks)
        "3.1 Major Triads", "3.2 Minor Triads", "3.3 Diminished Triads", 
        "3.4 Augmented Triads", "3.5 Suspended 2nd", "3.6 Suspended 4th",

        // Section 4: Harmony Basics
        "4.1 I-IV-V Progression", "4.2 ii-V-I Progression", "4.3 1st Inversion", 
        "4.4 2nd Inversion", "4.5 Relative Keys"
    ],
    ADVANCED: [
        // Section 1: Extended Chords
        "1.1 Major 7th Chords", "1.2 Dominant 7th Chords", "1.3 Minor 7th Chords",
        "1.4 Half-Diminished 7th", "1.5 Fully Diminished 7th", "1.6 Adding the 9th",
        "1.7 11ths and 13ths",

        // Section 2: Functional Harmony
        "2.1 Tonic Function", "2.2 Dominant Function", "2.3 Subdominant Function",
        "2.4 Secondary Dominants", "2.5 Tritone Substitution", "2.6 Passing Diminished",

        // Section 3: Modes
        "3.1 Ionian (Major)", "3.2 Dorian (So What)", "3.3 Phrygian (Spanish)",
        "3.4 Lydian (Dreamy)", "3.5 Mixolydian (Rock)", "3.6 Aeolian (Minor)",
        "3.7 Locrian (Unstable)",

        // Section 4: Jazz & Modern
        "4.1 Shell Voicings", "4.2 Rootless Voicings", "4.3 Quartal Harmony",
        "4.4 Upper Structures", "4.5 Altered Dominants", "4.6 Whole Tone Scale",
        "4.7 Diminished Scale", "4.8 Bebop Enclosures", "4.9 Coltrane Changes"
    ],
    DESCRIPTIONS: {
        // --- BASIC ---
        "1.1 The Semitone": `<p>The smallest distance in Western music. Also known as a Half Step. It creates immediate tension. Think of the 'Jaws' theme.</p>`,
        "1.2 The Whole Tone": `<p>Two semitones make a Whole Tone. It feels like taking a confident step forward. The opening of 'Happy Birthday'.</p>`,
        "1.3 The Major 2nd": `<p>The interval of a Whole Step. It sounds open but slightly unfinished.</p>`,
        "1.4 The Minor 3rd": `<p>The heart of Sadness. This 3-semitone interval defines the Minor chord and sounds melancholic.</p>`,
        "1.5 The Major 3rd": `<p>The heart of Happiness. This 4-semitone interval defines the Major chord and sounds bright and stable.</p>`,
        "1.6 The Perfect 4th": `<p>A structural pillar. 5 semitones. Sounds like a call or announcement ('Here Comes the Bride').</p>`,
        "1.7 The Tritone": `<p>The 'Devil in Music'. 6 semitones. It splits the octave perfectly in half and is highly unstable.</p>`,
        "1.8 The Perfect 5th": `<p>The 'Power Chord'. 7 semitones. The most stable interval besides the octave. Rock and Roll's best friend.</p>`,
        "1.9 The Minor 6th": `<p>Romantic and tragic. 8 semitones. Used heavily in film scores for love themes.</p>`,
        "1.10 The Major 6th": `<p>Pastoral and restful. 9 semitones. Think 'My Bonnie Lies Over the Ocean'.</p>`,
        "1.11 The Minor 7th": `<p>Funky and unresolved. 10 semitones. The defining sound of a Dominant 7th chord.</p>`,
        "1.12 The Major 7th": `<p>Dreamy and nostalgic. 11 semitones. It yearns desperately to resolve up to the Octave.</p>`,
        "1.13 The Octave": `<p>Home. 12 semitones. The same note, just higher. A perfect circle.</p>`,
        
        "2.1 The Chromatic Scale": `<p>Every single note in order. No gaps. Sounds like a swarm of bees or a falling cartoon character.</p>`,
        "2.2 The Major Scale": `<p>The 'Ionian' mode. The standard Do-Re-Mi. Formula: W-W-H-W-W-W-H. Happy and Heroic.</p>`,
        "2.3 Natural Minor": `<p>The 'Aeolian' mode. The standard sad scale. Formula: W-H-W-W-H-W-W.</p>`,
        "2.4 Harmonic Minor": `<p>Natural Minor with a raised 7th. Creates an exotic 'Snake Charmer' gap between the 6th and 7th degrees.</p>`,
        "2.5 Melodic Minor": `<p>The 'Jazz Minor'. Natural minor with a raised 6th and 7th ascending. Smooth and sophisticated.</p>`,
        "2.6 Major Pentatonic": `<p>Five notes. No semitones. Pure, country, and folk sound. 'My Girl'.</p>`,
        "2.7 Minor Pentatonic": `<p>The Rock & Roll scale. Five notes. The basis for almost all guitar solos.</p>`,
        "2.8 The Blues Scale": `<p>Minor Pentatonic plus the 'Blue Note' (#4/b5). Gritty, soulful, and expressive.</p>`,
        
        "3.1 Major Triads": `<p>Root - 3rd - 5th. The basic building block of happy harmony.</p>`,
        "3.2 Minor Triads": `<p>Root - b3 - 5th. The basic building block of sad harmony.</p>`,
        "3.3 Diminished Triads": `<p>Root - b3 - b5. Tense and constricted. Found in horror movies.</p>`,
        "3.4 Augmented Triads": `<p>Root - 3 - #5. Expanded and dreamy. Feels like floating in space.</p>`,
        "3.5 Suspended 2nd": `<p>Root - 2 - 5. Open and airy. Replaces the 3rd with a 2nd.</p>`,
        "3.6 Suspended 4th": `<p>Root - 4 - 5. Anthem-like tension. Replaces the 3rd with a 4th.</p>`,
        
        "4.1 I-IV-V Progression": `<p>The foundation of Western popular music, rock, and blues harmony.</p>`,
        "4.2 ii-V-I Progression": `<p>The essential cadence driving jazz harmony and standard tunes.</p>`,
        "4.3 1st Inversion": `<p>Placing the 3rd in the bass creates smooth stepwise bass lines.</p>`,
        "4.4 2nd Inversion": `<p>Placing the 5th in the bass creates pedal points and cadential movement.</p>`,
        "4.5 Relative Keys": `<p>Major and Minor keys sharing the exact same key signature notes.</p>`,

        // --- ADVANCED ---
        "1.1 Major 7th Chords": `<p>Root - 3 - 5 - 7. The sound of Jazz, Lo-Fi, and sophisticated Pop.</p>`,
        "1.2 Dominant 7th Chords": `<p>Root - 3 - 5 - b7. The engine of functional harmony. Wants to resolve to I.</p>`,
        "1.3 Minor 7th Chords": `<p>Root - b3 - 5 - b7. Smooth, mellow, and foundational in jazz and R&B.</p>`,
        "1.4 Half-Diminished 7th": `<p>Root - b3 - b5 - b7. The ii chord in minor keys. Tense and mysterious.</p>`,
        "1.5 Fully Diminished 7th": `<p>Root - b3 - b5 - bb7. Symmetrical stack of minor 3rds with extreme drive to resolve.</p>`,
        "1.6 Adding the 9th": `<p>Adding the 9th brings rich, open color to major and minor triads.</p>`,
        "1.7 11ths and 13ths": `<p>Upper extension chords stacking 11ths and 13ths for maximum harmonic density.</p>`,

        "2.1 Tonic Function": `<p>Chords providing ultimate rest and resolution (I, vi, iii).</p>`,
        "2.2 Dominant Function": `<p>Chords creating maximum tension resolving back home (V7, vii°7).</p>`,
        "2.3 Subdominant Function": `<p>Chords leading away from home toward dominant tension (IV, ii).</p>`,
        "2.4 Secondary Dominants": `<p>Dominant 7th chords targeting non-tonic diatonic chords.</p>`,
        "2.5 Tritone Substitution": `<p>Replacing a Dominant 7th with another Dom7 six semitones away. They share the same tritone!</p>`,
        "2.6 Passing Diminished": `<p>Diminished chords connecting diatonic steps with chromatic bass motion.</p>`,

        "3.1 Ionian (Major)": `<p>The first mode. Bright, heroic, and stable major scale sound.</p>`,
        "3.2 Dorian (So What)": `<p>The second mode. Minor scale with a bright major 6th degree.</p>`,
        "3.3 Phrygian (Spanish)": `<p>The third mode. Minor scale with a dark, exotic flat 2nd degree.</p>`,
        "3.4 Lydian (Dreamy)": `<p>The fourth mode. Major scale with an ethereal, floating sharp 4th degree.</p>`,
        "3.5 Mixolydian (Rock)": `<p>The fifth mode. Major scale with a funky flat 7th degree.</p>`,
        "3.6 Aeolian (Minor)": `<p>The sixth mode. The natural minor scale sound.</p>`,
        "3.7 Locrian (Unstable)": `<p>The seventh mode. Highly unstable with both flat 2nd and flat 5th degrees.</p>`,

        "4.1 Shell Voicings": `<p>Playing only the Root, 3rd, and 7th (or just 3rd and 7th). The skeleton of the chord.</p>`,
        "4.2 Rootless Voicings": `<p>Omitting the root to play rich 3-6-9-5 and 7-3-13-9 color stacks.</p>`,
        "4.3 Quartal Harmony": `<p>Stacking 4ths instead of 3rds. The 'So What' sound. Modern and ambiguous.</p>`,
        "4.4 Upper Structures": `<p>Triads played over a dominant 7th base to create complex altered colors.</p>`,
        "4.5 Altered Dominants": `<p>Dominant chords with b9, #9, b5, or #5 extensions for deep jazz resolution.</p>`,
        "4.6 Whole Tone Scale": `<p>Symmetrical 6-note scale built entirely of whole steps.</p>`,
        "4.7 Diminished Scale": `<p>Symmetrical 8-note octatonic scale alternating half and whole steps.</p>`,
        "4.8 Bebop Enclosures": `<p>Enclosing target chord tones from chromatic notes above and below.</p>`,
        "4.9 Coltrane Changes": `<p>Rapid harmonic modulations cycling through major 3rd key centers.</p>`
    },
    CHALLENGES: {
        // --- BASIC ---
        "1.1 The Semitone": [
            {type:"interval", notes:["C4","C#4"], instruction:"Play C to C#", context:"Half Step (Jaws)"},
            {type:"interval", notes:["E4","F4"], instruction:"Play E to F", context:"Natural Half Step"},
            {type:"triad", notes:["C4","C#4","G4"], instruction:"Play C - C# - G", context:"Semitone Dissonance in Chord"}
        ],
        "1.2 The Whole Tone": [
            {type:"interval", notes:["C4","D4"], instruction:"Play C to D", context:"Whole Step (Happy Birthday)"},
            {type:"interval", notes:["F4","G4"], instruction:"Play F to G", context:"Whole Step"},
            {type:"triad", notes:["C4","D4","G4"], instruction:"Play Csus2 (C-D-G)", context:"Whole Step inside Csus2"}
        ],
        "1.3 The Major 2nd": [
            {type:"interval", notes:["G4","A4"], instruction:"Play G to A", context:"Major 2nd"},
            {type:"interval", notes:["D4","E4"], instruction:"Play D to E", context:"Major 2nd"},
            {type:"triad", notes:["D4","E4","A4"], instruction:"Play Dsus2 (D-E-A)", context:"Major 2nd inside Dsus2"}
        ],
        "1.4 The Minor 3rd": [
            {type:"interval", notes:["A4","C5"], instruction:"Play A to C", context:"Minor 3rd (Sadness)"},
            {type:"interval", notes:["C4","Eb4"], instruction:"Play C to Eb", context:"Minor 3rd"},
            {type:"triad", notes:["A4","C5","E5"], instruction:"Play A Minor Triad", context:"Minor 3rd inside Am"}
        ],
        "1.5 The Major 3rd": [
            {type:"interval", notes:["C4","E4"], instruction:"Play C to E", context:"Major 3rd (Happiness)"},
            {type:"interval", notes:["F4","A4"], instruction:"Play F to A", context:"Major 3rd"},
            {type:"triad", notes:["C4","E4","G4"], instruction:"Play C Major Triad", context:"Major 3rd inside C Major"}
        ],
        "1.6 The Perfect 4th": [
            {type:"interval", notes:["G4","C5"], instruction:"Play G to C", context:"Perfect 4th (Here Comes the Bride)"},
            {type:"interval", notes:["D4","G4"], instruction:"Play D to G", context:"Perfect 4th"},
            {type:"triad", notes:["C4","F4","G4"], instruction:"Play Csus4 (C-F-G)", context:"Perfect 4th inside Csus4"}
        ],
        "1.7 The Tritone": [
            {type:"interval", notes:["B4","F5"], instruction:"Play B to F", context:"Tritone (The Simpsons)"},
            {type:"interval", notes:["C4","F#4"], instruction:"Play C to F#", context:"Tritone (6 Semitones)"},
            {type:"triad", notes:["B4","D5","F5"], instruction:"Play B Diminished Triad", context:"Tritone inside Bdim"}
        ],
        "1.8 The Perfect 5th": [
            {type:"interval", notes:["C4","G4"], instruction:"Play C to G", context:"Perfect 5th (Star Wars)"},
            {type:"interval", notes:["D4","A4"], instruction:"Play D to A", context:"Perfect 5th"},
            {type:"triad", notes:["C4","G4","C5"], instruction:"Play C Power Chord with Octave", context:"5th & Octave Stack"}
        ],
        "1.9 The Minor 6th": [
            {type:"interval", notes:["E4","C5"], instruction:"Play E to C", context:"Minor 6th (Love Story)"},
            {type:"interval", notes:["A4","F5"], instruction:"Play A to F", context:"Minor 6th (8 Semitones)"},
            {type:"triad", notes:["C4","Eb4","Ab4"], instruction:"Play Ab/C Triad", context:"Minor 6th in Ab Major 1st Inversion"}
        ],
        "1.10 The Major 6th": [
            {type:"interval", notes:["C4","A4"], instruction:"Play C to A", context:"Major 6th (My Bonnie)"},
            {type:"interval", notes:["F4","D5"], instruction:"Play F to D", context:"Major 6th (9 Semitones)"},
            {type:"triad", notes:["C4","E4","G4","A4"], instruction:"Play C6 Chord", context:"Major 6th inside C6"}
        ],
        "1.11 The Minor 7th": [
            {type:"interval", notes:["G4","F5"], instruction:"Play G to F", context:"Minor 7th Interval"},
            {type:"interval", notes:["C4","Bb4"], instruction:"Play C to Bb", context:"Minor 7th (10 Semitones)"},
            {type:"triad", notes:["C4","E4","G4","Bb4"], instruction:"Play C7 (C Dom7)", context:"Minor 7th inside C7"}
        ],
        "1.12 The Major 7th": [
            {type:"interval", notes:["C4","B4"], instruction:"Play C to B", context:"Major 7th (Take On Me)"},
            {type:"interval", notes:["F4","E5"], instruction:"Play F to E", context:"Major 7th (11 Semitones)"},
            {type:"triad", notes:["C4","E4","G4","B4"], instruction:"Play Cmaj7 Chord", context:"Major 7th inside Cmaj7"}
        ],
        "1.13 The Octave": [
            {type:"interval", notes:["C4","C5"], instruction:"Play C4 to C5", context:"Octave (Somewhere Over the Rainbow)"},
            {type:"interval", notes:["A3","A4"], instruction:"Play A3 to A4", context:"Low Octave"},
            {type:"triad", notes:["C4","E4","G4","C5"], instruction:"Play C Major with Doubled Root", context:"Octave inside C Major"}
        ],

        "2.1 The Chromatic Scale": [
            {type:"sequence", notes:["C4","C#4","D4","D#4","E4"], instruction:"Play Chromatic Run (5 notes)", context:"Half Steps"},
            {type:"sequence", notes:["F4","F#4","G4","G#4","A4","A#4","B4"], instruction:"Play Chromatic Ascending (7 notes)", context:"All Semitones"},
            {type:"sequence", notes:["C5","B4","Bb4","A4","Ab4","G4"], instruction:"Play Chromatic Descending", context:"Falling Chromatic"}
        ],
        "2.2 The Major Scale": [
            {type:"sequence", notes:["C4","D4","E4","F4","G4","A4","B4","C5"], instruction:"Play C Major Scale", context:"Ionian Mode"},
            {type:"sequence", notes:["G4","A4","B4","C5","D5","E5","F#5","G5"], instruction:"Play G Major Scale", context:"1 Sharp (F#)"},
            {type:"sequence", notes:["F4","G4","A4","Bb4","C5","D5","E5","F5"], instruction:"Play F Major Scale", context:"1 Flat (Bb)"}
        ],
        "2.3 Natural Minor": [
            {type:"sequence", notes:["A3","B3","C4","D4","E4","F4","G4","A4"], instruction:"Play A Natural Minor", context:"Aeolian Mode"},
            {type:"sequence", notes:["C4","D4","Eb4","F4","G4","Ab4","Bb4","C5"], instruction:"Play C Natural Minor", context:"Minor Palette"},
            {type:"sequence", notes:["E4","F#4","G4","A4","B4","C5","D5","E5"], instruction:"Play E Natural Minor", context:"Relative to G Major"}
        ],
        "2.4 Harmonic Minor": [
            {type:"sequence", notes:["A3","B3","C4","D4","E4","F4","G#4","A4"], instruction:"Play A Harmonic Minor", context:"Raised 7th (G#)"},
            {type:"sequence", notes:["C4","D4","Eb4","F4","G4","Ab4","B4","C5"], instruction:"Play C Harmonic Minor", context:"Raised 7th (B)"},
            {type:"sequence", notes:["E4","F#4","G4","A4","B4","C5","D#5","E5"], instruction:"Play E Harmonic Minor", context:"Exotic Sound"}
        ],
        "2.5 Melodic Minor": [
            {type:"sequence", notes:["C4","D4","Eb4","F4","G4","A4","B4","C5"], instruction:"Play C Melodic Minor", context:"Jazz Minor"},
            {type:"sequence", notes:["A3","B3","C4","D4","E4","F#4","G#4","A4"], instruction:"Play A Melodic Minor", context:"Raised 6th and 7th"},
            {type:"sequence", notes:["G4","A4","Bb4","C5","D5","E5","F#5","G5"], instruction:"Play G Melodic Minor", context:"Smooth Minor Scale"}
        ],
        "2.6 Major Pentatonic": [
            {type:"sequence", notes:["C4","D4","E4","G4","A4"], instruction:"Play C Major Pentatonic", context:"1-2-3-5-6"},
            {type:"sequence", notes:["G4","A4","B4","D5","E5"], instruction:"Play G Major Pentatonic", context:"Pure Country Sound"},
            {type:"sequence", notes:["F4","G4","A4","C5","D5"], instruction:"Play F Major Pentatonic", context:"5-note Palette"}
        ],
        "2.7 Minor Pentatonic": [
            {type:"sequence", notes:["A3","C4","D4","E4","G4"], instruction:"Play A Minor Pentatonic", context:"1-b3-4-5-b7"},
            {type:"sequence", notes:["C4","Eb4","F4","G4","Bb4"], instruction:"Play C Minor Pentatonic", context:"Rock Solo Essential"},
            {type:"sequence", notes:["E4","G4","A4","B4","D5"], instruction:"Play E Minor Pentatonic", context:"Guitar Classic"}
        ],
        "2.8 The Blues Scale": [
            {type:"sequence", notes:["A3","C4","D4","D#4","E4","G4"], instruction:"Play A Blues Scale", context:"Added Blue Note (D#)"},
            {type:"sequence", notes:["C4","Eb4","F4","F#4","G4","Bb4"], instruction:"Play C Blues Scale", context:"Gritty Blues Sound"},
            {type:"sequence", notes:["E4","G4","A4","A#4","B4","D5"], instruction:"Play E Blues Scale", context:"Soulful Expression"}
        ],

        "3.1 Major Triads": [
            {type:"triad", notes:["C4","E4","G4"], instruction:"Play C Major", context:"1-3-5"},
            {type:"triad", notes:["G4","B4","D5"], instruction:"Play G Major", context:"Dominant Triad"},
            {type:"triad", notes:["F4","A4","C5"], instruction:"Play F Major", context:"Subdominant Triad"}
        ],
        "3.2 Minor Triads": [
            {type:"triad", notes:["A4","C5","E5"], instruction:"Play A Minor", context:"1-b3-5"},
            {type:"triad", notes:["C4","Eb4","G4"], instruction:"Play C Minor", context:"Sad Harmony"},
            {type:"triad", notes:["D4","F4","A4"], instruction:"Play D Minor", context:"ii chord in C Major"}
        ],
        "3.3 Diminished Triads": [
            {type:"triad", notes:["B4","D5","F5"], instruction:"Play B Diminished", context:"1-b3-b5"},
            {type:"triad", notes:["C4","Eb4","Gb4"], instruction:"Play C Diminished", context:"Tense Triad"},
            {type:"triad", notes:["D4","F4","Ab4"], instruction:"Play D Diminished", context:"Constricted Sound"}
        ],
        "3.4 Augmented Triads": [
            {type:"triad", notes:["C4","E4","G#4"], instruction:"Play C Augmented", context:"1-3-#5"},
            {type:"triad", notes:["F4","A4","C#5"], instruction:"Play F Augmented", context:"4-semitone Stacks"},
            {type:"triad", notes:["G4","B4","D#5"], instruction:"Play G Augmented", context:"Floating Tension"}
        ],
        "3.5 Suspended 2nd": [
            {type:"triad", notes:["C4","D4","G4"], instruction:"Play Csus2", context:"1-2-5"},
            {type:"triad", notes:["G4","A4","D5"], instruction:"Play Gsus2", context:"Open and Airy"},
            {type:"triad", notes:["D4","E4","A4"], instruction:"Play Dsus2", context:"No 3rd Tension"}
        ],
        "3.6 Suspended 4th": [
            {type:"triad", notes:["C4","F4","G4"], instruction:"Play Csus4", context:"1-4-5"},
            {type:"triad", notes:["G4","C5","D5"], instruction:"Play Gsus4", context:"Anthem Tension"},
            {type:"triad", notes:["D4","G4","A4"], instruction:"Play Dsus4", context:"Resolves to D Major"}
        ],

        "4.1 I-IV-V Progression": [
            {
                type: "chord-sequence",
                sequence: [["C4","E4","G4"], ["F4","A4","C5"], ["G4","B4","D5"], ["C4","E4","G4"]],
                instruction: "Play C - F - G - C",
                context: "The Rock Foundation"
            },
            {
                type: "chord-sequence",
                sequence: [["G4","B4","D5"], ["C4","E4","G4"], ["D4","F#4","A4"], ["G4","B4","D5"]],
                instruction: "Play G - C - D - G",
                context: "I-IV-V in G Major"
            },
            {
                type: "chord-sequence",
                sequence: [["F4","A4","C5"], ["Bb3","D4","F4"], ["C4","E4","G4"], ["F4","A4","C5"]],
                instruction: "Play F - Bb - C - F",
                context: "I-IV-V in F Major"
            }
        ],
        "4.2 ii-V-I Progression": [
            {
                type: "chord-sequence",
                sequence: [["D4","F4","A4"], ["G4","B4","D5","F5"], ["C4","E4","G4","B4"]],
                instruction: "Play Dm - G7 - Cmaj7",
                context: "Jazz Foundation"
            },
            {
                type: "chord-sequence",
                sequence: [["A4","C5","E5"], ["D4","F#4","A4","C5"], ["G4","B4","D5","F#5"]],
                instruction: "Play Am - D7 - Gmaj7",
                context: "ii-V-I in G Major"
            },
            {
                type: "chord-sequence",
                sequence: [["G4","Bb4","D5"], ["C4","E4","G4","Bb4"], ["F4","A4","C5","E5"]],
                instruction: "Play Gm - C7 - Fmaj7",
                context: "ii-V-I in F Major"
            }
        ],
        "4.3 1st Inversion": [
            {type:"triad", notes:["E4","G4","C5"], instruction:"Play C Major / E", context:"3rd in Bass"},
            {type:"triad", notes:["B4","D5","G5"], instruction:"Play G Major / B", context:"3rd in Bass (G/B)"},
            {type:"triad", notes:["A4","C5","F5"], instruction:"Play F Major / A", context:"3rd in Bass (F/A)"}
        ],
        "4.4 2nd Inversion": [
            {type:"triad", notes:["G4","C5","E5"], instruction:"Play C Major / G", context:"5th in Bass"},
            {type:"triad", notes:["D4","G4","B4"], instruction:"Play G Major / D", context:"5th in Bass (G/D)"},
            {type:"triad", notes:["C4","F4","A4"], instruction:"Play F Major / C", context:"5th in Bass (F/C)"}
        ],
        "4.5 Relative Keys": [
            {
                type: "chord-sequence",
                sequence: [["C4","E4","G4"], ["A4","C5","E5"]],
                instruction: "Play C Major then A Minor",
                context: "Same notes, different root"
            },
            {
                type: "chord-sequence",
                sequence: [["G4","B4","D5"], ["E4","G4","B4"]],
                instruction: "Play G Major then E Minor",
                context: "Relative Major & Minor in G"
            },
            {
                type: "chord-sequence",
                sequence: [["F4","A4","C5"], ["D4","F4","A4"]],
                instruction: "Play F Major then D Minor",
                context: "Relative Major & Minor in F"
            }
        ],

        // --- ADVANCED ---
        "1.1 Major 7th Chords": [
            {type:"triad", notes:["C4","E4","G4","B4"], instruction:"Play C Maj7", context:"1-3-5-7"},
            {type:"triad", notes:["F4","A4","C5","E5"], instruction:"Play F Maj7", context:"Subdominant"},
            {type:"triad", notes:["G4","B4","D5","F#5"], instruction:"Play G Maj7", context:"Tonic Maj7 in G"}
        ],
        "1.2 Dominant 7th Chords": [
            {
                type: "chord-sequence",
                sequence: [["G4","B4","D5","F5"], ["C4","E4","G4","B4"]],
                instruction: "Play G7 then Cmaj7",
                context: "V7 - I Resolution"
            },
            {type:"triad", notes:["G4","B4","D5","F5"], instruction:"Play G7", context:"1-3-5-b7"},
            {type:"triad", notes:["C4","E4","G4","Bb4"], instruction:"Play C7", context:"Dominant 7th on C"}
        ],
        "1.3 Minor 7th Chords": [
            {type:"triad", notes:["C4","Eb4","G4","Bb4"], instruction:"Play C Minor 7", context:"1-b3-5-b7"},
            {type:"triad", notes:["A4","C5","E5","G5"], instruction:"Play A Minor 7", context:"Aeolian Home"},
            {type:"triad", notes:["D4","F4","A4","C5"], instruction:"Play D Minor 7", context:"ii7 in C Major"}
        ],
        "1.4 Half-Diminished 7th": [
            {type:"triad", notes:["B4","D5","F5","A5"], instruction:"Play Bm7b5", context:"ii of Minor"},
            {type:"triad", notes:["D4","F4","Ab4","C5"], instruction:"Play Dm7b5", context:"Half-Diminished on D"},
            {type:"triad", notes:["E4","G4","Bb4","D5"], instruction:"Play Em7b5", context:"ii7b5 in D Minor"}
        ],
        "1.5 Fully Diminished 7th": [
            {type:"triad", notes:["B4","D5","F5","Ab5"], instruction:"Play Bdim7", context:"Symmetrical Tension"},
            {type:"triad", notes:["C#4","E4","G4","Bb4"], instruction:"Play C#dim7", context:"Passing Diminished"},
            {type:"triad", notes:["F#4","A4","C5","Eb5"], instruction:"Play F#dim7", context:"Fully Diminished 7th"}
        ],
        "1.6 Adding the 9th": [
            {type:"triad", notes:["C4","E4","G4","B4","D5"], instruction:"Play Cmaj9", context:"Rich Color"},
            {type:"triad", notes:["F4","A4","C5","E5","G5"], instruction:"Play Fmaj9", context:"5-Note Voicing"},
            {type:"triad", notes:["A3","C4","E4","G4","B4"], instruction:"Play Am9", context:"Minor 9th Color"}
        ],
        "1.7 11ths and 13ths": [
            {type:"triad", notes:["G3","F4","A4","B4","E5"], instruction:"Play G13", context:"Dominant Power"},
            {type:"triad", notes:["C4","E4","G4","B4","D5","F5"], instruction:"Play Cmaj11", context:"6-Note Extended Voicing"},
            {type:"triad", notes:["D4","F4","A4","C5","E5","G5"], instruction:"Play Dm11", context:"6-Note Minor 11th"}
        ],

        "2.1 Tonic Function": [
            {type:"triad", notes:["C4","E4","G4","B4"], instruction:"Play Cmaj7", context:"Home"},
            {type:"triad", notes:["A4","C5","E5","G5"], instruction:"Play Am7", context:"Tonic Substitute (vi7)"},
            {
                type: "chord-sequence",
                sequence: [["C4","E4","G4"], ["A4","C5","E5"]],
                instruction: "Play C to Am",
                context: "Tonic Family Movement"
            }
        ],
        "2.2 Dominant Function": [
            {type:"triad", notes:["G4","B4","D5","F5"], instruction:"Play G7", context:"Tension"},
            {type:"triad", notes:["B4","D5","F5","A5"], instruction:"Play Bm7b5", context:"Leading Tone Dominant"},
            {
                type: "chord-sequence",
                sequence: [["G4","B4","D5","F5"], ["C4","E4","G4","B4"]],
                instruction: "Play G7 to Cmaj7",
                context: "V7 -> I Resolution"
            }
        ],
        "2.3 Subdominant Function": [
            {type:"triad", notes:["F4","A4","C5","E5"], instruction:"Play Fmaj7", context:"Departure"},
            {type:"triad", notes:["D4","F4","A4","C5"], instruction:"Play Dm7", context:"Predominant (ii7)"},
            {
                type: "chord-sequence",
                sequence: [["F4","A4","C5","E5"], ["D4","F4","A4","C5"]],
                instruction: "Play Fmaj7 then Dm7",
                context: "Subdominant Family"
            }
        ],
        "2.4 Secondary Dominants": [
            {
                type: "chord-sequence",
                sequence: [["A4","C#5","E5","G5"], ["D4","F4","A4","C5"]],
                instruction: "Play A7 then Dm7",
                context: "V7/ii -> ii"
            },
            {
                type: "chord-sequence",
                sequence: [["C4","E4","G4","Bb4"], ["F4","A4","C5","E5"]],
                instruction: "Play C7 then Fmaj7",
                context: "V7/IV -> IV"
            },
            {
                type: "chord-sequence",
                sequence: [["D4","F#4","A4","C5"], ["G4","B4","D5","F5"]],
                instruction: "Play D7 then G7",
                context: "V7/V -> V"
            }
        ],
        "2.5 Tritone Substitution": [
            {type:"triad", notes:["G4","B4","D5","F5"], instruction:"Play G7", context:"Original"},
            {type:"triad", notes:["C#4","F4","G#4","B4"], instruction:"Play Db7", context:"Substitute"},
            {
                type: "chord-sequence",
                sequence: [["D4","F4","A4","C5"], ["C#4","F4","G#4","B4"], ["C4","E4","G4","B4"]],
                instruction: "Play Dm7 - Db7 - Cmaj7",
                context: "Chromatic Bass Resolution"
            }
        ],
        "2.6 Passing Diminished": [
            {
                type: "chord-sequence",
                sequence: [["C4","E4","G4","B4"], ["C#4","E4","G4","Bb4"], ["D4","F4","A4","C5"]],
                instruction: "Play Cmaj7 - C#dim7 - Dm7",
                context: "Chromatic Connector"
            },
            {
                type: "chord-sequence",
                sequence: [["F4","A4","C5","E5"], ["F#4","A4","C5","Eb5"], ["G4","B4","D5","F5"]],
                instruction: "Play Fmaj7 - F#dim7 - G7",
                context: "Ascending Passing Diminished"
            },
            {type:"triad", notes:["C#4","E4","G4","Bb4"], instruction:"Play C#dim7", context:"Passing Chord Isolated"}
        ],

        "3.1 Ionian (Major)": [
            {type:"sequence", notes:["C4","D4","E4","F4","G4","A4","B4","C5"], instruction:"Play C Ionian", context:"Major"},
            {type:"triad", notes:["C4","E4","G4","B4"], instruction:"Play Cmaj7", context:"Ionian Tonic Chord"},
            {type:"sequence", notes:["G4","A4","B4","C5","D5","E5","F#5","G5"], instruction:"Play G Ionian", context:"Bright Major Mode"}
        ],
        "3.2 Dorian (So What)": [
            {type:"sequence", notes:["D4","E4","F4","G4","A4","B4","C5","D5"], instruction:"Play D Dorian", context:"Minor with Major 6"},
            {type:"triad", notes:["D4","F4","A4","C5","B4"], instruction:"Play Dm6/7 Voicing", context:"Dorian Characteristic Note"},
            {type:"sequence", notes:["A3","B3","C4","D4","E4","F#4","G4","A4"], instruction:"Play A Dorian", context:"Minor with F#"}
        ],
        "3.3 Phrygian (Spanish)": [
            {type:"sequence", notes:["E4","F4","G4","A4","B4","C5","D5","E5"], instruction:"Play E Phrygian", context:"Flat 2nd"},
            {type:"triad", notes:["F4","A4","C5"], instruction:"Play F Major Triad Over E", context:"Phrygian Flat-2 Cadence"},
            {type:"sequence", notes:["A3","Bb3","C4","D4","E4","F4","G4","A4"], instruction:"Play A Phrygian", context:"Spanish Flavor"}
        ],
        "3.4 Lydian (Dreamy)": [
            {type:"sequence", notes:["F4","G4","A4","B4","C5","D5","E5","F5"], instruction:"Play F Lydian", context:"Sharp 4th"},
            {type:"triad", notes:["C4","E4","G4","B4","F#4"], instruction:"Play Cmaj7#11", context:"Lydian Raised 4th"},
            {type:"sequence", notes:["C4","D4","E4","F#4","G4","A4","B4","C5"], instruction:"Play C Lydian", context:"Bright & Floating"}
        ],
        "3.5 Mixolydian (Rock)": [
            {type:"sequence", notes:["G4","A4","B4","C5","D5","E5","F5","G5"], instruction:"Play G Mixolydian", context:"Flat 7th"},
            {type:"triad", notes:["G4","B4","D5","F5"], instruction:"Play G7", context:"Mixolydian Home Chord"},
            {type:"sequence", notes:["C4","D4","E4","F4","G4","A4","Bb4","C5"], instruction:"Play C Mixolydian", context:"Dominant Scale"}
        ],
        "3.6 Aeolian (Minor)": [
            {type:"sequence", notes:["A3","B3","C4","D4","E4","F4","G4","A4"], instruction:"Play A Aeolian", context:"Natural Minor"},
            {type:"triad", notes:["A4","C5","E5","G5"], instruction:"Play Am7 Chord", context:"Aeolian Tonic Chord"},
            {type:"sequence", notes:["C4","D4","Eb4","F4","G4","Ab4","Bb4","C5"], instruction:"Play C Aeolian", context:"Standard Minor Mode"}
        ],
        "3.7 Locrian (Unstable)": [
            {type:"sequence", notes:["B3","C4","D4","E4","F4","G4","A4","B4"], instruction:"Play B Locrian", context:"b2 and b5"},
            {type:"triad", notes:["B4","D5","F5","A5"], instruction:"Play Bm7b5 Chord", context:"Locrian Tonic Chord"},
            {type:"sequence", notes:["E4","F4","G4","A4","Bb4","C5","D5","E5"], instruction:"Play E Locrian", context:"Unstable Minor Mode"}
        ],

        "4.1 Shell Voicings": [
            {type:"interval", notes:["E4","B4"], instruction:"Play E-B (3rd & 7th of Cmaj7)", context:"Rootless Shell"},
            {type:"triad", notes:["C4","E4","B4"], instruction:"Play C-E-B Shell", context:"1-3-7 Shell Voicing"},
            {type:"triad", notes:["C4","Eb4","Bb4"], instruction:"Play C-Eb-Bb Shell", context:"1-b3-b7 Minor Shell"}
        ],
        "4.2 Rootless Voicings": [
            {type:"triad", notes:["E4","A4","D5","G5"], instruction:"Play Rootless C6/9", context:"Quartal Stack"},
            {type:"triad", notes:["F4","A4","C5","E5"], instruction:"Play Rootless Dm9", context:"3-5-7-9 of Dm9"},
            {type:"triad", notes:["F4","B4","E5","A5"], instruction:"Play Rootless G13", context:"7-3-13-9 of G13"}
        ],
        "4.3 Quartal Harmony": [
            {type:"triad", notes:["D4","G4","C5","F5","A5"], instruction:"Play So What Voicing", context:"Stacked 4ths"},
            {type:"triad", notes:["E4","A4","D5","G5"], instruction:"Play Quartal Stack on E", context:"Fourths Stack"},
            {type:"triad", notes:["A3","D4","G4","C5"], instruction:"Play Low Quartal Stack", context:"Modern Ambiguous Harmony"}
        ],
        "4.4 Upper Structures": [
            {type:"triad", notes:["C4","E4","G4","B4","D5","F#4","A4"], instruction:"Play Cmaj7 + Dmaj", context:"Polychord Lydian"},
            {type:"triad", notes:["C4","E4","G4","Bb4","F#4","A#4","C#5"], instruction:"Play C7 + F#maj", context:"7-Note Altered Polychord"},
            {type:"triad", notes:["C4","E4","G4","Bb4","A4","C#5","E5"], instruction:"Play C7 + Amaj", context:"7-Note Upper Structure"}
        ],
        "4.5 Altered Dominants": [
            {type:"triad", notes:["G4","B4","D#5","F5"], instruction:"Play G7#5", context:"Augmented Dominant"},
            {type:"triad", notes:["G4","B4","Db5","F5"], instruction:"Play G7b5", context:"Flat-5 Dominant"},
            {type:"triad", notes:["G4","B4","Eb5","F5","Ab5"], instruction:"Play G7alt (b9, b13)", context:"5-Note Fully Altered Dominant"}
        ],
        "4.6 Whole Tone Scale": [
            {type:"sequence", notes:["C4","D4","E4","F#4","G#4","Bb4","C5"], instruction:"Play Whole Tone Scale", context:"Dreamy"},
            {type:"sequence", notes:["D4","E4","F#4","G#4","A#4","C5","D5"], instruction:"Play Whole Tone on D", context:"No Semitones"},
            {type:"triad", notes:["C4","E4","G#4","Bb4","D5"], instruction:"Play C79#5 (Whole Tone Chord)", context:"Whole Tone Harmony"}
        ],
        "4.7 Diminished Scale": [
            {type:"sequence", notes:["C4","Db4","Eb4","E4","F#4","G4","A4","Bb4","C5"], instruction:"Play Half-Whole Diminished", context:"Octatonic"},
            {type:"sequence", notes:["D4","Eb4","F4","F#4","G#4","A4","B4","C5","D5"], instruction:"Play Diminished on D", context:"Alternating Half/Whole Steps"},
            {type:"triad", notes:["C4","Eb4","F#4","A4"], instruction:"Play Diminished 7th Stack", context:"Diminished Scale Foundation"}
        ],
        "4.8 Bebop Enclosures": [
            {type:"sequence", notes:["D4","B3","C4"], instruction:"Play D-B-C (Target C)", context:"Enclosure"},
            {type:"sequence", notes:["F4","D#4","E4"], instruction:"Play F-D#-E (Target E)", context:"Targeting the 3rd"},
            {type:"sequence", notes:["A4","F#4","G4"], instruction:"Play A-F#-G (Target G)", context:"Targeting the 5th"}
        ],
        "4.9 Coltrane Changes": [
            {
                type: "chord-sequence",
                sequence: [["C4","E4","G4","B4"], ["Eb4","G4","Bb4","Db5"], ["Ab4","C5","Eb5","G5"]],
                instruction: "Play Cmaj7 - Eb7 - Abmaj7",
                context: "Major 3rd Cycles"
            },
            {
                type: "chord-sequence",
                sequence: [["B3","D#4","F#4","A#4"], ["D4","F#4","A4","C5"], ["G4","B4","D5","F#5"]],
                instruction: "Play Bmaj7 - D7 - Gmaj7",
                context: "Coltrane Cycle in B"
            },
            {
                type: "chord-sequence",
                sequence: [["G4","B4","D5","F#5"], ["Bb3","D4","F4","Ab4"], ["Eb4","G4","Bb4","D5"]],
                instruction: "Play Gmaj7 - Bb7 - Ebmaj7",
                context: "Major 3rd Modulation"
            }
        ]
    }
};

window.Curriculum = Curriculum;
